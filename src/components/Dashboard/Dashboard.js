import React, { lazy, Suspense } from "react";

import "../../styles/Dashboard.css";

const LatencyLoss = lazy(() => import("./LatencyLoss"));
const LicenseState = lazy(() => import("./LicenseState"));
const DeviceStatusTable = lazy(() => import("./DeviceStatusTable"));
const TotalDevices = lazy(() => import("./TotalDevices"));
const NetworkDevices = lazy(() => import("./NetworkDevices"));

export default function Dashboard(ac) {
  const renderLoader = () => <p>Loading</p>;

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
                <i className="fa fa-university fa-4x blue"></i>
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
      <div className="row">
        <div className="col-md-3 col-sm-12 col-xs-12">
          <div className="board">
            <div className="panel panel-primary" style={{ padding: "10px" }}>
              <div>
                <Suspense fallback={renderLoader()}>
                  <LatencyLoss {...ac} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 col-xs-12">
          <div className="board">
            <div className="panel panel-primary" style={{ padding: "10px" }}>
              <div>
                <Suspense fallback={renderLoader()}>
                  <NetworkDevices {...ac} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 col-xs-12">
          <div className="board">
            <div className="panel panel-primary" style={{ padding: "10px" }}>
              <div>
                <Suspense fallback={renderLoader()}>
                  <TotalDevices {...ac} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 col-xs-12">
          <div className="board">
            <div className="panel panel-primary">
              <Suspense fallback={renderLoader()}>
                <LicenseState {...ac} />
              </Suspense>
            </div>
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
              <small>Devices Status</small>
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
            <Suspense fallback={renderLoader()}>
              <DeviceStatusTable {...ac} />
            </Suspense>
          </div>
        </div>
      </div>

      <footer>
        <p>All right reserved. Created by cyberdevnet</p>
      </footer>
    </div>
  );
}
