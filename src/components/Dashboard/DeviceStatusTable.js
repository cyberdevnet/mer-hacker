import React, { useState, useEffect, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";
import GetApiKey from "../../GetApiKey.js";
import axios from "axios";
import SkeletonTable from "../SkeletonTable";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "../../styles/Dashboard.css";

export default function DeviceStatusTable(ac) {
  const [mapRows, setmapRows] = useState([]);
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);

  let callApikey = GetApiKey(ac.User);
  let apiKey = callApikey.apikey.current;

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    organizationId: `${ac.organizationID}`,
    NET_ID: `${ac.networkID}`,
  };

  useEffect(() => {
    setTimeout(() => {
      settrigger(trigger + 1);
    }, 2000);
    return () => {};
    // eslint-disable-next-line
  }, []);

  const isFirst = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    async function callDeviceStatus() {
      if (ac.organizationID !== 0 && ac.networkID !== 0) {
        try {
          axios
            .post("/flask/device_status", APIbody)
            .then((data) => {
              if (data.data.error) {
                ac.setflashMessages(
                  <div className="form-input-error-msg alert alert-danger">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    {data.data.error[0]}
                  </div>
                );
                setTimeout(() => {
                  ac.setflashMessages([]);
                }, 5000);
              } else {
                ac.setdeviceStatusList(data.data.deviceStatus);
                ac.settotaldeviceStatusList(data.data.deviceStatus.length);

                //devices list table

                let row = [];
                // eslint-disable-next-line
                data.data.deviceStatus.map((item) => {
                  const name = [];
                  // eslint-disable-next-line
                  ac.networkList.map((network) => {
                    if (network.id === item.networkId) {
                      name.push(network.name);
                    }
                  });
                  if (item.usingCellularFailover) {
                    row.push({
                      name: item.name,
                      status: item.status,
                      networkId: name,
                      lanIp: item.lanIp,
                      publicIp: item.publicIp,
                      wan1Ip: item.wan1Ip,
                      wan2Ip: item.wan2Ip,
                      serial: item.serial,
                      usingCellularFailover: (
                        <span className="fas fa-check" style={{ color: "#1ABC9C" }}></span>
                      ),
                    });
                  } else {
                    row.push({
                      name: item.name,
                      status: item.status,
                      networkId: name,
                      lanIp: item.lanIp,
                      publicIp: item.publicIp,
                      wan1Ip: item.wan1Ip,
                      wan2Ip: item.wan2Ip,
                      serial: item.serial,
                    });
                  }
                  setmapRows(row);
                });
              }
            })
            .then(() => {
              setshowtable(true);
            })
            .catch((err) => console.log(err));
        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      } else {
        return function cleanup() {
          abortController.abort();
          setshowtable(false);
        };
      }
    }

    callDeviceStatus();
    return function cleanup() {
      abortController.abort();
      setshowtable(false);
    };
    // eslint-disable-next-line
  }, [trigger, ac.organizationID, ac.networkID]);

  const columns = [
    {
      dataField: "name",
      text: "Name",
      editable: false,
      key: "name",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "status",
      text: "Status",
      editable: false,
      key: "status",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "networkId",
      text: "Network",
      editable: false,
      key: "networkId",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "lanIp",
      text: "Lan IP",
      editable: false,
      key: "lanIp",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "publicIp",
      text: "Public IP",
      editable: false,
      key: "publicIp",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "wan1Ip",
      text: "WAN 1",
      editable: false,
      key: "wan1Ip",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "wan2Ip",
      text: "WAN 2",
      editable: false,
      key: "wan2Ip",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "usingCellularFailover",
      text: "Cellular",
      editable: false,
      key: "usingCellularFailover",
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
        text: "All",
        ...(showtable ? { value: 500 } : { value: 100 }),
      },
    ],
  };

  return (
    <div>
      {showtable ? (
                    <div>
                    <div className="bootstrap-table-panel">
                      <ToolkitProvider
                        search
                        keyField="serial"
                        data={mapRows}
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
        <div>
          <SkeletonTable />
        </div>
      )}
    </div>
  );
}
