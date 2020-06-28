import React, { useState, useRef, useEffect } from "react";
import Chart from "react-apexcharts";
import "../styles/Dashboard.css";

export default function Dashboard(ac) {
  // eslint-disable-next-line
  const [chart, setchart] = useState({
    options: {
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Alerting", "Offline", "Online"],
      },
      fill: {
        colors: ["#FABE28", "#ef4040", "#1ABC9C"],
      },
      legend: {
        show: false
      },
    },
    series: [
      {
        name: "Devices",
        data: [],
      },
    ],
  });


  const [UplinkLossNetworkchart, setUplinkLossNetworkchart] = useState({
    options: {
      chart: {
        height: 350,
        type: 'area',
        zoom: {
          autoScaleYaxis: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: [],
        min: new Date().toLocaleString(),
        tickAmount: 6,
      },

      tooltip: {
        x: {
          format: 'HH:mm'
        },
      },
      fill: {
        colors: ["#FABE28"],
      },

    },
    series: [{
      name: '5 minutes Packet-Loss',
      data: []
    }, {
      name: '5 minutes Latency',
      data: []
    }],
  });



  const [chartModel, setchartModel] = useState({
    options: {
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Firewalls", "Switches", "Access Points"],
      },
      fill: {
        colors: ["#FABE28", "#ef4040", "#1ABC9C"],
      },
      legend: {
        show: false
      },
    },
    series: [
      {
        name: "Models",
        data: [],
      },
    ],
  });

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
    organizationId: `${ac.dc.organizationID}`,
    networkId: `${ac.dc.networkID}`,
  };


  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    async function callDevices() {

      try {
        fetch("/devices", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody),
        }).then((response) => {
          return response.json;
        });
        fetch("/devices", { signal: signal })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              ac.dc.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {data.error[0]}
              </div>)
            } else {
              ac.dc.setdeviceList(data.devices);
              ac.dc.settotalDevices(data.devices.length);

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

              setchartModel({
                ...chartModel,
                series: [
                  ...chartModel.series[0].data,
                  {
                    name: "Devices",
                    data: [Firewalls.length, Switches.length, AccessPoint.length],
                  },
                ],
              });
            }
          })

      } catch (err) {
        if (err) {
          console.log(err);
          ac.dc.setalert(true);
        }
      }

    }
    callDevices();
    return function cleanup() {
      abortController.abort()
      ac.dc.setalert(false);
      console.log("cleanup -> abortController")
    }
    // eslint-disable-next-line
  }, [ac.dc.networkID]);


  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    async function callDeviceStatus() {

      try {
        fetch("/device_status", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody),
        }).then((response) => {
          return response.json;
        });
        fetch("/device_status", { signal: signal })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              ac.dc.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {data.error[0]}
              </div>)
            } else {

              ac.dc.setdeviceStatusList(data.deviceStatus);
              ac.dc.settotaldeviceStatusList(data.deviceStatus.length);

              let DeviceStatusobjects = {};
              for (var x = 0; x < data.deviceStatus.length; x++) {
                DeviceStatusobjects[x] = data.deviceStatus[x].status;
              }
              const DEVICEOBJ = Object.values(DeviceStatusobjects);
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
              setchart({
                ...chart,
                series: [
                  ...chart.series[0].data,
                  {
                    name: "Devices",
                    data: [AlertingObj.length, OfflineObj.length, OnlineObj.length],
                  },
                ],
              });
            }
          })

      } catch (err) {
        if (err) {
          console.log(err);
          ac.dc.setalert(true);
        }
      }

    }
    callDeviceStatus();
    return function cleanup() {
      abortController.abort()
      ac.dc.setalert(false);

      console.log("cleanup -> abortController")

    }

    // eslint-disable-next-line
  }, [ac.dc.networkID]);



  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    let interval = null;
    async function UplinkStatus() {

      try {
        fetch("/uplink_loss", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody),
        }).then((response) => {
          return response.json;
        });
        fetch("/uplink_loss", { signal: signal })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              ac.dc.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {data.error[0]}
              </div>)
            } else {

              try {
                var UplinkLossNetObj = data.uplinkLoss.filter(function (obj) {
                  return obj.networkId === ac.dc.networkID;
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
                const tsOBJ = Object.values(ts)

                setUplinkLossNetworkchart({
                  ...UplinkLossNetworkchart,
                  options: {
                    ...UplinkLossNetworkchart.options,
                    xaxis: {
                      ...UplinkLossNetworkchart.options.xaxis,

                      categories: UplinkLossNetworkchart.options.xaxis.categories.concat(ts)
                    }
                  },
                  series: [
                    ...UplinkLossNetworkchart.series[0].data,
                    {
                      data: lossPercent
                    }, {
                      data: latencyMs
                    }
                  ],
                });
              }
              catch (err) {
                if (err) {
                  console.log(err);
                  ac.dc.setalert(true);
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
          ac.dc.setalert(true);
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
      ac.dc.setalert(false);
      console.log("cleanup -> abortController")

    }
    // eslint-disable-next-line
  }, [ac.dc.networkID]);


  return (
    <div id="page-inner">
      <div>{ac.dc.flashMessages && <span>{ac.dc.flashMessages}</span>}</div>
      <div className="row">
        <div className="col-md-3 col-sm-12 col-xs-12">
          <div className="board">
            <div className="panel panel-primary">
              <div className="number">
                <h3 className="h3-dashboard">{ac.dc.organization}</h3>
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
                <h3 className="h3-dashboard">{ac.dc.networkList.length}</h3>
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
                <h3 className="h3-dashboard">{ac.dc.timeZone}</h3>
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
                <h3 className="h3-dashboard">{ac.dc.totaldeviceStatusList}</h3>
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
        <div className="span6" style={{ float: 'none', margin: '0 auto', width: '600px' }}>
          <div className="mixed-chart">
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
            // width="500"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 col-sm-12 col-xs-12">
          <div className="board">
            <div className="panel panel-primary">
              <div className="number">
                <h3 className="h3-dashboard">{ac.dc.network}</h3>
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
                <h3 className="h3-dashboard">{ac.dc.totalHosts}</h3>
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
                <h3 className="h3-dashboard">{ac.dc.totaldeviceStatusList}</h3>
                <small>Customers</small>
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
                <h3 className="h3-dashboard">{ac.dc.totalDevices}</h3>
                <small>Total Network Devices</small>
              </div>
              <div className="icon">
                <i className="fa fa-server fa-5x yellow"></i>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mixed-chart">
            <Chart
              options={chartModel.options}
              series={chartModel.series}
              type="bar"
            // width="500"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mixed-chart">
            <Chart
              options={UplinkLossNetworkchart.options}
              series={UplinkLossNetworkchart.series}
              type="area"
            // width="500"
            />
          </div>
        </div>
      </div>


      {/* <div className="row">
        <div className="col-md-5">
          <div className="panel panel-default">
            <div className="panel-heading">Line Chart</div>
            <div className="panel-body">
              <div id="morris-line-chart"></div>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="panel panel-default">
            <div className="panel-heading">Bar Chart Example</div>
            <div className="panel-body">
              <div id="morris-bar-chart"></div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="row">
        <div className="col-md-9 col-sm-12 col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading">Area Chart</div>
            <div className="panel-body">
              <div id="morris-area-chart"></div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading">Donut Chart Example</div>
            <div className="panel-body">
              <div id="morris-donut-chart"></div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className="col-md-12"></div>
      </div>

      <div className="row">
        <div className="col-md-4 col-sm-12 col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading">Tasks Panel</div>
            <div className="panel-body">
              <div className="list-group">
                <a href="/" className="list-group-item">
                  <span className="badge">7 minutes ago</span>
                  <i className="fa fa-fw fa-comment"></i> Commented on a post
                </a>
                <a href="/" className="list-group-item">
                  <span className="badge">16 minutes ago</span>
                  <i className="fa fa-fw fa-truck"></i> Order 392 shipped
                </a>
                <a href="/" className="list-group-item">
                  <span className="badge">36 minutes ago</span>
                  <i className="fa fa-fw fa-globe"></i> Invoice 653 has paid
                </a>
                <a href="/" className="list-group-item">
                  <span className="badge">1 hour ago</span>
                  <i className="fa fa-fw fa-user"></i> A new user has been added
                </a>
                <a href="/" className="list-group-item">
                  <span className="badge">1.23 hour ago</span>
                  <i className="fa fa-fw fa-user"></i> A new user has added
                </a>
                <a href="/" className="list-group-item">
                  <span className="badge">yesterday</span>
                  <i className="fa fa-fw fa-globe"></i> Saved the world
                </a>
              </div>
              <div className="text-right">
                <a href="/">
                  More Tasks <i className="fa fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-sm-12 col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading">Responsive Table Example</div>
            <div className="panel-body">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>User Name</th>
                      <th>Email ID.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>John</td>
                      <td>Doe</td>
                      <td>John15482</td>
                      <td>name@site.com</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Kimsila</td>
                      <td>Marriye</td>
                      <td>Kim1425</td>
                      <td>name@site.com</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Rossye</td>
                      <td>Nermal</td>
                      <td>Rossy1245</td>
                      <td>name@site.com</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Richard</td>
                      <td>Orieal</td>
                      <td>Rich5685</td>
                      <td>name@site.com</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Jacob</td>
                      <td>Hielsar</td>
                      <td>Jac4587</td>
                      <td>name@site.com</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Wrapel</td>
                      <td>Dere</td>
                      <td>Wrap4585</td>
                      <td>name@site.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>
          All right reserved. Template by:{" "}
          <a href="http://webthemez.com">WebThemez.com</a>
        </p>
      </footer>
    </div>
  );
}
