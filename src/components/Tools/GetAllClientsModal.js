import React from "react";
import Dialog from '@material-ui/core/Dialog';
import "../../styles/CreateTemplateModal.css";


export default function GetAllClientsModal(ac) {

    let ClientList = Number(ac.dc.clientListID)


    const Cancel = () => {
        ac.dc.setshowclientModal(false);

    };

    const handleClientUp = () => {

        if (ClientList < ac.dc.allClients.length && ac.dc.clientListID !== ac.dc.allClients.length - 1) {
            ac.dc.setsingleClient(ac.dc.allClients[ClientList + 1])
            ac.dc.setclientListID(ClientList + 1)
        }

    };

    const handleClientDown = () => {
        if (ClientList > 0) {
            ac.dc.setsingleClient(ac.dc.allClients[ClientList - 1])
            ac.dc.setclientListID(ClientList - 1)
        }
    };

    return (
        <Dialog
            open={true}
            fullWidth
        >
            <div >
                <div className="modal-dialog-summary modal-confirm-summary">
                    <div >
                        <div style={{ borderBottom: 'none' }} className="modal-header">
                            <button
                                onClick={Cancel}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                                style={{ top: '0px', right: '-55px', outline: 'none' }}
                            >
                                <span>&times;</span>
                            </button>
                            <button
                                onClick={handleClientUp}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                                style={{ top: '65px', right: '-45px', fontSize: '23px', color: 'black', outline: 'none' }}
                            >
                                <span className="glyphicon glyphicon-circle-arrow-right"></span>
                            </button>
                            <button
                                onClick={handleClientDown}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                                style={{ top: '65px', left: '-45px', fontSize: '23px', color: 'black', outline: 'none' }}
                            >
                                <span className="glyphicon glyphicon-circle-arrow-left" ></span>
                            </button>
                        </div>
                        <div className="modal-body text-center"
                            style={{ fontSize: '11px', color: 'darkslategray' }}>
                            <h4>Client Details</h4>
                            <table className="table table-striped" id="table1">
                                <thead >
                                    <tr>
                                        <th id='col1' scope="col"></th>
                                        <th id='col2' scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody key='1'>
                                    <tr>
                                        <th style={{ float: 'left' }}> description </th>
                                        <td> {ac.dc.singleClient.description} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> firstSeen </th>
                                        <td> {ac.dc.singleClient.firstSeen} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> groupPolicy8021x </th>
                                        <td> {ac.dc.singleClient.groupPolicy8021x} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> id </th>
                                        <td> {ac.dc.singleClient.id} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> ip </th>
                                        <td> {ac.dc.singleClient.ipEnabled} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> ip6 </th>
                                        <td> {ac.dc.singleClient.ip6} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> ip6local </th>
                                        <td> {ac.dc.singleClient.ip6Local} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> lastSeen </th>
                                        <td> {ac.dc.singleClient.lastSeen} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> mac </th>
                                        <td> {ac.dc.singleClient.mac} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> manufacturer </th>
                                        <td> {ac.dc.singleClient.manufacturer} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> notes </th>
                                        <td> {ac.dc.singleClient.notes} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> os </th>
                                        <td> {ac.dc.singleClient.os} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> recentDeviceName </th>
                                        <td> {ac.dc.singleClient.recentDeviceName} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> recentDeviceSerial </th>
                                        <td> {ac.dc.singleClient.recentDeviceSerial} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> smInstalled </th>
                                        <td> {ac.dc.singleClient.smInstalled} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> ssid </th>
                                        <td> {ac.dc.singleClient.ssid} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> status </th>
                                        <td> {ac.dc.singleClient.status} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> switchport </th>
                                        <td> {ac.dc.singleClient.switchport} </td>
                                    </tr>
                                    {/* <tr>
                                        <th style={{ float: 'left' }}> usage </th>
                                        <td> {ac.dc.singleClient.usage} </td>
                                    </tr> */}
                                    <tr>
                                        <th style={{ float: 'left' }}> user </th>
                                        <td> {ac.dc.singleClient.user} </td>
                                    </tr>
                                    <tr>
                                        <th style={{ float: 'left' }}> vlan </th>
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