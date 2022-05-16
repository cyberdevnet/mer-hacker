import React from "react";
import MainTools from "./Tools/MainTools";
import { NavLink } from "react-router-dom";

import "../styles/ToolsTemplate.css";

export default function ToolsTemplate(ac) {
  return (
    <div>
      <div>{ac.flashMessages && <span>{ac.flashMessages}</span>}</div>
      <div className="row row-deck row-cards">
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.network}</h3>
              <small>Network</small>
              <div className="icon tools-template">
                <i className="fa fa-sitemap fa-2x red"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.organizationID}</h3>
              <small>Organization ID</small>
              <div className="icon tools-template">
                <i className="fa fa-university fa-2x blue"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.timeZone}</h3>
              <small>Time Zone</small>
              <div className="icon tools-template">
                <i className="fa fa-clock-o fa-2x green"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h3-dashboard">{ac.totalDevices}</h3>
              <small>Total Devices</small>
              <div className="icon tools-template">
                <i className="fa fa-server fa-2x yellow"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row-inventory">
        <div className="card">
          <div className="card-body debug">
            <NavLink exact to="tools" href="#null">
              <i className="fa fa-wrench"></i> Tools/{ac.toolSelected}
            </NavLink>
          </div>
        </div>
      </div>
      {ac.switchMainTools ? <MainTools dc={ac} /> : <div></div>}
    </div>
  );
}
