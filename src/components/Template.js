import React, { useState } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import Select from "react-select";
import Home from "./Home";
import SetApiKey from "../SetApiKey";
import LoginAPI from "../components/Login/LoginAPI";
import Dashboard from "../components/Dashboard/Dashboard";
import Logout from "../components/Login/Logout";
import PageNotFound from "../PageNotFound";
import ToolsTemplate from "./ToolsTemplate";
import AlertModal from "./AlertsModal";
import Topology from "../components/Tools/Topology/Topology";
import ReactTooltip from "react-tooltip";
import Avatar from "../../public/avatar.png";


import "../styles/Template.css";

export default function Template(ac, dc) {
  // eslint-disable-next-line
  const [navLinkStyle, setnavLinkStyle] = useState({ pointerEvents: "none" });

  const ORGANIZATIONS = ac.dc.organizationList.map((opt, index) => ({
    label: opt.name,
    value: index,
    id: opt.id,
  }));

  const NETWORKS = ac.dc.networkList.map((opt, index) => ({
    label: opt.name,
    value: index,
    id: opt.id,
  }));

  const HandleOrganization = (opt) => {
    ac.dc.setorganization(opt.label);
    ac.dc.setorganizationID(opt.id);
    ac.dc.setnetwork("Networks");
    ac.dc.setshowRestorescript(false);
    ac.dc.setisOrgSelected(true);
  };

  const HandleNetwork = (opt) => {
    ac.dc.setnetwork(opt.label);
    ac.dc.setnetworkID(opt.id);
    ac.dc.setshowRestorescript(false);
    ac.dc.setisNetSelected(true);
    ac.dc.settriggerTopReports(ac.dc.triggerTopReports + 1);
  };

  const all_tools = [
    { tool: "Get all devices IPs" },
    { tool: "Get all subnets" },
    { tool: "Get all Organization subnets" },
    { tool: "Get all Clients" },
    { tool: "Get all SwitchPorts" },
    { tool: "Find Port" },
    { tool: "Network Analysis" },
    { tool: "Backup & Restore" },
    { tool: "Migrate Tool" },
    { tool: "Switchport Templates" },
    { tool: "Change Log" },
    { tool: "Inventory" },
    { tool: "Deploy Devices" },
  ];

  const ALLTOOLS = all_tools.map((opt, index) => ({
    label: opt.tool,
    index: index,
    value: "/tools",
  }));

  let history = useHistory();

  const HandleTools = (opt) => {
    let number = opt.index + 1;
    ac.dc.setswitchMainTools(true);
    ac.dc.settoolSelected(opt.label);
    ac.dc.setswitchAllTools({ [number]: true });
    history.push("/tools");
  };

  return (
    <div className="wrapper d-flex align-items-stretch">
      {ac.dc.showSetApiKey ? <SetApiKey {...ac.dc} dc={dc} /> : <div></div>}
      <nav id="sidebar">
        <div className="custom-menu">
          <button
            type="button"
            data-toggle="collapse"
            data-target=".sidebar-collapse"
            className="btn btn-primary"
          >
            <i className="fa fa-bars"></i>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
        <div className="p-4">
          <div className="sidebar-collapse">
            <a className="navbar-brand" href="/">
              <strong>MER-HACKER</strong>
            </a>

            <div className="d-flex order-lg-2 ml-auto">
              <div className="dropdown">
                <a href="/#" className="nav-link pr-0 leading-none" data-toggle="dropdown">
                  <span
                      style={{ backgroundImage: "url(" + Avatar + ")" }}
                      className="avatar"
                  
                  ></span>
                  <span className="ml-2 d-none d-lg-block">
                    <span className="text-default">{ac.dc.User}</span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
                  <div className="dropdown-item" href="/#">
                    <li>
                      {/*eslint-disable-next-line */}
                      <a type="button" onClick={() => ac.dc.setshowSetApiKey(true)}>
                        <i className="fa fa-key" aria-hidden="true"></i> Set API key
                      </a>
                    </li>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item" href="/#">
                    <NavLink exact to="logout" href="#logout">
                      <i className="fas fa-sign-out-alt" aria-hidden="true"></i> Logout
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <ul className="list-unstyled components mb-5" id="main-menu">
              <li className="li sidebar"></li>
              <li className="li sidebar">
                <NavLink exact to="home" href="#home">
                  <i style={{ marginRight: "10px" }} className="fa fa-home" aria-hidden="true"></i>
                  <span className="nav-link-title">Home</span>
                </NavLink>
              </li>
              {ac.dc.organizationID && ac.dc.networkID ? (
                <li className="li sidebar">
                  <ReactTooltip place="right" type="warning" effect="float" />
                  <NavLink exact to="dashboard" href="#dashboard">
                    <i style={{ marginRight: "10px" }} className="fa fa-bar-chart"></i>
                    <span className="nav-link-title">Dashboard</span>
                  </NavLink>
                </li>
              ) : (
                <li className="li sidebar" data-tip="Select Organization and Network">
                  <ReactTooltip place="right" type="warning" effect="float" />
                  <NavLink style={navLinkStyle} exact to="dashboard" href="#dashboard">
                    <i style={{ marginRight: "10px" }} className="fa fa-bar-chart"></i>
                    <span className="nav-link-title">Dashboard</span>
                  </NavLink>
                </li>
              )}
              {ac.dc.organizationID !== 0 && ac.dc.networkID !== 0 ? (
                <li className="li sidebar">
                  <ReactTooltip place="right" type="warning" effect="float" />
                  <NavLink exact to="topology" href="#topology">
                    <i
                      style={{ marginRight: "10px" }}
                      className="fab fa-connectdevelop"
                      aria-hidden="true"
                    ></i>
                    <span className="nav-link-title">Topology</span>
                  </NavLink>
                </li>
              ) : (
                <li className="li sidebar" data-tip="Select Organization and Network">
                  <ReactTooltip place="right" type="warning" effect="float" />
                  <NavLink style={navLinkStyle} exact to="topology" href="#topology">
                    <i
                      style={{ marginRight: "10px" }}
                      className="fab fa-connectdevelop"
                      aria-hidden="true"
                    ></i>
                    <span className="nav-link-title">Topology</span>
                  </NavLink>
                </li>
              )}
              <div className="select-organization">
                <p>ORGANIZATION</p>
              </div>
              <Select
                className="sel_org"
                options={ORGANIZATIONS}
                placeholder={ac.dc.organization}
                onChange={HandleOrganization}
                classNamePrefix="foo"
                onMenuOpen={() => ac.dc.settriggerSelectOrg(ac.dc.triggerSelectOrg + 1)}
                isLoading={ac.dc.loadingOrg}
              />
              <div className="select-network">
                <p>NETWORK</p>
              </div>
              <Select
                className="sel_net"
                defaultValue={ac.dc.network}
                value={ac.dc.network}
                options={NETWORKS}
                placeholder={ac.dc.network}
                onChange={HandleNetwork}
                onMenuOpen={() => ac.dc.settriggerSelectNetwork(ac.dc.triggerSelectNetwork + 1)}
                classNamePrefix="foo"
                isLoading={ac.dc.loadingNet}
              />
              {ac.dc.organizationID !== 0 && ac.dc.networkID !== 0 ? (
                <li>
                  <ReactTooltip place="right" type="warning" effect="float" />
                  <div className="select-tools">
                    <p>TOOLS</p>
                  </div>
                  <Select
                    className="sel_tool"
                    options={ALLTOOLS}
                    placeholder="Select Tool"
                    onChange={HandleTools}
                    classNamePrefix="foo"
                  />
                </li>
              ) : (
                <li data-tip="Select Organization and Network">
                  <ReactTooltip place="right" type="warning" effect="float" />
                  <div className="select-tools">
                    <p>TOOLS</p>
                  </div>
                  <Select
                    className="sel_tool"
                    placeholder="Select Tool"
                    classNamePrefix="foo"
                    isDisabled
                  />
                </li>
              )}
            </ul>
            {ac.dc.flashMessages}
          </div>
        </div>
      </nav>

      <div id="content" className="container">
        {ac.dc.switchAlertModal ? <AlertModal dc={ac.dc} /> : <div></div>}
        {ac.dc.switchLoggedout ? <Logout dc={ac.dc} /> : <div></div>}

        <Switch>
          <Route exact path="/login" render={(dc) => <LoginAPI {...ac.dc} dc={dc} />} />
          {/* <Route exact path="/set-apikey" render={(dc) => <SetApiKey {...ac.dc} dc={dc} />} /> */}
          <Route exact path="/" render={(dc) => <Home {...ac.dc} dc={dc} />} />
          <Route exact path="/home" render={(dc) => <Home {...ac.dc} dc={dc} />} />
          <Route exact path="/dashboard" render={(dc) => <Dashboard {...ac.dc} dc={dc} />} />
          <Route exact path="/tools" render={(dc) => <ToolsTemplate {...ac.dc} dc={dc} />} />
          <Route exact path="/topology" render={(dc) => <Topology {...ac.dc} dc={dc} />} />
          <Route exact path="/logout" render={(dc) => <Logout {...ac.dc} dc={dc} />} />

          <Route render={(dc) => <PageNotFound {...ac.dc} dc={dc} />} />
        </Switch>
      </div>
    </div>
  );
}
