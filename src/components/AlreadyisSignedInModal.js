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
                You are already logged in as this user. Pleas logout from any other browser, refresh
                your page and try again.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
