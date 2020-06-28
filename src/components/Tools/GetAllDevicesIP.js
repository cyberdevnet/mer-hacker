import React, { useEffect, useState, useRef } from "react";
import { CSVLink } from "react-csv";
import { MDBDataTableV5 } from "mdbreact";

export default function GetAllDevicesIP(ac) {
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);
  const [loading, setloading] = useState(false);
  const [mapRows, setmapRows] = useState([]);
  console.log("GetAllDevicesIP -> mapRows", mapRows)

  // eslint-disable-next-line
  const [alert, setalert] = useState(false);

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
    organizationId: `${ac.dc.organizationID}`,
    networkId: `${ac.dc.networkID}`,
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    async function APIcall() {
      if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
        setloading(true);
        fetch("/devices", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody),
        }).then((response) => {
          return response.json;
        });
        fetch("/devices")
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              ac.dc.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {data.error[0]}
              </div>)
            } else {
              ac.dc.setclientList(data.devices);

              let row = [];
              // eslint-disable-next-line
              data.devices.map((item) => {
                var rowModel = [
                  {
                    Description: item.name,
                    Model: item.model,
                    LAN_IP_address: item.lanIp,
                    MAC_address: item.mac,
                    WAN_1_IP: item.wan1Ip,
                    WAN_2_IP: item.wan2Ip,
                    Serial: item.serial,
                  },
                ];
                row.push(...rowModel);
                setmapRows(row);
              });
            }

          })
          .then(() => setloading(false))
          .then(() => setshowtable(true))
          .then(() => setloading(false))

      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }
    }

    APIcall();
    return () => {
      ac.dc.setclientList([]);
      setmapRows([]);
      setshowtable(false);
      ac.dc.setalert(false);
    };
    // eslint-disable-next-line
  }, [trigger]);

  const handleIPs = (e) => {
    e.preventDefault();
    settrigger(trigger + 1);
  };

  const datatable = {
    columns: [
      {
        label: "Description",
        field: "Description",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Description",
        },
      },
      {
        label: "Model",
        field: "Model",
        sort: "asc",
        width: 270,
      },
      {
        label: "LAN IP address",
        field: "LAN_IP_address",
        sort: "asc",
        width: 200,
      },
      {
        label: "MAC address",
        field: "MAC_address",
        sort: "asc",
        width: 100,
      },
      {
        label: "WAN 1 IP",
        field: "WAN_1_IP",
        sort: "asc",
        width: 150,
      },
      {
        label: "WAN 2 IP",
        field: "WAN 2 IP",
        sort: "asc",
        width: 100,
      },
      {
        label: "Serial",
        field: "Serial",
        sort: "asc",
        width: 100,
      },
    ],
    rows: mapRows,
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
                      This scripts iterates through all networks in an
                      organization and returns all the IPs associated with every
                      organization.
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={!loading ? handleIPs : null}
                disabled={loading}
              >
                {loading && (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
                {loading && <span>Loading Data</span>}
                {!loading && <span>RUN</span>}
              </button>

              {/* <a
                href="#null"
                className="btn btn-primary"
                // onClick={handleResults}
              >
                Show results
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            {showtable ? (
              <div className="panel-body">
                <CSVLink data={mapRows} separator={";"}>Download cvs</CSVLink>;
                <MDBDataTableV5
                  hover
                  entriesOptions={[10, 25, 50, 100]}
                  entries={10}
                  pagesAmount={10}
                  data={datatable}
                  pagingTop
                  searchTop
                  searchBottom={false}
                  exportToCSV={true}
                />
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
