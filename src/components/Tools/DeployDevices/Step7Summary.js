import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import SkeletonProfile from "./SkeletonProfile";
import axios from "axios";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function Step7Summary(ac) {
  const [showtable, setshowtable] = useState(false);
  const [showNoInformation, setshowNoInformation] = useState(false);
  const [triggerSummary, settriggerSummary] = useState(0);
  const [retryCounter, setretryCounter] = useState(0);
  const [alertError, setalertError] = useState([]);
  const [dataRows, setdataRows] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function APIcallDevices() {
      setshowtable(false);
      setshowNoInformation(false);
      await axios.post("/flask/get-api-key", { username: ac.User }).then((data) => {
        let key = data.data.apiKey;
        fetch("/flask/devices", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify({
            "X-Cisco-Meraki-API-Key": `${key}`,
            NET_ID: `${ac.dc.networkIDSelected}`,
          }),
        }).then((response) => {
          return response.json;
        });
        fetch("/flask/devices", { signal: signal })
          .then((res) => {
            if (res.status === 500) {
              setalertError(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {`${res.statusText} please try again.`}
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
              return res.json();
            } else {
              return res.json();
            }
          })
          .then((data) => {
            if (data.error) {
              setalertError(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error[0]}
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
              setshowtable(false);
            } else {
              let row = [];
              let ListSN = [];
              let allFilteredDevices = [];
              if (ac.dc.serialNumbers.length > 0) {
                ListSN = ac.dc.serialNumbers.split(",");
                // eslint-disable-next-line
                ListSN.map((SN) => {
                  let filterDevices = data.devices.filter((obj) => obj.serial === SN);

                  if (filterDevices.length > 0) {
                    allFilteredDevices.push(filterDevices[0]);
                  }
                });
                // eslint-disable-next-line
                allFilteredDevices.map((opt) => {
                  var SummaryModel = {
                    name: opt.name,
                    serial: opt.serial,
                    model: opt.model,
                    address: opt.address,
                    networkname: ac.dc.networkSelected,
                    templateName: ac.dc.templateSelected,
                  };
                  row.push(SummaryModel);
                });
                setdataRows(row);
              } else {
                ac.dc.setnextStepDisabled(false);
              }

              if (allFilteredDevices.length === 0) {
                setshowNoInformation(true);
                ac.dc.setnextStepDisabled(false);
              }
            }
          })
          .then(() => {
            if (showNoInformation === false) {
              if (dataRows.length > 0) {
                setshowtable(true);
                ac.dc.setnextStepDisabled(false);
                setshowNoInformation(false);
              } else {
                if (retryCounter < 4) {
                  settriggerSummary(triggerSummary + 1);
                  setretryCounter(retryCounter + 1);
                } else {
                  setshowNoInformation(true);
                  ac.dc.setnextStepDisabled(false);
                }
              }
            }
          });
      });
    }

    APIcallDevices();
    return () => {
      abortController.abort();
      setshowtable(false);
    };
    // eslint-disable-next-line
  }, [triggerSummary]);

  const columns = [
    {
      dataField: "name",
      text: "Name",
      editable: false,
    },
    {
      dataField: "serial",
      text: "Serial",
      editable: false,
    },
    {
      dataField: "model",
      text: "Switch Model",
      editable: false,
    },
    {
      dataField: "address",
      text: "Address",
      editable: false,
    },
    {
      dataField: "networkname",
      text: "Network",
      editable: false,
    },
    {
      dataField: "templateName",
      text: "Template",
      editable: false,
    },
  ];

  return (
    <div className="row-inventory">
      <div className="card">
        <div className="card-body" style={{ minHeight: "400px" }}>
          <div className="row">
            <div className="card">
              {showNoInformation === false ? (
                <div>
                  {showtable ? (
                    <div className="bootstrap-table-panel">
                      <BootstrapTable
                        keyField="serial"
                        data={dataRows}
                        columns={columns}
                        tabIndexCell
                        striped
                        hover
                      ></BootstrapTable>
                    </div>
                  ) : (
                    <SkeletonProfile />
                  )}
                </div>
              ) : (
                <div className="text-center" style={{ position: "relative", top: "115px" }}>
                  <div className="display-1  mb-5">
                    <i className="fas fa-network-wired" aria-hidden="true"></i>
                  </div>
                  <h1 className="h2 mb-3">No devices information available</h1>
                  <p className="h4  font-weight-normal mb-7">Click finish to exit the Wizard.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {alertError}
      </div>
    </div>
  );
}
