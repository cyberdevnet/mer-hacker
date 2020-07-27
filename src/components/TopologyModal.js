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
        // fullWidth
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
                        <div className="modal-body text-center">
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </Dialog>
    );
}