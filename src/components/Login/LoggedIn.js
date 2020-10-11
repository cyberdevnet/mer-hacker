import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'


import $ from "jquery";
import "../../styles/LoggedIn.css";

export default function LoggedIn(ac) {
  const [loading, setloading] = useState(false);
  const [inputKey, setinputKey] = useState("");
  const [triggerLogin, settriggerLogin] = useState(0);


  // post key to backend

  axios.defaults.withCredentials = true;


  async function postKey() {
    try {
      const rawResponse = await axios.post(
        "/node/post-api-key",
        {
          isSignedIn: ac.dc.isSignedIn,
          username: `${ac.dc.User}`,
          realUsername: `${ac.dc.User}`,
          apiKey: `${inputKey}`,
        }
      );
  return await rawResponse.json();
      
    } catch (error) {
    }
  }


  let history = useHistory();

  const isFirstSetKey = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    if (isFirstSetKey.current) {
      isFirstSetKey.current = false;
      return;
    }
    const handleLoginSuccess = () => {
      setloading(true);
      postKey()
        .then(() => {
          setTimeout(() => {
            ac.dc.setisSignedIn(true);
            ac.dc.setswitchLoggedIn(false);
            ac.dc.setswitchLoginAPI(false);
            ac.dc.setswitchDashboard(true);
            ac.dc.setswitchLoggedout(false);
            ac.dc.setcollapseButton({ display: "block" });
            $(".navbar-side").animate({ left: "0px" });
            $(this).removeClass("closed");
            $("#page-wrapper").animate({ "margin-left": "260px" });
            history.push("/home");
            setloading(false);
          }, 1500);
        })
        .then(() => {
          // Trigger getOrganization on-login
          setTimeout(() => {
             ac.dc.settriggerGetOrg(ac.dc.triggerGetOrg + 1);
          }, 3500);
        });
    };
    handleLoginSuccess();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [triggerLogin]);

  const setKey = (e) => {
    e.preventDefault();
    setinputKey(e.target.value);
  };

  const handleLoginEnter = (e) => {
    if (e.key === "Enter") {
      settriggerLogin(triggerLogin + 1);
    }
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
                <form>
                  <div className="form-group">
                    <input
                      type="password"
                      required={true}
                      className="form-control-api"
                      placeholder="API key"
                      value={inputKey}
                      autoComplete="api"
                      onChange={(e) => setKey(e)}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault(e);
                        handleLoginEnter(e);
                      }}
                      // onChange={(e) => setinputKey(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer-logged-in">
              <button
                onClick={
                  !loading ? () => settriggerLogin(triggerLogin + 1) : null
                }
                disabled={loading}
                className="btn btn-success btn-block"
                data-dismiss="modal"
              >
                {loading && (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
                {loading && <span>Login</span>}
                {!loading && <span>OK</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}       