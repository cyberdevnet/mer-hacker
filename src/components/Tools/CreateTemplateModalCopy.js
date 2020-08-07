import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import Select from "react-select";
import "../../styles/CreateTemplateModal.css";

export default function CreateTemplateModal(ac) {

    const [templates, settemplates] = useState();



    const SCHEDULElIST = [
        { port: "Unscheduled" },
    ]
    const SCHEDULELIST = SCHEDULElIST.map((opt) => ({
        label: opt.port
    }))
    const stpList = [
        { stp: "Disabled" },
        { stp: "Root guard" },
        { stp: "BPDU guard" },
        { stp: "Loop guard" },
    ]
    const STPLIST = stpList.map((opt) => ({
        label: opt.stp
    }))

    const accessPolicyList = [
        { policy: "HybridAuthISE" },
        { policy: "Open" },
        { policy: "MAC Whitelist" },
        { policy: "Sticky MAC Whitelist" },
    ]
    const ACCESSPOLICYLIST = accessPolicyList.map((opt) => ({
        label: opt.policy
    }))

    const linklist = [
        { link: "Auto negotiate" },
        { link: "1 Gigabit full duplex (forced)" },
        { link: "100 Megabit auto" },
        { link: "100 Megabit half duplex (forced)" },
        { link: "100 Megabit full duplex (forced)" },
        { link: "10 Megabit auto" },
        { link: "10 Megabit half duplex (forced)" },
        { link: "10 Megabit full duplex (forced)" }
    ]
    const LINKLIST = linklist.map((opt) => ({
        label: opt.link
    }))

    const closeModal = () => {
        ac.dc.setcreateTemplateModal(false);
    };

    // const handleClientUp = () => {
    //     if (IDList < ac.dc.nodeslist.length) {
    //         ac.dc.setnodeListID(IDList + 1)
    //         ac.dc.APIcallClient(IDList)
    //     }

    // };

    // const handleClientDown = () => {
    //     if (IDList > 0) {
    //         ac.dc.setnodeListID(IDList - 1)
    //         ac.dc.APIcallClient(IDList)
    //     }
    // };
    return (
        <Dialog
            open={true}
            fullWidth
        >
            <div className="modal-body text-center">
                <form>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Template Name</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                required={true}
                                className="form-control"
                                placeholder="Template Name"
                            // value={ac.Password}
                            // onChange={e => ac.setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                required={true}
                                className="form-control"
                                placeholder="Name"
                            // value={ac.Password}
                            // onChange={e => ac.setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Tags</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                required={true}
                                className="form-control"
                                placeholder="Tags"
                            // value={ac.Password}
                            // onChange={e => ac.setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Port enabled</label>
                        <div className="col-sm-8">
                            <div className="form-check form-check-inline" style={{ margin: '5px' }}>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio1" value="option1" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio1" style={{ marginRight: '30px' }}>Enabled</label>


                                <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio2" value="option2" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio2" style={{ marginRight: '30px' }}>Disabled</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Stacking</label>
                        <div className="col-sm-8">
                            <div className="form-check form-check-inline" style={{ margin: '5px' }}>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio3" value="option3" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio3" style={{ marginRight: '30px' }}>Enabled</label>


                                <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio4" value="option4" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio4" style={{ marginRight: '30px' }}>Disabled</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">PoE</label>
                        <div className="col-sm-8">
                            <div className="form-check form-check-inline" style={{ margin: '5px' }}>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio5" value="option5" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio5" style={{ marginRight: '30px' }}>Enabled</label>


                                <input className="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio6" value="option6" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio6" style={{ marginRight: '30px' }}>Disabled</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Type</label>
                        <div className="col-sm-8">
                            <div className="form-check form-check-inline" style={{ margin: '5px' }}>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio7" value="option7" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio7" style={{ marginRight: '30px' }}>Access</label>


                                <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio8" value="option8" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio8" style={{ marginRight: '30px' }}>Trunk</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Allowed VLANs</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                required={true}
                                className="form-control"
                                placeholder="Allowed VLANs"
                            // value={ac.Password}
                            // onChange={e => ac.setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Access Policy</label>
                        <div className="col-sm-8">
                            <Select
                                className='select-create-template'
                                options={ACCESSPOLICYLIST}
                                placeholder='Access Policy'
                                // onChange={selectTemplate}
                                classNamePrefix="topology"
                            />
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">VLAN</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                required={true}
                                className="form-control"
                                placeholder="VLAN"
                            // value={ac.Password}
                            // onChange={e => ac.setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Voice VLAN</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                required={true}
                                className="form-control"
                                placeholder="Voice VLAN"
                            // value={ac.Password}
                            // onChange={e => ac.setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Link</label>
                        <div className="col-sm-8">
                            <Select
                                className='select-create-template'
                                options={LINKLIST}
                                placeholder='Link'
                                // onChange={selectTemplate}
                                classNamePrefix="topology"
                            />
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">RSTP</label>
                        <div className="col-sm-8">
                            <div className="form-check form-check-inline" style={{ margin: '5px' }}>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio9" value="option1" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio9" style={{ marginRight: '30px' }}>Enabled</label>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio10" value="option2" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio10" style={{ marginRight: '30px' }}>Disabled</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">STP guard</label>
                        <div className="col-sm-8">
                            <Select
                                className='select-create-template'
                                options={STPLIST}
                                placeholder='STP guard'
                                // onChange={selectTemplate}
                                classNamePrefix="topology"
                            />
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Port schedule</label>
                        <div className="col-sm-8">
                            <Select
                                className='select-create-template'
                                options={SCHEDULELIST}
                                placeholder='Port schedule'
                                // onChange={selectTemplate}
                                classNamePrefix="topology"
                            />
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Port isolation</label>
                        <div className="col-sm-8">
                            <div className="form-check form-check-inline" style={{ margin: '5px' }}>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions6" id="inlineRadio11" value="option1" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio11" style={{ marginRight: '30px' }}>Enabled</label>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions6" id="inlineRadio12" value="option2" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio12" style={{ marginRight: '30px' }}>Disabled</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Trusted</label>
                        <div className="col-sm-8">
                            <div className="form-check form-check-inline" style={{ margin: '5px' }}>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions7" id="inlineRadio13" value="option1" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio13" style={{ marginRight: '30px' }}>Enabled</label>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions7" id="inlineRadio14" value="option2" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio14" style={{ marginRight: '30px' }}>Disabled</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">Storm Control</label>
                        <div className="col-sm-8">
                            <div className="form-check form-check-inline" style={{ margin: '5px' }}>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions8" id="inlineRadio15" value="option1" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio15" style={{ marginRight: '30px' }}>Alertonly</label>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions8" id="inlineRadio16" value="option2" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio16" style={{ marginRight: '30px' }}>Enforce</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <label className="col-sm-2 col-form-label">UDLD</label>
                        <div className="col-sm-8">
                            <div className="form-check form-check-inline" style={{ margin: '5px' }}>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions9" id="inlineRadio17" value="option1" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio17" style={{ marginRight: '30px' }}>Enabled</label>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions9" id="inlineRadio18" value="option2" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="inlineRadio18" style={{ marginRight: '30px' }}>Disabled</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-template row">
                        <div className="col-sm-8" style={{ left: '95px', marginTop: '17px' }}>
                            <div className="btn-group-create-template" role="group" aria-label="Basic example">
                                <button
                                    className="btn btn-primary"
                                // onClick={createTemplate}
                                >
                                    Save
                    </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={closeModal}
                                >
                                    Cancel
                    </button>
                            </div>
                        </div>
                    </div>

                </form>

            </div>



        </Dialog>
    );
}