import React from "react";
import Dialog from '@material-ui/core/Dialog';
import "../../styles/CreateTemplateModal.css";


export default function SwitchPortTemplateSummary(ac) {


    const Cancel = () => {
        ac.dc.setshowSummary(false);
        ac.dc.setallSelectedPorts([])
        ac.dc.setconfigureDisabled(true)
        ac.dc.settrigger(ac.dc.trigger + 1);
    };

    return (
        <Dialog
            open={true}
            fullWidth
        >
            <div >
                <div className="modal-dialog-summary modal-confirm-summary">
                    <div >
                        <div className="modal-header">
                            <h4>Configuration Summary</h4>
                            {ac.dc.responseMessage}
                        </div>
                        <div className="modal-body text-center"
                            style={{ fontSize: '11px', color: 'darkslategray' }}>
                            <table className="table table-striped" id="table2">
                                <thead >
                                    <tr>
                                        <th id='col11' scope="col">Hostname</th>
                                        <th id='col21' scope="col">IP address</th>
                                        <th id='col31' scope="col">Model</th>
                                    </tr>
                                </thead>
                                <tbody key='2'>
                                    <tr>
                                        <th scope="row">{ac.dc.switchDeviceName}</th>
                                        <td>{ac.dc.switchDeviceIp}</td>
                                        <td>{ac.dc.switchDeviceModel}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className="modal-body text-center"
                            style={{ fontSize: '11px', color: 'darkslategray' }}>
                            {/* <h4>Configuration Summary</h4> */}
                            <table className="table table-striped" id="table1">
                                <thead >
                                    <tr>
                                        <th id='col1' scope="col">Number</th>
                                        <th id='col2' scope="col">New Description</th>
                                        {/* <th id='col3' scope="col">Type</th> */}
                                        {/* <th id='col4' scope="col">VLAN</th> */}
                                        <th id='col5' scope="col">Template selected</th>
                                    </tr>
                                </thead>
                                {/* <tbody> */}
                                {ac.dc.allSelectedPorts.map((port) =>
                                    <tbody key={port.number}>
                                        <tr>
                                            <th scope="row">{port.number}</th>
                                            <td>{port.payload.name}</td>
                                            {/* <td>{port.name}</td> */}
                                            {/* <td>{port.type}</td> */}
                                            {/* <td>{port.vlan}</td> */}
                                            <td>{port.template}</td>
                                        </tr>
                                    </tbody>

                                )}
                            </table>

                        </div>
                        <div className="modal-footer text-center">
                            <button
                                onClick={() => ac.dc.settriggerDeploy(ac.dc.triggerDeploy + 1)}
                                className="btn-summary btn-primary"
                                disabled={ac.dc.loadingSummaryBtn}
                            >
                                {ac.dc.loadingSummaryBtn && (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                    />
                                )}
                                {ac.dc.loadingSummaryBtn && <span>Deploy</span>}
                                {!ac.dc.loadingSummaryBtn && <span>Deploy</span>}
                            </button>
                            <button style={{ float: 'left' }} type="button" onClick={Cancel} className="btn-summary btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </Dialog>
    );
}