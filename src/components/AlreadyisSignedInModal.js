import React from "react";
import Dialog from "@material-ui/core/Dialog";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import $ from "jquery";
import "../styles/AlreadyisSignedInModal.css";

export default function AlreadyisSignedIn(ac) {
  // let history = useHistory();

  // <===========================================================>
  // COMPONENT UNDER CONSTRUCTION
  // <===========================================================>

  const handleAlreadyisSignedIn = () => {
    ac.setshowAlreadyisSignedInModal(false);
  };

  // const deleteCookie = async () => {
  //   try {
  //     await axios
  //       .post("/node/read-cookie", {
  //         username: ac.User,
  //         isSignedIn: ac.isSignedIn,
  //       })
  //       .then((res) => {
  //         return axios.post("/node/clear-cookie", {
  //           username: ac.User,
  //           sessionID: res.data.sessionID,
  //         });
  //       })
  //       .then(() => {
  //         ac.setisSignedIn(false);
  //         history.push("/login");
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // send a 'leer' string to server on logout to clear the key
  // async function postKey() {
  //   const rawResponse = await fetch("/node/post-api-key", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: "leer",
  //       apiKey: "leer",
  //     }),
  //   });
  //   return await rawResponse.json();
  // }

  // const ConfirmLogout = () => {
  //   deleteCookie();
  //   postKey();
  //   history.push("/login");
  //   ac.setswitchLoginAPI(true);
  //   ac.setapiKey("");
  //   ac.setisSignedIn(false);
  //   ac.setgetOrgStatusCode(0);
  //   ac.setswitchDashboard(false);
  //   ac.setswitchLoggedout(false);
  //   ac.setinputKey("");
  //   ac.setinputConfKey("");
  //   ac.setorganization("Set Organization");
  //   ac.setnetworkID(0);
  //   ac.setnetwork("Networks");
  //   ac.setcollapseButton({ display: "none" });
  //   $(this).addClass("closed");
  //   $(".navbar-side").css({ left: "-260px" });
  //   $("#page-wrapper").css({ "margin-left": "0px" });
  //   ac.sethideLogin({ display: "block" });
  //   axios.post("/node/delete_backupfile", {});
  //   axios.post("/flask/delete_debugfile", {});
  // };

  // const handleExitSession = () => {
  //   ConfirmLogout();
  //   setTimeout(() => {
  //     // ac.dc.settriggertryLogin(ac.dc.triggertryLogin + 1);
  //     ac.setshowAlreadyisSignedInModal(false);
  //   }, 1000);
  // };

  return (
    <Dialog open={true}>
      <div>
        <div className="modal-dialog-AlreadyisSignedIn modal-confirm">
          <div>
            <div className="modal-header">
              <div className="icon-box">
                <i className="material-icons">&#xE86B;</i>
                <i className="material-icons">&#xE86B;</i>
                <i className="material-icons">&#xE645;</i>
              </div>
              <button
                onClick={handleAlreadyisSignedIn}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <h5>
                You are already logged in as this user. Pleas wait until the
                other session is finished.
              </h5>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-cancelSignedIn"
                data-dismiss="modal"
                onClick={handleAlreadyisSignedIn}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-endSession"
                onClick={handleExitSession}
              >
                End Existing Session
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
