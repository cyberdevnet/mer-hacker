import React, { lazy, Suspense } from "react";

// import "../../styles/Dashboard.css";

const LatencyLoss = lazy(() => import("./LatencyLoss"));
const LicenseState = lazy(() => import("./LicenseState"));
const DeviceStatusTable = lazy(() => import("./DeviceStatusTable"));
const TotalDevices = lazy(() => import("./TotalDevices"));
const NetworkDevices = lazy(() => import("./NetworkDevices"));

export default function Dashboard(ac) {
  const renderLoader = () => <p>Loading</p>;

  return (
    <div>
      <div>{ac.flashMessages && <span>{ac.flashMessages}</span>}</div>
      <div className="row row-deck row-cards">
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.organization}</h3>
              <small>Organization</small>
              <div className="icon dashboard">
                <i className="fas fa-university fa-2x blue"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.networkList.length}</h3>
              <small>Total Networks</small>
              <div className="icon dashboard">
                <i className="fas fa-sitemap fa-2x red"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.timeZone}</h3>
              <small>Time Zone</small>
              <div className="icon dashboard">
                <i className="fas fa-clock-o fa-2x green"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.totaldeviceStatusList}</h3>
              <small>Total Organization Devices</small>
              <div className="icon dashboard">
                <i className="fas fa-server fa-2x yellow"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body" style={{ padding: "10px" }}>
              <div>
                <Suspense fallback={renderLoader()}>
                  <LatencyLoss {...ac} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body" style={{ padding: "10px" }}>
              <div>
                <Suspense fallback={renderLoader()}>
                  <NetworkDevices {...ac} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body" style={{ padding: "10px" }}>
              <div>
                <Suspense fallback={renderLoader()}>
                  <TotalDevices {...ac} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <Suspense fallback={renderLoader()}>
                <LicenseState {...ac} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.network}</h3>
              <small>Network</small>
              <div className="icon dashboard">
                <i className="fas fa-sitemap fa-2x red"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.totalHosts}</h3>
              <small>Clients Online</small>
              <div className="icon dashboard">
                <i className="fas fa-users fa-2x blue"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.networkID}</h3>
              <small>Network ID</small>
              <div className="icon dashboard">
                <i className="fas fa-sitemap  fa-2x red"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.totalDevices}</h3>
              <small>Total Network Devices</small>
              <div className="icon dashboard">
                <i className="fas fa-server fa-2x yellow"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row-inventory">
        <div className="card">
          <div className="card-body">
            <small>Devices Status</small>
            <div className="icon dashboard">
              <i className="fas fa-server fa-2x yellow"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="row-inventory">
        <div className="card">
          <div className="card-body">
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
