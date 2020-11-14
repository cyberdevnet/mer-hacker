import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import GetApiKey from "../../GetApiKey.js";
import SwitchPortConfig from "./SwitchPortTemplates/SwitchPortConfig";
import BootstrapTable from "react-bootstrap-table-next";
import SkeletonTable from "../SkeletonTable";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function GetAllSwitchPorts(ac) {
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);
  const [retryCounter, setretryCounter] = useState(0);
  const [loading, setloading] = useState(false);
  const [refreshDisabled, setrefreshDisabled] = useState(true);
  const [loadingDevices, setloadingDevices] = useState(false);
  // eslint-disable-next-line
  const [mapRows, setmapRows] = useState([]);
  const [switchSerial, setswitchSerial] = useState([]);
  const [switchDeviceName, setswitchDeviceName] = useState([]);
  const [switchDeviceIp, setswitchDeviceIp] = useState([]);
  const [switchDeviceModel, setswitchDeviceModel] = useState([]);
  const [showportConfig, setshowportConfig] = useState(false);
  const [showSwitchInfo, setshowSwitchInfo] = useState(false);
  const [dataPorts, setdataPorts] = useState([]);
  const [allSwitchports, setallSwitchports] = useState([]);
  const [singleSwitchports, setsingleSwitchports] = useState([]);
  const initialFormSwitchesState = { mySelectKey: null };
  const [switchesSelectKey, setswitchesSelectKey] = useState(initialFormSwitchesState);
  const [portListID, setportListID] = useState([]);

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

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

  let callApikey = GetApiKey(ac.dc.User);
  let apiKey = callApikey.apikey.current;

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    organizationId: `${ac.dc.organizationID}`,
    SERIAL_NUM: `${switchSerial}`,
  };

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
        setloading(true);
        setrefreshDisabled(true);
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
          .then((data) => {
            // setloadingDevices(true)
            if (data.error) {
              ac.dc.setflashMessages(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error[0]}
                </div>
              );
              setTimeout(() => {
                ac.dc.setflashMessages([]);
              }, 5000);
            } else {
              setallSwitchports(data.switchports);

              let switchports = [];
              let row = [];

              // eslint-disable-next-line
              data.switchports.map((opt, index) => {
                if (opt.enabled === true) {
                  var portModel = {
                    name: opt.name,
                    number: opt.portId,
                    type: opt.type,
                    vlan: opt.vlan,
                    accessPolicyNumber: opt.accessPolicyNumber,
                    allowedVlans: opt.allowedVlans,
                    enabled: <span className="fas fa-check" style={{ color: "#1ABC9C" }}></span>,
                    isolationEnabled: opt.isolationEnabled,
                    linkNegotiation: opt.linkNegotiation,
                    macWhitelist: opt.macWhitelist,
                    poeEnabled: opt.poeEnabled,
                    portScheduleId: opt.portScheduleId,
                    rstpEnabled: opt.rstpEnabled,
                    stickyMacWhitelist: opt.stickyMacWhitelist,
                    stickyMacWhitelistLimit: opt.stickyMacWhitelistLimit,
                    stpGuard: opt.stpGuard,
                    tags: opt.tags,
                    udld: opt.udld,
                    voiceVlan: opt.voiceVlan,
                  };
                } else {
                  // eslint-disable-next-line
                  var portModel = {
                    name: opt.name,
                    number: opt.portId,
                    type: opt.type,
                    vlan: opt.vlan,
                    accessPolicyNumber: opt.accessPolicyNumber,
                    allowedVlans: opt.allowedVlans,
                    enabled: <span className="fas fa-check" style={{ color: "#f36a5a" }}></span>,
                    isolationEnabled: opt.isolationEnabled,
                    linkNegotiation: opt.linkNegotiation,
                    macWhitelist: opt.macWhitelist,
                    poeEnabled: opt.poeEnabled,
                    portScheduleId: opt.portScheduleId,
                    rstpEnabled: opt.rstpEnabled,
                    stickyMacWhitelist: opt.stickyMacWhitelist,
                    stickyMacWhitelistLimit: opt.stickyMacWhitelistLimit,
                    stpGuard: opt.stpGuard,
                    tags: opt.tags,
                    udld: opt.udld,
                    voiceVlan: opt.voiceVlan,
                  };
                }

                switchports.push(portModel);
                row.push(portModel);
                setmapRows(row);
                setdataPorts({ ...columns, rows: row });
              });
            }
          })
          .then(() => {
            if (dataPorts.length !== 0) {
              setshowtable(true);
              setloading(false);
              ac.dc.setflashMessages([]);
              setrefreshDisabled(false);
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
                setTimeout(() => {
                  ac.dc.setflashMessages([]);
                }, 5000);
              }
            }
          })
          .then(() => setloadingDevices(false))
          .then(() => setshowSwitchInfo(true));
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
      setloading(false);
    };
    // eslint-disable-next-line
  }, [trigger]);

  const HandleDevices = (opt) => {
    setswitchesSelectKey({ ...switchesSelectKey, mySelectKey: opt.value });
    settrigger(trigger + 1);
    setloadingDevices(true);
    setshowSwitchInfo(false);
    setswitchSerial(opt.serial);
    setswitchDeviceName(opt.label);
    setswitchDeviceIp(opt.ipaddress);
    setswitchDeviceModel(opt.model);
  };

  const columns = [
    {
      dataField: "number",
      text: "Port",
      editable: false,
      headerStyle: (colum, colIndex) => {
        return { width: "80px" };
      },
    },
    {
      dataField: "name",
      text: "Name",
      editable: false,
    },
    {
      dataField: "type",
      text: "Type",
      editable: false,
    },
    {
      dataField: "vlan",
      text: "VLAN",
      editable: false,
      headerStyle: (colum, colIndex) => {
        return { width: "80px" };
      },
    },
    {
      dataField: "voiceVlan",
      text: "Voice VLAN",
      editable: false,
      headerStyle: (colum, colIndex) => {
        return { width: "80px" };
      },
    },
    {
      dataField: "stpGuard",
      text: "	STP state",
      editable: false,
    },
    {
      dataField: "linkNegotiation",
      text: "Link",
      editable: false,
    },
    {
      dataField: "enabled",
      text: "Enabled",
      editable: false,
      headerStyle: (colum, colIndex) => {
        return { width: "80px" };
      },
    },
  ];

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setportListID(rowIndex);
      setsingleSwitchports(allSwitchports[rowIndex]);
      setshowportConfig(true);
    },
  };

  const dc = {
    showtable,
    setshowtable,
    setsingleSwitchports,
    singleSwitchports,
    setshowportConfig,
    switchDeviceName,
    switchDeviceIp,
    switchDeviceModel,
    setallSwitchports,
    allSwitchports,
    portListID,
    setportListID,
  };

  return (
    <div id="page-inner-main-templates">
      <div className="row-inventory tools">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <div id="accordion">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-description">
                      <a
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseOne"
                        className="collapsed"
                      >
                        <span className="fas fa-info-circle"></span>
                      </a>
                    </h4>
                  </div>
                  <div id="collapseOne" className="panel-collapse collapse">
                    <div className="panel-body">
                      <dl>
                        <dt>This scripts returns all the Switchports of a selected Switch.</dt>
                        <br />
                      </dl>
                      <ul>
                        <li>Double Click on a row to display the switchport configuration</li>
                        <li>The table is exportable in CSV format</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div>
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
                <button
                  className="btn btn-primary"
                  disabled={refreshDisabled}
                  onClick={HandleDevices}
                >
                  {loading && (
                    <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
                  )}
                  {loading && <span>Loading</span>}
                  {!loading && <span>Refresh</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row-inventory">
        <div className="card">
          {showtable ? (
            <div className="bootstrap-table-panel">
              <ToolkitProvider search keyField="number" data={dataPorts.rows} columns={columns}>
                {(props) => (
                  <div>
                    <SearchBar style={{ width: "299px" }} {...props.searchProps} />
                    <ExportCSVButton className="export-csv" {...props.csvProps}>
                      Export CSV
                    </ExportCSVButton>

                    <BootstrapTable {...props.baseProps} rowEvents={rowEvents} striped hover />
                  </div>
                )}
              </ToolkitProvider>
            </div>
          ) : (
            <div>
              <div>{loading ? <SkeletonTable /> : <div></div>}</div>
            </div>
          )}
        </div>
      </div>
      {showportConfig ? <SwitchPortConfig dc={dc} cc={ac.dc} /> : <div></div>}
    </div>
  );
}
