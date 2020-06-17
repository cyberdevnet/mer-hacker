import React, { useEffect, useState, useRef } from "react";
import { MDBDataTableV5 } from "mdbreact";

export default function TrafficAnalysis(ac) {
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);
  const [mapROW1, setmapROW1] = useState([]);
  const [switchTimeInterval, setswitchTimeInterval] = useState(7200);
  const [switchDeviceType, setswitchDeviceType] = useState("combined");
  // eslint-disable-next-line
  const [netwanalysis, setnetwanalysis] = useState([]);
  console.log("TrafficAnalysis -> netwanalysis", netwanalysis);
  const [errorMessage, seterrorMessage] = useState(null);

  const APIbody2 = {
    "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
    DEV_TYPE: switchDeviceType,
    NET_ID: `${ac.dc.networkID}`,
    TIME_SPAN: switchTimeInterval,
  };

  const selectTimeInterval = () => {
    let selectBox = document.getElementById("selectBox-find-time-span");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if (selectedValue === "1") {
      setswitchTimeInterval(7200);
    } else if (selectedValue === "2") {
      setswitchTimeInterval(28800);
    } else if (selectedValue === "3") {
      setswitchTimeInterval(86400);
    } else if (selectedValue === "4") {
      setswitchTimeInterval(604800);
    } else if (selectedValue === "5") {
      setswitchTimeInterval(2592000);
    }
  };

  const selectDeviceType = () => {
    let selectBox = document.getElementById("selectBox-find-device-type");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if (selectedValue === "1") {
      setswitchDeviceType("combined");
    } else if (selectedValue === "2") {
      setswitchDeviceType("wireless");
    } else if (selectedValue === "3") {
      setswitchDeviceType("switch");
    } else if (selectedValue === "4") {
      setswitchDeviceType("appliance");
    }
  };

  const handleTopUsers = (e) => {
    e.preventDefault();
    settrigger(trigger + 1);
    if (trigger > 3) {
      settrigger(0);
      seterrorMessage(null);
    }
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    async function APIcall() {
      if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
        if (trigger < 4) {
          try {
            ac.dc.setloadingButton(true);

            fetch("/traffic_analysis/", {
              method: ["POST"],
              cache: "no-cache",
              headers: {
                content_type: "application/json",
              },
              body: JSON.stringify(APIbody2),
            }).then((response) => {
              return response.json;
            });

            fetch("/traffic_analysis/")
              .then((res) => {
                if (!res.ok) {
                  throw res;
                }
                return res.json();
              })

              .then((data) => {
                setnetwanalysis(data.analysis);

                let R_obj1 = {};
                for (var x = 0; x < data.analysis.length; x++) {
                  R_obj1[x] = data.analysis[x];
                }

                const ROW1 = Object.values(R_obj1);

                let R1 = [];
                // eslint-disable-next-line
                ROW1.map((item) => {
                  var rowModel = [
                    {
                      application: item.application,
                      destination: item.destination,
                      protocol: item.protocol,
                      port: item.port,
                      sent: item.sent,
                      recv: item.recv,
                      flows: item.flows,
                      activeTime: item.activeTime,
                      numClients: item.numClients,
                    },
                  ];
                  R1.push(...rowModel);
                  setmapROW1(R1);
                });
              })
              //   .then(() => {
              //     if (mapROW1.length === 0) {
              //       settrigger(trigger + 1);
              //     }
              //   })
              .then(() => {
                if (mapROW1.length > 0) {
                  ac.dc.setloadingButton(false);
                }
              })
              .then(() => {
                setshowtable(true);
                ac.dc.setloadingButton(false);
              })
              .catch((err) => {
                err.json().then((errorMessage) => {
                  seterrorMessage(
                    <div className="form-input-error-msg alert alert-danger">
                      <span className="glyphicon glyphicon-exclamation-sign"></span>
                      {errorMessage}
                    </div>
                  );
                });
                ac.dc.setloadingButton(false);
              });
          } catch (err) {
            if (err) {
              console.log("This is the error:", err);
              ac.dc.setalert(true);
              ac.dc.setloadingButton(false);
            }
          }
        } else {
          ac.dc.setloadingButton(false);
          ac.dc.setalert(true);

          seterrorMessage(
            <div
              className="form-input-error-msg alert alert-danger"
              style={{ margin: "10px" }}
            >
              <span className="glyphicon glyphicon-exclamation-sign"></span>
              No data was found in the selected time range.
            </div>
          );
        }
      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }
    }
    APIcall();
    return () => {
      setnetwanalysis([]);
      setmapROW1([]);
      setshowtable(false);
      ac.dc.setalert(false);
      seterrorMessage(null);
    };
    // eslint-disable-next-line
  }, [trigger]);

  const datatable_10 = {
    columns: [
      {
        label: "Application",
        field: "application",
        sort: "asc",
        width: 270,
      },

      {
        label: "Destination",
        field: "destination",
        sort: "asc",
        width: 200,
      },
      {
        label: "Protocol",
        field: "protocol",
        sort: "asc",
        width: 100,
      },
      {
        label: "Port",
        field: "port",
        sort: "asc",
        width: 100,
      },
      {
        label: "Sent (Kb)",
        field: "sent",
        sort: "asc",
        width: 100,
      },

      {
        label: "Received (Kb)",
        field: "recv",
        sort: "asc",
        width: 100,
      },
      {
        label: "Flows",
        field: "flows",
        sort: "asc",
        width: 100,
      },
      {
        label: "Active Time (sec)",
        field: "activeTime",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Description",
        },
      },

      {
        label: "Clients",
        field: "numClients",
        sort: "asc",
        width: 100,
      },
    ],
    rows: mapROW1,
  };

  return (
    <div id="page-inner-main-templates">
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="panel-group" id="accordion">
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
                      This is script gets the top 10 heaviest bandwidth users of
                      an MX security appliance for the last 10, 30 and 60
                      minutes.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-body">
              <form className="form-inline">
                <div className="form-group">
                  <select
                    onChange={selectTimeInterval}
                    id="selectBox-find-time-span"
                    className="btn btn-default dropdown-toggle-tools-findports"
                  >
                    <optgroup>
                      <option className="option-tools-disabled" value="0">
                        Select Time Interval
                      </option>
                      <option value="1">2 Hour</option>
                      <option value="2">8 Hours</option>
                      <option value="3">1 Day</option>
                      <option value="4">7 Days</option>
                      <option value="5">1 Month</option>
                    </optgroup>
                  </select>
                  <select
                    onChange={selectDeviceType}
                    id="selectBox-find-device-type"
                    className="btn btn-default dropdown-toggle-tools-findports"
                  >
                    <optgroup>
                      <option className="option-tools-disabled" value="0">
                        Select Device Type
                      </option>
                      <option value="1">Combined</option>
                      <option value="2">Wireless</option>
                      <option value="3">Switch</option>
                      <option value="4">Appliance</option>
                    </optgroup>
                  </select>
                </div>
              </form>

              <div>{errorMessage && <span>{errorMessage}</span>}</div>
              <button
                id="runButton"
                className="btn btn-primary"
                onClick={!ac.dc.loadingButton ? handleTopUsers : null}
                disabled={ac.dc.loadingButton}
              >
                {ac.dc.loadingButton && (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
                {ac.dc.loadingButton && <span>Loading Data</span>}
                {!ac.dc.loadingButton && <span>RUN</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            {showtable ? (
              <div>
                <div className="panel-body">
                  <MDBDataTableV5
                    hover
                    entriesOptions={[10, 25, 100, 250, 500, 1000, 2000]}
                    entries={25}
                    pagesAmount={1000}
                    data={datatable_10}
                    pagingTop
                    searchTop
                    searchBottom={false}
                    exportToCSV={true}
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
