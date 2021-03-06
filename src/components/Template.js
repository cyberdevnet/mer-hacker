import React, { useState } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import History from "../History";
import Select from "react-select";
import ProtectedRoute from "../ProtectedRoute";
import ProtectedRouteSettings from "../ProtectedRouteSettings";
import Home from "./Home";
import AdminPanel from "./AdminPanel/AdminPanel";
import ChangeApiKey from "./AdminPanel/ChangeApiKey";
import ChangeApiKeyAdmin from "./AdminPanel/ChangeApiKeyAdmin";
import LoginAPI from "../components/Login/LoginAPI";
import Dashboard from "../components/Dashboard/Dashboard";
import LoggedIn from "../components/Login/LoggedIn";
import Logout from "../components/Login/Logout";
import PageNotFound from "../PageNotFound";
import ToolsTemplate from "./ToolsTemplate";
import AlertModal from "./AlertsModal";
import Topology from "../components/Tools/Topology/Topology";
import $ from "jquery";
import ReactTooltip from "react-tooltip";
import SessionTimeout from "../SessionTimeout";

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

  // scroll functions
  $(window).scroll(function (e) {
    // add/remove class to navbar when scrolling to hide/show
    var scroll = $(window).scrollTop();
    if (scroll >= 150) {
      $(".navbar").addClass("navbar-hide");
      $(".navbar-side").stop().animate({ top: "10px" });
    } else {
      $(".navbar").removeClass("navbar-hide");
      $(".navbar-side").stop().animate({ top: "80px" });
    }
  });

  const all_tools = [
    { tool: "Get all devices IPs" },
    { tool: "Get all subnets" },
    { tool: "Get all Organization subnets" },
    { tool: "Get all Clients" },
    { tool: "Get all SwitchPorts" },
    { tool: "Network Top Users Report" },
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
    <div id="wrapper">
      <nav className="navbar navbar-default top-navbar" role="navigation">
        {ac.dc.isSignedIn ? (
          <div>
            <div className="c-dropdown dropdown">
              <div
                className="c-avatar has-dropdown dropdown-toggle"
                id="dropdownMenuAvatar"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="https://img.icons8.com/ios/50/000000/down-squared--v1.png"
                  alt="#"
                  width="15"
                />{" "}
              </div>
              <div
                className="c-dropdown__menu dropdown-menu pull-left "
                aria-labelledby="dropdownMenuAvatar"
              >
                <ul
                  className="dropdown-menu pull-left"
                  role="menu"
                  aria-labelledby="dropdownMenu"
                  style={{
                    display: "block",
                    position: "static",
                    marginBottom: "5px",
                    width: "180px",
                  }}
                >
                  <li>
                    {ac.dc.isSignedIn && ac.dc.User === "admin" ? (
                      <NavLink exact to="settings" href="#settings">
                        <i className="fas fa-tools"></i> Admin Panel
                      </NavLink>
                    ) : (
                      <div></div>
                    )}
                  </li>
                  {ac.dc.isSignedIn && ac.dc.User === "admin" ? (
                    <li>
                      <NavLink exact to="change-apikey-admin" href="#change-apikey">
                        <i className="fa fa-key" aria-hidden="true"></i> Change API key
                      </NavLink>
                    </li>
                  ) : (
                    <li>
                      <NavLink exact to="change-apikey" href="#change-apikey">
                        <i className="fa fa-key" aria-hidden="true"></i> Change API key
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink exact to="logout" href="#logout">
                      <i className="fas fa-sign-out-alt" aria-hidden="true"></i> Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <span className="loggedin-user">{ac.dc.User}</span>
          </div>
        ) : (
          <div></div>
        )}
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".sidebar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">
            <strong>
              <img
                src="https://i.ibb.co/0C8DMq5/Mer-Haker-big.png"
                alt="Mer-Haker-big"
                border="0"
              />{" "}
              MER-HACKER
              {/* <i class="fa fa-rocket" aria-hidden="true"></i> MER-HACKER */}
            </strong>
          </a>

          <div id="sideNav" href="">
            <i className="fa fa-bars icon" style={ac.dc.collapseButton}></i>
          </div>
        </div>
      </nav>

      <nav className="navbar-default navbar-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav" id="main-menu">
            <li>
              <NavLink exact to="home" href="#home">
                <i className="fa fa-home" aria-hidden="true"></i> Home
              </NavLink>
            </li>

            {ac.dc.organizationID && ac.dc.networkID ? (
              <li>
                <ReactTooltip place="right" type="warning" effect="float" />
                <NavLink exact to="dashboard" href="#dashboard">
                  <i className="fa fa-bar-chart"></i> Dashboard
                </NavLink>
              </li>
            ) : (
              <li data-tip="Select Organization and Network">
                <ReactTooltip place="right" type="warning" effect="float" />
                <NavLink style={navLinkStyle} exact to="dashboard" href="#dashboard">
                  <i className="fa fa-bar-chart"></i> Dashboard
                </NavLink>
              </li>
            )}
            {ac.dc.organizationID !== 0 && ac.dc.networkID !== 0 ? (
              <li>
                <ReactTooltip place="right" type="warning" effect="float" />
                <NavLink exact to="topology" href="#topology">
                  <i className="fab fa-connectdevelop" aria-hidden="true"></i> Topology
                </NavLink>
              </li>
            ) : (
              <li data-tip="Select Organization and Network">
                <ReactTooltip place="right" type="warning" effect="float" />
                <NavLink style={navLinkStyle} exact to="topology" href="#topology">
                  <i className="fab fa-connectdevelop" aria-hidden="true"></i> Topology
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
      </nav>
      <div id="page-wrapper">
        <div className="header">
          <p className="page-header"></p>
        </div>
        {ac.dc.switchAlertModal ? <AlertModal dc={ac.dc} /> : <div></div>}
        {ac.dc.switchLoggedIn ? <LoggedIn dc={ac.dc} /> : <div></div>}
        {ac.dc.switchLoggedout ? <Logout dc={ac.dc} /> : <div></div>}
        {ac.dc.isSignedIn ? <SessionTimeout dc={ac.dc} history={History} /> : <div></div>}

        <Switch>
          <Route exact path="/login" render={(dc) => <LoginAPI {...ac.dc} dc={dc} />} />
          <ProtectedRouteSettings
            exact
            path="/settings"
            component={AdminPanel}
            {...ac.dc}
            dc={dc}
          />
          <ProtectedRouteSettings
            exact
            path="/change-apikey-admin"
            component={ChangeApiKeyAdmin}
            {...ac.dc}
            dc={dc}
          />
          <ProtectedRoute exact path="/change-apikey" component={ChangeApiKey} {...ac.dc} dc={dc} />

          <ProtectedRoute exact path="/" component={Home} {...ac.dc} dc={dc} />
          <ProtectedRoute exact path="/home" component={Home} {...ac.dc} dc={dc} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} {...ac.dc} dc={dc} />
          <ProtectedRoute exact path="/tools" component={ToolsTemplate} {...ac.dc} dc={dc} />
          <ProtectedRoute exact path="/topology" component={Topology} {...ac.dc} dc={dc} />
          <ProtectedRoute exact path="/logout" component={Logout} {...ac.dc} dc={dc} />

          {/* do not cancel this */}
          {/* <Route exact path='/login' render={(dc) => (<LoginAPI {...ac.dc} dc={dc} />)} /> */}
          <Route render={(dc) => <PageNotFound {...ac.dc} dc={dc} />} />
          {/* <Route component={PageNotFound} /> */}
        </Switch>
      </div>
    </div>
  );
}
