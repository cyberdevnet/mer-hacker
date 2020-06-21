
import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { LazyLog } from "react-lazylog";
import io from "socket.io-client";
import "../../styles/BackupRestore.css";
import axios from 'axios';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
const fs = require('browserify-fs');

export default function BackupRestore(ac) {
  const [loadingButtonBackup, setloadingButtonBackup] = useState(0);
  const [loadingButtonRestore, setloadingButtonRestore] = useState(0);
  const [displayButtons, setdisplayButtons] = useState({ display: 'none' });
  const [triggerBackup, settriggerBackup] = useState(0);
  const [triggerFile, settriggerFile] = useState(0);
  const [triggerRestore, settriggerRestore] = useState(0);
  // eslint-disable-next-line
  const [errorMessage, seterrorMessage] = useState(null);
  const [script, setscript] = useState([])
  const [showscript, setshowscript] = useState(false)

  const APIbody2 = {
    "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
    "X-CSRFToken": "frollo",
    ARG_ORGNAME: `${ac.dc.organization}`,
    SERIAL_NUM: `${ac.dc.SNtopUsers}`,
    NET_ID: `${ac.dc.networkID}`,
    ARG_ORGID: `${ac.dc.organizationID}`,
  };


  const ORGANIZATIONS = ac.dc.organizationList.map((opt, index) => ({
    label: opt.name,
    value: index,
    id: opt.id,
  }));

  const NETWORKS = ac.dc.networkList.map((opt, index) => ({
    label: opt.name,
    value: index,
    id: opt.id,
  }));

  const DEVICES = ac.dc.deviceList.map((opt, index) => ({
    label: opt.name,
    value: index,
    id: opt.id,
  }));

  const HandleOrganization = (opt) => {
    ac.dc.setorganization(opt.label);
    ac.dc.setorganizationID(opt.id);
    ac.dc.setnetwork("Networks");
    ac.dc.setisOrgSelected(true);
  };

  const HandleNetwork = (opt) => {
    ac.dc.setnetwork(opt.label);
    ac.dc.setnetworkID(opt.id);
    ac.dc.setisNetSelected(true);
  };

  const HandleDevices = (opt) => {
    ac.dc.setdevice(opt.label);
  };



  const handleBackup = (e) => {
    e.stopPropagation()
    setshowscript(false)
    setscript([])
    // e.preventDefault();
    settriggerBackup(triggerBackup + 1);
    if (triggerBackup > 3) {
      settriggerBackup(0);
      seterrorMessage(null);
    }
  };


  const handleRestoreFile = (e) => {
    e.preventDefault();
    settriggerFile(triggerFile + 1);
    if (triggerFile > 3) {
      settriggerFile(0);
    }

  };


  const HandleRestore = (e) => {
    e.preventDefault();
    settriggerRestore(triggerRestore + 1);
    if (triggerRestore > 3) {
      settriggerFile(0);
    }

  };

  const downloadScript = () => {
    const element = document.createElement("a");
    const file = new Blob([script], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "meraki_restore_organization.py";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }



  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    async function Backup() {
      if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {

        setloadingButtonBackup(true);

        fetch("/run_backup/", {
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
            setdisplayButtons({ display: 'inline-block' })
          })

          .catch((err) => {
            console.log("Backup -> err", err());
            err.json().then((errorMessage) => {
              seterrorMessage(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {errorMessage}
                </div>
              );
            });
            setloadingButtonBackup(false);

          });
      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }
    }
    Backup();
    return () => {
      ac.dc.setalert(false);
      seterrorMessage(null);
    };
    // eslint-disable-next-line
  }, [triggerBackup]);



  const isFirstRunFile = useRef(true);
  useEffect(() => {
    if (isFirstRunFile.current) {
      isFirstRunFile.current = false;
      return;
    }
    async function OpenFile() {

      fetch('http://127.0.0.1:3001/api/backup_restore/meraki_restore_organization.py')
        .then(response => { return response.text() })
        .then((data) => {
          setscript(data)
        })
        .then(() => {
          setshowscript(true)
        })

        .catch((err) => {
          console.log("APIcall -> err", err.json());
          err.json().then((errorMessage) => {
            seterrorMessage(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {errorMessage}
              </div>
            );
          });
        });

    }
    OpenFile();
    return () => {
      setshowscript(false)
      ac.dc.setalert(false);
      seterrorMessage(null);
    };
    // eslint-disable-next-line
  }, [triggerFile]);



  const isFirstRunRestore = useRef(true);
  useEffect(() => {
    if (isFirstRunRestore.current) {
      isFirstRunRestore.current = false;
      return;
    }
    async function Restore() {
      setloadingButtonRestore(true);

      const data = new FormData()
      const file = new Blob([script], { type: 'text/plain' });
      data.append('file', file, 'meraki_restore_organization.py')

      axios.post("http://127.0.0.1:3001/upload", data, { // receive two parameter endpoint url ,form data 
      })
        .then(() => {
          fetch("/run_restore/", {
            method: ["POST"],
            cache: "no-cache",
            headers: {
              content_type: "application/json",
            },
            body: JSON.stringify(APIbody2),
          })
        })
        .then(() => {
          setloadingButtonRestore(false)
        })

        .catch((err) => {
          console.log("APIcall -> err", err.json());
          err.json().then((errorMessage) => {
            seterrorMessage(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {errorMessage}
              </div>
            );
          });
          setloadingButtonRestore(false);
        });
    }
    Restore();
    return () => {
      setshowscript(false)
      ac.dc.setalert(false);
      seterrorMessage(null);
    };
    // eslint-disable-next-line
  }, [triggerRestore]);

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
                      This is script gets the top 10 heaviest bandwidth users of
                      an MX security appliance for the last 10, 30 and 60
                      minutes.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-body">
              <form className="form-inline">
                <div className="form-group">
                  <Select
                    options={ORGANIZATIONS}
                    placeholder={ac.dc.organization}
                    onChange={HandleOrganization}
                    className="select-backup-restore"
                    classNamePrefix="backup-restore"
                  />
                  <Select
                    options={NETWORKS}
                    placeholder={ac.dc.network}
                    onChange={HandleNetwork}
                    className="select-backup-restore"
                    classNamePrefix="backup-restore"
                  />
                  <Select
                    options={DEVICES}
                    placeholder="Devices"
                    onChange={HandleDevices}
                    className="select-backup-restore"
                    classNamePrefix="backup-restore"
                  />
                </div>
              </form>

              <div>{errorMessage && <span>{errorMessage}</span>}</div>
              <button
                type='button'
                id="runButton"
                className="btn btn-primary"
                onClick={(e) => !loadingButtonBackup ? handleBackup(e) : null}
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
                style={displayButtons}
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
                {loadingButtonRestore && <span>Loading Data</span>}
                {!loadingButtonRestore && <span>Restore</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            {showscript ? (
              <div className="panel-body">
                <AceEditor
                  value={script}
                  // ref="aceEditor"
                  mode="python"
                  theme="monokai"
                  onChange={value => setscript(value)}
                  name="ace-editor"
                  id="ace-editor"
                  width='auto'
                  height='750px'
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
                      name: 'run',
                      bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
                      exec: (value) => { setscript(value) }
                    }
                  ]}
                />,

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
