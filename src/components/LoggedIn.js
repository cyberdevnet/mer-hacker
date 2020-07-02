import React from "react";
import { useHistory } from "react-router-dom";

import $ from 'jquery'
import "../styles/LoggedIn.css";

export default function LoggedIn(ac) {

  let history = useHistory();

  const handleLoginSuccess = () => {
    ac.dc.setapiKey(ac.dc.inputKey);
    ac.dc.setswitchLoggedIn(false);
    ac.dc.setswitchLoginAPI(false);
    ac.dc.setswitchDashboard(true);
    ac.dc.setswitchLoggedout(false);
    history.push('/home')
    ac.dc.setcollapseButton({ display: 'block' })
    $('.navbar-side').animate({ left: '0px' });
    $(this).removeClass('closed');
    $('#page-wrapper').animate({ 'margin-left': '260px' });



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
              <div>
                <p>Please set your Meraki API key</p>
              </div>
              <div className="col-md-6">
                <form >
                  <div className="form-group">
                    <input
                      type="password"
                      required={true}
                      className="form-control"
                      placeholder="API key *"
                      value={ac.dc.inputKey}
                      autoComplete="api"
                      onChange={(e) => ac.dc.setinputKey(e.target.value)}
                    />
                  </div>
                </form>
              </div>
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
