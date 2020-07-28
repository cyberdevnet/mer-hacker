import React from "react";
import Dialog from '@material-ui/core/Dialog';
import "../styles/TopologyModal.css";

export default function TopologyModal(ac) {
    const handleTopologyModal = () => {
        ac.dc.setswitchTopologyModal(false);
    };
    return (
        <Dialog
            open={true}
            fullWidth
        // onClose={handleClose}
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
        >
            <div >
                <div className="modal-dialog modal-confirm">
                    <div >
                        <div className="modal-header">
                            <button
                                onClick={handleTopologyModal}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center"
                            style={{ fontSize: '11px', color: 'darkslategray' }}>
                            <h4>Client Details</h4>
                            <table className="table table-striped">
                                <thead >
                                    <tr>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Name</th>
                                        <td>{ac.dc.model.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Description</th>
                                        <td>{ac.dc.model.description}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Connected to</th>
                                        <td>{ac.dc.sourceDeviceName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Port</th>
                                        <td>{ac.dc.model.switchport}</td>


                                    </tr>
                                    <tr>
                                        <th scope="row">VLAN</th>
                                        <td>{ac.dc.model.vlan}</td>


                                    </tr>
                                    <tr>
                                        <th scope="row">IP address</th>
                                        <td>{ac.dc.model.ipaddress}</td>


                                    </tr>
                                    <tr>
                                        <th scope="row">MAC address</th>
                                        <td>{ac.dc.model.mac}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CDP</th>
                                        <td>{ac.dc.model.cdp}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">clientVpnConnections</th>
                                        <td>{ac.dc.model.clientVpnConnections}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">ip6</th>
                                        <td>{ac.dc.model.ip6}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">lldp</th>
                                        <td>{ac.dc.model.lldp}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">manufacturer</th>
                                        <td>{ac.dc.model.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">os</th>
                                        <td>{ac.dc.model.os}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">recentDeviceMac</th>
                                        <td>{ac.dc.model.recentDeviceMac}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">smInstalled</th>
                                        <td>{ac.dc.model.smInstalled}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">ssid</th>
                                        <td>{ac.dc.model.ssid}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">status</th>
                                        <td>{ac.dc.model.status}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">user</th>
                                        <td>{ac.dc.model.user}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">wirelessCapabilities</th>
                                        <td>{ac.dc.model.wirelessCapabilities}</td>
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