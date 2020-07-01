import React, { useState } from "react";
import MainTools from "./Tools/MainTools";
import LiveLog from "./LiveLog";

import "../styles/ToolsTemplate.css";


export default function ToolsTemplate(ac) {
  // const [organization, setorganization] = useState("Set Organization");
  // const [organizationID, setorganizationID] = useState(0);
  // const [networkID, setnetworkID] = useState(0);
  // const [network, setnetwork] = useState("Networks");


  const shutAllTools = () => {
    ac.dc.setswitchMainTools(true);
    let selectBox = document.getElementById("selectBox");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if (selectedValue === "1") {
      ac.dc.setswitchAllTools({ 1: true });
    } else if (selectedValue === "2") {
      ac.dc.setswitchAllTools({ 2: true });
    } else if (selectedValue === "3") {
      ac.dc.setswitchAllTools({ 3: true });
    } else if (selectedValue === "4") {
      ac.dc.setswitchAllTools({ 4: true });
    } else if (selectedValue === "5") {
      ac.dc.setswitchAllTools({ 5: true });
    } else if (selectedValue === "6") {
      ac.dc.setswitchAllTools({ 6: true });
    } else if (selectedValue === "7") {
      ac.dc.setswitchAllTools({ 7: true });
    }
  };


  return (
    <div id="page-inner-tool-templates">
      <div>{ac.dc.flashMessages && <span>{ac.dc.flashMessages}</span>}</div>
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
              {/* <button onClick={shutAllTools}>Button</button> */}
              {/* <div className="sub-title-tools">Select Tools</div> */}
              <div>
                <select
                  onChange={shutAllTools}
                  id="selectBox"
                  className="btn btn-default dropdown-toggle-tools"
                >
                  <optgroup label="Tshoot Tools">
                    <option className="option-tools-disabled" value="0">
                      Select Tools
                    </option>
                    <option value="1">Get all devices IPs</option>
                    <option value="2">Get all subnets</option>
                    <option value="3">Get all Organization subnets</option>
                    <option value="4">Network Top Users Report</option>
                    <option value="5">Find Port</option>
                    <option value="6">Network Analysis</option>
                    <option value="7">Backup & Restore</option>
                  </optgroup>
                </select>
              </div>
              <LiveLog />
            </div>
          </div>
        </div>
      </div>
      {ac.dc.switchMainTools ? <MainTools dc={ac.dc} /> : <div></div>}
    </div>
  );
}
