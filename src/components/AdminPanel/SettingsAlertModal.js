import React from "react";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import "../../styles/AlertsModal.css";

export default function SettingsAlertsModal(ac) {

  const Axios = axios.create({
    withCredentials: true,
  });
  const handleAlertsModal = () => {
    ac.dc.setswitchAlertModal(false);
  };

  const handleClearSession = () => {
    Axios.post("/node/delete-session", {
      ID: ac.dc.sessionID,
      isSignedIn: ac.cc.isSignedIn,
    });
    ac.dc.setswitchAlertModal(false);
    ac.dc.settriggerSessions(ac.dc.triggerSessions + 1);
    ac.dc.settriggerUsers(ac.dc.triggerUsers + 1);
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
                onClick={handleAlertsModal}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <span>{ac.dc.AlertModalError}</span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-cancelSignedIn"
                data-dismiss="modal"
                onClick={handleAlertsModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-endSession"
                onClick={handleClearSession}
              >
                Clear Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
