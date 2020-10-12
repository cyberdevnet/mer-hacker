import React, { useEffect, useState, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import GetApiKey from "../../GetApiKey.js";
import SkeletonTable from "../SkeletonTable";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

export default function GetAllSubnets(ac) {
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);
  const [loading, setloading] = useState(false);
  const [dataInventory, setdataInventory] = useState(false);

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  let callApikey = GetApiKey(ac.dc.User, ac.dc.isSignedIn);
  let apiKey = callApikey.apikey.current;

  // eslint-disable-next-line
  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    organizationId: `${ac.dc.organizationID}`,
    NET_ID: `${ac.dc.networkID}`,
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
        setshowtable(false);
        setdataInventory(false);

        fetch("/flask/vlans", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody),
        }).then((response) => {
          return response.json;
        });
        fetch("/flask/vlans", { signal: signal })
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
              ac.dc.setvlanList(data.vlans);

              let row = [];
              let deviceData = [];
              // eslint-disable-next-line
              data.vlans.map((item) => {
                var rowModel = {
                  subnet: item.subnet,
                  id: item.id,
                  name: item.name,
                  network: ac.dc.network,
                  applianceIp: item.applianceIp,
                  dnsNameservers: item.dnsNameservers,
                };

                row.push(rowModel);
                deviceData.push(rowModel);
                setdataInventory({ ...columns, rows: row });
              });
              setshowtable(true);
            }
          })
          .then(() => setloading(false))
          .catch((error) => {
            console.log("APIcall -> error", error);
          });
      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }
    }

    APIcall();
    return () => {
      abortController.abort();
      ac.dc.setflashMessages([]);
      ac.dc.setvlanList([]);
      setshowtable(false);
      setloading(false);
    };
    // eslint-disable-next-line
  }, [trigger]);

  const handleSubnets = (e) => {
    e.preventDefault();
    settrigger(trigger + 1);
  };

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
        ...(showtable ? { value: 500 } : { value: 100 }),
      },
    ],
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
                        <dt>This scripts returns all VLANs configured in a network.</dt>
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
                onClick={!loading ? handleSubnets : null}
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
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            {showtable ? (
              <div className="panel-body">
                <div className="bootstrap-table-panel">
                  <ToolkitProvider
                    search
                    keyField="subnet"
                    data={dataInventory.rows}
                    columns={columns}
                  >
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
              <div>{loading ? <SkeletonTable /> : <div></div>}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
