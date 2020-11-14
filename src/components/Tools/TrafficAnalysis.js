import React, { useEffect, useState, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import GetApiKey from "../../GetApiKey.js";
import SkeletonTable from "../SkeletonTable";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import Select from "react-select";

export default function TrafficAnalysis(ac) {
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);
  const [switchTimeInterval, setswitchTimeInterval] = useState(7200);
  const [switchDeviceType, setswitchDeviceType] = useState("combined");
  // eslint-disable-next-line
  const [netwanalysis, setnetwanalysis] = useState([]);
  const [dataInventory, setdataInventory] = useState([]);
  const [flashMessages, setflashMessages] = useState([]);
  const [loading, setloading] = useState(false);
  const [retryCounter, setretryCounter] = useState(0);

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  let callApikey = GetApiKey(ac.dc.User);
  let apiKey = callApikey.apikey.current;

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    DEV_TYPE: switchDeviceType,
    NET_ID: `${ac.dc.networkID}`,
    TIME_SPAN: switchTimeInterval,
  };

  const time_interval = [
    { time: "2 hours", seconds: 7200 },
    { time: "8 hours", seconds: 28800 },
    { time: "1 day", seconds: 86400 },
    { time: "7 days", seconds: 604800 },
    { time: "1 month", seconds: 2592000 },
  ];

  const TIMEINTERVAL = time_interval.map((opt, index) => ({
    label: opt.time,
    index: index,
  }));

  const selectTimeInterval = (opt) => {
    if (opt === null) {
      setswitchTimeInterval(7200);
    } else if (opt.index === 1) {
      setswitchTimeInterval(28800);
    } else if (opt.index === 2) {
      setswitchTimeInterval(86400);
    } else if (opt.index === 3) {
      setswitchTimeInterval(604800);
    } else if (opt.index === 4) {
      setswitchTimeInterval(2592000);
    }
  };

  const device_type = [
    { device: "Combined" },
    { device: "Wireless" },
    { device: "Switch" },
    { device: "Appliance" },
  ];

  const DEVICETYPE = device_type.map((opt, index) => ({
    label: opt.device,
    index: index,
  }));

  const selectDeviceType = (opt) => {
    if (opt === null) {
      setswitchDeviceType("combined");
    } else if (opt.index === 1) {
      setswitchDeviceType("wireless");
    } else if (opt.index === 2) {
      setswitchDeviceType("switch");
    } else if (opt.index === 3) {
      setswitchDeviceType("appliance");
    }
  };

  const handleTopUsers = (e) => {
    e.preventDefault();
    settrigger(trigger + 1);
    if (trigger > 3) {
      settrigger(0);
      setflashMessages(null);
    }
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
        if (trigger < 4) {
          try {
            setloading(true);

            fetch("/flask/traffic_analysis/", {
              method: ["POST"],
              cache: "no-cache",
              headers: {
                content_type: "application/json",
              },
              body: JSON.stringify(APIbody),
            }).then((response) => {
              return response.json;
            });

            fetch("/flask/traffic_analysis/", { signal: signal })
              .then((res) => {
                return res.json();
              })

              .then((data) => {
                if (data.error) {
                  setshowtable(false);
                  setflashMessages(
                    <div className="form-input-error-msg alert alert-danger">
                      <span className="glyphicon glyphicon-exclamation-sign"></span>
                      {data.error[0]}
                    </div>
                  );
                  setTimeout(() => {
                    setflashMessages([]);
                  }, 5000);
                  setloading(false);
                } else {
                  setnetwanalysis(data.analysis);

                  let R1 = [];
                  let deviceData = [];
                  // eslint-disable-next-line
                  data.analysis.map((item) => {
                    let randomKey = Math.random().toString(36).substring(2, 15);

                    var rowModel = {
                      application: item.application,
                      destination: item.destination,
                      protocol: item.protocol,
                      port: item.port,
                      sent: item.sent,
                      recv: item.recv,
                      flows: item.flows,
                      activeTime: item.activeTime,
                      numClients: item.numClients,
                      key: randomKey,
                    };

                    R1.push(rowModel);
                    deviceData.push(rowModel);
                  });
                  setdataInventory({ ...columns, rows: R1 });
                }
              })
              .then(() => {
                if (dataInventory.length !== 0) {
                  setshowtable(true);
                  setloading(false);                } else {
                  if (retryCounter < 4) {
                    settrigger(trigger + 1);
                    setretryCounter(retryCounter + 1);
                  } else {
                    setloading(false);
                  }
                }
                setloading(false);
              });
          } catch (err) {
            if (err) {
              console.log("This is the error:", err);
              setloading(false);
            }
          }
        } else {
          setloading(false);
        }
      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }
    }
    APIcall();
    return () => {
      abortController.abort();
      setnetwanalysis([]);
      setshowtable(false);
      setflashMessages(null);
      setloading(false);
    };
    // eslint-disable-next-line
  }, [trigger]);

  const columns = [
    {
      dataField: "application",
      text: "Application",
      editable: false,
      key: "application",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "destination",
      text: "Destination",
      editable: false,
      key: "destination",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "protocol",
      text: "Protocol",
      editable: false,
      key: "protocol",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "port",
      text: "Port",
      editable: false,
      key: "port",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "sent",
      text: "Sent (Kb)",
      editable: false,
      key: "sent",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "recv",
      text: "Received (Kb)",
      editable: false,
      key: "recv",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "flows",
      text: "Flows",
      editable: false,
      key: "flows",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "activeTime",
      text: "Active Time (sec)",
      editable: false,
      key: "activeTime",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "numClients",
      text: "Clients",
      editable: false,
      key: "numClients",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "key",
      text: "key",
      editable: false,
      hidden: "true",
    },
  ];

  const Paginationoptions = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
      {
        text: "25",
        value: 25,
      },
      {
        text: "50",
        value: 50,
      },
      {
        text: "100",
        value: 100,
      },
      {
        text: "250",
        value: 250,
      },
      {
        text: "500",
        value: 500,
      },
      {
        text: "1000",
        value: 1000,
      },
      {
        text: "All",
        ...(showtable ? { value: dataInventory.rows.length } : { value: 100 }),
      },
    ],
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
                        <dt>
                          This script aggregates all of the detected applications for a given time
                          frame or device type.
                        </dt>
                        <dt>
                          Time frame options for hourly, weekly, daily and monthly are available.
                        </dt>
                        <dt>
                          Device type options for combined, switch, wireless and appliance are
                          available(default combined).
                        </dt>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <form className="form-inline">
                <div className="form-group">
                  <Select
                    className="select_network_change-log"
                    options={TIMEINTERVAL}
                    placeholder="Select Interval"
                    onChange={selectTimeInterval}
                    classNamePrefix="time-interval"
                    isClearable={true}
                  />
                </div>
                <div className="form-group">
                  <Select
                    className="select_network_change-log"
                    options={DEVICETYPE}
                    placeholder="Device type"
                    onChange={selectDeviceType}
                    classNamePrefix="time-interval"
                    isClearable={true}
                  />
                </div>
              </form>
              <button
                id="runButton"
                className="btn btn-primary"
                onClick={!loading ? handleTopUsers : null}
                disabled={loading}
              >
                {loading && <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />}
                {loading && <span>Loading Data</span>}
                {!loading && <span>RUN</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row-inventory">
        {flashMessages}

        <div className="card">
          {showtable ? (
            <div>
              <div className="bootstrap-table-panel">
                <ToolkitProvider search keyField="key" data={dataInventory.rows} columns={columns}>
                  {(props) => (
                    <div>
                      <SearchBar style={{ width: "299px" }} {...props.searchProps} />
                      <ExportCSVButton className="export-csv" {...props.csvProps}>
                        Export CSV
                      </ExportCSVButton>
                      <BootstrapTable
                        {...props.baseProps}
                        striped
                        hover
                        pagination={paginationFactory(Paginationoptions)}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </div>
            </div>
          ) : (
            <div>
              <div>{loading ? <SkeletonTable /> : <div></div>}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
