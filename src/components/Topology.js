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
    const [sourceDeviceModel, setsourceDeviceModel] = useState([])
    const [graph, setgraph] = useState([])
    const [showFilter, setshowFilter] = useState(false)
    const [modalModel, setmodalModel] = useState([])
    const [VPNModel, setVPNModel] = useState([])
    console.log("Topology -> VPNModel", VPNModel)
    const [ClientModel, setClientModel] = useState([])
    const [model, setmodel] = useState([])
    const [data, setdata] = useState({ 'nodes': [], 'links': [] })
    // const dataVpn = { 'nodes': [], 'links': [] }
    const [dataVpn, setdataVpn] = useState({ 'nodes': [], 'links': [] })
    console.log("Topology -> dataVpn", dataVpn)
    const [nodeslist, setnodeslist] = useState([])
    const [clientID, setclientID] = useState([])
    const [vpnTopology, setvpnTopology] = useState(false)
    const [clientTopology, setclientTopology] = useState(false)


    const firewallSVG = 'https://img.icons8.com/office/52/000000/firewall.png'
    const switchSVG = 'https://img.icons8.com/dusk/64/000000/switch.png'
    const apSVG = 'https://img.icons8.com/plasticine/100/000000/wifi.png'
    const nodeSVG = 'https://img.icons8.com/dusk/48/000000/filled-circle.png'

    const TopologyType = () => {
        ac.setswitchMainTools(true);
        let selectBox = document.getElementById("selectTopology");
        let selectedValue = selectBox.options[selectBox.selectedIndex].value;
        if (selectedValue === "1") {
            setclientTopology(true);
            setvpnTopology(false);
            setgraph([])
            // setclientTopology({ 1: true });
            // setvpnTopology({ 2: false });

        } else if (selectedValue === "2") {
            setvpnTopology(true);
            setclientTopology(false);
            setgraph([])
            // setvpnTopology({ 2: true });
            // setclientTopology({ 1: false });

        }
    };

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
            if (clientTopology) {

                if (isDeviceSelected) {
                    setdata({
                        'nodes': [],
                        'links': []
                    })
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
                                        data.nodes.push({ id: 0, name: sourceDeviceName, size: 700, svg: firewallSVG, x: 70, y: 280 })
                                    }

                                    else if (sourceDeviceModel.startsWith("MS")) {
                                        data.nodes.push({ id: 0, name: sourceDeviceName, size: 700, svg: switchSVG, x: 70, y: 280 })
                                    }
                                    else if (sourceDeviceModel.startsWith("MR")) {
                                        data.nodes.push({ id: 0, name: sourceDeviceName, size: 700, svg: apSVG, x: 70, y: 280 })
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
                                        // let initialx = 856
                                        // let initialy = 117

                                        item.forEach((device, index) => {
                                            let id = index + 1
                                            // let i = 50
                                            // initialy = initialy + i;
                                            data.nodes.push({ id: id, name: device.dhcpHostname, svg: nodeSVG });
                                            // data.nodes.push({ id: id, name: device.dhcpHostname, svg: nodeSVG, x: initialx, y: initialy });
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
                                setmodalModel(modalModel)
                            })
                            .then(() => {
                                setgraph(
                                    <Graph
                                        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                                        data={data}
                                        config={myConfig}
                                        onClickNode={onClickNode}
                                    // onDoubleClickNode={onDoubleClickNode}
                                    // onRightClickNode={onRightClickNode}
                                    // onClickGraph={onClickGraph}
                                    // onClickLink={onClickLink}
                                    // onRightClickLink={onRightClickLink}
                                    // onMouseOverNode={onMouseOverNode}
                                    // onMouseOutNode={onMouseOutNode}
                                    // onMouseOverLink={onMouseOverLink}
                                    // onMouseOutLink={onMouseOutLink}
                                    // onNodePositionChange={onNodePositionChange}
                                    />)
                                setshowFilter(true)
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

            } else if (vpnTopology) {
                let NET_ID_LIST = []
                let NET_NAME_LIST = []
                let VPN_Row = []
                let VPN = []
                ac.combindeNetworksIDList.map(async (item, index) => {
                    NET_ID_LIST.push(item.id)
                    NET_NAME_LIST.push(item.name)
                })
                setloading(true);
                // setdataVpn({
                //     'nodes': [],
                //     'links': []
                // })

                try {
                    await fetch("/site2site", {
                        method: ["POST"],
                        cache: "no-cache",
                        headers: {
                            content_type: "application/json",
                        },
                        body: JSON.stringify({
                            "X-Cisco-Meraki-API-Key": `${ac.apiKey}`,
                            NET_ID_LIST: NET_ID_LIST,
                        })
                    }).then((response) => {
                        return response.json;
                    });
                    await fetch("/site2site", { signal: signal })
                        .then((res) => { return res.json() })
                        .then((site2site) => {
                            if (site2site.error) {
                                ac.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                                    {site2site.error[0]}
                                </div>)
                                setloading(false)
                                return function cleanup() {
                                    abortController.abort()
                                    console.log("cleanup -> abortController")
                                    // setdataVpn({
                                    //     'nodes': [],
                                    //     'links': []
                                    // })
                                }

                            } else {

                                const VPN_OBJ = Object.values(site2site.site2site)
                                VPN_Row.push(VPN_OBJ)


                                VPN_Row.map((item) => {
                                    item.forEach((node, index) => {



                                        if (node.mode === "hub") {
                                            dataVpn.nodes.push({ id: 0, name: NET_NAME_LIST[index], size: 700, svg: firewallSVG })
                                            // dataVpn.links.push({ source: 0, target: index });
                                        } else if (node.mode === "spoke") {
                                            dataVpn.nodes.push({ id: index, name: NET_NAME_LIST[index], svg: nodeSVG });
                                            dataVpn.links.push({ source: 0, target: index });

                                        } else {
                                            console.log('non Meraki VPN');
                                        }

                                        VPNModel.push({
                                            subnets: node.subnets,
                                            mode: node.mode,
                                            name: NET_NAME_LIST[index],
                                            index: index
                                        }
                                        )

                                    })
                                })



                            }
                        })
                        .then(() => {
                            setgraph(
                                <Graph
                                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                                    data={dataVpn}
                                    config={myConfig}
                                    onClickNode={onClickNode}
                                />)
                            setloading(false)
                        })

                } catch (err) {
                    console.log("This is the error:", err)
                    if (err) {
                        return function cleanup() {
                            abortController.abort()
                            console.log("cleanup -> abortController")
                            setloading(false)
                            // setdataVpn({
                            //     'nodes': [],
                            //     'links': []
                            // })
                        }
                    }

                }
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
            // setdataVpn({
            //     'nodes': [],
            //     'links': []
            // })
        }
        // eslint-disable-next-line
    }, [trigger]);








    async function APIcallClient(index) {
        //clearing the ClientModel array to avoid duplicate
        // ClientModel.pop()
        setclientID(modalModel[index].id)

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
                    CLIENT_ID: `${modalModel[index].id}`
                })
            }).then((response) => {
                return response.json;
            });
            await fetch("/client")
                .then((res) => { return res.json() })
                .then((client) => {
                    if (client.error) {
                        setswitchTopologyModal(true)
                        setmodel(modalModel[index])
                    } else {

                        let newmodalModel = Object.assign({}, modalModel[index], {
                            cdp: client.client.cdp,
                            clientVpnConnections: client.client.clientVpnConnections,
                            firstSeen: client.client.firstSeen,
                            ip6: client.client.ip6,
                            lastSeen: client.client.lastSeen,
                            lldp: client.client.lldp,
                            manufacturer: client.client.manufacturer,
                            os: client.client.os,
                            recentDeviceMac: client.client.recentDeviceMac,
                            smInstalled: client.client.smInstalled,
                            ssid: client.client.ssid,
                            status: client.client.status,
                            user: client.client.user,
                            wirelessCapabilities: client.client.wirelessCapabilities
                        })
                        setClientModel(newmodalModel)
                        setmodel(newmodalModel)


                    }
                })
                .then(() => {
                    setswitchTopologyModal(true)
                }

                )

        } catch (err) {
            console.log("This is the error:", err);
        }
    }



    // the graph configuration, you only need to pass down properties
    // that you want to override, otherwise default ones will be used
    const myConfig = {

        nodeHighlightBehavior: true,
        highlightDegree: 2,
        highlightOpacity: 0.2,
        linkHighlightBehavior: true,
        panAndZoom: true,
        height: window.innerHeight,
        // width: window.innerWidth,
        width: 1500,
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
            labelPosition: 'right',

        },
        link: {
            highlightColor: "lightblue",
            highlightFontSize: 8,
            highlightFontWeight: 'normal',
            labelProperty: 'label',
            color: 'lightgray',
            fontColor: 'black',
            fontSize: 8,
            fontWeight: 'normal',
            opacity: 1,
            renderLabel: false,
            semanticStrokeWidth: true,
            strokeWidth: 3,
            markerHeight: 6,
            markerWidth: 6,
        },
    };


    // graph event callbacks
    // const onClickGraph = function () {
    //     console.log(`Clicked the graph background`);

    // };

    const onClickNode = function (nodeId) {
        console.log(`Clicked node ${nodeId}`);
        let index = nodeId
        APIcallClient(index)
    };


    // const onDoubleClickNode = function (nodeId) {
    //     console.log(`Double clicked node ${nodeId}`);
    // };

    // const onRightClickNode = function (event, nodeId) {
    //     console.log(`Right clicked node ${nodeId}`);
    // };

    // const onMouseOverNode = function (nodeId) {
    //     console.log(`Mouse over node ${nodeId}`);

    // };

    // const onMouseOutNode = function (nodeId) {
    //     console.log(`Mouse out node ${nodeId}`);

    // };

    // const onClickLink = function (source, target) {
    //     console.log(`Clicked link between ${source} and ${target}`);
    // };

    // const onRightClickLink = function (event, source, target) {
    //     console.log(`Right clicked link between ${source} and ${target}`);
    // };

    // const onMouseOverLink = function (source, target) {
    //     console.log(`Mouse over in link between ${source} and ${target}`);
    // };

    // const onMouseOutLink = function (source, target) {
    //     console.log(`Mouse out link between ${source} and ${target}`);
    // };

    // const onNodePositionChange = function (nodeId, x, y) {
    //     console.log(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
    // };



    const HandleDevices = (opt) => {
        setdeviceSerial(opt.serial);
        setsourceDeviceName(opt.label)
        setsourceDeviceIp(opt.ipaddress)
        setsourceDeviceMac(opt.mac)
        setsourceDeviceModel(opt.model)
        setisDeviceSelected(true)
        setgraph([])
        setmodalModel([])
        setmodel([])
        setshowFilter(false)

    };
    const HandleNodes = (opt) => {
        let index = opt.id + 1
        APIcallClient(index)
    };





    const LoadTopology = (prevState) => {
        settrigger(trigger + 1)
        setdataVpn((prevState) => ({
            ...prevState,
            'nodes': [], 'links': []

        }));
        // setVPNModel((prevState) => ({
        //     ...prevState,
        //     subnets: '',
        //     mode: '',
        //     name: '',
        //     index: ''


        // }));

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
                                <select
                                    onChange={TopologyType}
                                    id="selectTopology"
                                    className="btn btn-default dropdown-toggle-tools"
                                >
                                    <option className="option-tools-disabled" value="0">
                                        Select Topology
                                            </option>
                                    <option value="1">Client Topology</option>
                                    <option value="2">VPN Topology</option>
                                </select>
                            </div>
                            {clientTopology ? (
                                <div>
                                    <Select
                                        className='select-tolopology'
                                        options={DEVICELIST}
                                        placeholder='Devices'
                                        onChange={HandleDevices}
                                        classNamePrefix="topology"
                                    // onMenuOpen={() => ac.dc.settriggerSelectOrg(ac.dc.triggerSelectOrg + 1)}
                                    />
                                    <div>
                                        {showFilter ? (
                                            <Select
                                                className='select-tolopology'
                                                options={NODESLIST}
                                                placeholder='Filter Node'
                                                onChange={HandleNodes}
                                                classNamePrefix="topology"
                                            />) : (<div></div>)}

                                    </div>
                                </div>
                            ) : (<div></div>)}


                            <button
                                className="btn btn-primary"
                                onClick={!loading ? () => LoadTopology() : null}
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
                        </div>
                    </div>
                </div>
                {graph}
                {switchTopologyModal ? (<TopologyModal dc={dc} />) : (<div></div>)}
            </div>
        </div>
    )
}
