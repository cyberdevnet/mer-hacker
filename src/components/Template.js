import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Select from "react-select";
import ProtectedRoute from '../ProtectedRoute'
import Home from './Home'
import LoginAPI from "./LoginAPI";
import Dashboard from "./Dashboard";
import LoggedIn from "./LoggedIn";
import Logout from "./Logout";
import PageNotFound from '../PageNotFound'
import ToolsTemplate from "./ToolsTemplate";
import AlertModal from "./AlertsModal";
import Countdown from 'react-countdown';
import "../styles/Template.css";




export default function Template(ac, dc) {

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
    ac.dc.setshowRestorescript(false)
    ac.dc.setisOrgSelected(true);
  };

  const HandleNetwork = (opt) => {
    ac.dc.setnetwork(opt.label);
    ac.dc.setnetworkID(opt.id);
    ac.dc.setshowRestorescript(false)
    ac.dc.setisNetSelected(true);
    ac.dc.settriggerTopReports(ac.dc.triggerTopReports + 1);
  };

  return (
    <Router>
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
                <i className="icon fa fa-plane" ></i> MER-HACKER
            </strong>
            </a>

            <div id="sideNav" href="" >
              <i className="fa fa-bars icon" style={ac.dc.collapseButton}></i>
            </div>
          </div>
          <div className="nav navbar-top-links navbar-right">
            {ac.dc.isSignedIn ? (<div className='timeout-wrapper'>
              Session Timeout: <Countdown className='timeout' date={Date.now() + (ac.dc.sessionTime * 1000)} daysInHours />

            </div>) : (<div></div>)}
          </div>

        </nav>

        <nav className="navbar-default navbar-side" role="navigation" >
          <div className="sidebar-collapse">
            <ul className="nav" id="main-menu">
              <li>
                {ac.dc.isSignedIn ? (<NavLink
                  exact
                  to='logout'
                  href="#logout"
                >
                  <i className="fa fa-desktop"></i>Logout
                </NavLink>) : (<div></div>)}

              </li>
              <li>
                <NavLink
                  exact
                  to='home'
                  href="#home"
                >
                  <i className="fa fa-desktop"></i> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to='dashboard'
                  href="#dashboard"
                >
                  <i className="fa fa-dashboard"></i> Dashboard
                  </NavLink>
              </li>
              <div className="select-organization">
                <p>ORGANIZATION</p>
              </div>
              <Select
                options={ORGANIZATIONS}
                placeholder={ac.dc.organization}
                onChange={HandleOrganization}
                classNamePrefix="foo"
                onMenuOpen={() => ac.dc.settriggerSelectOrg(ac.dc.triggerSelectOrg + 1)}
              />

              <div className="select-network">
                <p>NETWORK</p>
              </div>
              <Select
                options={NETWORKS}
                placeholder={ac.dc.network}
                onChange={HandleNetwork}
                classNamePrefix="foo"
              />


              <li>
                <NavLink
                  exact
                  to='tools'
                  href="#null"
                >
                  <i className="fa fa-wrench"></i> Tools
                  </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div id="page-wrapper" >
          <div className="header">
            <p className="page-header"></p>
          </div>
          {ac.dc.switchAlertModal ? <AlertModal dc={ac.dc} /> : <div></div>}
          {ac.dc.switchLoggedIn ? <LoggedIn dc={ac.dc} /> : <div></div>}
          {ac.dc.switchLoggedout ? <Logout dc={ac.dc} /> : <div></div>}

          <Switch>
            <Route exact path='/login' render={(dc) => (<LoginAPI {...ac.dc} dc={dc} />)} />
            <ProtectedRoute exact path='/' component={Home} {...ac.dc} dc={dc} />
            <ProtectedRoute exact path='/home' component={Home} {...ac.dc} dc={dc} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} {...ac.dc} dc={dc} />
            <ProtectedRoute exact path='/tools' component={ToolsTemplate} {...ac.dc} dc={dc} />
            <ProtectedRoute exact path='/logout' component={Logout} {...ac.dc} dc={dc} />


            {/* do not cancel this */}
            {/* <Route exact path='/login' render={(dc) => (<LoginAPI {...ac.dc} dc={dc} />)} /> */}
            <Route component={PageNotFound} />
          </Switch>

        </div>
      </div>
    </Router>



  );
}
