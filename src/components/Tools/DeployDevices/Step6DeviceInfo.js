import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import SkeletonProfile from "./SkeletonProfile";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function Step6DeviceInfo(ac) {
  const [showtable, setshowtable] = useState(false);
  const [showNoInformation, setshowNoInformation] = useState(false);

  const [triggerDevices, settriggerDevices] = useState(0);
  const [retryCounter, setretryCounter] = useState(0);
  const [loadingUpdateDevicesBtn, setloadingUpdateDevicesBtn] = useState(false);
  const [alertError, setalertError] = useState([]);
  const [dataRows, setdataRows] = useState([]);
  const [configureDisabled, setconfigureDisabled] = useState(true);
  const [allSelectedDevices, setallSelectedDevices] = useState([]);
  const [triggerUpdateDevices, settriggerUpdateDevices] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function APIcallDevices() {
      setshowtable(false);
      setshowNoInformation(false);
      await axios.post("/flask/get-api-key", { username: ac.User }).then((data) => {
        let key = data.data.apiKey;
        axios
        .post("/flask/devices", {
          "X-Cisco-Meraki-API-Key": `${key}`,
          NET_ID: `${ac.dc.networkIDSelected}`,
        })
          .then((data) => {
            if (data.status === 500) {
              setalertError(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {`${data.statusText} please try again.`}
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
         
            } else if (data.data.error) {
              setalertError(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.data.error[0]}
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
                  let filterDevices = data.data.devices.filter((obj) => obj.serial === SN);

                  if (filterDevices.length > 0) {
                    allFilteredDevices.push(filterDevices[0]);
                  }
                });
                // eslint-disable-next-line
                allFilteredDevices.map((opt) => {
                  var switchMod = {
                    Switchmodel: opt.model,
                    serial: opt.serial,
                    deviceName: opt.name ? opt.name : "Update Name",
                    address: opt.address ? opt.address : "Update address",
                    networkname: ac.dc.networkSelected,
                    templateName: ac.dc.templateSelected,
                  };
                  row.push(switchMod);
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
                setshowNoInformation(false);
                ac.dc.setnextStepDisabled(false);
              } else {
                if (retryCounter < 4) {
                  settriggerDevices(triggerDevices + 1);
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
  }, [triggerDevices]);

  const isFirstRunbindProfile = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunbindProfile.current) {
      isFirstRunbindProfile.current = false;
      return;
    }
    async function UpdateDevices() {
      setloadingUpdateDevicesBtn(true);
      await axios.post("/flask/get-api-key", { username: ac.User }).then((data) => {
        let key = data.data.apiKey;
        axios.post("/flask/UpdateDevices", {
          "X-Cisco-Meraki-API-Key": `${key}`,
          network_id: `${ac.dc.networkIDSelected}`,
          allSelectedDevices: allSelectedDevices,
        })
          .then((data) => {
            if (data.status === 500) {
              setloadingUpdateDevicesBtn(false);
              setalertError(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {`${data.statusText} please try again.`}
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
            } else if (data.data.error) {
              setalertError(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.data.error}
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
              setloadingUpdateDevicesBtn(false);
            } else {
              ac.dc.setDevicesInfo(data.data.UpdateDevices);
              setloadingUpdateDevicesBtn(false);
              setalertError(
                <div className="form-input-error-msg alert alert-success">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  Devices Updated.
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
            }
          });
      });
    }
    UpdateDevices();
    return () => {
      abortController.abort();
      setloadingUpdateDevicesBtn(false);
    };
    // eslint-disable-next-line
  }, [triggerUpdateDevices]);

  const columns = [
    {
      dataField: "Switchmodel",
      text: "Switch Model",
      editable: false,
    },
    {
      dataField: "serial",
      text: "Serial",
      editable: false,
    },
    {
      dataField: "deviceName",
      text: "Device Name",
      editCellClasses: "edit-cell-class",
      editor: {
        type: Type.TEXTAREA,
      },
    },
    {
      dataField: "address",
      text: "Address",
      editCellClasses: "edit-cell-class",
      editor: {
        type: Type.TEXTAREA,
      },
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

  const selectRow = {
    mode: "checkbox",
    hideSelectAll: true,
    clickToSelect: true,
    clickToEdit: true,

    onSelect: (row, isSelect, rowIndex) => {
      if (isSelect === true) {
        setallSelectedDevices([...allSelectedDevices, row]);
        setconfigureDisabled(false);
      } else if (isSelect === false) {
        const index = allSelectedDevices.findIndex((i) => i.profile === row.profile);
        allSelectedDevices.splice(index, 1);
        if (allSelectedDevices.length === 0) {
          setconfigureDisabled(true);
        }
      }
    },
  };

  function HandleUpdateDevices() {
    if (allSelectedDevices.length > 0) {
      settriggerUpdateDevices(triggerUpdateDevices + 1);
    }
  }

  return (
    <div className="row-inventory">
      <div className="card">
        {showNoInformation === false ? (
          <div className="card-body" style={{ minHeight: "400px" }}>
            <div className="row-inventory">
              <div className="card">
                {showtable ? (
                  <div className="bootstrap-table-panel">
                    <BootstrapTable
                      keyField="serial"
                      data={dataRows}
                      columns={columns}
                      selectRow={selectRow}
                      tabIndexCell
                      striped
                      hover
                      cellEdit={cellEditFactory({
                        mode: "click",
                        blurToSave: true,
                        afterSaveCell: selectRow,
                      })}
                    ></BootstrapTable>
                  </div>
                ) : (
                  <SkeletonProfile />
                )}
              </div>
            </div>
            <div>
              <button
                onClick={HandleUpdateDevices}
                className="btn-summary btn-primary switch-profile"
                disabled={configureDisabled}
              >
                {loadingUpdateDevicesBtn && (
                  <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
                )}
                {loadingUpdateDevicesBtn && <span>Update Devices</span>}
                {!loadingUpdateDevicesBtn && <span>Update Devices</span>}
              </button>
            </div>
          </div>
        ) : (
          <div className="panel-body" style={{ minHeight: "400px" }}>
            <div className="text-center" style={{ position: "relative", top: "115px" }}>
              <div className="display-1  mb-5">
                <i className="fas fa-network-wired" aria-hidden="true"></i>
              </div>
              <h1 className="h2 mb-3">No devices information available</h1>
            </div>
          </div>
        )}
        {alertError}
      </div>
    </div>
  );
}
