import React, { useEffect, useState, useRef } from "react";
import { Graph } from "react-d3-graph";
import TopologyModal from "./TopologyModal";
import TopologyVPNModal from "./TopologyVPNModal";
import Select from "react-select";
import Tree from "react-d3-tree";
import "react-tree-graph/dist/style.css";
import "../styles/Topology.css";

export default function Topology(ac) {
  const [switchTopologyModal, setswitchTopologyModal] = useState(false);
  const [switchTopologyVPNModal, setswitchTopologyVPNModal] = useState(false);
  const [trigger, settrigger] = useState(1);
  const [loading, setloading] = useState(false);
  const [loadingFilterNode, setloadingFilterNode] = useState(false);
  const [deviceSerial, setdeviceSerial] = useState([]);
  const [sourceDeviceName, setsourceDeviceName] = useState([]);
  const [isDeviceSelected, setisDeviceSelected] = useState(false);
  const [sourceDeviceIp, setsourceDeviceIp] = useState([]);
  const [sourceDeviceMac, setsourceDeviceMac] = useState([]);
  const [sourceDeviceModel, setsourceDeviceModel] = useState([]);
  const [graph, setgraph] = useState([]);
  const [tree, settree] = useState([]);
  const [showFilter, setshowFilter] = useState(false);
  const [showVPNFilter, setshowVPNFilter] = useState(false);
  const [modalModel, setmodalModel] = useState([]);
  let VPNModelInitial = [];
  const [VPNModel, setVPNModel] = useState(VPNModelInitial);
  // eslint-disable-next-line
  const [ClientModel, setClientModel] = useState([]);
  const [model, setmodel] = useState([]);
  const [modelVPN, setmodelVPN] = useState([]);
  const [data, setdata] = useState({ nodes: [], links: [] });
  const [dataVpn, setdataVpn] = useState({ nodes: [], links: [] });
  const [nodeslist, setnodeslist] = useState([]);
  // eslint-disable-next-line
  const [clientID, setclientID] = useState([]);
  const [vpnTopology, setvpnTopology] = useState(false);
  const [clientTopology, setclientTopology] = useState(false);
  const [switchGraph, setswitchGraph] = useState("Fluid");
  const [switchRadioCheck, setswitchRadioCheck] = useState(true);
  const [myTreeData, setmyTreeData] = useState([]);
  const [myVPNTreeData, setmyVPNTreeData] = useState([]);
  const [nodeListID, setnodeListID] = useState([]);
  const [nodeVPNListID, setnodeVPNListID] = useState([]);

  const firewallSVG = "https://img.icons8.com/office/52/000000/firewall.png";
  const switchSVG = "https://img.icons8.com/dusk/64/000000/switch.png";
  const apSVG = "https://img.icons8.com/plasticine/100/000000/wifi.png";
  const nodeSVG = "https://img.icons8.com/dusk/48/000000/filled-circle.png";
  const nonVPNnode =
    "https://img.icons8.com/emoji/48/000000/red-circle-emoji.png";

  const nodeSvgShape = {
    shape: "circle",
    shapeProps: {
      r: 10,
      fill: "#67b346",
    },
  };

  const DEVICELIST = ac.deviceList.map((opt, index) => ({
    label: opt.name,
    value: index,
    id: opt.id,
    serial: opt.serial,
    ipaddress: opt.lanIp,
    mac: opt.mac,
    model: opt.model,
  }));

  const NODESLIST = nodeslist.map((opt, index) => ({
    label: opt.dhcpHostname,
    id: index,
  }));

  const VPNNODESLIST = dataVpn.nodes.map((opt, index) => ({
    label: opt.name,
    id: index,
  }));

  const topology_list = [
    { topology: "Client Topology" },
    { topology: "VPN Topology" },
  ];

  const TOPOLOGYLIST = topology_list.map((opt, index) => ({
    label: opt.topology,
    index: index,
  }));

  const TopologyType = (opt) => {
    ac.setflashMessages([]);
    ac.setswitchMainTools(true);
    if (opt.index === 0) {
      setclientTopology(true);
      setvpnTopology(false);
      setgraph([]);
    } else if (opt.index === 1) {
      setvpnTopology(true);
      setclientTopology(false);
      setgraph([]);
    }
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    async function APIcall() {
      if (clientTopology) {
        if (isDeviceSelected) {
          setdata({
            nodes: [],
            links: [],
          });
          setmyTreeData([]);
          setmodalModel([]);
          setloading(true);
          let Device_Row = [];
          try {
            await fetch("/flask/device_clients", {
              method: ["POST"],
              cache: "no-cache",
              headers: {
                content_type: "application/json",
              },
              body: JSON.stringify({
                "X-Cisco-Meraki-API-Key": `${ac.apiKey}`,
                NET_ID: `${ac.networkID}`,
                SERIAL_NUM: `${deviceSerial}`,
              }),
            }).then((response) => {
              return response.json;
            });
            await fetch("/flask/device_clients", { signal: signal })
              .then((res) => {
                return res.json();
              })
              .then((device_clients) => {
                if (device_clients.error) {
                  ac.setflashMessages(
                    <div className="form-input-error-msg alert alert-danger">
                      <span className="glyphicon glyphicon-exclamation-sign"></span>
                      {device_clients.error[0]}
                    </div>
                  );
                } else {
                  const DEVICE_OBJ = Object.values(
                    device_clients.device_clients
                  );
                  setnodeslist(device_clients.device_clients);
                  Device_Row.push(DEVICE_OBJ);

                  //push source nodes
                  if (
                    sourceDeviceModel.startsWith("MX") ||
                    sourceDeviceModel.startsWith("Z")
                  ) {
                    data.nodes.push({
                      id: 0,
                      name: sourceDeviceName,
                      size: 700,
                      svg: firewallSVG,
                      x: 70,
                      y: 280,
                    });
                  } else if (sourceDeviceModel.startsWith("MS")) {
                    data.nodes.push({
                      id: 0,
                      name: sourceDeviceName,
                      size: 700,
                      svg: switchSVG,
                      x: 70,
                      y: 280,
                    });
                  } else if (sourceDeviceModel.startsWith("MR")) {
                    data.nodes.push({
                      id: 0,
                      name: sourceDeviceName,
                      size: 700,
                      svg: apSVG,
                      x: 70,
                      y: 280,
                    });
                  }

                  // data.nodes.push({ id: 0, name: sourceDeviceName, svg: firewallSVG });
                  modalModel.push({
                    description: sourceDeviceName,
                    name: sourceDeviceName,
                    ipaddress: sourceDeviceIp,
                    mac: sourceDeviceMac,
                    id: "",
                    mdnsName: "",
                    switchport: "",
                    vlan: "",
                    usage: "",
                    index: 0,
                  });

                  myTreeData.push({
                    name: sourceDeviceName,
                    children: [],
                    nodeData: modalModel[0],
                  });

                  //push nodes connected to source node
                  // eslint-disable-next-line
                  Device_Row.map((item) => {
                    item.forEach((device, index) => {
                      let id = index + 1;
                      if (device.dhcpHostname !== null) {
                        data.nodes.push({
                          id: id,
                          name: device.dhcpHostname,
                          svg: nodeSVG,
                        });
                      } else {
                        data.nodes.push({
                          id: id,
                          name: device.mac,
                          svg: nodeSVG,
                        });
                      }
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
                        usage: {
                          recv: device.usage.recv,
                          sent: device.usage.sent,
                        },
                        index: id,
                      });
                      if (device.dhcpHostname !== null) {
                        myTreeData[0].children.push({
                          name: device.dhcpHostname,
                          nodeData: modalModel[id],
                        });
                      } else {
                        myTreeData[0].children.push({
                          name: device.mac,
                          nodeData: modalModel[id],
                        });
                      }
                    });
                  });
                }
                setmodalModel(modalModel);
              })
              .then(() => {
                setgraph(
                  <div className="graph-id">
                    <Graph
                      id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                      data={data}
                      config={myConfig}
                      onClickNode={onClickNode}
                    />
                  </div>
                );
                settree(
                  <div
                    id="treeWrapper"
                    style={{ width: "100%", height: "969px" }}
                    className="custom-tree"
                  >
                    <Tree
                      data={myTreeData}
                      nodeSize={{ x: 750, y: 200 }}
                      nodeSvgShape={nodeSvgShape}
                      separation={{ siblings: 0.07, nonSiblings: 0.07 }}
                      translate={{ x: 700, y: 50 }}
                      collapsible={false}
                      onClick={onClickNodeTree}
                      orientation={"vertical"}
                      textLayout={{
                        textAnchor: "start",
                        x: 10,
                        y: -10,
                        transform: "rotate(90)",
                      }}
                      pathFunc={"straight"}
                      scaleExtent={{ min: 0.1, max: 2.1 }}
                    />
                  </div>
                );
                setshowFilter(true);
                setloading(false);
              });
          } catch (err) {
            console.log("This is the error:", err);
            setloading(false);
          }
        } else {
          ac.setswitchAlertModal(true);
          ac.setAlertModalError("Please select device.");
          ac.setswitchToolsTemplate(false);
        }
      } else if (vpnTopology) {
        if (ac.isOrgSelected) {
          let NET_ID_LIST = [];
          let NET_NAME_LIST = [];
          let VPN_Row = [];
          ac.combindeNetworksIDList.map(async (item, index) => {
            NET_ID_LIST.push(item.id);
            NET_NAME_LIST.push(item.name);
          });
          setloading(true);

          try {
            await fetch("/flask/site2site", {
              method: ["POST"],
              cache: "no-cache",
              headers: {
                content_type: "application/json",
              },
              body: JSON.stringify({
                "X-Cisco-Meraki-API-Key": `${ac.apiKey}`,
                NET_ID_LIST: NET_ID_LIST,
              }),
            }).then((response) => {
              return response.json;
            });
            await fetch("/flask/site2site", { signal: signal })
              .then((res) => {
                return res.json();
              })
              .then((site2site) => {
                if (site2site.error) {
                  ac.setflashMessages(
                    <div className="form-input-error-msg alert alert-danger">
                      <span className="glyphicon glyphicon-exclamation-sign"></span>
                      {site2site.error[0]}
                    </div>
                  );
                  setloading(false);
                  return function cleanup() {
                    abortController.abort();
                  };
                } else {
                  const VPN_OBJ = Object.values(site2site.site2site);
                  VPN_Row.push(VPN_OBJ);

                  //initialize tree array
                  myVPNTreeData.push({ name: "", nodeData: "", children: [] });

                  // eslint-disable-next-line
                  VPN_Row.map((item, x) => {
                    item.forEach((node, index) => {
                      if (node.mode === "hub") {
                        dataVpn.nodes.push({
                          id: 0,
                          name: NET_NAME_LIST[index],
                          size: 700,
                          svg: firewallSVG,
                          label: "label text",
                        });
                        VPNModel.push({
                          subnets: node.subnets,
                          mode: node.mode,
                          name: NET_NAME_LIST[index],
                          index: index,
                        });
                        myVPNTreeData[0].name = NET_NAME_LIST[index];
                        myVPNTreeData[0].nodeData = VPNModel[index];
                      } else if (node.mode === "spoke") {
                        dataVpn.nodes.push({
                          id: index,
                          name: NET_NAME_LIST[index],
                          svg: nodeSVG,
                          label: "label text",
                        });
                        dataVpn.links.push({
                          source: 0,
                          target: index,
                          label: "label text",
                        });
                        VPNModel.push({
                          subnets: node.subnets,
                          mode: node.mode,
                          name: NET_NAME_LIST[index],
                          index: index,
                        });
                        myVPNTreeData[0].children.push({
                          name: NET_NAME_LIST[index],
                          nodeData: VPNModel[index],
                        });
                      } else {
                        dataVpn.nodes.push({
                          id: index,
                          name: NET_NAME_LIST[index],
                          svg: nonVPNnode,
                          label: "label text",
                        });
                        dataVpn.links.push({
                          source: 0,
                          target: index,
                          label: "label text",
                        });
                        VPNModel.push({
                          subnets: [],
                          mode: [],
                          name: NET_NAME_LIST[index],
                          index: index,
                        });
                        myVPNTreeData[0].children.push({
                          name: NET_NAME_LIST[index],
                          nodeSvgShape: {
                            shape: "circle",
                            shapeProps: { r: 10, fill: "red" },
                          },
                          nodeData: VPNModel[index],
                        });
                      }
                    });
                  });
                }
              })
              .then(() => {
                if (dataVpn.nodes.length !== 0) {
                  setgraph(
                    <div className="graph-id">
                      <Graph
                        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                        data={dataVpn}
                        config={myConfig}
                        onClickNode={onClickNodeVPN}
                      />
                    </div>
                  );
                  settree(
                    <div
                      id="treeWrapper"
                      style={{ width: "100%", height: "969px" }}
                      className="custom-tree"
                    >
                      <Tree
                        data={myVPNTreeData}
                        nodeSize={{ x: 750, y: 200 }}
                        nodeSvgShape={nodeSvgShape}
                        separation={{ siblings: 0.07, nonSiblings: 0.07 }}
                        translate={{ x: 700, y: 50 }}
                        collapsible={false}
                        onClick={onClickVPNNodeTree}
                        orientation={"vertical"}
                        textLayout={{
                          textAnchor: "start",
                          x: 10,
                          y: -10,
                          transform: "rotate(90)",
                        }}
                        pathFunc={"straight"}
                        scaleExtent={{ min: 0.1, max: 2.1 }}
                      />
                    </div>
                  );
                  setloading(false);
                  setshowVPNFilter(true);
                } else {
                  setloading(false);
                  ac.setflashMessages(
                    <div className="form-input-error-msg alert alert-danger">
                      <span className="glyphicon glyphicon-exclamation-sign"></span>
                      No available VPN nodes in this Organization
                    </div>
                  );
                }
              });
          } catch (err) {
            console.log("This is the error:", err);
            setloading(false);
            if (err) {
              return function cleanup() {
                abortController.abort();
              };
            }
          }
        } else {
          ac.setswitchAlertModal(true);
          ac.setAlertModalError("Please select Organization.");
          ac.setswitchToolsTemplate(false);
        }
      }
    }
    APIcall();
    return function cleanup() {
      abortController.abort();
      setloading(false);
      setdata({
        nodes: [],
        links: [],
      });
    };
    // eslint-disable-next-line
  }, [trigger]);

  async function APIcallClient(index) {
    setloadingFilterNode(true);
    //clearing the ClientModel array to avoid duplicate
    setclientID(modalModel[index].id);
    try {
      await fetch("/flask/client", {
        method: ["POST"],
        cache: "no-cache",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify({
          "X-Cisco-Meraki-API-Key": `${ac.apiKey}`,
          NET_ID: `${ac.networkID}`,
          CLIENT_ID: `${modalModel[index].id}`,
        }),
      }).then((response) => {
        return response.json;
      });
      await fetch("/flask/client")
        .then((res) => {
          return res.json();
        })
        .then((client) => {
          if (client.error) {
            setloadingFilterNode(false);
            setswitchTopologyModal(true);
            setmodel(modalModel[index]);
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
              wirelessCapabilities: client.client.wirelessCapabilities,
            });
            setClientModel(newmodalModel);
            setmodel(newmodalModel);
          }
        })
        .then(() => {
          setloadingFilterNode(false);
          setswitchTopologyModal(true);
        });
    } catch (err) {
      console.log("This is the error:", err);
      setloadingFilterNode(false);
      ac.setflashMessages(
        <div className="form-input-error-msg alert alert-danger">
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          Not a valid Client
        </div>
      );
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
    width: window.innerWidth,
    // width: 2000,
    d3: {
      alphaTarget: 0.05,
      gravity: -400,
      // linkLength: 300,
      linkStrength: 1,
      disableLinkForce: false,
    },
    node: {
      color: "lightgreen",
      size: 300,
      highlightStrokeColor: "blue",
      labelProperty: "name",
      renderLabel: true,
      fontSize: 12,
      highlightFontSize: 14,
      highlightFontWeight: "bold",
      labelPosition: "right",
    },
    link: {
      highlightColor: "lightblue",
      highlightFontSize: 8,
      highlightFontWeight: "normal",
      labelProperty: "label",
      color: "lightgray",
      fontColor: "black",
      fontSize: 8,
      fontWeight: "normal",
      opacity: 1,
      renderLabel: false,
      semanticStrokeWidth: true,
      strokeWidth: 3,
      markerHeight: 6,
      markerWidth: 6,
    },
  };

  const onClickNodeTree = (nodeData) => {
    let index = nodeData.nodeData.index;
    APIcallClient(index);
    ac.setflashMessages([]);
  };

  const onClickVPNNodeTree = (nodeData) => {
    let index = nodeData.nodeData.index;
    setmodelVPN(VPNModel[index]);
    setnodeVPNListID(index);
    setswitchTopologyVPNModal(true);
    ac.setflashMessages([]);
  };

  const onClickNode = function (nodeId) {
    let index = nodeId;
    APIcallClient(index);
    setnodeListID(index);
    ac.setflashMessages([]);
  };

  const onClickNodeVPN = function (nodeId) {
    setmodelVPN(VPNModel[nodeId]);
    setnodeVPNListID(nodeId);
    setswitchTopologyVPNModal(true);
    ac.setflashMessages([]);
  };

  const HandleDevices = (opt) => {
    setdeviceSerial(opt.serial);
    setsourceDeviceName(opt.label);
    setsourceDeviceIp(opt.ipaddress);
    setsourceDeviceMac(opt.mac);
    setsourceDeviceModel(opt.model);
    setisDeviceSelected(true);
    setgraph([]);
    settree([]);
    setmodalModel([]);
    setmodel([]);
    setshowFilter(false);
    setmyTreeData([]);
  };

  const HandleNodes = (opt) => {
    let index = opt.id + 1;
    APIcallClient(index);
    setnodeListID(index);
  };

  const HandleVPNNodes = (opt) => {
    onClickNodeVPN(opt.id);
    setnodeVPNListID(opt.id);
  };

  const LoadTopology = (prevState, id) => {
    settrigger(trigger + 1);
    setmodalModel([]);
    setdataVpn((prevState) => ({
      ...prevState,
      nodes: [],
      links: [],
    }));
    setmyVPNTreeData([]);
    const newList = VPNModel.filter((item) => item.id !== id);
    setVPNModel(newList);
    setshowVPNFilter(false);
    ac.setflashMessages([]);
  };

  const dc = {
    data,
    setdata,
    switchTopologyModal,
    setswitchTopologyModal,
    modalModel,
    setmodalModel,
    model,
    setmodel,
    sourceDeviceName,
    VPNModel,
    setVPNModel,
    switchTopologyVPNModal,
    setswitchTopologyVPNModal,
    modelVPN,
    setmodelVPN,
    APIcallClient,
    nodeslist,
    setnodeslist,
    NODESLIST,
    nodeListID,
    setnodeListID,
    nodeVPNListID,
    setnodeVPNListID,
    dataVpn,
  };

  return (
    <div
      id="page-inner-tool-templates"
      style={{ margin: "-65px 20px 10px 0px" }}
    >
      <div>{ac.flashMessages && <span>{ac.flashMessages}</span>}</div>
      <div className="row">
        <div>
          <div className="col-xs-12">
            <div className="panel panel-default">
              <div className="panel-body" style={{ height: "85px" }}>
                <div className="panel-group" id="accordion">
                  <div
                    className="panel-heading"
                    style={{ padding: "0px 0px 0px" }}
                  >
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseOne"
                      className="collapsed"
                      style={{ float: "right" }}
                    >
                      <span className="glyphicon glyphicon-circle-arrow-down"></span>
                    </a>
                    <Select
                      className="select-tolopology"
                      options={TOPOLOGYLIST}
                      placeholder="Select Topology"
                      onChange={TopologyType}
                      classNamePrefix="topology"
                    />
                  </div>
                </div>
              </div>
              <div id="collapseOne" className="panel-collapse">
                <div className="panel-body">
                  {vpnTopology ? (
                    <div>
                      <div>
                        {showVPNFilter ? (
                          <div>
                            <div>
                              <Select
                                className="select-tolopology"
                                options={VPNNODESLIST}
                                placeholder="Filter Node"
                                onChange={HandleVPNNodes}
                                classNamePrefix="topology"
                                isLoading={loadingFilterNode}
                              />
                              <label className="radio-inline">
                                <input
                                  checked={switchRadioCheck}
                                  onChange={() => {
                                    setswitchGraph("Fluid");
                                    setswitchRadioCheck(!switchRadioCheck);
                                  }}
                                  type="radio"
                                  name="survey"
                                  id="Radios1"
                                  value="Fluid"
                                />
                                Fluid
                              </label>
                              <label className="radio-inline">
                                <input
                                  checked={!switchRadioCheck}
                                  onChange={() => {
                                    setswitchGraph("Tree");
                                    setswitchRadioCheck(!switchRadioCheck);
                                  }}
                                  type="radio"
                                  name="survey"
                                  id="Radios2"
                                  value="Tree"
                                />
                                Tree
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {clientTopology ? (
                    <div>
                      <Select
                        className="select-tolopology"
                        options={DEVICELIST}
                        placeholder="Devices"
                        onChange={HandleDevices}
                        classNamePrefix="topology"
                      />
                      <div>
                        {showFilter ? (
                          <div>
                            <Select
                              className="select-tolopology"
                              options={NODESLIST}
                              placeholder="Filter Node"
                              onChange={HandleNodes}
                              classNamePrefix="topology"
                              isLoading={loadingFilterNode}
                            />
                            <label className="radio-inline">
                              <input
                                checked={switchRadioCheck}
                                onChange={() => {
                                  setswitchGraph("Fluid");
                                  setswitchRadioCheck(!switchRadioCheck);
                                }}
                                type="radio"
                                name="survey"
                                id="Radios1"
                                value="Fluid"
                              />
                              Fluid
                            </label>
                            <label className="radio-inline">
                              <input
                                checked={!switchRadioCheck}
                                onChange={() => {
                                  setswitchGraph("Tree");
                                  setswitchRadioCheck(!switchRadioCheck);
                                }}
                                type="radio"
                                name="survey"
                                id="Radios2"
                                value="Tree"
                              />
                              Tree
                            </label>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}

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
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        {switchGraph === "Tree" ? tree : graph}
        {switchTopologyModal ? <TopologyModal dc={dc} /> : <div></div>}
        {switchTopologyVPNModal ? <TopologyVPNModal dc={dc} /> : <div></div>}
      </div>
    </div>
  );
}
