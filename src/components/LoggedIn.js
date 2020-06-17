import React from "react";
import "../styles/LoggedIn.css";

export default function LoggedIn(ac) {
  const handleLoginSuccess = () => {
    ac.dc.setswitchLoggedIn(false);
    ac.dc.setswitchLoginAPI(false);
    ac.dc.setswitchDashboard(true);
    ac.dc.setswitchLoggedout(false);
    ac.dc.setclassLogin("");
    ac.dc.setclassDashboard("active-menu");
    ac.dc.setlogInlogOut("Logout");
  };
  return (
    <div>
      <div id="myModal">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header">
              <div className="icon-box-login">
                <i className="material-icons">&#xE876;</i>
              </div>
              <h4 className="modal-title">Awesome!</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">You have successefully Logged-in</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleLoginSuccess}
                className="btn btn-success btn-block"
                data-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
