import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import "../../styles/AlertsModal.css";

export default function SettingsEditUser(ac) {
  const handleDeleteModal = () => {
    ac.dc.setswitchEditUser(false);
    ac.dc.setbuttonStyle({ display: "block" });
  };

  const handleClearSession = () => {
    axios.post("/node/delete-user", { ID: ac.dc.userID });
    ac.dc.setswitchEditUser(false);
    ac.dc.settriggerSessions(ac.dc.triggerSessions + 1);
    ac.dc.settriggerUsers(ac.dc.triggerUsers + 1);
    ac.dc.setbuttonStyle({ display: "block" });
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
                onClick={handleDeleteModal}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <span>{ac.dc.AlertDeleteError}</span>
            </div>
            <div className="modal-footer">
              <button
                style={ac.dc.buttonStyle}
                type="button"
                className="btn btn-cancelSignedIn"
                data-dismiss="modal"
                onClick={handleDeleteModal}
              >
                Cancel
              </button>
              <button
                style={ac.dc.buttonStyle}
                type="button"
                className="btn btn-endSession"
                onClick={handleClearSession}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
