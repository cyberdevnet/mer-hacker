import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";

import $ from "jquery";
import "../../styles/Logout.css";

export default function Logout(ac, props) {
  const [loading, setloading] = useState(false);

  let history = useHistory();

  axios.defaults.withCredentials = true;


  const deleteCookie = async () => {
    try {
      await axios
        .post("/node/read-cookie", {
          username: ac.User,
          isSignedIn: ac.isSignedIn,
        })
        .then((res) => {
          return axios.post("/node/clear-cookie", {
            username: ac.User,
            sessionID: res.data.sessionID,
          });
        })
        .then(() => {
          ac.setisSignedIn(false);
          history.push("/login");
        });
    } catch (e) {

    }
  };

  // send a 'leer' string to server on logout to clear the key

  async function postKey() {
    try {
      const rawResponse = await axios.post("/node/post-api-key", {
        isSignedIn: false,
        username: "leer",
        realUsername: ac.User,
        apiKey: "leer"
  })
  return await rawResponse.json();
      
    } catch (error) {
    }
  }

  const ConfirmLogout = () => {
    setloading(true)
    setTimeout(() => {
      deleteCookie();
    history.push("/login");
    ac.setUser([]);
    ac.setswitchLoginAPI(true);
    ac.setisSignedIn(false);
    ac.setgetOrgStatusCode(0);
    ac.setswitchDashboard(false);
    ac.setswitchLoggedout(false);
    ac.setisOrgSelected(false);
    ac.setisNetSelected(false);
    ac.setisUsingADauth(false);
    ac.setnetworkList([]);
    ac.setdeviceList([]);
    ac.settotalDevices(0);
    ac.settimeZone(0);
    ac.setinputKey("");
    ac.setinputConfKey("");
    ac.setorganization("Set Organization");
    ac.setnetworkID(0);
    ac.setorganizationID(0);
    ac.setnetwork("Networks");
    ac.setdeviceList([]);
    ac.setSNtopUsers("");
    ac.setcollapseButton({ display: "none" });
    $(this).addClass("closed");
    $(".navbar-side").css({ left: "-260px" });
    $("#page-wrapper").css({ "margin-left": "0px" });
    ac.sethideLogin({ display: "block" });
    axios.post("/node/delete_backupfile", {});
    axios.post("/flask/delete_debugfile", {});
    axios.post("/node/deletebackupRestoreFiles", {});
    axios.post("/node/deletebuild_meraki_switchconfigFiles", {});
    postKey();
    setloading(false);
    }, 2300);
    

  };

  const Cancel = () => {
    ac.history.goBack();
  };

  return (
    <Dialog open={true}>
      <div>
        <div className="modal-dialog modal-confirm">
          <div>
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
                onClick={!loading ? ConfirmLogout : null}
                disabled={loading}
                className="btn btn-danger"
                >
                {loading && (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
                {loading && <span>Logout</span>}
                {!loading && <span>Logout</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
