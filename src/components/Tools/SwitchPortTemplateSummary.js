import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import "../../styles/CreateTemplateModal.css";


export default function SwitchPortTemplateSummary(ac) {
    const [loading, setloading] = useState(false)

    const Cancel = () => {
        ac.dc.setshowSummary(false);
    };

    // let IDList = Number(ac.dc.nodeVPNListID)

    // const handleVPNnodeUp = () => {
    //     if (IDList < ac.dc.VPNModel.length - 1) {
    //         ac.dc.setnodeVPNListID(IDList + 1)
    //         ac.dc.setmodelVPN(ac.dc.VPNModel[IDList])
    //     }
    // };

    // const handleVPNnodeDown = () => {
    //     if (IDList > 0) {
    //         ac.dc.setnodeVPNListID(IDList - 1)
    //         ac.dc.setmodelVPN(ac.dc.VPNModel[IDList])
    //     }
    // };

    // let subnets = []
    // let glyphicon = []
    // // eslint-disable-next-line
    // ac.dc.modelVPN.subnets.map((item, index) => {
    //     if (item.useVpn) {
    //         glyphicon.push(<span className="glyphicon glyphicon-check" style={{ color: '#1ABC9C' }}></span>)
    //     } else {
    //         glyphicon.push(<span className="glyphicon glyphicon-check" style={{ color: '#f36a5a' }}></span>)

    //     }

    //     subnets.push(
    //         <tr key={index}>
    //             <th scope="row">{index}</th>
    //             <td style={{ textAlign: 'left' }} >{item.localSubnet}</td>
    //             <td style={{ textAlign: 'left' }} >{item.useVpn}{glyphicon[index]}</td>
    //         </tr>
    //     )
    // }
    // )

    // ac.dc.allSelectedPorts.map(() => {

    // })


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
                        </div>
                        <div className="modal-body text-center"
                            style={{ fontSize: '11px', color: 'darkslategray' }}>
                            {/* <h4>Configuration Summary</h4> */}
                            <table className="table table-striped" id="table1">
                                <thead >
                                    <tr>
                                        <th id='col1' scope="col">Number</th>
                                        <th id='col2' scope="col">Name</th>
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
                                            <td>{port.name}</td>
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
                                disabled={loading}
                            >
                                {loading && (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                    />
                                )}
                                {loading && <span>Deploy</span>}
                                {!loading && <span>Deploy</span>}
                            </button>
                            <button style={{ float: 'left' }} type="button" onClick={Cancel} className="btn-summary btn-danger" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </Dialog>
    );
}