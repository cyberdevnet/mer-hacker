import React, { useState } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import History from "../History";
import Select from "react-select";
import ProtectedRoute from "../ProtectedRoute";
import Home from "./Home";
import LoginAPI from "./LoginAPI";
import Dashboard from "./Dashboard";
import LoggedIn from "./LoggedIn";
import Logout from "./Logout";
import PageNotFound from "../PageNotFound";
import ToolsTemplate from "./ToolsTemplate";
import AlertModal from "./AlertsModal";
import Topology from "./Topology";
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
              {ac.dc.isSignedIn ? (
                <NavLink exact to="logout" href="#logout">
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                </NavLink>
              ) : (
                <div></div>
              )}
            </li>
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
                <NavLink
                  style={navLinkStyle}
                  exact
                  to="dashboard"
                  href="#dashboard"
                >
                  <i className="fa fa-bar-chart"></i> Dashboard
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
              onMenuOpen={() =>
                ac.dc.settriggerSelectOrg(ac.dc.triggerSelectOrg + 1)
              }
              isLoading={ac.dc.loadingOrg}
            />

            <div className="select-network">
              <p>NETWORK</p>
            </div>
            <Select
              className="sel_net"
              options={NETWORKS}
              placeholder={ac.dc.network}
              onChange={HandleNetwork}
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
            {ac.dc.organizationID !== 0 && ac.dc.networkID !== 0 ? (
              <li>
                <ReactTooltip place="right" type="warning" effect="float" />
                <NavLink exact to="topology" href="#topology">
                  <i className="fa fa-connectdevelop" aria-hidden="true"></i>{" "}
                  Topology
                </NavLink>
              </li>
            ) : (
              <li data-tip="Select Organization and Network">
                <ReactTooltip place="right" type="warning" effect="float" />
                <NavLink
                  style={navLinkStyle}
                  exact
                  to="topology"
                  href="#topology"
                >
                  <i className="fa fa-connectdevelop" aria-hidden="true"></i>{" "}
                  Topology
                </NavLink>
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
        {ac.dc.isSignedIn ? (
          <SessionTimeout dc={ac.dc} history={History} />
        ) : (
          <div></div>
        )}

        <Switch>
          <Route
            exact
            path="/login"
            render={(dc) => <LoginAPI {...ac.dc} dc={dc} />}
          />
          <ProtectedRoute exact path="/" component={Home} {...ac.dc} dc={dc} />
          <ProtectedRoute
            exact
            path="/home"
            component={Home}
            {...ac.dc}
            dc={dc}
          />
          <ProtectedRoute
            exact
            path="/dashboard"
            component={Dashboard}
            {...ac.dc}
            dc={dc}
          />
          <ProtectedRoute
            exact
            path="/tools"
            component={ToolsTemplate}
            {...ac.dc}
            dc={dc}
          />
          <ProtectedRoute
            exact
            path="/topology"
            component={Topology}
            {...ac.dc}
            dc={dc}
          />
          <ProtectedRoute
            exact
            path="/logout"
            component={Logout}
            {...ac.dc}
            dc={dc}
          />

          {/* do not cancel this */}
          {/* <Route exact path='/login' render={(dc) => (<LoginAPI {...ac.dc} dc={dc} />)} /> */}
          <Route render={(dc) => <PageNotFound {...ac.dc} dc={dc} />} />
          {/* <Route component={PageNotFound} /> */}
        </Switch>
      </div>
    </div>
  );
}
