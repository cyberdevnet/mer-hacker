import React from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'


import $ from 'jquery'
import "../styles/Logout.css";

export default function Logout(ac, props) {


  let history = useHistory();


  const deleteCookie = async () => {
    try {
      await axios.get('/node/clear-cookie');
      ac.setisSignedIn(false);
      history.push('/login')

    } catch (e) {
      console.log(e);
    }
  };


  // send a 'leer' string to server on logout to clear the key
  async function postKey() {
    const rawResponse = await fetch('/node/post-api-key', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'leer' })
    })
    return await rawResponse.json();
  }

  const ConfirmLogout = () => {
    deleteCookie()
    postKey()
    history.push('/login')
    ac.setswitchLoginAPI(true);
    ac.setapiKey("");
    ac.setisSignedIn(false)
    ac.setgetOrgStatusCode(0);
    ac.setswitchDashboard(false);
    ac.setswitchLoggedout(false);
    ac.setinputKey("");
    ac.setinputConfKey("");
    ac.setorganization("Set Organization");
    ac.setnetworkID(0);
    ac.setnetwork("Networks");
    ac.setcollapseButton({ display: 'none' })
    $(this).addClass('closed');
    $('.navbar-side').css({ left: '-260px' });
    $('#page-wrapper').css({ 'margin-left': '0px' });
    ac.sethideLogin({ display: "block" });
    axios.post("/node/delete_backupfile", {})
    axios.post("/flask/delete_debugfile", {})
    // axios.post("/delete_debugfile", {}).then(res => console.log(res)).catch(error => console.log(error))
  };

  const Cancel = () => {
    ac.history.goBack()
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
