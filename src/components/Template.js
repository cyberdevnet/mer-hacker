import React, { useState } from "react";
import Select from "react-select";
import LoginAPI from "./LoginAPI";
import Dashboard from "./Dashboard";
import LoggedIn from "./LoggedIn";
import Logout from "./Logout";
import ToolsTemplate from "./ToolsTemplate";
import AlertModal from "./AlertsModal";
import Countdown from 'react-countdown';

import "../styles/Template.css";



export default function Template(ac) {


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

  const routeLoginAPI = () => {
    if (ac.dc.isLoggedIn === false) {
      ac.dc.setclassLogin("active-menu");
      // ac.dc.setclassOrganization("");
      ac.dc.setclassDashboard("");
      // ac.dc.setclassNetwork("");
      ac.dc.setclassToolsTemplate("");
      ac.dc.setswitchLoggedout(false);
      ac.dc.setswitchLoginAPI(true);
      ac.dc.setswitchDashboard(false);
      ac.dc.setswitchToolsTemplate(false);
    } else if (ac.dc.isLoggedIn === true) {
      ac.dc.setclassLogin("active-menu");
      // ac.dc.setclassOrganization("");
      ac.dc.setclassDashboard("");
      // ac.dc.setclassNetwork("");
      ac.dc.setclassToolsTemplate("");
      ac.dc.setswitchLoggedout(true);
      ac.dc.setswitchLoginAPI(false);
      ac.dc.setswitchDashboard(false);
      ac.dc.setswitchToolsTemplate(false);
    }
  };

  const routeOrganization = () => {
    ac.dc.setulClassorg("nav nav-second-level collapse in");
    // ac.dc.setclassOrganization("active-menu");
    // ac.dc.setclassNetwork("");
    ac.dc.setclassLogin("");
    ac.dc.setclassDashboard("");
    ac.dc.setclassToolsTemplate("");
  };

  const routeNetwork = () => {
    ac.dc.setulClassnet("nav nav-second-level collapse in");
    // ac.dc.setclassNetwork("active-menu");
    ac.dc.setclassLogin("");
    // ac.dc.setclassOrganization("");
    ac.dc.setclassDashboard("");
    ac.dc.setclassToolsTemplate("");
  };

  const routeDashboard = () => {
    // if (ac.dc.isLoggedIn === true) {
    ac.dc.setswitchLoggedout(false);
    ac.dc.setswitchDashboard(true);
    ac.dc.setswitchLoginAPI(false);
    ac.dc.setswitchswitchChangeApiKey(false);
    ac.dc.setswitchToolsTemplate(false);
    ac.dc.setclassDashboard("active-menu");
    ac.dc.setclassToolsTemplate("");
    // ac.dc.setclassNetwork("");
    ac.dc.setclassLogin("");
    // ac.dc.setclassOrganization("");
    // } else {
    //   alert("Please Log-in");
    // }
  };
  const routeToolsTemplate = () => {
    ac.dc.setswitchToolsTemplate(true);
    ac.dc.setswitchLoggedout(false);
    ac.dc.setswitchDashboard(false);
    ac.dc.setswitchLoginAPI(false);
    ac.dc.setswitchswitchChangeApiKey(false);
    ac.dc.setclassToolsTemplate("active-menu");
    // ac.dc.setclassNetwork("");
    ac.dc.setclassLogin("");
    // ac.dc.setclassOrganization("");
    ac.dc.setclassDashboard("");
  };

  const HandleOrganization = (opt) => {
    ac.dc.setorganization(opt.label);
    ac.dc.setorganizationID(opt.id);
    ac.dc.setnetwork("Networks");
    ac.dc.setshowRestorescript(false)
    // ac.dc.setdisplayButtons({ display: 'none' })
    routeNetwork();
    // ac.dc.setclassOrganization("");
    ac.dc.setisOrgSelected(true);
  };

  const HandleNetwork = (opt) => {
    ac.dc.setnetwork(opt.label);
    ac.dc.setnetworkID(opt.id);
    // routeDashboard();
    routeToolsTemplate();
    ac.dc.setshowRestorescript(false)
    // ac.dc.setdisplayButtons({ display: 'none' })
    // ac.dc.setclassNetwork("");
    ac.dc.setisNetSelected(true);
    ac.dc.settriggerTopReports(ac.dc.triggerTopReports + 1);
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
          <a className="navbar-brand" href="index.html">
            <strong>
              <i className="icon fa fa-plane" ></i> MER-HACKER
            </strong>
          </a>

          <div id="sideNav" href="" >
            <i className="fa fa-bars icon" style={ac.dc.collapseButton}></i>
          </div>
        </div>
        <div className="nav navbar-top-links navbar-right">
          {ac.dc.isLoggedIn ? (<div className='timeout-wrapper'>
            Session Timeout: <Countdown className='timeout' date={Date.now() + (ac.dc.sessionTime * 1000)} daysInHours />

          </div>) : (<div></div>)}
        </div>

      </nav>

      <nav className="navbar-default navbar-side" role="navigation" >
        <div className="sidebar-collapse">
          <ul className="nav" id="main-menu">
            <li>
              <a
                href="#null"
                className={ac.dc.classLogin}
                onClick={routeLoginAPI}
              >
                <i className="fa fa-desktop"></i> {ac.dc.logInlogOut}
              </a>
            </li>
            <li>
              <a
                href="#null"
                className={ac.dc.classDashboard}
                onClick={routeDashboard}
              >
                <i className="fa fa-dashboard"></i> Dashboard
              </a>
            </li>
            <div className="select-organization">
              <p>ORGANIZATION</p>
            </div>
            <Select
              options={ORGANIZATIONS}
              placeholder={ac.dc.organization}
              onChange={HandleOrganization}
              // className="select-organization-scroll"
              onClick={routeOrganization}
              classNamePrefix="foo"
            />

            <div className="select-network">
              <p>NETWORK</p>
            </div>
            <Select
              options={NETWORKS}
              placeholder={ac.dc.network}
              onChange={HandleNetwork}
              onClick={routeNetwork}
              // className={ac.dc.classNetwork}
              classNamePrefix="foo"
            />


            <li>
              <a
                href="#null"
                className={ac.dc.classToolsTemplate}
                onClick={routeToolsTemplate}
              >
                <i className="fa fa-wrench"></i> Tools
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div id="page-wrapper" >
        <div className="header">
          <p className="page-header"></p>
        </div>
        {ac.dc.switchAlertModal ? <AlertModal dc={ac.dc} /> : <div></div>}
        {ac.dc.switchLoginAPI ? <LoginAPI dc={ac.dc} /> : <div></div>}
        {ac.dc.switchDashboard ? <Dashboard dc={ac.dc} /> : <div></div>}
        {ac.dc.switchLoggedIn ? <LoggedIn dc={ac.dc} /> : <div></div>}
        {ac.dc.switchLoggedout ? <Logout dc={ac.dc} /> : <div></div>}
        {ac.dc.switchToolsTemplate ? <ToolsTemplate dc={ac.dc} /> : <div></div>}
      </div>
    </div>





  );
}
