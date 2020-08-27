import React, { useEffect, useState, useRef } from "react";
import { CSVLink } from "react-csv";
import { MDBDataTableV5 } from "mdbreact";

export default function GetAllOrganizationSubnets(ac) {
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);
  const [loading, setloading] = useState(false);
  const [mapRows, setmapRows] = useState([]);

  // eslint-disable-next-line

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
    organizationId: `${ac.dc.organizationID}`,
    NET_ID: `${ac.dc.networkID}`,
  };

  const handleOrganizationSubnets = (e) => {
    e.preventDefault();
    settrigger(trigger + 1);
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
        setloading(true);
        fetch("/flask/allVlans", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody),
        }).then((response) => {
          return response.json;
        });

        fetch("/flask/allVlans", { signal: signal })
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
              ac.dc.setallVlanList(data.result);

              let Vlanobjects = {};
              let Nameobjects = {};
              for (var x = 0; x < data.result.length; x++) {
                Vlanobjects[x] = data.result[x].allVlans;
                Nameobjects[x] = data.result[x].networkname;
              }
              const VLANS = Object.values(Vlanobjects);

              let row = [];
              // eslint-disable-next-line
              VLANS.map((item) => {
                row.push(...item);
              });

              let row2 = [];
              // eslint-disable-next-line
              row.map((item) => {
                var rowModel = [
                  {
                    Subnet: item.subnet,
                    VlanID: item.id,
                    VlanName: item.name,
                    MX_IP: item.applianceIp,
                    DNS: item.dnsNameservers,
                    Network: "Network ---",
                  },
                ];
                row2.push(...rowModel);
                setmapRows(row2);
              });

              setshowtable(true);
            }
          })

          .then(() => setloading(false));
      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }
    }
    APIcall();
    return () => {
      abortController.abort();
      ac.dc.setallVlanList([]);
      setmapRows([]);
      setshowtable(false);
    };
    // eslint-disable-next-line
  }, [trigger]);

  const datatable = {
    columns: [
      {
        label: "Subnet",
        field: "Subnet",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Description",
        },
      },
      {
        label: "VLAN ID",
        field: "VlanID",
        sort: "asc",
        width: 270,
      },
      {
        label: "VLAN Name",
        field: "VlanName",
        sort: "asc",
        width: 200,
      },
      {
        label: "MX IP",
        field: "MX_IP",
        sort: "asc",
        width: 100,
      },
      {
        label: "DNS Servers",
        field: "DNS",
        sort: "asc",
        width: 100,
      },
      {
        label: "Network",
        field: "Network",
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
                      <dl>
                        <dt>
                          This scripts iterates through all networks in an
                          organization and returns all the subnets and VLANs
                          associated with every network.
                        </dt>
                        <dt>
                          The script works only on MX and Z3 devices, does not
                          work on VPN HUBs, the network must be reachable in the
                          Meraki Dashboard.
                        </dt>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={!loading ? handleOrganizationSubnets : null}
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
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            {showtable ? (
              <div className="panel-body">
                <CSVLink data={mapRows} separator={";"}>
                  Download cvs
                </CSVLink>
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
