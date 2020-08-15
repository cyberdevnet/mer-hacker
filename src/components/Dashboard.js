import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { MDBDataTableV5 } from "mdbreact";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryArea, VictoryLabel, VictoryTooltip } from "victory";

// import Template from './Template'
import "../styles/Dashboard.css";

export default function Dashboard(ac) {
  const [showtable, setshowtable] = useState(true);
  const [mapRows, setmapRows] = useState([]);

  // eslint-disable-next-line
  const [deviceStatusData, setdeviceStatusData] = useState([
    { id: 1, device_count: 5, fill: "#f36a5a", label: 5 },
    { id: 2, device_count: 10, fill: "#FABE28", label: 10 },
    { id: 3, device_count: 20, fill: "#1ABC9C", label: 20 },
  ])
  // eslint-disable-next-line
  const [deviceTypeData, setdeviceTypeData] = useState([
    { id: 1, device_type: 5, fill: "#f36a5a", label: 5 },
    { id: 2, device_type: 10, fill: "#FABE28", label: 10 },
    { id: 3, device_type: 20, fill: "#1ABC9C", label: 20 },
  ])
  // eslint-disable-next-line
  const [UplinkLatencyData, setUplinkLatencyData] = useState([{ x: '1min', y: 10 }, { x: '2min', y: 15 }, { x: '3min', y: 89 }, { x: '4min', y: 67 }, { x: '5min', y: 43 }])
  // eslint-disable-next-line
  const [UplinkLossData, setUplinkLossData] = useState([{ x: '1min', y: 56 }, { x: '2min', y: 43 }, { x: '3min', y: 4 }, { x: '4min', y: 59 }, { x: '5min', y: 15 }])



  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${ac.apiKey}`,
    organizationId: `${ac.organizationID}`,
    NET_ID: `${ac.networkID}`,
  };


  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    async function callDevices() {

      if (ac.organizationID !== 0 && ac.networkID !== 0) {
        try {
          fetch("/flask/devices", {
            method: ["POST"],
            cache: "no-cache",
            headers: {
              content_type: "application/json",
            },
            body: JSON.stringify(APIbody),
          }).then((response) => {
            return response.json;
          });
          fetch("/flask/devices", { signal: signal })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                ac.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error[0]}
                </div>)
              } else {
                ac.setdeviceList(data.devices);
                ac.settotalDevices(data.devices.length);

                let ModelObj = {};
                for (var x = 0; x < data.devices.length; x++) {
                  ModelObj[x] = data.devices[x].model;
                }

                const MODELOBJ = Object.values(ModelObj);
                let Firewalls = [];
                let Switches = [];
                let AccessPoint = [];
                for (var z = 0; z < data.devices.length; z++) {
                  if (MODELOBJ[z].startsWith("MX") || MODELOBJ[z].startsWith("Z")) {
                    Firewalls.push(MODELOBJ[z]);
                  } else if (MODELOBJ[z].startsWith("MS")) {
                    Switches.push(MODELOBJ[z]);
                  } else if (MODELOBJ[z].startsWith("MR")) {
                    AccessPoint.push(MODELOBJ[z]);
                  }
                }

                //Find index of specific object using findIndex method.    
                const objID1 = deviceTypeData.findIndex((obj => obj.id === 1));
                const objID2 = deviceTypeData.findIndex((obj => obj.id === 2));
                const objID3 = deviceTypeData.findIndex((obj => obj.id === 3));

                //Update object's count property.
                deviceTypeData[objID1].device_type = Firewalls.length
                deviceTypeData[objID2].device_type = Switches.length
                deviceTypeData[objID3].device_type = AccessPoint.length
                deviceTypeData[objID1].label = Firewalls.length
                deviceTypeData[objID2].label = Switches.length
                deviceTypeData[objID3].label = AccessPoint.length
              }
            })

        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      } else {
        return function cleanup() {
          abortController.abort()
        }
      }


    }
    callDevices();
    return function cleanup() {
      abortController.abort()

    }
    // eslint-disable-next-line
  }, [ac.networkID]);


  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    async function callDeviceStatus() {

      if (ac.organizationID !== 0) {
        try {
          fetch("/flask/device_status", {
            method: ["POST"],
            cache: "no-cache",
            headers: {
              content_type: "application/json",
            },
            body: JSON.stringify(APIbody),
          }).then((response) => {
            return response.json;
          });
          fetch("/flask/device_status", { signal: signal })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                ac.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error[0]}
                </div>)
              } else {

                ac.setdeviceStatusList(data.deviceStatus);
                ac.settotaldeviceStatusList(data.deviceStatus.length);

                let DeviceStatusobjects = {};
                let DeviceListobjects = {};
                for (var x = 0; x < data.deviceStatus.length; x++) {
                  DeviceStatusobjects[x] = data.deviceStatus[x].status;
                  DeviceListobjects[x] = data.deviceStatus[x];
                }
                const DEVICEOBJ = Object.values(DeviceStatusobjects);
                const DEVICELISTOBJ = Object.values(DeviceListobjects);

                let OnlineObj = [];
                let OfflineObj = [];
                let AlertingObj = [];
                for (var y = 0; y < data.deviceStatus.length; y++) {
                  if (DEVICEOBJ[y] === "online") {
                    OnlineObj.push(DEVICEOBJ[y]);
                  } else if (DEVICEOBJ[y] === "offline") {
                    OfflineObj.push(DEVICEOBJ[y]);
                  } else if (DEVICEOBJ[y] === "alerting") {
                    AlertingObj.push(DEVICEOBJ[y]);
                  }
                }


                //Find index of specific object using findIndex method.    
                const objID1 = deviceStatusData.findIndex((obj => obj.id === 1));
                const objID2 = deviceStatusData.findIndex((obj => obj.id === 2));
                const objID3 = deviceStatusData.findIndex((obj => obj.id === 3));

                //Update object's count property.
                deviceStatusData[objID1].device_count = AlertingObj.length
                deviceStatusData[objID2].device_count = OfflineObj.length
                deviceStatusData[objID3].device_count = OnlineObj.length
                deviceStatusData[objID1].label = AlertingObj.length
                deviceStatusData[objID2].label = OfflineObj.length
                deviceStatusData[objID3].label = OnlineObj.length

                //devices list table

                let row = [];
                // eslint-disable-next-line
                DEVICELISTOBJ.map((item) => {
                  if (item.usingCellularFailover) {
                    row.push({
                      name: item.name,
                      status: item.status,
                      lanIp: item.lanIp,
                      publicIp: item.publicIp,
                      wan1Ip: item.wan1Ip,
                      wan2Ip: item.wan2Ip,
                      serial: item.serial,
                      usingCellularFailover: <span className="glyphicon glyphicon-check" style={{ color: '#1ABC9C' }}></span>
                    })
                  } else {
                    row.push({
                      name: item.name,
                      status: item.status,
                      lanIp: item.lanIp,
                      publicIp: item.publicIp,
                      wan1Ip: item.wan1Ip,
                      wan2Ip: item.wan2Ip,
                      serial: item.serial,
                    })
                  }
                  setmapRows(row);
                });
                setshowtable(true);

              }
            })

        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      } else {
        return function cleanup() {

          abortController.abort()
        }
      }
    }
    callDeviceStatus();
    return function cleanup() {
      abortController.abort()
    }
    // eslint-disable-next-line
  }, [ac.organizationID]);



  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    let interval = null;
    async function UplinkStatus() {

      if (ac.organizationID !== 0 && ac.networkID !== 0) {
        try {
          fetch("/flask/uplink_loss", {
            method: ["POST"],
            cache: "no-cache",
            headers: {
              content_type: "application/json",
            },
            body: JSON.stringify(APIbody),
          }).then((response) => {
            return response.json;
          });
          fetch("/flask/uplink_loss", { signal: signal })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                ac.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error[0]}
                </div>)
              } else {

                try {
                  var UplinkLossNetObj = data.uplinkLoss.filter(function (obj) {
                    return obj.networkId === ac.networkID;
                  })[0];



                  const UPLINKOBJ = Object.values(UplinkLossNetObj.timeSeries);
                  let latencyMs = [];
                  let lossPercent = [];
                  let ts = [];
                  let UplinkSeries = {}


                  for (var y = 0; y < UplinkLossNetObj.timeSeries.length; y++) {
                    UplinkSeries[y] = UPLINKOBJ[y]
                    latencyMs.push(UplinkSeries[y].latencyMs);
                    lossPercent.push(UplinkSeries[y].lossPercent);
                    ts.push(UplinkSeries[y].ts);
                  }

                  //Find index of specific object using findIndex method.    
                  const objID1 = UplinkLatencyData.findIndex((obj => obj.x === '1min'));
                  const objID2 = UplinkLatencyData.findIndex((obj => obj.x === '2min'));
                  const objID3 = UplinkLatencyData.findIndex((obj => obj.x === '3min'));
                  const objID4 = UplinkLatencyData.findIndex((obj => obj.x === '4min'));
                  const objID5 = UplinkLatencyData.findIndex((obj => obj.x === '5min'));

                  //Update object's count property.
                  UplinkLatencyData[objID1].y = latencyMs[0]
                  UplinkLatencyData[objID2].y = latencyMs[1]
                  UplinkLatencyData[objID3].y = latencyMs[2]
                  UplinkLatencyData[objID4].y = latencyMs[3]
                  UplinkLatencyData[objID5].y = latencyMs[4]


                  const obj2ID1 = UplinkLossData.findIndex((obj => obj.x === '1min'));
                  const obj2ID2 = UplinkLossData.findIndex((obj => obj.x === '2min'));
                  const objI2D3 = UplinkLossData.findIndex((obj => obj.x === '3min'));
                  const obj2ID4 = UplinkLossData.findIndex((obj => obj.x === '4min'));
                  const obj2ID5 = UplinkLossData.findIndex((obj => obj.x === '5min'));

                  //Update object's count property.
                  UplinkLossData[obj2ID1].y = lossPercent[0]
                  UplinkLossData[obj2ID2].y = lossPercent[1]
                  UplinkLossData[objI2D3].y = lossPercent[2]
                  UplinkLossData[obj2ID4].y = lossPercent[3]
                  UplinkLossData[obj2ID5].y = lossPercent[4]

                }
                catch (err) {
                  if (err) {
                    console.log(err);
                  }
                }
              }
            })
            .catch(err => {
              if (err.name === 'AbortError') return
              throw err.name
            })
        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      } else {
        return function cleanup() {
          abortController.abort()
          clearInterval(interval)

        }
      }


      interval = setTimeout(() => {
        UplinkStatus()
      }, 300000);

    }
    UplinkStatus();
    return function cleanup() {
      abortController.abort()
      clearInterval(interval)

    }
    // eslint-disable-next-line
  }, [ac.networkID]);



  const datatable = {
    columns: [
      {
        label: "Name",
        field: "name",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Description",
        },
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 270,
      },
      {
        label: "Lan IP",
        field: "lanIp",
        sort: "asc",
        width: 100,
      },
      {
        label: "Public IP",
        field: "publicIp",
        sort: "asc",
        width: 100,
      },
      {
        label: "WAN 1",
        field: "wan1Ip",
        sort: "asc",
        width: 100,
      },
      {
        label: "WAN 2",
        field: "wan2Ip",
        sort: "asc",
        width: 100,
      },
      {
        label: "Cellular",
        field: "usingCellularFailover",
        sort: "asc",
        width: 100,
      },
      {
        label: "Serial",
        field: "serial",
        sort: "asc",
        width: 100,
      },
    ],
    rows: mapRows,
  };


  return (
    <div id="page-inner">
      <div>{ac.flashMessages && <span>{ac.flashMessages}</span>}</div>
      <div className="row">
        <div className="col-md-3 col-sm-12 col-xs-12">
          <div className="board">
            <div className="panel panel-primary">
              <div className="number">
                <h3 className="h3-dashboard">{ac.organization}</h3>
                <small>Organization</small>
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
                <h3 className="h3-dashboard">{ac.networkList.length}</h3>
                <small>Total Networks</small>
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
                <h3 className="h3-dashboard">{ac.totaldeviceStatusList}</h3>
                <small>Total Organization Devices</small>
              </div>
              <div className="icon">
                <i className="fa fa-server fa-5x yellow"></i>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="row justify-content-center">
        <div className="col-md-6" style={{ width: '30%', marginRight: "35px", float: 'right' }}>
          <div className="mixed-chart" >
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={1}


            >
              <VictoryLabel text="Latency/Loss" x={180} y={25} textAnchor="middle" style={{ fontWeight: '600', color: '#AAB5BC', textTransform: 'uppercase', fontSize: 12, fontFamily: 'Open Sans, sans-serif' }} />
              <VictoryStack
                colorScale={["#FABE28", "#1ABC9C"]}
              >
                <VictoryArea
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                  interpolation="natural"
                  data={UplinkLossData}
                />
                <VictoryArea
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                  interpolation="natural"
                  data={UplinkLatencyData}
                />
              </VictoryStack>
            </VictoryChart>

          </div>
        </div>
        <div className="col-md-6" style={{ width: '30%', marginRight: "35px", float: 'right' }}>
          <div className="mixed-chart" >
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={20}
            >
              <VictoryLabel text="Network Devices" x={180} y={25} textAnchor="middle" style={{ fontWeight: '600', color: '#AAB5BC', textTransform: 'uppercase', fontSize: 12, fontFamily: 'Open Sans, sans-serif' }} />
              <VictoryAxis
                tickValues={[1, 2, 3]}
                tickFormat={["Firewalls", "Switches", "Access Points"]}
                style={{ tickLabels: { fontWeight: '600', color: '#AAB5BC', textTransform: 'uppercase', fontSize: 12, fontFamily: 'Open Sans, sans-serif' } }}

              />
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => (x)}
              />
              <VictoryBar
                labelComponent={<VictoryTooltip />}
                style={{
                  data: {
                    fill: ({ datum }) => datum.fill, width: 35
                  }
                }}
                data={deviceTypeData}
                x="id"
                y="device_type"
              />
            </VictoryChart>
          </div>
        </div>
        <div className="col-md-6" style={{ width: '30%', marginRight: "35px", float: 'right' }}>
          <div className="mixed-chart" >
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={20}>

              <VictoryLabel text="Total Devices" x={180} y={25} textAnchor="middle" style={{ fontWeight: '600', color: '#AAB5BC', textTransform: 'uppercase', fontSize: 12, fontFamily: 'Open Sans, sans-serif' }} />
              <VictoryAxis
                tickValues={[1, 2, 3]}
                tickFormat={["Alerting", "Offline", "Online"]}
                style={{ tickLabels: { fontWeight: '600', color: '#AAB5BC', textTransform: 'uppercase', fontSize: 12, fontFamily: 'Open Sans, sans-serif' } }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => (x)}
              />
              <VictoryBar
                labelComponent={<VictoryTooltip />}
                style={{
                  data: {
                    fill: ({ datum }) => datum.fill, width: 35
                  }
                }}
                data={deviceStatusData}
                x="id"
                y="device_count"
              />
            </VictoryChart>
          </div>
        </div>
      </div>

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
                <h3 className="h3-dashboard">{ac.totalHosts}</h3>
                <small>Clients Online</small>
              </div>
              <div className="icon">
                <i className="fa fa-users blue"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 col-xs-12">
          <div className="board">
            <div className="panel panel-primary">
              <div className="number">
                <h3 className="h3-dashboard">{ac.networkID}</h3>
                <small>Network ID</small>
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
                <h3 className="h3-dashboard">{ac.totalDevices}</h3>
                <small>Total Network Devices</small>
              </div>
              <div className="icon">
                <i className="fa fa-server fa-5x yellow"></i>
              </div>
            </div>
          </div>
        </div>

      </div>


      <div className="row-inventory">
        <div className="board">
          <div className="panel panel-primary">
            <div className="number">
              <small>Devices Inventory</small>
            </div>
            <div className="icon">
              <i className="fa fa-server fa-5x yellow"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            {showtable ? (
              <div className="panel-body">
                <CSVLink data={mapRows} separator={";"}>Download cvs</CSVLink>
                <MDBDataTableV5
                  hover
                  striped
                  small
                  data={datatable}
                  paging={false}
                  searchTop
                  searchBottom={false}
                  exportToCSV={true}
                />
              </div>
            ) : (
                <div></div>
              )}
          </div>
        </div>
      </div>


      <footer>
        <p>
          All right reserved. Created by cyberdevnet
        </p>
      </footer>
    </div>

  );
}
