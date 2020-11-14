import React, { useEffect, useState, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import GetApiKey from "../../GetApiKey.js";
import SkeletonTable from "../SkeletonTable";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "../../styles/GetAllClients.css";

export default function SwitchPortTemplate(ac) {
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);
  const [loading, setloading] = useState(false);
  const [flashMessages, setflashMessages] = useState([]);
  // eslint-disable-next-line
  const [inventory, setinventory] = useState([]);
  const [dataInventory, setdataInventory] = useState([]);

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  let callApikey = GetApiKey(ac.dc.User);
  let apiKey = callApikey.apikey.current;

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    organizationId: `${ac.dc.organizationID}`,
  };

  const handleClients = (e) => {
    e.preventDefault();
    settrigger(trigger + 1);
    setflashMessages([]);
    ac.dc.setflashMessages([]);
  };

  const isFirstRunHosts = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunHosts.current) {
      isFirstRunHosts.current = false;
      return;
    }
    async function callClients() {
      if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
        setshowtable(false);
        setloading(true);

        // hier starts the inventory

        fetch("/flask/inventory", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody),
        }).then((response) => {
          return response.json;
        });
        fetch("/flask/inventory", { signal: signal })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              ac.setflashMessages(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error[0]}
                </div>
              );
              setTimeout(() => {
                setflashMessages([]);
              }, 5000);
            } else {
              setinventory(data.inventory);
              let inventoryData = [];
              let row = [];

              if (data.inventory.length !== 0) {
                // eslint-disable-next-line
                data.inventory.map((opt, index) => {
                  var TruncatedDate = Math.trunc(opt.claimedAt);
                  var d = new Date(TruncatedDate * 1000);
                  var months = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ];
                  var year = d.getFullYear();
                  var month = months[d.getMonth()];
                  var date = d.getDate();
                  var hour = d.getHours();
                  var min = d.getMinutes();
                  var time = date + "/" + month + "/" + year + " " + hour + ":" + min;

                  const name = [];
                  // eslint-disable-next-line
                  ac.dc.networkList.map((network) => {
                    if (network.id === opt.networkId) {
                      name.push(network.name);
                    }
                  });

                  var InventoryModel = {
                    claimedAt: time,
                    mac: opt.mac,
                    model: opt.model,
                    name: opt.name,
                    networkId: name,
                    serial: opt.serial,
                    publicIp: opt.publicIp,
                  };

                  inventoryData.push(InventoryModel);
                  row.push(InventoryModel);
                  setdataInventory({ ...columns, rows: row });
                });
              } else {
                setloading(false);
                setflashMessages(
                  <div className="form-input-error-msg alert alert-danger">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    There was an error loading the data, please try again.
                  </div>
                );
                setTimeout(() => {
                  setflashMessages([]);
                }, 5000);
              }
            }
          })

          .then(() => {
            setshowtable(true);
            setloading(false);
          });
      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }

      return () => {
        abortController.abort();
        setloading(false);
      };
    }
    callClients();
    // eslint-disable-next-line
  }, [trigger]);

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
    {
      dataField: "claimedAt",
      text: "Claimed",
      editable: false,
      key: "claimedAt",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
  ];

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
                        <dt>This scripts returns the inventory for the selected organization.</dt>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              {flashMessages}
              <button
                className="btn btn-primary-clients"
                onClick={!loading ? handleClients : null}
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
            <div className="bootstrap-table-panel">
              <ToolkitProvider search keyField="mac" data={dataInventory.rows} columns={columns}>
                {(props) => (
                  <div>
                    <SearchBar style={{ width: "299px" }} {...props.searchProps} />
                    <ExportCSVButton className="export-csv" {...props.csvProps}>
                      Export CSV
                    </ExportCSVButton>
                    <BootstrapTable {...props.baseProps} striped hover />
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
