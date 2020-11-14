import React from "react";
import Dialog from "@material-ui/core/Dialog";
import "../styles/AlertsModal.css";

export default function AlertsModal(ac) {
  const handleAlertsModal = () => {
    ac.dc.setswitchAlertModal(false);
    ac.dc.setswitchToolsTemplate(true);
  };
  return (
    <Dialog open={true}>

  
  
<div className="modal-dialog modal-confirm">
  <div className="modal-content">
    <div style={{marginTop:'-45px'}} className="modal-header text-center">
      <button
        onClick={handleAlertsModal}
        type="button"
        className="close"
        data-dismiss="modal"
        aria-hidden="true"
      ></button>
    </div>
    <div style={{marginTop:'-25px'}} className="modal-body text-center">
    <div className="icon-box">
        <i className="material-icons">&#xE86B;</i>
        <i className="material-icons">&#xE86B;</i>
        <i className="material-icons">&#xE645;</i>
      </div>
    </div>
    <div className="modal-body text-center">
      <h4>Something went wrong</h4>
      <span>{ac.dc.AlertModalError}</span>
    </div>
  </div>
</div>



    </Dialog>
  );
}

