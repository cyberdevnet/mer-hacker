import React, { useEffect, useState, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import GetApiKey from "../../GetApiKey.js";
import SkeletonTable from "../SkeletonTable";

import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import "../../styles/MainTools.css";

export default function GetAllDevicesIP(ac) {
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
        fetch("/flask/devices", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody),
        }).then((response) => {
          return response.json;
        });
        fetch("/flask/devices", { signal: signal })
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
              ac.dc.setclientList(data.devices);

              let deviceData = [];
              let row = [];
              // eslint-disable-next-line
              data.devices.map((item) => {
                var rowModel = {
                  name: item.name,
                  model: item.model,
                  lanIp: item.lanIp,
                  network: ac.dc.network,
                  mac: item.mac,
                  wan1Ip: item.wan1Ip,
                  wan2Ip: item.wan2Ip,
                  serial: item.serial,
                };

                row.push(rowModel);
                deviceData.push(rowModel);
                setdataInventory({ ...columns, rows: row });
              });
            }
          })
          .then(() => setloading(false))
          .then(() => setshowtable(true));
      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }
    }

    APIcall();
    return () => {
      abortController.abort();
      ac.dc.setclientList([]);
      setshowtable(false);
    };
    // eslint-disable-next-line
  }, [trigger]);

  const handleIPs = (e) => {
    e.preventDefault();
    settrigger(trigger + 1);
  };

  const columns = [
    {
      dataField: "name",
      text: "Description",
      editable: false,
      key: "name",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "model",
      text: "Model",
      editable: false,
      key: "model",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "lanIp",
      text: "LAN IP address",
      editable: false,
      key: "lanIp",
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
      dataField: "wan1Ip",
      text: "WAN 1 IP",
      editable: false,
      key: "wan1Ip",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "wan2Ip",
      text: "WAN 2 IP",
      editable: false,
      key: "wan2Ip",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "mac",
      text: "MAC Adress",
      editable: false,
      key: "mac",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "serial",
      text: "Serial",
      editable: false,
      key: "serial",
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
                          This scripts returns all the IPs, serial-numbers and models of all devices
                          assigned to the selected network.
                        </dt>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={!loading ? handleIPs : null}
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
        <div className="card">
          {showtable ? (
            <div>
              <div className="bootstrap-table-panel">
                <ToolkitProvider search keyField="mac" data={dataInventory.rows} columns={columns}>
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
  );
}
