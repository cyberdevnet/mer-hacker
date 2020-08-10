import React from "react";
import Dialog from '@material-ui/core/Dialog';
import "../../styles/CreateTemplateModal.css";


export default function SwitchPortTemplateSummary(ac) {
    console.log("SwitchPortTemplateSummary -> ac", ac)

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
                <div className="modal-dialog modal-confirm">
                    <div >
                        <div className="modal-header">
                        </div>
                        <div className="modal-body text-center"
                            style={{ fontSize: '11px', color: 'darkslategray' }}>
                            <h4>Configuration Summary</h4>
                            <table className="table table-striped" id="table1">
                                <thead >
                                    <tr>
                                        <th id='col1' scope="col">Number</th>
                                        <th id='col2' scope="col">Name</th>
                                        <th id='col3' scope="col">Type</th>
                                        <th id='col4' scope="col">VLAN</th>
                                        <th id='col5' scope="col">Template</th>
                                    </tr>
                                </thead>
                                {/* <tbody> */}
                                {ac.dc.allSelectedPorts.map((port) =>
                                    <tbody>
                                        <tr>
                                            <th scope="row">{port.number}</th>
                                            <td>{port.name}</td>
                                            <td>{port.vlan}</td>
                                            <td>{port.type}</td>
                                            <td>{port.template}</td>
                                        </tr>
                                        {/* <tr>
                                            <th scope="row">Number</th>
                                            <td>{port.number}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Name</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Type</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">VLAN</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Template</th>
                                            <td></td>
                                        </tr> */}
                                    </tbody>

                                )}
                                {/* <tr>
                                        <th scope="row">Number</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Name</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Type</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">VLAN</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Template</th>
                                        <td></td>
                                    </tr> */}
                                {/* </tbody> */}
                            </table>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Deploy</button>
                            <button type="button" onClick={Cancel} className="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </Dialog>
    );
}