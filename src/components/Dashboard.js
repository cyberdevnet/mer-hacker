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
    },
    series: [
      {
        name: "Devices",
        data: [],
      },
    ],
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

  // const isFirstRunDeviceStatus = useRef(true);
  useEffect(() => {
    // if (isFirstRunDeviceStatus.current) {
    //   isFirstRunDeviceStatus.current = false;
    //   return;
    // }
    async function callDeviceStatus() {
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
      fetch("/device_status")
        .then((res) => res.json())
        .then((deviceStatus) => {
          ac.dc.setdeviceStatusList(deviceStatus.deviceStatus);
          ac.dc.settotaldeviceStatusList(deviceStatus.deviceStatus.length);

          let DeviceStatusobjects = {};
          for (var x = 0; x < deviceStatus.deviceStatus.length; x++) {
            DeviceStatusobjects[x] = deviceStatus.deviceStatus[x].status;
          }
          const DEVICEOBJ = Object.values(DeviceStatusobjects);
          let OnlineObj = [];
          let OfflineObj = [];
          let AlertingObj = [];
          for (var y = 0; y < deviceStatus.deviceStatus.length; y++) {
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
        })
        .catch((err) => {
          ac.dc.setalert(true);
          console.log("this is the error: ", err);
        });
      return () => {
        ac.dc.setalert(false);
      };
    }
    callDeviceStatus();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let ModelObj = {};
    for (var x = 0; x < ac.dc.deviceList.length; x++) {
      ModelObj[x] = ac.dc.deviceList[x].model;
    }
    const MODELOBJ = Object.values(ModelObj);
    let Firewalls = [];
    let Switches = [];
    let AccessPoint = [];
    for (var z = 0; z < ac.dc.deviceList.length; z++) {
      if (MODELOBJ[z].startsWith("MX")) {
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
    // eslint-disable-next-line
  }, []);

  return (
    <div id="page-inner">
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
                <h3 className="h3-dashboard">{ac.dc.organizationID}</h3>
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
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chart.options}
            series={chart.series}
            type="bar"
            width="500"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-6 col-md-3">
          <div className="panel panel-default">
            <div className="panel-body easypiechart-panel">
              <h4>Total Networks</h4>
              <div className="easypiechart" id="easypiechart-blue">
                <span className="percent">{ac.dc.networkList.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-6 col-md-3">
          <div className="panel panel-default">
            <div className="panel-body easypiechart-panel">
              <h4>Total Organization Devices</h4>
              <div className="easypiechart" id="easypiechart-orange">
                <span className="percent">{ac.dc.totaldeviceStatusList}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-6 col-md-3">
          <div className="panel panel-default">
            <div className="panel-body easypiechart-panel">
              <h4>Customers</h4>
              <div
                className="easypiechart"
                id="easypiechart-teal"
                data-percent="84"
              >
                <span className="percent">84%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-6 col-md-3">
          <div className="panel panel-default">
            <div className="panel-body easypiechart-panel">
              <h4>Clients Online</h4>
              <div
                className="easypiechart"
                id="easypiechart-red"
                data-percent="46"
              >
                <span className="percent">{ac.dc.totalHosts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartModel.options}
            series={chartModel.series}
            type="bar"
            width="500"
          />
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
