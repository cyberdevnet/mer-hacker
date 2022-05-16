import React, { useEffect, useState, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import GetApiKey from "../../GetApiKey.js";
import SkeletonTable from "../SkeletonTable";
import axios from "axios";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

export default function GetAllOrganizationSubnets(ac) {
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);
  const [loading, setloading] = useState(false);
  const [dataInventory, setdataInventory] = useState([]);

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  let callApikey = GetApiKey(ac.dc.User);
  let apiKey = callApikey.apikey.current;

  // eslint-disable-next-line

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    organizationId: `${ac.dc.organizationID}`,
    NET_ID: `${ac.dc.networkID}`,
  };

  const handleOrganizationSubnets = (e) => {
    e.preventDefault();
    settrigger(trigger + 1);
  };

  // utility function to check if an object is empty
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

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
        axios
          .post("/flask/allVlans", APIbody)
          .then((data) => {
            if (data.data.error) {
              ac.dc.setflashMessages(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.data.error[0]}
                </div>
              );
              setTimeout(() => {
                ac.dc.setflashMessages([]);
              }, 5000);
            } else {
              ac.dc.setallVlanList(data.data.result);

              if (isEmpty(data.data)) {
                // Object is empty (Would return true in this example)
                ac.dc.setflashMessages(
                  <div className="form-input-error-msg alert alert-danger">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    VLANs are not enabled in this Organization
                  </div>
                );
                setTimeout(() => {
                  ac.dc.setflashMessages([]);
                }, 5000);
              } else {
                // Object is NOT empty
                let Vlanobjects = {};
                let Nameobjects = {};

                for (var x = 0; x < data.data.result.length; x++) {
                  Vlanobjects[x] = data.data.result[x].allVlans;
                  Nameobjects[x] = data.data.result[x].networkname;
                }
                const VLANS = Object.values(Vlanobjects);

                let row = [];
                // eslint-disable-next-line
                VLANS.map((item) => {
                  row.push(...item);
                });

                let row2 = [];
                let deviceData = [];
                // eslint-disable-next-line
                row.map((item) => {
                  const Networkname = [];
                  // eslint-disable-next-line
                  ac.dc.networkList.map((network) => {
                    if (network.id === item.networkId) {
                      Networkname.push(network.name);
                    }
                  });

                  var rowModel = {
                    subnet: item.subnet,
                    id: item.id,
                    name: item.name,
                    applianceIp: item.applianceIp,
                    dnsNameservers: item.dnsNameservers,
                    network: Networkname,
                  };
                  row2.push(rowModel);
                  deviceData.push(rowModel);
                  setdataInventory({ ...columns, rows: row2 });
                });

                setshowtable(true);
              }
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
      setshowtable(false);
    };
    // eslint-disable-next-line
  }, [trigger]);

  const columns = [
    {
      dataField: "subnet",
      text: "Subnet",
      editable: false,
      key: "subnet",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "id",
      text: "VLAN ID",
      editable: false,
      key: "id",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "name",
      text: "VLAN Name",
      editable: false,
      key: "name",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "network",
      text: "Network",
      editable: false,
      key: "network",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "applianceIp",
      text: "MX IP",
      editable: false,
      key: "applianceIp",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "dnsNameservers",
      text: "DNS Servers",
      editable: false,
      key: "dnsNameservers",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
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
        text: "5",
        value: 5,
      },
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
                          This script iterates through all networks in an organization and returns
                          all the subnets and VLANs associated with every network.
                        </dt>
                        <dt>
                          The script works only on MX and Z3 devices, does not work on VPN HUBs, the
                          network must be reachable in the Meraki Dashboard.
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
                {loading && <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />}
                {loading && <span>Loading Data</span>}
                {!loading && <span>RUN</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row-inventory">
        <div className="card" style={{ border: "none" }}>
          {showtable ? (
            <div className="bootstrap-table-panel">
              <ToolkitProvider search keyField="subnet" data={dataInventory.rows} columns={columns}>
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
