import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import SkeletonProfile from "./SkeletonProfile";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function Step4Profile(ac) {
  const [showtable, setshowtable] = useState(false);
  const [triggerbindProfile, settriggerbindProfile] = useState(0);
  const [triggerDevices, settriggerDevices] = useState(0);
  const [retryCounter, setretryCounter] = useState(0);
  const [loadingSetProfileBtn, setloadingSetProfileBtn] = useState(false);
  const [alertError, setalertError] = useState([]);
  const [switches, setswitches] = useState([]);
  const [dataRows, setdataRows] = useState([]);
  const [profiles, setprofiles] = useState([]);
  const [configureDisabled, setconfigureDisabled] = useState(true);
  const [allSelectedSwitches, setallSelectedSwitches] = useState([]);
  const [isSwitchAvailable, setisSwitchAvailable] = useState(false);
  const [stopLoading, setstopLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function getSwitchProfiles() {
      if (ac.dc.isTemplateSelected === true) {
        await axios.post("/flask/get-api-key", { username: ac.User }).then((data) => {
          let key = data.data.apiKey;
          axios.post("/flask/getSwitchProfiles", {
            "X-Cisco-Meraki-API-Key": `${key}`,
            organizationId: `${ac.organizationID}`,
            configTemplateId: `${ac.dc.configTemplateId}`,
          })
            .then((data) => {
              if (data.data.error) {
                setstopLoading(true);
                setalertError(
                  <div className="form-input-error-msg alert alert-danger">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    {data.data.error}
                  </div>
                );
                setTimeout(() => {
                  setalertError([]);
                }, 6000);
              } else {
                ac.dc.setprofilesList(data.data.getSwitchProfiles);
                settriggerDevices(triggerDevices + 1);
              }
            });
        });
      }
    }
    getSwitchProfiles();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, []);

  const isFirstRungetDevices = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (isFirstRungetDevices.current) {
      isFirstRungetDevices.current = false;
      return;
    }
    async function APIcallDevices() {
      setshowtable(false);
      setstopLoading(false);
      await axios.post("/flask/get-api-key", { username: ac.User }).then((data) => {
        let key = data.data.apiKey;
        axios
            .post("/flask/devices", {
              "X-Cisco-Meraki-API-Key": `${key}`,
              NET_ID: `${ac.dc.networkIDSelected}`,
            })
          .then((data) => {
            if (data.data.error) {
              setstopLoading(true);
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
              let switche = [];
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
              }
              // eslint-disable-next-line
              allFilteredDevices.map((opt) => {
                if (opt.model.startsWith("MS")) {
                  setisSwitchAvailable(true);
                  let filter = ac.dc.profilesList.filter((obj) => obj.model === opt.model);

                  let switchProfileId = filter[0].switchProfileId;
                  let ProfileModel = filter[0].model;

                  var switchMod = {
                    Switchmodel: opt.model,
                    ProfileModel: ProfileModel,
                    serial: opt.serial,
                    profile: "Select Profile",
                    switchProfileId: switchProfileId,
                    networkId: opt.networkId,
                  };
                  row.push(switchMod);

                  switche.push(opt);

                  const ALLPROFILES = ac.dc.profilesList.map((opt, index) => ({
                    label: opt.name,
                    value: opt.name,
                    profile: opt.name,
                    switchProfileId: opt.switchProfileId,
                  }));

                  setprofiles(ALLPROFILES);
                }
                setdataRows(row);
              });
              setswitches(switche);
            }
          })
          .then(() => {
            if (dataRows.length > 0) {
              setshowtable(true);
              setstopLoading(true);
            } else {
              if (retryCounter < 4) {
                settriggerDevices(triggerDevices + 1);
                setretryCounter(retryCounter + 1);
              } else {
                setstopLoading(true);
              }
            }
          })
          .catch((err) => console.log(err));
      });
    }

    APIcallDevices();
    return () => {
      abortController.abort();
      setshowtable(false);
      setstopLoading(true);
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
    async function bindProfile() {
      setloadingSetProfileBtn(true);
      await axios.post("/flask/get-api-key", { username: ac.User }).then((data) => {
        let key = data.data.apiKey;
        axios.post("/flask/bindProfile", {
          "X-Cisco-Meraki-API-Key": `${key}`,
          network_id: `${ac.dc.networkIDSelected}`,
          switchProfileId: `${ac.dc.switchProfileId}`,
          allSelectedSwitches: allSelectedSwitches,
        })
          .then((data) => {
            if (data.status === 500) {
              setloadingSetProfileBtn(false);
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
              setloadingSetProfileBtn(false);
            } else {
              setloadingSetProfileBtn(false);
              ac.dc.setnextStepDisabled(false);
              setalertError(
                <div className="form-input-error-msg alert alert-success">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  Switches bound to Profile(s)
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
            }
          });
      });
    }
    bindProfile();
    return () => {
      abortController.abort();
      setloadingSetProfileBtn(false);
    };
    // eslint-disable-next-line
  }, [triggerbindProfile]);

  function HandleSetProfile() {
    let countMatches = 0;
    // eslint-disable-next-line
    allSelectedSwitches.map((opt) => {
      let filter = ac.dc.profilesList.filter((obj) => obj.model === opt.Switchmodel);

      let filterName = filter[0].name;

      if (opt.profile !== filterName) {
        setalertError(
          <div className="form-input-error-msg alert alert-danger">
            <span className="glyphicon glyphicon-exclamation-sign"></span>
            {`Profile ${opt.profile} does not match selected switch model ${opt.Switchmodel}`}
          </div>
        );
        setTimeout(() => {
          setalertError([]);
        }, 15000);
      } else {
        countMatches = countMatches + 1;
      }
    });

    if (countMatches === allSelectedSwitches.length) {
      settriggerbindProfile(triggerbindProfile + 1);
    }
  }

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
      dataField: "switchProfileId",
      text: "switchProfileId",
      editable: false,
      hidden: true,
    },
    {
      dataField: "profile",
      text: "Switch Profile",
      editCellClasses: "edit-cell-class",
      // onClick: (e) => e.stopPropagation(),
      editor: {
        type: Type.SELECT,
        getOptions: (opt) => profiles,
      },
    },
  ];

  const selectRow = {
    mode: "checkbox",
    hideSelectAll: true,
    clickToSelect: true,
    clickToEdit: true,

    onSelect: (row, isSelect, rowIndex) => {
      if (isSelect === true) {
        setallSelectedSwitches([...allSelectedSwitches, row]);
        setconfigureDisabled(false);
      } else if (isSelect === false) {
        const index = allSelectedSwitches.findIndex((i) => i.profile === row.profile);
        allSelectedSwitches.splice(index, 1);
        if (allSelectedSwitches.length === 0) {
          setconfigureDisabled(true);
        }
      }
    },
  };

  return (
    <div className="row-inventory">
      <div className="card">
        <div className="card-body" style={{ minHeight: "400px" }}>
          <div className="row-inventory">
            {ac.dc.isTemplateSelected ? (
              <div className="card">
                {showtable && isSwitchAvailable ? (
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
                  <div>
                    {stopLoading === true ? (
                      <div className="text-center" style={{ position: "relative", top: "115px" }}>
                        <div className="display-1  mb-5">
                          <i className="fas fa-network-wired" aria-hidden="true"></i>
                        </div>
                        <h1 className="h2 mb-3">
                          Oops.. We did not find any switch in this network..
                        </h1>
                        <p className="h4  font-weight-normal mb-7">
                          Make sure you have selected and bound a Template in the previous
                          step.&hellip;
                        </p>
                      </div>
                    ) : (
                      <SkeletonProfile />
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center" style={{ position: "relative", top: "115px" }}>
                <div className="display-1  mb-5">
                  <i className="fas fa-columns" aria-hidden="true"></i>
                </div>
                <h1 className="h2 mb-3">No Template selected</h1>
                <p className="h4  font-weight-normal mb-7">
                  You can skip this section or select a Template in the previous step.&hellip;
                </p>
              </div>
            )}
          </div>
        </div>
        {switches.length > 0 ? (
          <div>
            <button
              onClick={HandleSetProfile}
              className="btn-summary btn-primary switch-profile"
              style={{ position: "relative", bottom: "45px", right: "10px" }}
              disabled={configureDisabled}
            >
              {loadingSetProfileBtn && (
                <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
              )}
              {loadingSetProfileBtn && <span>Bind to Profile</span>}
              {!loadingSetProfileBtn && <span>Bind to Profile</span>}
            </button>
          </div>
        ) : (
          <div></div>
        )}
        {alertError}
      </div>
    </div>
  );
}
