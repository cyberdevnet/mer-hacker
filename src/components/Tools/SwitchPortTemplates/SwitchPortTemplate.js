import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import CreateTemplateModal from "./CreateTemplateModal";
import ShowTemplateModal from "./ShowTemplateModal";
import SwitchPortTemplateSummary from "./SwitchPortTemplateSummary";
import SwitchPortConfig from "./SwitchPortConfig.js";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import GetApiKey from "../../../GetApiKey.js";
import SkeletonTable from "../../SkeletonTable";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function SwitchPortTemplate(ac) {
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);
  const [triggerDeploy, settriggerDeploy] = useState(0);
  // eslint-disable-next-line
  const [triggerTemplate, settriggerTemplate] = useState(0);
  const [retryCounter, setretryCounter] = useState(0);
  // eslint-disable-next-line
  const [loading, setloading] = useState(false);
  const [loadingTable, setloadingTable] = useState(false);
  const [configureDisabled, setconfigureDisabled] = useState(true);
  const [loadingDevices, setloadingDevices] = useState(false);
  // eslint-disable-next-line
  const [mapRows, setmapRows] = useState([]);
  const [errorMessage, seterrorMessage] = useState([]);
  const [switchSerial, setswitchSerial] = useState([]);
  const [switchDeviceName, setswitchDeviceName] = useState([]);
  const [switchDeviceIp, setswitchDeviceIp] = useState([]);
  // eslint-disable-next-line
  const [switchDeviceMac, setswitchDeviceMac] = useState([]);
  const [switchDeviceModel, setswitchDeviceModel] = useState([]);
  const [createTemplateModal, setcreateTemplateModal] = useState(false);
  const [showTemplateModal, setshowTemplateModal] = useState(false);
  const [showSummary, setshowSummary] = useState(false);
  const [showportConfig, setshowportConfig] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [templateProperty, setTemplateProperty] = useState([]);
  const [formData, setformData] = useState([]);
  const [showSwitchInfo, setshowSwitchInfo] = useState(false);
  const initialFormSwitchesState = { mySelectKey: null };
  const initialFormTemplatesState = { mySelectKey: null };
  const [switchesSelectKey, setswitchesSelectKey] = useState(
    initialFormSwitchesState
  );
  const [templatesSelectKey, settemplatesSelectKey] = useState(
    initialFormTemplatesState
  );
  const [selecttemplates, setselectTemplates] = useState([]);
  const [dataPorts, setdataPorts] = useState([]);
  const [responseMessage, setresponseMessage] = useState([]);
  const [loadingSummaryBtn, setloadingSummaryBtn] = useState(false);
  const [allSelectedPorts, setallSelectedPorts] = useState([]);
  const [allSwitchports, setallSwitchports] = useState([]);
  const [singleSwitchports, setsingleSwitchports] = useState([]);
  const [portListID, setportListID] = useState([]);

  let callApikey = GetApiKey(ac.dc.User, ac.dc.isSignedIn);
  let apiKey = callApikey.apikey.current;

  async function readTemplate() {
    try {
      fetch("/node/read_templateFile", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: ac.dc.User }),
      })
        .then((res) => res.json())
        .then((data) => {
          const TEMPLATELIST = data.map((opt, index) => ({
            value: opt.templates.templateName,
            label: opt.templates.templateName,
            templateID: index,
            template: opt.templates.templateName,
            id: index,
          }));
          const TEMPLATELIST2 = data.map((opt, index) => ({
            value: index,
            label: opt.templates.templateName,
            index: index,
          }));

          setTemplates(TEMPLATELIST);
          setselectTemplates(TEMPLATELIST2);

          const TEMPLATEPROPS = data.map((opt, index) => ({
            opt: opt.templates,
          }));
          setTemplateProperty(TEMPLATEPROPS);
        })
        .catch((error) => console.log("An error occured ", error));
    } catch (e) {
      console.log("Error:", e);
    }
  }

  //call readTemplate() on render to update available Templates
  useEffect(() => {
    const abortController = new AbortController();
    readTemplate();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, []);

  let Switches = [];
  // eslint-disable-next-line
  ac.dc.deviceList.map((opt, index) => {
    let model = opt.model;
    if (model.startsWith("MS")) {
      var SWModel = {
        label: opt.name,
        value: index,
        id: opt.id,
        serial: opt.serial,
        ipaddress: opt.lanIp,
        mac: opt.mac,
        model: opt.model,
      };
      Switches.push(SWModel);
    }
  });

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    organizationId: `${ac.dc.organizationID}`,
    SERIAL_NUM: `${switchSerial}`,
  };

  const isFirstRunreadTemplate = useRef(true);
  useEffect(() => {
    if (isFirstRunreadTemplate.current) {
      isFirstRunreadTemplate.current = false;
      return;
    }
    const abortController = new AbortController();
    async function Template() {
      readTemplate();
    }
    Template();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [triggerTemplate]);

  const isFirstRun = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    async function APIcall() {
      if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
        setshowtable(false);
        setloadingTable(true);
        fetch("/flask/device_switchports", {
          signal: signal,
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody),
        }).then((response) => {
          return response.json;
        });
        fetch("/flask/device_switchports", { signal: signal })
          .then((res) => res.json())
          .then(readTemplate())
          .then((data) => {
            // setloadingDevices(true)
            if (data.error) {
              ac.dc.setflashMessages(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error[0]}
                </div>
              );
            } else {
              setallSwitchports(data.switchports);

              let switchports = [];
              let row = [];

              // eslint-disable-next-line
              data.switchports.map((opt, index) => {
                var portModel = {
                  name: opt.name,
                  number: opt.number,
                  type: opt.type,
                  vlan: opt.vlan,
                  template: "Select Template",
                  templateID: [],
                  payload: [],
                };

                switchports.push(portModel);
                row.push(portModel);
                setmapRows(row);
                setDatatable({ ...datatable, rows: row });
                setdataPorts({ ...datatable, rows: row });
              });
            }
          })
          .then(() => {
            if (dataPorts.length !== 0) {
              setshowtable(true);
              setloadingTable(false);
              ac.dc.setflashMessages([]);
            } else {
              if (retryCounter < 4) {
                settrigger(trigger + 1);
                setretryCounter(retryCounter + 1);
              } else {
                ac.dc.setflashMessages(
                  <div className="form-input-error-msg alert alert-danger">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    There was an error loading the data, please try again.
                  </div>
                );
              }
            }
          })
          // .then(() => setshowtable(true))
          .then(() => setloadingDevices(false))
          .then(() => setshowSwitchInfo(true));
        // .then(() => ac.dc.setflashMessages([]))
      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }
    }

    APIcall();
    return () => {
      abortController.abort();
      setmapRows([]);
      setshowtable(false);
      setloadingTable(false);
    };
    // eslint-disable-next-line
  }, [trigger]);

  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "Number",
        field: "number",
        sort: "asc",
        width: 200,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Number",
        },
      },
      {
        label: "name",
        field: "name",
        sort: "asc",
        width: 200,
      },
      {
        label: "VLAN",
        field: "vlan",
        sort: "asc",
        width: 200,
      },
      {
        label: "Type",
        field: "type",
        sort: "asc",
        width: 200,
      },
      {
        label: "Template",
        field: "template",
        sort: "asc",
        width: 200,
      },
    ],
    rows: [],
  });

  const HandleDevices = (opt) => {
    setswitchesSelectKey({ ...switchesSelectKey, mySelectKey: opt.value });
    settrigger(trigger + 1);
    setloadingDevices(true);
    setshowSwitchInfo(false);
    setswitchSerial(opt.serial);
    setswitchDeviceName(opt.label);
    setswitchDeviceIp(opt.ipaddress);
    setswitchDeviceMac(opt.mac);
    setswitchDeviceModel(opt.model);
  };

  const createTemplate = () => {
    setcreateTemplateModal(true);
    setshowtable(false);
    setallSelectedPorts([]);
    setswitchesSelectKey(initialFormSwitchesState);
    setshowSwitchInfo(false);
  };

  const showTemplate = (opt) => {
    settemplatesSelectKey({ ...templatesSelectKey, mySelectKey: opt.value });
    setshowTemplateModal(true);
    setformData(templateProperty[opt.index]);
    setshowtable(false);
    setallSelectedPorts([]);
    setswitchesSelectKey(initialFormSwitchesState);
    setshowSwitchInfo(false);
  };

  const columns = [
    {
      dataField: "number",
      text: "Port",
      editable: false,
    },
    {
      dataField: "name",
      text: "Name",
      editable: false,
    },
    {
      dataField: "vlan",
      text: "VLAN",
      editable: false,
    },
    {
      dataField: "type",
      text: "Type",
      editable: false,
    },
    {
      dataField: "templateID",
      text: "templateID",
      editable: false,
      hidden: true,
    },
    {
      dataField: "template",
      text: "Template",
      editCellClasses: "edit-cell-class",
      // onClick: (e) => e.stopPropagation(),
      editor: {
        type: Type.SELECT,
        getOptions: () => templates,
      },
    },
  ];

  const selectRow = {
    mode: "checkbox",
    hideSelectAll: true,
    clickToSelect: true,
    clickToEdit: true,

    onSelect: (row, isSelect, rowIndex) => {
      if (isSelect === true) {
        setallSelectedPorts([...allSelectedPorts, row]);
        setconfigureDisabled(false);
      } else if (isSelect === false) {
        const index = allSelectedPorts.findIndex(
          (i) => i.number === row.number
        );
        allSelectedPorts.splice(index, 1);
        if (allSelectedPorts.length === 0) {
          setconfigureDisabled(true);
        }
      }
    },
  };

  const ConfigurePorts = () => {
    seterrorMessage([]);
    setresponseMessage([]);

    if (allSelectedPorts.length === 0) {
      seterrorMessage(
        <div className="form-input-error-msg alert alert-danger">
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          {`No Port selected, select at least one port to configure.`}
        </div>
      );
    } else {
      let newArray = [...allSelectedPorts];
      // eslint-disable-next-line
      allSelectedPorts.map((port, index) => {
        const templateID = templateProperty.findIndex(
          (i) => i.opt.templateName === port.template
        );
        const notSelectedTemplate = allSelectedPorts.findIndex(
          (element) => element.template === "Select Template"
        );

        if (templateID > -1) {
          let templatePayload = templateProperty[templateID].opt;
          newArray[index] = { ...newArray[index], payload: templatePayload };
          setallSelectedPorts(newArray);
          if (notSelectedTemplate === -1) {
            setshowSummary(true);
          }
        } else {
          seterrorMessage(
            <div className="form-input-error-msg alert alert-danger">
              <span className="glyphicon glyphicon-exclamation-sign"></span>
              {`No Template selected on checked Port ${port.number}`}
            </div>
          );
        }
      });
    }
  };

  const APIbody2 = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    SERIAL_NUM: `${switchSerial}`,
    PAYLOAD: allSelectedPorts,
  };

  const isFirstRunDeploy = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunDeploy.current) {
      isFirstRunDeploy.current = false;
      return;
    }
    async function Deploy() {
      setloadingSummaryBtn(true);
      setresponseMessage([]);
      fetch("/flask/deploy_device_switchports", {
        signal: signal,
        method: ["POST"],
        cache: "no-cache",
        headers: {
          content_type: "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(APIbody2),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.switchporttemplate === null) {
            setresponseMessage(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                ERROR Please check your Template and the logs.
              </div>
            );
          } else {
            if (data.switchporttemplate.errors) {
              setresponseMessage(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.switchporttemplate.errors} please check your Template
                  and try again.
                </div>
              );
            } else {
              if (data.switchporttemplate[1].length > 0) {
                setresponseMessage(
                  <div>
                    <div className="form-input-error-msg alert alert-danger">
                      <span className="glyphicon glyphicon-exclamation-sign"></span>
                      {data.switchporttemplate[1]}
                    </div>
                    <div className="form-input-error-msg alert alert-success">
                      <span className="glyphicon glyphicon-exclamation-sign"></span>
                      Ports configured successfully.
                    </div>
                  </div>
                );
              } else {
                setresponseMessage(
                  <div className="form-input-error-msg alert alert-success">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    Ports configured successfully.
                  </div>
                );
              }
            }
          }
        })
        .then(() => setloadingSummaryBtn(false));
    }

    Deploy();
    return () => {
      abortController.abort();
      // setshowtable(false);
    };
    // eslint-disable-next-line
  }, [triggerDeploy]);

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setsingleSwitchports(allSwitchports[rowIndex]);
      setshowportConfig(true);
    },
  };

  const dc = {
    showtable,
    setshowtable,
    createTemplateModal,
    setcreateTemplateModal,
    showTemplateModal,
    setshowTemplateModal,
    formData,
    setformData,
    readTemplate,
    trigger,
    settrigger,
    templatesSelectKey,
    settemplatesSelectKey,
    switchesSelectKey,
    setswitchesSelectKey,
    initialFormSwitchesState,
    initialFormTemplatesState,
    showSummary,
    switchDeviceModel,
    switchDeviceIp,
    switchDeviceName,
    setshowSummary,
    allSelectedPorts,
    setallSelectedPorts,
    triggerDeploy,
    settriggerDeploy,
    responseMessage,
    setresponseMessage,
    loadingSummaryBtn,
    setloadingSummaryBtn,
    configureDisabled,
    setconfigureDisabled,
    showportConfig,
    setshowportConfig,
    allSwitchports,
    setallSwitchports,
    singleSwitchports,
    setsingleSwitchports,
    portListID,
    setportListID,
  };

  return (
    <div id="page-inner-main-templates">
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="panel-group" style={{ marginBottom: "-5px" }} id="accordion">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title-description">
                      <a
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseOne"
                        className="collapsed"
                      >
                        <span className="glyphicon glyphicon-info-sign"></span>
                      </a>
                    </h4>
                  </div>
                  <div id="collapseOne" className="panel-collapse collapse">
                    <div className="panel-body">
                      <dl>
                        <dt>
                          This tool is useful when no Meraki template are in use or you want to
                          ovveride the switchport configuration.
                        </dt>
                        <dt>
                          You can create a set of Switchport Templates and save/modify it for later
                          use
                        </dt>
                        <br />
                      </dl>
                      <ul>
                        <li>Click on Select Template to select one available template</li>
                        <li>Click on the checkbox to select the ports to configure</li>
                        <li>Double Click on a row to display the switchport configuration</li>
                      </ul>
                      <dl>
                        <dt>
                          Please note: There's currently a bug in the APi preventing the
                          StormControl configuration
                        </dt>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button onClick={createTemplate} className="btn icon-btn-add btn-success-add">
                  <span className="glyphicon-add btn-glyphicon-add glyphicon-plus img-circle text-success-add"></span>
                </button>
                <Select
                  className="select-tolopology"
                  options={selecttemplates}
                  placeholder="Show Templates"
                  onChange={showTemplate}
                  classNamePrefix="topology"
                  onMenuOpen={readTemplate}
                  value={selecttemplates.filter(
                    ({ value }) => value === templatesSelectKey.mySelectKey
                  )}
                  getOptionLabel={({ label }) => label}
                  getOptionValue={({ value }) => value}
                />
                <Select
                  className="select-tolopology"
                  options={Switches}
                  placeholder="Select Switch"
                  classNamePrefix="topology"
                  isLoading={loadingDevices}
                  value={Switches.filter(({ value }) => value === switchesSelectKey.mySelectKey)}
                  getOptionLabel={({ label }) => label}
                  getOptionValue={({ value }) => value}
                  onChange={HandleDevices}
                />
                {showSwitchInfo ? (
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item-template">
                      <strong>Name:</strong> {switchDeviceName}
                    </li>
                    <li className="list-group-item-template">
                      <strong>IP:</strong> {switchDeviceIp}
                    </li>
                    <li className="list-group-item-template">
                      <strong>Model:</strong> {switchDeviceModel}
                    </li>
                  </ul>
                ) : (
                  <div></div>
                )}
                {errorMessage}
                <button
                  className="btn btn-primary"
                  onClick={!loading ? ConfigurePorts : null}
                  disabled={configureDisabled}
                >
                  {loading && (
                    <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
                  )}
                  {loading && <span>Configuring Ports</span>}
                  {!loading && <span>Configure</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            {showtable ? (
              // <div className="panel-body">
              <div className="bootstrap-table-panel">
                <BootstrapTable
                  keyField="number"
                  data={dataPorts.rows}
                  columns={columns}
                  selectRow={selectRow}
                  tabIndexCell
                  striped
                  hover
                  rowEvents={rowEvents}
                  cellEdit={cellEditFactory({
                    mode: "click",
                    blurToSave: true,
                    afterSaveCell: selectRow,
                  })}
                >
                  <div className="well">There are no items to show</div>
                </BootstrapTable>
              </div>
            ) : (
              <div>
                <div>{loadingTable ? <SkeletonTable /> : <div></div>}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {createTemplateModal ? <CreateTemplateModal dc={dc} cc={ac.dc} /> : <div></div>}
      {showTemplateModal ? <ShowTemplateModal dc={dc} cc={ac.dc} /> : <div></div>}
      {showSummary ? <SwitchPortTemplateSummary dc={dc} cc={ac.dc} /> : <div></div>}
      {showportConfig ? <SwitchPortConfig dc={dc} cc={ac.dc} /> : <div></div>}
    </div>
  );
}
