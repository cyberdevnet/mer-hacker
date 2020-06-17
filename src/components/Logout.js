import React from "react";
import "../styles/Logout.css";

export default function Logout(ac) {
  const ConfirmLogout = () => {
    ac.dc.setapiKey("");
    ac.dc.setgetOrgStatusCode(false);
    ac.dc.setswitchLoginAPI(true);
    ac.dc.setswitchDashboard(false);
    ac.dc.setswitchLoggedout(false);
    ac.dc.setinputKey("");
    ac.dc.setinputConfKey("");
    ac.dc.setlogInlogOut("Login");
  };

  const Cancel = () => {
    ac.dc.setswitchLoggedout(false);
    ac.dc.setswitchDashboard(true);
  };

  return (
    <div id="myModal">
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header">
            <div className="icon-box-logout">
              <i className="material-icons">&#xE5CD;</i>
            </div>
            <h4 className="modal-title">Are you sure?</h4>
            <button
              onClick={Cancel}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>Do you really want to Logout?</p>
          </div>
          <div className="modal-footer">
            <button
              onClick={Cancel}
              type="button"
              className="btn btn-info"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={ConfirmLogout}
              type="button"
              className="btn btn-danger"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
