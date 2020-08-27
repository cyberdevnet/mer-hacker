import React, { useEffect, useState, useRef } from "react";
import { LazyLog } from "react-lazylog";
import "../../styles/BackupRestore.css";
import axios from "axios";
import "ace-builds";
import AceEditor from "react-ace";
import ReactModal from "react-modal";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-min-noconflict/ext-language_tools";
// eslint-disable-next-line
const fs = require("browserify-fs");

export default function BackupRestore(ac) {
  const [loadingButtonBackup, setloadingButtonBackup] = useState(false);
  const [loadingButtonRestore, setloadingButtonRestore] = useState(false);
  const [loadingButtonRestoreSwitch, setloadingButtonRestoreSwitch] = useState(
    false
  );
  const [displayButtons, setdisplayButtons] = useState({ display: "none" });
  const [displayRestoreButtons, setdisplayRestoreButtons] = useState({
    display: "none",
  });
  const [
    displayRestoreSwitchButtons,
    setdisplayRestoreSwitchButtons,
  ] = useState({ display: "none" });
  const [triggerBackup, settriggerBackup] = useState(0);
  const [triggerFile, settriggerFile] = useState(0);
  const [triggerRestore, settriggerRestore] = useState(0);
  const [triggerRestoreSwitch, settriggerRestoreSwitch] = useState(0);
  // eslint-disable-next-line
  const [errorMessage, seterrorMessage] = useState(null);
  // eslint-disable-next-line
  const [liveLogs, setliveLogs] = useState("");
  const [showLiveLogs, setshowLiveLogs] = useState(false);
  const [lazyLog, setlazyLog] = useState([]);

  const APIbody2 = {
    "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
    "X-CSRFToken": "frollo",
    ARG_ORGNAME: `${ac.dc.organization}`,
    SERIAL_NUM: `${ac.dc.SNtopUsers}`,
    NET_ID: `${ac.dc.networkID}`,
    ARG_ORGID: `${ac.dc.organizationID}`,
  };

  const handleBackup = (e) => {
    e.stopPropagation();
    ac.dc.setshowRestorescript(false);
    ac.dc.setrestoreScript([]);
    setdisplayButtons({ display: "none" });
    // e.preventDefault();
    settriggerBackup(triggerBackup + 1);
    setliveLogs([]);
    setshowLiveLogs(true);
    if (triggerBackup > 3) {
      settriggerBackup(0);
      seterrorMessage(null);
    }
  };

  const handleRestoreFile = (e) => {
    e.preventDefault();
    setshowLiveLogs(false);
    seterrorMessage(null);
    settriggerFile(triggerFile + 1);
    if (triggerFile > 3) {
      settriggerFile(0);
    }
  };

  const HandleRestore = (e) => {
    e.preventDefault();
    ac.dc.setswitchConfirmRestore(true);
    ac.dc.setshowRestorescript(false);
    setshowLiveLogs(false);
  };

  const CancelRestore = (e) => {
    e.preventDefault();
    ac.dc.setswitchConfirmRestore(false);
  };

  const ConfirmRestore = (e) => {
    e.preventDefault();
    ac.dc.setswitchConfirmRestore(false);
    settriggerRestore(triggerRestore + 1);
    setshowLiveLogs(true);
    if (triggerRestore > 3) {
      settriggerRestore(0);
    }
  };

  const HandleRestoreSwitch = (f) => {
    f.preventDefault();
    ac.dc.setswitchConfirmRestoreSwitch(true);
    ac.dc.setshowRestorescript(false);
    setshowLiveLogs(false);
  };

  const CancelRestoreSwitch = (f) => {
    f.preventDefault();
    ac.dc.setswitchConfirmRestoreSwitch(false);
  };

  const ConfirmRestoreSwitch = (f) => {
    f.preventDefault();
    ac.dc.setswitchConfirmRestoreSwitch(false);
    settriggerRestoreSwitch(triggerRestoreSwitch + 1);
    setshowLiveLogs(true);
    if (triggerRestoreSwitch > 3) {
      settriggerRestoreSwitch(0);
    }
  };

  const downloadScript = () => {
    const element = document.createElement("a");
    const file = new Blob([ac.dc.restoreScript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "meraki_restore_network.py";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  // function used to upload the meraki_restore_network.py file on the xpress server
  // after has been modified by the AceEditor GUI
  const UploadModifiedScript = (value) => {
    const data = new FormData();
    const file = new Blob([value], { type: "text/plain" });
    data.append("file", file, "meraki_restore_network.py");
    axios.post("/node/upload", data);
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    async function Backup() {
      if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
        setloadingButtonBackup(true);

        fetch("/flask/run_backup/", {
          signal: signal,
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody2),
        })
          .then((res) => res.json())
          .then(() => {
            setloadingButtonBackup(false);
            setdisplayButtons({ display: "inline-block" });
            setdisplayRestoreButtons({ display: "inline-block" });
          });

        // });
      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }
    }
    Backup();
    return () => {
      abortController.abort();
      seterrorMessage(null);
    };
    // eslint-disable-next-line
  }, [triggerBackup]);

  const isFirstRunFile = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunFile.current) {
      isFirstRunFile.current = false;
      return;
    }
    async function OpenFile() {
      fetch("/node/flask/backup_restore/meraki_restore_network.py", {
        signal: signal,
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          ac.dc.setrestoreScript(data);
        })
        .then(() => {
          ac.dc.setshowRestorescript(true);
        })

        .catch((err) => {
          console.log("APIcall -> err", err);
        });
    }
    OpenFile();
    return () => {
      abortController.abort();
      ac.dc.setshowRestorescript(false);
      seterrorMessage(null);
    };
    // eslint-disable-next-line
  }, [triggerFile]);

  const isFirstRunRestore = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunRestore.current) {
      isFirstRunRestore.current = false;
      return;
    }
    async function Restore() {
      setloadingButtonRestore(true);
      ac.dc.setshowRestorescript(false);

      fetch("/flask/run_restore/", {
        signal: signal,
        method: ["POST"],
        cache: "no-cache",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify(APIbody2),
      })
        .then((res) => {
          console.log("POST response: ", res);
        })

        .then(() => {
          setdisplayRestoreSwitchButtons({ display: "inline-block" });
          setdisplayRestoreButtons({ display: "none" });
          setloadingButtonRestore(false);
        });
    }
    Restore();
    return () => {
      abortController.abort();
      ac.dc.setshowRestorescript(false);
      seterrorMessage(null);
    };
    // eslint-disable-next-line
  }, [triggerRestore]);

  const isFirstRunRestoreSwitch = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunRestoreSwitch.current) {
      isFirstRunRestoreSwitch.current = false;
      return;
    }
    async function RestoreSwitch() {
      // if (ac.dc.showRestorescript === true) {

      setloadingButtonRestoreSwitch(true);
      ac.dc.setshowRestorescript(false);

      fetch("/flask/run_restore_switch/", {
        signal: signal,
        method: ["POST"],
        cache: "no-cache",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify(APIbody2),
      })
        .then((res) => {
          console.log("POST response: ", res);
        })

        .then(() => {
          setloadingButtonRestoreSwitch(false);
        });
    }
    RestoreSwitch();
    return () => {
      abortController.abort();
      ac.dc.setshowRestorescript(false);
      seterrorMessage(null);
    };
    // eslint-disable-next-line
  }, [triggerRestoreSwitch]);

  const isFirstRunLogs = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunLogs.current) {
      isFirstRunLogs.current = false;
      return;
    }

    let interval = null;
    if (showLiveLogs) {
      interval = setInterval(() => {
        try {
          fetch("/node/flask/logs/log_file.log", { signal: signal })
            .then((response) => {
              return response.text();
            })
            .then((data) => {
              setlazyLog(
                <LazyLog
                  extraLines={1}
                  enableSearch
                  text={data}
                  stream
                  caseInsensitive
                  selectableLines
                />
              );
            });
        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      }, 900);
      // auto-clear Interval
      setTimeout(() => {
        clearInterval(interval);
      }, 600000);
    } else if (!showLiveLogs) {
      clearInterval(interval);
    }
    return () => {
      abortController.abort();
      clearInterval(interval);
    };
  }, [showLiveLogs]);

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
                  <div id="collapseOne" className="panel-collapse collapse in">
                    <div className="panel-body">
                      <p>
                        <strong>
                          Please read carefully before starting the Backup &
                          Restore.
                        </strong>
                      </p>

                      <dl>
                        <dt>
                          This script makes a snapshot of a network and creates
                          a downloadable python file used to restore the
                          configuration.
                        </dt>
                        <dt>
                          The configuration will be restored creating a new
                          network with name "your-new-network-restore"
                        </dt>
                        <dt>
                          Since the Switchs configuration is lost when a device
                          is moved to another network, the backup process must
                          be run in two steps.
                        </dt>
                      </dl>
                      <ul>
                        <li>Run Backup.</li>
                        <li>
                          Review the script snapshot before starting the
                          restore.
                        </li>
                        <li>Download the script(optional).</li>
                        <li>
                          Restore the configuration (a new network with name
                          "your-new-network-restore" will be created).
                        </li>
                        <li>
                          Go to your Meraki dashboard and move your devices to
                          the newly created network.
                        </li>
                        <li>Restore the switchports configuration.</li>
                      </ul>
                      <dl>
                        <dt>
                          Note that the Restore will not overwrite existing
                          networks but creates a new one.
                        </dt>
                        <dt>
                          The script can be modified before the Restore process
                          (basic knowledge of python required).
                        </dt>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-body">
              <div>{errorMessage && <span>{errorMessage}</span>}</div>
              <button
                type="button"
                id="runButton"
                className="btn btn-primary"
                onClick={(e) => (!loadingButtonBackup ? handleBackup(e) : null)}
                disabled={loadingButtonBackup}
              >
                {loadingButtonBackup && (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
                {loadingButtonBackup && <span>Loading Data</span>}
                {!loadingButtonBackup && <span>Run Backup</span>}
              </button>
              <button
                style={displayButtons}
                id="openscript"
                className="btn btn-primary"
                onClick={handleRestoreFile}
              >
                Show Script
              </button>
              <button
                style={displayButtons}
                id="downloadscript"
                className="btn btn-primary"
                onClick={downloadScript}
              >
                Download Script
              </button>
              <button
                style={displayRestoreButtons}
                id="restore"
                className="btn btn-danger"
                onClick={!loadingButtonRestore ? HandleRestore : null}
                disabled={loadingButtonRestore}
              >
                {loadingButtonRestore && (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
                {loadingButtonRestore && <span>Restoring</span>}
                {!loadingButtonRestore && <span>Restore</span>}
              </button>
              <button
                style={displayRestoreSwitchButtons}
                id="restore"
                className="btn btn-danger"
                onClick={
                  !loadingButtonRestoreSwitch ? HandleRestoreSwitch : null
                }
                disabled={loadingButtonRestoreSwitch}
              >
                {loadingButtonRestoreSwitch && (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
                {loadingButtonRestoreSwitch && <span>Restoring</span>}
                {!loadingButtonRestoreSwitch && (
                  <span>Restore Switchsports</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ReactModal
          isOpen={ac.dc.switchConfirmRestore}
          contentLabel="Confirm Restore Modal"
          className="Modal-restore"
          overlayClassName="Overlay-restore"
          onRequestClose={CancelRestore}
          ariaHideApp={false}
        >
          <div>
            <p>
              Are you sure you want to restore the Network {ac.dc.network}?{" "}
            </p>
            <p className="text-secondary">
              <small>
                a new network with name {ac.dc.network}-restore will be created
              </small>
            </p>
          </div>
          <button
            onClick={CancelRestore}
            type="button"
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={ConfirmRestore}
            type="button"
            className="btn btn-danger"
          >
            Restore
          </button>
        </ReactModal>
      </div>
      <div>
        <ReactModal
          isOpen={ac.dc.switchConfirmRestoreSwitch}
          contentLabel="Confirm Restore Switch Modal"
          className="Modal-restore-switch"
          overlayClassName="Overlay-restore-switch"
          onRequestClose={CancelRestoreSwitch}
          ariaHideApp={false}
        >
          <div>
            <p>Are you sure you want to restore the switch configuration? </p>
            {/* <p className="text-secondary"><small>switch configuration will be copied from {ac.dc.network}.</small></p> */}
          </div>
          <button
            onClick={CancelRestoreSwitch}
            type="button"
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={ConfirmRestoreSwitch}
            type="button"
            className="btn btn-danger"
          >
            Restore
          </button>
        </ReactModal>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            {showLiveLogs ? (
              <div style={{ height: 350 }}>{lazyLog}</div>
            ) : (
              <div></div>
            )}

            {ac.dc.showRestorescript ? (
              <div className="panel-body">
                <AceEditor
                  value={ac.dc.restoreScript}
                  // ref="aceEditor"
                  mode="python"
                  theme="twilight"
                  onChange={(value) => {
                    ac.dc.setrestoreScript(value);
                    UploadModifiedScript(value);
                  }}
                  name="ace-editor"
                  id="ace-editor"
                  width="auto"
                  height="750px"
                  fontSize={14}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                  }}
                  commands={[
                    {
                      name: "run",
                      bindKey: { win: "Ctrl-s", mac: "Command-s" },
                      exec: (value) => {
                        ac.dc.setrestoreScript(value);
                      },
                    },
                  ]}
                />
                ,
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
