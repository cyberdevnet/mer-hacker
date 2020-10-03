import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Form from "@rjsf/core";
import "../../styles/CreateTemplateModal.css";

export default function ShowTemplateModal(ac) {
  const [loading, setloading] = useState(false);
  const [loadingSubmit, setloadingSubmit] = useState(false);

  const schema = {
    title: "Show Template",
    type: "object",
    required: ["templateName"],
    properties: {
      templateName: {
        type: "string",
        title: "Template Name",
        minLength: 4,
      },
      name: {
        type: "string",
        title: "Port description",
      },
      tags: {
        type: "string",
        title: "Tags",
        // "default": ""
      },
      enabled: {
        type: "string",
        title: "Port enabled",
        enum: ["Enabled", "Disabled"],
        default: "Enabled",
      },
      stacking: {
        type: "string",
        title: "Stacking",
        enum: ["Enabled", "Disabled"],
        default: "Disabled",
      },
      poeEnabled: {
        type: "string",
        title: "PoE",
        enum: ["Enabled", "Disabled"],
        default: "Enabled",
      },
      Port: {
        type: "object",
        properties: {
          type: {
            type: "string",
            title: "Type",
            enum: ["Access", "Trunk"],
            default: "Access",
          },
        },
        dependencies: {
          type: {
            oneOf: [
              {
                properties: {
                  type: {
                    enum: ["Access"],
                  },
                  Policy: {
                    type: "object",
                    properties: {
                      vlan: {
                        type: "number",
                        title: "VLAN",
                      },
                      voiceVlan: {
                        type: "number",
                        title: "Voice VLAN",
                      },
                      accessPolicyNumber: {
                        type: "string",
                        title: "Access Policy",
                        enum: [
                          "CustomPolicy",
                          "Open",
                          "MAC Whitelist",
                          "Sticky MAC Whitelist",
                        ],
                        default: "CustomPolicy",
                      },
                    },
                    required: ["vlan"],
                    dependencies: {
                      accessPolicyNumber: {
                        oneOf: [
                          {
                            properties: {
                              accessPolicyNumber: {
                                enum: ["CustomPolicy"],
                              },
                            },
                          },
                          {
                            properties: {
                              accessPolicyNumber: {
                                enum: ["Open"],
                              },
                            },
                          },
                          {
                            properties: {
                              accessPolicyNumber: {
                                enum: ["MAC Whitelist"],
                              },
                              macWhitelist: {
                                type: "string",
                                title: "Whitelisted MACs",
                              },
                            },
                          },
                          {
                            properties: {
                              accessPolicyNumber: {
                                enum: ["Sticky MAC Whitelist"],
                              },
                              stickyMacWhitelistLimit: {
                                type: "number",
                                title: "Whitelist size limit",
                              },
                              macWhitelist: {
                                type: "string",
                                title: "Whitelisted MACs",
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                properties: {
                  type: {
                    enum: ["Trunk"],
                  },
                  vlan: {
                    type: "number",
                    title: "Native VLAN",
                  },
                  allowedVlans: {
                    type: "string",
                    title: "Allowed VLANs",
                  },
                },
                required: ["allowedVlans"],
              },
            ],
          },
        },
      },

      linkNegotiation: {
        type: "string",
        title: "Link",
        enum: [
          "Auto negotiate",
          "1 Gigabit full duplex (forced)",
          "100 Megabit (auto)",
          "100 Megabit half duplex (forced)",
          "100 Megabit full duplex (forced)",
          "10 Megabit (auto)",
          "10 Megabit half duplex (forced)",
          "10 Megabit full duplex (forced)",
        ],
        default: "Auto negotiate",
      },
      stpGuard: {
        type: "string",
        title: "STP guard",
        enum: ["Disabled", "Root guard", "BPDU guard", "Loop guard"],
        default: "Disabled",
      },
      portScheduleId: {
        type: "string",
        title: "Port schedule",
      },
      rstpEnabled: {
        type: "string",
        title: "RSTP",
        enum: ["Enabled", "Disabled"],
        default: "Enabled",
      },
      isolationEnabled: {
        type: "string",
        title: "Port isolation",
        enum: ["Enabled", "Disabled"],
        default: "Disabled",
      },
      trusted: {
        type: "string",
        title: "Trusted",
        enum: ["Enabled", "Disabled"],
        default: "Enabled",
      },
      // "stormControlEnabled": {
      //     "type": "string",
      //     "title": "Storm Control",
      //     "enum": [
      //         "Enabled",
      //         "Disabled"
      //     ],
      // },
      udld: {
        type: "string",
        title: "UDLD",
        enum: ["Alert only", "Enforce"],
        default: "Alert only",
      },
      id: {
        type: "number",
      },

      StormControl: {
        title: "Storm Control",
        type: "object",
        properties: {
          "Storm Control supported": {
            type: "string",
            enum: ["No", "Yes"],
            default: "No",
          },
        },
        required: ["Storm Control supported"],
        dependencies: {
          "Storm Control supported": {
            oneOf: [
              {
                properties: {
                  "Storm Control supported": {
                    enum: ["No"],
                  },
                },
              },
              {
                properties: {
                  "Storm Control supported": {
                    enum: ["Yes"],
                  },
                  stormControlEnabled: {
                    type: "string",
                    title: "Storm Control",
                    enum: ["Enabled", "Disabled"],
                    default: "Disabled",
                  },
                },
              },
            ],
          },
        },
      },
    },
  };

  const uiSchema = {
    Port: {
      type: {
        "ui:widget": "radio",
        classNames: "radio radio-inline",
      },
      allowedVlans: {
        classNames: "inputs-template",
      },
      vlan: {
        classNames: "inputs-template",
      },
      Policy: {
        accessPolicyNumber: {
          classNames: "inputs-template",
        },
        macWhitelist: {
          "ui:widget": "textarea",
          classNames: "inputs-template",
        },
        stickyMacWhitelistLimit: {
          classNames: "inputs-template",
        },
        vlan: {
          classNames: "inputs-template",
        },
        voiceVlan: {
          classNames: "inputs-template",
        },
      },
    },
    enabled: {
      "ui:widget": "radio",
      classNames: "radio radio-inline",
    },
    stacking: {
      "ui:widget": "radio",
      classNames: "radio radio-inline",
    },
    poeEnabled: {
      "ui:widget": "radio",
      classNames: "radio radio-inline",
    },
    rstpEnabled: {
      "ui:widget": "radio",
      classNames: "radio radio-inline",
    },
    isolationEnabled: {
      "ui:widget": "radio",
      classNames: "radio radio-inline",
    },
    trusted: {
      "ui:widget": "radio",
      classNames: "radio radio-inline",
    },
    // "stormControlEnabled": {
    //     "ui:widget": "radio",
    //     "ui:disabled": true,
    //     "ui:help": "Storm Control not available",
    //     classNames: "radio radio-inline"
    // },
    udld: {
      "ui:widget": "radio",
      classNames: "radio radio-inline",
    },
    templateName: {
      classNames: "inputs-template",
    },
    name: {
      classNames: "inputs-template",
    },
    tags: {
      classNames: "inputs-template",
    },
    linkNegotiation: {
      classNames: "inputs-template",
    },
    stpGuard: {
      classNames: "inputs-template",
    },
    portScheduleId: {
      classNames: "inputs-template",
    },

    id: { "ui:widget": "hidden" },

    StormControl: {
      stormControlEnabled: {
        "ui:widget": "radio",
      },
      NOstormControlEnabled: {
        "ui:widget": "radio",
        "ui:disabled": true,
        "ui:help": "Storm Control not available",
      },
      "Storm Control supported": {
        classNames: "inputs-template",
      },
    },
  };

  function transformErrors(errors) {
    return errors.map((error) => {
      if (error.name === "required" && error.property === ".templateName") {
        error.stack = "Template name is required";
        setloadingSubmit(false);
      } else if (error.name === "required" && error.property === ".name") {
        error.stack = "Port description is a required property";
        setloadingSubmit(false);
      } else if (
        error.name === "required" &&
        error.property === ".allowedVlans"
      ) {
        error.stack =
          "Allowed VLANs must be 'all' or a comma-separated list of VLANs or ranges between 1 and 4094";
        setloadingSubmit(false);
      } else if (
        error.name === "required" &&
        error.property === ".Port.allowedVlans"
      ) {
        error.stack =
          "Allowed VLANs must be 'all' or a comma-separated list of VLANs or ranges between 1 and 4094";
        setloadingSubmit(false);
      } else if (
        error.name === "required" &&
        error.property === ".Port.Policy.vlan"
      ) {
        error.stack = "VLAN must be a number between 1 and 4094";
        setloadingSubmit(false);
      } else if (error.name === "oneOf" && error.property === ".Port") {
        error.stack = null;
        // error.stack = "Please check your template"
        setloadingSubmit(false);
      } else if (error.name === "enum" && error.property === ".Port.type") {
        error.stack = null;
        // error.stack = "Please check your template"
        setloadingSubmit(false);
      } else if (error.name === "minLength") {
        error.stack = "Template name should NOT be shorter than 4 characters";
        setloadingSubmit(false);
      }

      return error;
    });
  }

  async function updateTemplate(e) {
    setloadingSubmit(true);
    try {
      fetch("/node/read_templateFile", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: ac.cc.User }),
      })
        .then((res) => res.json())
        .then((data) => {
          const newArr = data.slice();
          const singleArr = [];
          const existingObj = newArr.find(
            (item) => item.templates.id === e.formData.id
          );

          if (existingObj.templates.templateName === e.formData.templateName) {
            e.formData.id = Math.floor(Math.random() * 5000) + 1000;
            //Object does exist
            let modified = Object.assign(existingObj.templates, e.formData);
            let _id = existingObj._id;
            singleArr.push(modified);
            try {
              fetch("/node/update_templateFile", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  template: modified,
                  user: ac.cc.User,
                  _id: _id,
                }),
              })
                .then((res) => {
                  return res.json();
                })

                .then(() => {
                  setTimeout(() => {
                    //reset select form
                    ac.dc.settemplatesSelectKey(
                      ac.dc.initialFormTemplatesState
                    );
                    ac.dc.setshowTemplateModal(false);
                    setloadingSubmit(false);
                    //call readTemplate() from parent to update available templates
                    ac.dc.readTemplate();
                  }, 1500);
                })
                .then(
                  setTimeout(() => {
                    ac.cc.setflashMessages(
                      <div className="form-input-error-msg alert alert-success">
                        <span className="glyphicon glyphicon-exclamation-sign"></span>
                        Template modified
                      </div>
                    );
                  }, 2000)
                )
                .then(() => {
                  setTimeout(() => {
                    ac.cc.setflashMessages([]);
                  }, 6000);
                });
            } catch (e) {
              console.log("Error:", e);
            }
          } else {
            //Object does NOT exist
            singleArr.push(e.formData);
            e.formData.id = Math.floor(Math.random() * 5000) + 1000;

            try {
              fetch("/node/write_templateFile", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  template: e.formData,
                  user: ac.cc.User,
                }),
              })
                .then((res) => {
                  return res.json();
                })

                .then(() => {
                  setTimeout(() => {
                    //reset select form
                    ac.dc.settemplatesSelectKey(
                      ac.dc.initialFormTemplatesState
                    );
                    ac.dc.setshowTemplateModal(false);
                    setloadingSubmit(false);
                    //call readTemplate() from parent to update available templates
                    ac.dc.readTemplate();
                  }, 1500);
                })
                .then(
                  setTimeout(() => {
                    ac.cc.setflashMessages(
                      <div className="form-input-error-msg alert alert-success">
                        <span className="glyphicon glyphicon-exclamation-sign"></span>
                        Template created
                      </div>
                    );
                  }, 2000)
                )
                .then(() => {
                  setTimeout(() => {
                    ac.cc.setflashMessages([]);
                  }, 6000);
                });
            } catch (e) {
              console.log("Error:", e);
            }
          }
        })
        .catch((error) => console.log("An error occured ", error));
    } catch (e) {
      console.log("Error:", e);
    }
  }

  const closeModal = () => {
    ac.dc.setshowTemplateModal(false);
    ac.dc.settemplatesSelectKey(ac.dc.initialFormTemplatesState);
  };

  async function deleteTemplate(e) {
    setloading(true);
    try {
      fetch("/node/read_templateFile", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: ac.cc.User }),
      })
        .then((res) => res.json())
        .then((data) => {
          const newArr = data.slice();
          const existingObj = newArr.find(
            (item) =>
              item.templates.templateName === ac.dc.formData.opt.templateName &&
              item.templates.id === ac.dc.formData.opt.id
          );

          let _id = existingObj._id;

          if (existingObj) {
            //Object does exist
            try {
              fetch("/node/delete_templateFile", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: _id, user: ac.cc.User }),
              })
                .then((res) => {
                  return res.json();
                })
                .then(() => {
                  setTimeout(() => {
                    //reset select form
                    ac.dc.settemplatesSelectKey(
                      ac.dc.initialFormTemplatesState
                    );
                    ac.dc.setshowTemplateModal(false);
                    setloading(false);
                    //call readTemplate() from parent to update available templates
                    ac.dc.readTemplate();
                  }, 1500);
                })
                .then(() => {
                  setTimeout(() => {
                    ac.cc.setflashMessages(
                      <div className="form-input-error-msg alert alert-success">
                        <span className="glyphicon glyphicon-exclamation-sign"></span>
                        Template deleted
                      </div>
                    );
                  }, 2000);
                })
                .then(() => {
                  setTimeout(() => {
                    ac.cc.setflashMessages([]);
                  }, 6000);
                });
            } catch (e) {
              console.log("Error:", e);
            }
          } else {
            //Object does NOT exist
            ac.cc.setflashMessages(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                Cannot delete template
              </div>
            );
            setloading(false);
          }
        })
        .catch((error) => console.log("An error occured ", error));
    } catch (e) {
      console.log("Error:", e);
    }
  }

  return (
    <Dialog open={true} fullWidth maxWidth="md">
      <div className="modal-body text-center">
        <button
          onClick={closeModal}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
        {ac.cc.flashMessages}
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={ac.dc.formData.opt}
          // className="template-modal"
          onSubmit={updateTemplate}
          transformErrors={transformErrors}
          noHtml5Validate
        >
          <button className="btn btn-success" disabled={loadingSubmit}>
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

        <button className="btn btn-danger" onClick={closeModal}>
          Close
        </button>
        <button
          className="btn btn-danger"
          onClick={!loading ? deleteTemplate : null}
          disabled={loading}
          style={{ float: "left" }}
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
