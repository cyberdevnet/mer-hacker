import React from "react";
import Dialog from '@material-ui/core/Dialog';
import "../../styles/CreateTemplateModal.css";


export default function GetAllClientsModal(ac) {


    const Cancel = () => {
        ac.dc.setshowclientModal(false);

    };

    return (
        <Dialog
            open={true}
            fullWidth
        >
            <div >
                <div className="modal-dialog-summary modal-confirm-summary">
                    <div >
                        <button onClick={Cancel} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="modal-header">
                            <h4>Client Details</h4>
                        </div>
                        <div className="modal-body text-center"
                            style={{ fontSize: '11px', color: 'darkslategray' }}>
                            <table className="table table-striped" id="table1">
                                <thead >
                                    <tr>
                                        <th id='col1' scope="col"></th>
                                        <th id='col2' scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody key='1'>
                                    <tr>
                                        <td style={{ float: 'left' }}> description </td>
                                        <td> {ac.dc.singleClient.description} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> firstSeen </td>
                                        <td> {ac.dc.singleClient.firstSeen} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> groupPolicy8021x </td>
                                        <td> {ac.dc.singleClient.groupPolicy8021x} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> id </td>
                                        <td> {ac.dc.singleClient.id} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> ip </td>
                                        <td> {ac.dc.singleClient.ipEnabled} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> ip6 </td>
                                        <td> {ac.dc.singleClient.ip6} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> ip6local </td>
                                        <td> {ac.dc.singleClient.ip6Local} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> lastSeen </td>
                                        <td> {ac.dc.singleClient.lastSeen} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> mac </td>
                                        <td> {ac.dc.singleClient.mac} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> manufacturer </td>
                                        <td> {ac.dc.singleClient.manufacturer} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> notes </td>
                                        <td> {ac.dc.singleClient.notes} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> os </td>
                                        <td> {ac.dc.singleClient.os} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> recentDeviceName </td>
                                        <td> {ac.dc.singleClient.recentDeviceName} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> recentDeviceSerial </td>
                                        <td> {ac.dc.singleClient.recentDeviceSerial} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> smInstalled </td>
                                        <td> {ac.dc.singleClient.smInstalled} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> ssid </td>
                                        <td> {ac.dc.singleClient.ssid} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> status </td>
                                        <td> {ac.dc.singleClient.status} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> switchport </td>
                                        <td> {ac.dc.singleClient.switchport} </td>
                                    </tr>
                                    {/* <tr>
                                        <td style={{ float: 'left' }}> usage </td>
                                        <td> {ac.dc.singleClient.usage} </td>
                                    </tr> */}
                                    <tr>
                                        <td style={{ float: 'left' }}> user </td>
                                        <td> {ac.dc.singleClient.user} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> vlan </td>
                                        <td> {ac.dc.singleClient.vlan} </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

        </Dialog>
    );
}