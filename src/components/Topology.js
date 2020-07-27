import React, { useEffect, useState, useRef } from 'react'
import { Graph } from "react-d3-graph";
import TopologyModal from "./TopologyModal";
import Select from "react-select";



export default function Topology(ac) {
    const [switchTopologyModal, setswitchTopologyModal] = useState(false);
    const [trigger, settrigger] = useState(1)
    const [loading, setloading] = useState(false);
    const [deviceSerial, setdeviceSerial] = useState([])
    const [sourceDeviceName, setsourceDeviceName] = useState([])
    const [isDeviceSelected, setisDeviceSelected] = useState(false)
    const [sourceDeviceIp, setsourceDeviceIp] = useState([])
    const [sourceDeviceMac, setsourceDeviceMac] = useState([])
    const [graph, setgraph] = useState([])
    const [modalModel, setmodalModel] = useState([])

    const [model, setmodel] = useState([])

    const [data, setdata] = useState({ 'nodes': [], 'links': [] })


    const DEVICELIST = ac.deviceList.map((opt, index) => ({
        label: opt.name,
        value: index,
        id: opt.id,
        serial: opt.serial,
        ipaddress: opt.lanIp,
        mac: opt.mac,
    }));

    const isFirstRun = useRef(true);
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        async function APIcall() {
            if (isDeviceSelected) {
                setdata({
                    'nodes': [],
                    'links': []
                })
                setmodalModel([])
                setloading(true);
                let Device_Row = []
                // let serials = []
                // for (let i = 0; i < ac.deviceList.length; i++) {
                //     const serial = ac.deviceList[i].serial
                //     console.log("APIcall -> ac.deviceList[i]", ac.deviceList[i])
                //     serials.push(serial)
                // }
                try {
                    await fetch("/device_clients", {
                        method: ["POST"],
                        cache: "no-cache",
                        headers: {
                            content_type: "application/json",
                        },
                        body: JSON.stringify({
                            "X-Cisco-Meraki-API-Key": `${ac.apiKey}`,
                            NET_ID: `${ac.networkID}`,
                            SERIAL_NUM: `${deviceSerial}`
                        })
                    }).then((response) => {
                        return response.json;
                    });
                    await fetch("/device_clients", { signal: signal })
                        .then((res) => { return res.json() })
                        .then((device_clients) => {
                            if (device_clients.error) {
                                ac.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                                    {device_clients.error[0]}
                                </div>)
                            } else {
                                const DEVICE_OBJ = Object.values(device_clients.device_clients)
                                Device_Row.push(DEVICE_OBJ)

                                //push source nodes
                                data.nodes.push({ id: 0, name: sourceDeviceName });
                                modalModel.push({
                                    description: sourceDeviceName,
                                    name: sourceDeviceName,
                                    ipaddress: sourceDeviceIp,
                                    mac: sourceDeviceMac,
                                    id: '',
                                    mdnsName: '',
                                    switchport: '',
                                    vlan: '',
                                    usage: '',
                                });

                                //push nodes connected to source node
                                // eslint-disable-next-line
                                Device_Row.map((item) => {
                                    item.forEach((device, index) => {
                                        let id = index + 1
                                        data.nodes.push({ id: id, name: device.dhcpHostname });
                                        data.links.push({ source: 0, target: id });
                                        modalModel.push({
                                            description: device.description,
                                            name: device.dhcpHostname,
                                            id: device.id,
                                            mdnsName: device.mdnsName,
                                            switchport: device.switchport,
                                            ipaddress: device.ip,
                                            mac: device.mac,
                                            vlan: device.vlan,
                                            usage: { recv: device.usage.recv, sent: device.usage.sent }
                                        });

                                    })
                                })
                            }
                        })
                        .then(() => {
                            setgraph(
                                <Graph
                                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                                    data={data}
                                    config={myConfig}
                                    onClickNode={onClickNode}
                                    onDoubleClickNode={onDoubleClickNode}
                                    onRightClickNode={onRightClickNode}
                                    onClickGraph={onClickGraph}
                                    onClickLink={onClickLink}
                                    onRightClickLink={onRightClickLink}
                                    onMouseOverNode={onMouseOverNode}
                                    onMouseOutNode={onMouseOutNode}
                                    onMouseOverLink={onMouseOverLink}
                                    onMouseOutLink={onMouseOutLink}
                                    onNodePositionChange={onNodePositionChange}
                                />)
                            setloading(false)
                        })
                } catch (err) {
                    console.log("This is the error:", err);
                }
            } else {
                ac.setswitchAlertModal(true);
                ac.setAlertModalError("Please select device.");
                ac.setswitchToolsTemplate(false);
            }
        }
        APIcall();
        return function cleanup() {
            abortController.abort()
            console.log("cleanup -> abortController")
            setdata({
                'nodes': [],
                'links': []
            })
            setmodalModel([])
        }
        // eslint-disable-next-line
    }, [trigger]);

    // the graph configuration, you only need to pass down properties
    // that you want to override, otherwise default ones will be used


    const myConfig = {
        nodeHighlightBehavior: true,
        panAndZoom: true,
        height: window.innerHeight,
        width: 1300,
        d3: {
            alphaTarget: 0.05,
            gravity: -400,
            // linkLength: 300,
            linkStrength: 1,
            disableLinkForce: false
        },
        node: {
            color: "lightgreen",
            size: 800,
            highlightStrokeColor: "blue",
            labelProperty: "name",
            renderLabel: true,
            // viewGenerator: node => <CustomNode person={node} />,
        },
        link: {
            highlightColor: "lightblue",
            // type: 'CURVE_SMOOTH',
        },
    };


    // graph event callbacks
    const onClickGraph = function () {
        console.log(`Clicked the graph background`);

    };

    const onClickNode = function (nodeId) {
        console.log(`Clicked node ${nodeId}`);
        setswitchTopologyModal(true)
        setmodel(modalModel[`${nodeId}`])

    };


    const onDoubleClickNode = function (nodeId) {
        console.log(`Double clicked node ${nodeId}`);
    };

    const onRightClickNode = function (event, nodeId) {
        console.log(`Right clicked node ${nodeId}`);
    };

    const onMouseOverNode = function (nodeId) {
        console.log(`Mouse over node ${nodeId}`);

    };

    const onMouseOutNode = function (nodeId) {
        console.log(`Mouse out node ${nodeId}`);

    };

    const onClickLink = function (source, target) {
        console.log(`Clicked link between ${source} and ${target}`);
    };

    const onRightClickLink = function (event, source, target) {
        console.log(`Right clicked link between ${source} and ${target}`);
    };

    const onMouseOverLink = function (source, target) {
        console.log(`Mouse over in link between ${source} and ${target}`);
    };

    const onMouseOutLink = function (source, target) {
        console.log(`Mouse out link between ${source} and ${target}`);
    };

    const onNodePositionChange = function (nodeId, x, y) {
        console.log(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
    };

    const dc = {
        data, setdata, switchTopologyModal,
        setswitchTopologyModal, modalModel, setmodalModel, model, setmodel, sourceDeviceName
    }

    const HandleDevices = (opt) => {
        setdeviceSerial(opt.serial);
        setsourceDeviceName(opt.label)
        setsourceDeviceIp(opt.ipaddress)
        setsourceDeviceMac(opt.mac)
        setisDeviceSelected(true)

    };

    return (
        <div id="page-inner-tool-templates">
            <div>{ac.flashMessages && <span>{ac.flashMessages}</span>}</div>
            <div className="row">
                <div className="col-md-3 col-sm-12 col-xs-12">
                    <div className="board">
                        <div className="panel panel-primary">
                            <div className="number">
                                <h3 className="h3-dashboard">{ac.network}</h3>
                                <small>Network</small>
                            </div>
                            <div className="icon">
                                <i className="fa fa-sitemap fa-5x red"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-12 col-xs-12">
                    <div className="board">
                        <div className="panel panel-primary">
                            <div className="number">
                                <h3 className="h3-dashboard">{ac.organizationID}</h3>
                                <small>Organization ID</small>
                            </div>
                            <div className="icon">
                                <i className="fa fa-id-card-o fa-5x blue"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-12 col-xs-12">
                    <div className="board">
                        <div className="panel panel-primary">
                            <div className="number">
                                <h3 className="h3-dashboard">{ac.timeZone}</h3>
                                <small>Time Zone</small>
                            </div>
                            <div className="icon">
                                <i className="fa fa-clock-o fa-5x green"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-12 col-xs-12">
                    <div className="board">
                        <div className="panel panel-primary">
                            <div className="number">
                                <h3 className="h3-dashboard">{ac.totalDevices}</h3>
                                <small>Total Devices</small>
                            </div>
                            <div className="icon">
                                <i className="fa fa-server fa-5x yellow"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div>
                                <Select
                                    className='select-tolopology'
                                    options={DEVICELIST}
                                    placeholder='Devices'
                                    onChange={HandleDevices}
                                    classNamePrefix="topology"
                                // onMenuOpen={() => ac.dc.settriggerSelectOrg(ac.dc.triggerSelectOrg + 1)}
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={!loading ? (e) => settrigger(trigger + 1) : null}
                                disabled={loading}
                            >
                                {loading && (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                    />
                                )}
                                {loading && <span>Loading Topology</span>}
                                {!loading && <span>Load Topology</span>}
                            </button>
                            {/* <button
                                className="btn btn-primary"
                                onClick={(e) => settrigger(trigger + 1)} >
                                Load Topology
                            </button> */}
                        </div>
                    </div>
                </div>
                {graph}
                {switchTopologyModal ? (<TopologyModal dc={dc} />) : (<div></div>)}
            </div>
        </div>
    )
}
