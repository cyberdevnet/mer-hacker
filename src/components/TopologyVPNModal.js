import React from "react";
import Dialog from '@material-ui/core/Dialog';
import "../styles/TopologyModal.css";

export default function TopologyVPNModal(ac) {

    const handleTopologyVPNModal = () => {
        ac.dc.setswitchTopologyVPNModal(false);
    };

    let subnets = []
    let glyphicon = []
    // eslint-disable-next-line
    ac.dc.modelVPN.subnets.map((item, index) => {
        if (item.useVpn) {
            glyphicon.push(<span className="glyphicon glyphicon-check" style={{ color: '#1ABC9C' }}></span>)
        } else {
            glyphicon.push(<span className="glyphicon glyphicon-check" style={{ color: '#f36a5a' }}></span>)

        }

        subnets.push(
            <tr key={index}>
                <th scope="row">{index}</th>
                <td style={{ textAlign: 'left' }} >{item.localSubnet}</td>
                <td style={{ textAlign: 'left' }} >{item.useVpn}{glyphicon[index]}</td>
            </tr>
        )
    }
    )
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
                                onClick={handleTopologyVPNModal}
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
                            <h4>VPN Node Details</h4>
                            <table className="table table-striped" id="table1">
                                <thead >
                                    <tr>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Name</th>
                                        <td>{ac.dc.modelVPN.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Mode</th>
                                        <td>{ac.dc.modelVPN.mode}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table table-striped" id="table2">
                                <thead >
                                    <tr>
                                        <th id='col1' scope="col">#</th>
                                        <th id='col2' scope="col">Subnets</th>
                                        <th id='col3' scope="col">Subnet in VPN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subnets}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

        </Dialog>
    );
}