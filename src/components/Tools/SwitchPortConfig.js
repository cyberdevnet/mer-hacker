import React from "react";
import Dialog from '@material-ui/core/Dialog';
import "../../styles/CreateTemplateModal.css";


export default function SwitchPortConfig(ac) {


    const Cancel = () => {
        ac.dc.setshowportConfig(false);

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
                            <h4>Switchport Configuration</h4>
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
                            <table className="table table-striped" id="table1">
                                <thead >
                                    <tr>
                                        <th id='col1' scope="col"></th>
                                        <th id='col2' scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody key='1'>
                                    <tr>
                                        <td style={{ float: 'left' }}> Switchport </td>
                                        <td> {ac.dc.singleSwitchports.number} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Name </td>
                                        <td> {ac.dc.singleSwitchports.name} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Tags </td>
                                        <td> {ac.dc.singleSwitchports.tags} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Port enabled </td>
                                        <td> {ac.dc.singleSwitchports.enabled} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> PoE </td>
                                        <td> {ac.dc.singleSwitchports.poeEnabled} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Type </td>
                                        <td> {ac.dc.singleSwitchports.type} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Native VLAN </td>
                                        <td> {ac.dc.singleSwitchports.vlan} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Allowed VLANs </td>
                                        <td> {ac.dc.singleSwitchports.allowedVlans} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Access policy </td>
                                        <td> {ac.dc.singleSwitchports.accessPolicyNumber} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Whitelisted MACs </td>
                                        <td> {ac.dc.singleSwitchports.stickyMacWhitelist} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Whitelist size limit </td>
                                        <td> {ac.dc.singleSwitchports.stickyMacWhitelistLimit} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> VLAN </td>
                                        <td> {ac.dc.singleSwitchports.vlan} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Voice VLAN </td>
                                        <td> {ac.dc.singleSwitchports.voiceVlan} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Link </td>
                                        <td> {ac.dc.singleSwitchports.linkNegotiation} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> RSTP </td>
                                        <td> {ac.dc.singleSwitchports.rstpEnabled} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> STP guard </td>
                                        <td> {ac.dc.singleSwitchports.stpGuard} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Port schedule </td>
                                        <td> {ac.dc.singleSwitchports.portScheduleId} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Port isolation </td>
                                        <td> {ac.dc.singleSwitchports.isolationEnabled} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> Storm Control </td>
                                        <td> {ac.dc.singleSwitchports.stormControlEnabled} </td>
                                    </tr>
                                    <tr>
                                        <td style={{ float: 'left' }}> UDLD </td>
                                        <td> {ac.dc.singleSwitchports.udld} </td>
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