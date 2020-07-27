import React, { useEffect, useState, useRef } from 'react'
import { Graph } from "react-d3-graph";
import TopologyModal from "./TopologyModal";
import Select from "react-select";



export default function Topology(ac) {
    const [switchTopologyModal, setswitchTopologyModal] = useState(false);
    const [trigger, settrigger] = useState(1)
    const [triggerClient, settriggerClient] = useState(1)
    const [loading, setloading] = useState(false);
    const [deviceSerial, setdeviceSerial] = useState([])
    const [sourceDeviceName, setsourceDeviceName] = useState([])
    const [isDeviceSelected, setisDeviceSelected] = useState(false)
    const [sourceDeviceIp, setsourceDeviceIp] = useState([])
    const [sourceDeviceMac, setsourceDeviceMac] = useState([])
    const [sourceDeviceModel, setsourceDeviceModel] = useState([])
    const [graph, setgraph] = useState([])
    const [modalModel, setmodalModel] = useState([])
    console.log("Topology -> modalModel", modalModel)
    const [model, setmodel] = useState([])
    const [data, setdata] = useState({ 'nodes': [], 'links': [] })
    const [nodeslist, setnodeslist] = useState([])
    const [clientID, setclientID] = useState([])
    console.log("Topology -> clientID", clientID)

    const firewallSVG = 'https://img.icons8.com/office/52/000000/firewall.png'
    const switchSVG = 'https://img.icons8.com/dusk/64/000000/switch.png'
    const apSVG = 'https://img.icons8.com/plasticine/100/000000/wifi.png'
    const nodeSVG = 'https://img.icons8.com/dusk/48/000000/filled-circle.png'



    const DEVICELIST = ac.deviceList.map((opt, index) => ({
        label: opt.name,
        value: index,
        id: opt.id,
        serial: opt.serial,
        ipaddress: opt.lanIp,
        mac: opt.mac,
        model: opt.model
    }));

    const NODESLIST = nodeslist.map((opt, index) => ({
        label: opt.dhcpHostname,
        // value: index,
        id: index,
        // serial: opt.serial,
        // ipaddress: opt.lanIp,
        // mac: opt.mac,
        // model: opt.model
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
                                setnodeslist(device_clients.device_clients)
                                Device_Row.push(DEVICE_OBJ)

                                //push source nodes

                                if (sourceDeviceModel.startsWith("MX") || sourceDeviceModel.startsWith("Z")) {
                                    data.nodes.push({ id: 0, name: sourceDeviceName, size: 700, svg: firewallSVG })
                                }

                                else if (sourceDeviceModel.startsWith("MS")) {
                                    data.nodes.push({ id: 0, name: sourceDeviceName, size: 700, svg: switchSVG })
                                }
                                else if (sourceDeviceModel.startsWith("MR")) {
                                    data.nodes.push({ id: 0, name: sourceDeviceName, size: 700, svg: apSVG })
                                }

                                // data.nodes.push({ id: 0, name: sourceDeviceName, svg: firewallSVG });
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
                                        data.nodes.push({ id: id, name: device.dhcpHostname, svg: nodeSVG });
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


                                // console.log("Topology -> modalModel", modalModel)

                            }
                            setmodalModel(modalModel)
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






    const isFirstRunClient = useRef(true);
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        if (isFirstRunClient.current) {
            isFirstRunClient.current = false;
            return;
        }
        async function APIcallClient() {
            try {
                await fetch("/client", {
                    method: ["POST"],
                    cache: "no-cache",
                    headers: {
                        content_type: "application/json",
                    },
                    body: JSON.stringify({
                        "X-Cisco-Meraki-API-Key": `${ac.apiKey}`,
                        NET_ID: `${ac.networkID}`,
                        CLIENT_ID: `${clientID}`
                    })
                }).then((response) => {
                    return response.json;
                });
                await fetch("/client", { signal: signal })
                    .then((res) => { return res.json() })
                    .then((client) => {
                        if (client.error) {
                            ac.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                                <span className="glyphicon glyphicon-exclamation-sign"></span>
                                {client.error[0]}
                            </div>)
                        } else {

                            console.log("APIcallClient -> client", client.client)

                        }
                    })

            } catch (err) {
                console.log("This is the error:", err);
            }

        }
        APIcallClient();
        return function cleanup() {
            abortController.abort()
            console.log("cleanup -> abortController APIcallClient")
        }
        // eslint-disable-next-line
    }, [triggerClient]);




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
            size: 300,
            highlightStrokeColor: "blue",
            labelProperty: "name",
            renderLabel: true,
            fontSize: 12,
            highlightFontSize: 14,
            highlightFontWeight: 'bold',
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
        setmodel(modalModel[nodeId])
        setclientID(modalModel[nodeId].id)
        // setmodel(modalModel[`${nodeId}`])

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



    const HandleDevices = (opt) => {
        setdeviceSerial(opt.serial);
        setsourceDeviceName(opt.label)
        setsourceDeviceIp(opt.ipaddress)
        setsourceDeviceMac(opt.mac)
        setsourceDeviceModel(opt.model)
        setisDeviceSelected(true)

    };
    const HandleNodes = (opt) => {
        let index = opt.id + 1
        setmodel(modalModel[index])
        setclientID(modalModel[index].id)
        setswitchTopologyModal(true)



    };

    const dc = {
        data, setdata, switchTopologyModal,
        setswitchTopologyModal, modalModel, setmodalModel,
        model, setmodel, sourceDeviceName
    }

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
                            <div>
                                <Select
                                    className='select-tolopology'
                                    options={NODESLIST}
                                    placeholder='Filter Node'
                                    onChange={HandleNodes}
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
                <button onClick={(e) => settriggerClient(triggerClient + 1)}>CALL CLIENT</button>
                {graph}
                {switchTopologyModal ? (<TopologyModal dc={dc} />) : (<div></div>)}
            </div>
        </div>
    )
}
