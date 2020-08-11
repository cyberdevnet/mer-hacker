import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import Form from '@rjsf/core';
import "../../styles/CreateTemplateModal.css";


export default function ShowTemplateModal(ac) {
    const [loading, setloading] = useState(false);
    const [loadingSubmit, setloadingSubmit] = useState(false);


    const schema = {
        "title": "Modify Template",
        "type": "object",
        "required": [
            "templateName",
        ],
        "properties": {
            "templateName": {
                "type": "string",
                "title": "Template Name",
                minLength: 4,
            },
            "name": {
                "type": "string",
                "title": "Port description"
            },
            "tags": {
                "type": "string",
                "title": "Tags"
            },
            "enabled": {
                "type": "string",
                "title": "Port enabled",
                "enum": [
                    "Enabled",
                    "Disabled"
                ],
                "default": "Enabled"
            },
            "stacking": {
                "type": "string",
                "title": "Stacking",
                "enum": [
                    "Enabled",
                    "Disabled"
                ],
                "default": "Disabled"
            },
            "poeEnabled": {
                "type": "string",
                "title": "PoE",
                "enum": [
                    "Enabled",
                    "Disabled"
                ],
                "default": "Enabled"
            },
            "port": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "title": "Type",
                        "enum": [
                            "Access",
                            "Trunk"
                        ],
                        "default": "Access"
                    }
                },
                "dependencies": {
                    "type": {
                        "oneOf": [
                            {
                                "properties": {
                                    "type": {
                                        "enum": [
                                            "Access"
                                        ]
                                    }
                                }
                            },
                            {
                                "properties": {
                                    "type": {
                                        "enum": [
                                            "Trunk"
                                        ]
                                    },
                                    "allowedVlans": {
                                        "type": "string",
                                        "title": "Allowed VLANs"
                                    }
                                },
                            },
                        ]
                    }
                }
            },
            "policy": {
                "type": "object",
                "properties": {
                    "accessPolicyNumber": {
                        "type": "string",
                        "title": "Access Policy",
                        "enum": [
                            "HybridAuthISE",
                            "Open",
                            "MAC Whitelist",
                            "Sticky MAC Whitelist"
                        ],
                        "default": "HybridAuthISE"
                    },
                },
                "dependencies": {
                    "accessPolicyNumber": {
                        "oneOf": [
                            {
                                "properties": {
                                    "accessPolicyNumber": {
                                        "enum": [
                                            "HybridAuthISE"
                                        ]
                                    }
                                }
                            },
                            {
                                "properties": {
                                    "accessPolicyNumber": {
                                        "enum": [
                                            "Open"
                                        ]
                                    }
                                }
                            },
                            {
                                "properties": {
                                    "accessPolicyNumber": {
                                        "enum": [
                                            "MAC Whitelist"
                                        ]
                                    },
                                    "macWhitelist": {
                                        "type": "string",
                                        "title": "Whitelisted MACs"
                                    }
                                }
                            },
                            {
                                "properties": {
                                    "accessPolicyNumber": {
                                        "enum": [
                                            "Sticky MAC Whitelist"
                                        ]
                                    },
                                    "stickyMacWhitelistLimit": {
                                        "type": "number",
                                        "title": "Whitelist size limit"
                                    },
                                    "macWhitelist": {
                                        "type": "string",
                                        "title": "Whitelisted MACs"
                                    }
                                },
                            },
                        ]
                    }
                }
            },

            "vlan": {
                "type": "number",
                "title": "VLAN"
            },
            "voiceVlan": {
                "type": "number",
                "title": "Voice VLAN"
            },
            "linkNegotiation": {
                "type": "string",
                "title": "Link",
                "enum": [
                    "Auto negotiate",
                    "1 Gigabit full duplex (forced)",
                    "100 Megabit auto",
                    "100 Megabit half duplex (forced)",
                    "100 Megabit full duplex (forced)",
                    "10 Megabit auto",
                    "10 Megabit half duplex (forced)",
                    "10 Megabit full duplex (forced)"
                ],
                "default": "Auto negotiate"
            },
            "stpGuard": {
                "type": "string",
                "title": "STP guard",
                "enum": [
                    "Disabled",
                    "Root guard",
                    "BPDU guard",
                    "Loop guard"
                ],
                "default": "Disabled"
            },
            "portScheduleId": {
                "type": "string",
                "title": "Port schedule"
            },
            "rstpEnabled": {
                "type": "string",
                "title": "RSTP",
                "enum": [
                    "Enabled",
                    "Disabled"
                ],
                "default": "Enabled"
            },
            "isolationEnabled": {
                "type": "string",
                "title": "Port isolation",
                "enum": [
                    "Enabled",
                    "Disabled"
                ],
                "default": "Enabled"
            },
            "trusted": {
                "type": "string",
                "title": "Trusted",
                "enum": [
                    "Enabled",
                    "Disabled"
                ],
                "default": "Enabled"
            },
            "stormControlEnabled": {
                "type": "string",
                "title": "Storm Control",
                "enum": [
                    "Enabled",
                    "Disabled"
                ],
                "default": "Enabled"
            },
            "udld": {
                "type": "string",
                "title": "UDLD",
                "enum": [
                    "Alert only",
                    "Enforce"
                ],
                "default": "Alert only"
            },
            "id": {
                "type": "number"
            }

        },
    }

    const uiSchema = {
        "port": {
            "type": {
                "ui:widget": "radio",
                classNames: "radio radio-inline"
            },
            "allowedVlans": {
                classNames: "inputs-template"
            },
        },
        "policy": {
            "accessPolicyNumber": {
                classNames: "inputs-template"
            },
            "macWhitelist": {
                "ui:widget": "textarea",
                classNames: "inputs-template"
            },
            "stickyMacWhitelistLimit": {
                classNames: "inputs-template"
            },
        },
        "enabled": {
            "ui:widget": "radio",
            classNames: "radio radio-inline"
        },
        "stacking": {
            "ui:widget": "radio",
            classNames: "radio radio-inline"
        },
        "poeEnabled": {
            "ui:widget": "radio",
            classNames: "radio radio-inline"
        },
        "rstpEnabled": {
            "ui:widget": "radio",
            classNames: "radio radio-inline"
        },
        "isolationEnabled": {
            "ui:widget": "radio",
            classNames: "radio radio-inline"
        },
        "trusted": {
            "ui:widget": "radio",
            classNames: "radio radio-inline"
        },
        "stormControlEnabled": {
            "ui:widget": "radio",
            classNames: "radio radio-inline"
        },
        "udld": {
            "ui:widget": "radio",
            classNames: "radio radio-inline"
        },
        "templateName": {
            classNames: "inputs-template"
        },
        "name": {
            classNames: "inputs-template"
        },
        "tags": {
            classNames: "inputs-template"
        },
        "vlan": {
            classNames: "inputs-template"
        },
        "voiceVlan": {
            classNames: "inputs-template"
        },
        "linkNegotiation": {
            classNames: "inputs-template"
        },
        "stpGuard": {
            classNames: "inputs-template"
        },
        "portScheduleId": {
            classNames: "inputs-template"
        },
        "id":
            { "ui:widget": "hidden" }

    }

    function transformErrors(errors) {
        return errors.map(error => {
            if (error.name === "required") {
                error.stack = "Template name is required"
                setloadingSubmit(false)
            } else if (error.name === "minLength") {
                error.stack = "Template name should NOT be shorter than 4 characters"
                setloadingSubmit(false)
            }

            return error;
        });
    }

    async function writeTemplate(e) {
        setloadingSubmit(true);
        try {
            fetch('/read_templateFile')
                .then(res => res.json())
                .then((data) => {
                    const newArr = data.slice();
                    const existingObj = newArr.find(item => item.id === e.formData.id);
                    // const existingObj = newArr.find(item => item.templateName === e.formData.templateName && item.id === e.formData.id);

                    if (existingObj) {
                        //Object does exist
                        Object.assign(existingObj, e.formData);
                    } else {
                        //Object does NOT exist
                        newArr.push(e.formData)
                    }

                    try {
                        fetch('/write_templateFile', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newArr)
                        })
                            .then(res => { return res.json() })
                            .then(ac.cc.setflashMessages(<div className="form-input-error-msg alert alert-success">
                                <span className="glyphicon glyphicon-exclamation-sign"></span>
                        Template modified</div>))
                            .then(() => {
                                setTimeout(() => {
                                    //reset select form
                                    ac.dc.settemplatesSelectKey(ac.dc.initialFormTemplatesState)
                                    ac.dc.setshowTemplateModal(false)
                                    setloadingSubmit(false)
                                    //call readTemplate() from parent to update available templates
                                    ac.dc.readTemplate()
                                }, 1500);
                            })
                            .then(() => {
                                setTimeout(() => {
                                    ac.cc.setflashMessages([])
                                }, 5000);
                            })
                    } catch (e) {
                        console.log('Error:', e);
                    }
                })
                .catch(error => console.log('An error occured ', error))
        } catch (e) {
            console.log('Error:', e);
        }
    }

    const closeModal = () => {
        ac.dc.setshowTemplateModal(false);
        ac.dc.settemplatesSelectKey(ac.dc.initialFormTemplatesState)
    };

    async function deleteTemplate(e) {
        setloading(true);
        try {
            fetch('/read_templateFile')
                .then(res => res.json())
                .then((data) => {
                    const newArr = data.slice();
                    const existingObj = newArr.find(item => item.templateName === ac.dc.formData.opt.templateName && item.id === ac.dc.formData.opt.id);


                    if (existingObj) {
                        //Object does exist
                        var filtered = data.filter(function (el) { return el.templateName !== ac.dc.formData.opt.templateName });
                        ac.cc.setflashMessages(<div className="form-input-error-msg alert alert-success">
                            <span className="glyphicon glyphicon-exclamation-sign"></span>
                        Template deleted</div>)

                    } else {
                        //Object does NOT exist
                        ac.cc.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                            <span className="glyphicon glyphicon-exclamation-sign"></span>
                  Cannot delete template</div>)
                    }
                    try {
                        fetch('/write_templateFile', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(filtered)
                        })
                            .then(res => { return res.json() })
                            .then(() => {
                                setTimeout(() => {
                                    //reset select form
                                    ac.dc.settemplatesSelectKey(ac.dc.initialFormTemplatesState)
                                    ac.dc.setshowTemplateModal(false)
                                    setloading(false)
                                    //call readTemplate() from parent to update available templates
                                    ac.dc.readTemplate()
                                }, 1500);
                            })
                            .then(() => {
                                setTimeout(() => {
                                    ac.cc.setflashMessages([])
                                }, 5000);
                            })
                    } catch (e) {
                        console.log('Error:', e);
                    }
                })
                .catch(error => console.log('An error occured ', error))
        } catch (e) {
            console.log('Error:', e);
        }

    };

    return (
        <Dialog
            open={true}
            fullWidth
            maxWidth="md"
        >
            <div className="modal-body text-center">
                {ac.cc.flashMessages}
                <Form
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={ac.dc.formData.opt}
                    className="template-modal"
                    onSubmit={writeTemplate}
                    transformErrors={transformErrors}
                    noHtml5Validate
                >
                    <button
                        className="btn btn-success"
                        disabled={loadingSubmit}
                    >
                        {loadingSubmit && (
                            <i
                                className="fa fa-refresh fa-spin"
                                style={{ marginRight: "5px" }}
                            />
                        )}
                        {loadingSubmit && <span>Submit</span>}
                        {!loadingSubmit && <span>Submit</span>}
                    </button>
                </Form>

                <button
                    className="btn btn-danger"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-danger"
                    onClick={!loading ? deleteTemplate : null}
                    disabled={loading}
                    style={{ float: 'left' }}
                >
                    {loading && (
                        <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                        />
                    )}
                    {loading && <span>Delete Template</span>}
                    {!loading && <span>Delete Template</span>}
                </button>
            </div>
        </Dialog>
    );
}