import React from "react";
import Dialog from '@material-ui/core/Dialog';
import "../styles/AlertsModal.css";

export default function AlertsModal(ac) {
  const handleAlertsModal = () => {
    ac.dc.setswitchAlertModal(false);
    ac.dc.setswitchToolsTemplate(true);
  };
  return (
    <Dialog
      open={true}
    // fullWidth
    // onClose={handleClose}
    // aria-labelledby="alert-dialog-title"
    // aria-describedby="alert-dialog-description"
    >
      <div >
        <div className="modal-dialog modal-confirm">
          <div >
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
              <h4>Something went wrong</h4>
              <span>{ac.dc.AlertModalError}</span>
              {/* <p>Please set Organization and Network.</p> */}
            </div>
          </div>
        </div>
      </div>

    </Dialog>
  );
}


{/* <div id="myModal">
<div className="modal-dialog modal-confirm">
  <div className="modal-content">
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
      <h4>Something went wrong</h4>
      <span>{ac.dc.AlertModalError}</span>
      <p>Please set Organization and Network.</p>
    </div>
  </div>
</div>
</div> */}