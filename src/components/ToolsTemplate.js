import React from "react";
import MainTools from "./Tools/MainTools";
import LiveLog from "./LiveLog";
import { NavLink } from "react-router-dom";

import "../styles/ToolsTemplate.css";

export default function ToolsTemplate(ac) {
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
          <div className="panel-debug panel-default">
            <div className="panel-body">
              <NavLink exact to="tools" href="#null">
                <i className="fa fa-wrench"></i> Tools/{ac.toolSelected}
              </NavLink>
              <LiveLog dc={ac} />
            </div>
          </div>
        </div>
      </div>
      {ac.switchMainTools ? <MainTools dc={ac} /> : <div></div>}
    </div>
  );
}
