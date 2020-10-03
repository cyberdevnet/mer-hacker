import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { useIdleTimer } from "react-idle-timer";
import $ from "jquery";

export default function SessionTimeout(ac) {
  const [sessionTime, setsessionTime] = useState(60); // <====== DO NOT CHANGE THIS VALUE
  const [sessionTimeout, setsessionTimeout] = useState(false);
  const [trigger, settrigger] = useState(0);
  let history = useHistory();

  const handleOnIdle = (event) => {
    getLastActiveTime();
    setsessionTimeout(true);
    settrigger(trigger + 1);
  };

  const handleOnActive = (event) => {
    getRemainingTime();
  };

  const handleOnAction = (e) => {
    getRemainingTime();
  };

  // idelTimeout set to 15 minutes
  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  const deleteCookie = async () => {
    try {
      await axios
        .post("/node/read-cookie", {
          username: ac.dc.User,
          isSignedIn: ac.dc.isSignedIn,
        })
        .then((res) => {
          return axios.post("/node/clear-cookie", {
            username: ac.dc.User,
            sessionID: res.data.sessionID,
          });
        })
        .then(() => {
          ac.setisSignedIn(false);
          history.push("/login");
        });
    } catch (e) {
      console.log(e);
    }
  };

  // send a 'leer' string to server on logout to clear the key

  async function postKey() {
    const rawResponse = await fetch("/node/post-api-key", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "leer",
        apiKey: "leer",
      }),
    });
    return await rawResponse.json();
  }

  useEffect(() => {
    if (trigger > 0) {
      const timer =
        sessionTime > 0 &&
        setInterval(() => setsessionTime(sessionTime - 1), 1000);

      if (sessionTime === 0) {
        handleLogOff();
        settrigger(0);
      }

      return () => clearInterval(timer);
    }

    // eslint-disable-next-line
  }, [trigger, sessionTime]);

  const handleClose = () => {
    setsessionTimeout(false);
    setsessionTime(60);
    settrigger(0);
  };

  const handleLogOff = () => {
    //since the timer runs at first render it fires the handleLogOff
    //on login the login not disappear
    //with this if statement we check if the api box is open or not
    // and we hide the login
    if (ac.dc.switchLoggedIn === true) {
      ac.dc.sethideLogin({ display: "none" });
    } else {
      ac.dc.sethideLogin({ display: "block" });
      deleteCookie();
      postKey();
      ac.dc.setswitchLoginAPI(true);
      setsessionTimeout(false);
      setsessionTime(0);
      ac.dc.setapiKey("");
      ac.dc.setisSignedIn(false);
      ac.dc.setgetOrgStatusCode(0);
      ac.dc.setswitchDashboard(false);
      ac.dc.setswitchLoggedout(false);
      ac.dc.setinputKey("");
      ac.dc.setinputConfKey("");
      ac.dc.setorganization("Set Organization");
      ac.dc.setnetworkID(0);
      ac.dc.setnetwork("Networks");
      ac.dc.setcollapseButton({ display: "none" });
      $(this).addClass("closed");
      $(".navbar-side").css({ left: "-260px" });
      $("#page-wrapper").css({ "margin-left": "0px" });
      axios.post("/node/delete_backupfile", {});
      axios.post("/flask/delete_debugfile", {});
      axios.post("/node/deletebackupRestoreFiles", {});
      axios.post("/node/deletebuild_meraki_switchconfigFiles", {});
      history.push("/login");
    }
  };

  return (
    <div>
      <Dialog open={sessionTimeout} onClose={handleClose}>
        <div>
          <div className="modal-header">
            <h4 className="modal-title-idle">
              Your session is about to expire due to inactivity
            </h4>
          </div>
          <div className="modal-body text-center">
            Please choose to stay signed in or to logoff. Otherwise, you will be
            logged off automatically.
          </div>
          <div className="modal-footer">
            <button
              onClick={handleClose}
              type="button"
              className="btn btn-info"
            >
              Stay Logged in ({sessionTime})
            </button>
            <button
              onClick={handleLogOff}
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
            >
              Log Off
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
