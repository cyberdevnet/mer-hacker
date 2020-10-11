import React, { useEffect, useState, useRef } from "react";
import GetApiKey from "../../GetApiKey.js";
import { CSVLink } from "react-csv";
import { MDBDataTableV5 } from "mdbreact";
import "../../styles/NetworkTopUsers.css";

export default function NetworkTopUsers(ac) {
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);
  const [mapROW1, setmapROW1] = useState([]);
  const [mapROW2, setmapROW2] = useState([]);
  const [mapROW3, setmapROW3] = useState([]);
  const [errorMessage, seterrorMessage] = useState(null);

  let callApikey = GetApiKey(ac.dc.User, ac.dc.isSignedIn);
  let apiKey = callApikey.apikey.current;

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    "X-CSRFToken": "frollo",
    ARG_ORGNAME: `${ac.dc.organization}`,
    SERIAL_NUM: `${ac.dc.SNtopUsers}`,
    NET_ID: `${ac.dc.networkID}`,
    NET_NAME: `${ac.dc.network}`,
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
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    async function APIcall() {
      if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
        if (trigger < 4) {
          if (ac.dc.SNtopUsers) {
            try {
              ac.dc.setloadingButton(true);
              ac.dc.setflashMessages([]);
              seterrorMessage([]);

              fetch("/flask/topuserdata/", {
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

              fetch("/flask/topuserdata/", {
                signal: signal,
                method: ["POST"],
                cache: "no-cache",
                headers: {
                  content_type: "application/json",
                },
                body: JSON.stringify(APIbody),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.error) {
                    ac.dc.setflashMessages(
                      <div className="form-input-error-msg alert alert-danger">
                        <span className="glyphicon glyphicon-exclamation-sign"></span>
                        {data.error[0]}
                      </div>
                    );
                  } else {
                    ac.dc.setreports(data.reports);

                    let R_obj1 = {};
                    for (var x = 0; x < data.reports.length; x++) {
                      R_obj1[x] = data.reports[x];
                    }
                    const ROW1 = R_obj1[0];
                    const ROW2 = R_obj1[1];
                    const ROW3 = R_obj1[2];

                    let R1 = [];
                    // eslint-disable-next-line
                    ROW1.map((item) => {
                      var rowModel = [
                        {
                          TotalusagekB: item[0],
                          DownloadkB: item[1],
                          UploadkB: item[2],
                          Description: item[3],
                          DHCPhostname: item[4],
                          MACaddress: item[5],
                          IPaddress: item[6],
                          VLAN: item[7],
                        },
                      ];
                      R1.push(...rowModel);
                      setmapROW1(R1);
                    });

                    let R2 = [];
                    // eslint-disable-next-line
                    ROW2.map((item) => {
                      var rowModel = [
                        {
                          TotalusagekB: item[0],
                          DownloadkB: item[1],
                          UploadkB: item[2],
                          Description: item[3],
                          DHCPhostname: item[4],
                          MACaddress: item[5],
                          IPaddress: item[6],
                          VLAN: item[7],
                        },
                      ];
                      R2.push(...rowModel);
                      setmapROW2(R2);
                    });

                    let R3 = [];
                    // eslint-disable-next-line
                    ROW3.map((item) => {
                      var rowModel = [
                        {
                          TotalusagekB: item[0],
                          DownloadkB: item[1],
                          UploadkB: item[2],
                          Description: item[3],
                          DHCPhostname: item[4],
                          MACaddress: item[5],
                          IPaddress: item[6],
                          VLAN: item[7],
                        },
                      ];
                      R3.push(...rowModel);
                      setmapROW3(R3);
                    });
                  }
                })
                .then(() => {
                  if (mapROW1.length === 0 || mapROW2.length === 0 || mapROW3.length === 0) {
                    settrigger(trigger + 1);
                  }
                })
                .then(() => {
                  if (mapROW1.length > 0) {
                    ac.dc.setloadingButton(false);
                  }
                })
                .then(() => {
                  setshowtable(true);
                });
            } catch (err) {
              if (err) {
                console.log("Error: ", err);
                ac.dc.setloadingButton(false);
              }
            }
          } else {
            ac.dc.setloadingButton(false);
            seterrorMessage(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                No MX Firewalls found in this Network, refresh your browser or
                try another Network.
              </div>
            );
          }
        } else {
          ac.dc.setloadingButton(false);

          seterrorMessage(
            <div className="form-input-error-msg alert alert-danger">
              <span className="glyphicon glyphicon-exclamation-sign"></span>
              No data was found in the selected time range. Please refresh your
              browser or try another Network.
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
      abortController.abort();
      ac.dc.setreports([]);
      setmapROW1([]);
      setmapROW2([]);
      setmapROW3([]);
      setshowtable(false);
      seterrorMessage(null);
    };
    // eslint-disable-next-line
  }, [trigger]);

  const datatable_10 = {
    columns: [
      {
        label: "Total usage kB",
        field: "TotalusagekB",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Description",
        },
      },
      {
        label: "Download kB",
        field: "DownloadkB",
        sort: "asc",
        width: 270,
      },
      {
        label: "Upload kB",
        field: "UploadkB",
        sort: "asc",
        width: 200,
      },
      {
        label: "Description",
        field: "Description",
        sort: "asc",
        width: 100,
      },
      {
        label: "DHCP hostname",
        field: "DHCPhostname",
        sort: "asc",
        width: 100,
      },
      {
        label: "MAC address",
        field: "MACaddress",
        sort: "asc",
        width: 100,
      },
      {
        label: "IP address",
        field: "IPaddress",
        sort: "asc",
        width: 100,
      },
      {
        label: "VLAN",
        field: "VLAN",
        sort: "asc",
        width: 100,
      },
    ],
    rows: mapROW1,
  };
  const datatable_30 = {
    columns: [
      {
        label: "Total usage kB",
        field: "TotalusagekB",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Description",
        },
      },
      {
        label: "Download kB",
        field: "DownloadkB",
        sort: "asc",
        width: 270,
      },
      {
        label: "UploadkB",
        field: "VlanName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Description",
        field: "Description",
        sort: "asc",
        width: 100,
      },
      {
        label: "DHCP hostname",
        field: "DHCPhostname",
        sort: "asc",
        width: 100,
      },
      {
        label: "MAC address",
        field: "MACaddress",
        sort: "asc",
        width: 100,
      },
      {
        label: "IP address",
        field: "IPaddress",
        sort: "asc",
        width: 100,
      },
      {
        label: "VLAN",
        field: "VLAN",
        sort: "asc",
        width: 100,
      },
    ],
    rows: mapROW2,
  };

  const datatable_60 = {
    columns: [
      {
        label: "Total usage kB",
        field: "TotalusagekB",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Description",
        },
      },
      {
        label: "Download kB",
        field: "DownloadkB",
        sort: "asc",
        width: 270,
      },
      {
        label: "UploadkB",
        field: "VlanName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Description",
        field: "Description",
        sort: "asc",
        width: 100,
      },
      {
        label: "DHCP hostname",
        field: "DHCPhostname",
        sort: "asc",
        width: 100,
      },
      {
        label: "MAC address",
        field: "MACaddress",
        sort: "asc",
        width: 100,
      },
      {
        label: "IP address",
        field: "IPaddress",
        sort: "asc",
        width: 100,
      },
      {
        label: "VLAN",
        field: "VLAN",
        sort: "asc",
        width: 100,
      },
    ],
    rows: mapROW3,
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
                      <dl>
                        <dt>
                          This script finds the top 10 heaviest bandwidth users
                          of an MX security appliance in the last 10, 30 and 60
                          minutes.
                        </dt>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-body">
              <div>
                <ul className="nav">
                  <li>
                    <h5>Organization: {ac.dc.organization}</h5>
                    <h5>Network: {ac.dc.network}</h5>
                    <h5>MX Serial Number: {ac.dc.SNtopUsers}</h5>
                  </li>
                </ul>
              </div>
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
                  <h4 className="topuser-description">
                    Top 10 hosts in the last 10 minutes
                  </h4>
                  <CSVLink data={mapROW1} separator={","}>
                    <button className="btnCSV" color="primary">
                      Download CSV
                    </button>
                  </CSVLink>

                  <MDBDataTableV5
                    hover
                    sorting={false}
                    searching={false}
                    bordered
                    striped
                    data={datatable_10}
                    paging={false}
                    exportToCSV={true}
                  />
                </div>
                <div className="panel-body">
                  <h4 className="topuser-description">
                    Top 10 hosts in the last 30 minutes
                  </h4>
                  <CSVLink data={mapROW2} separator={","}>
                    <button className="btnCSV" color="primary">
                      Download CSV
                    </button>
                  </CSVLink>

                  <MDBDataTableV5
                    hover
                    sorting={false}
                    searching={false}
                    bordered
                    striped
                    data={datatable_30}
                    paging={false}
                    exportToCSV={true}
                  />
                </div>
                <div className="panel-body">
                  <h4 className="topuser-description">
                    Top 10 hosts in the last 60 minutes
                  </h4>
                  <CSVLink data={mapROW3} separator={","}>
                    <button className="btnCSV" color="primary">
                      Download CSV
                    </button>
                  </CSVLink>

                  <MDBDataTableV5
                    hover
                    sorting={false}
                    searching={false}
                    bordered
                    striped
                    data={datatable_60}
                    paging={false}
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
