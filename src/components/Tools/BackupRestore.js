
import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { LazyLog } from "react-lazylog";
import "../../styles/BackupRestore.css";
import axios from 'axios';
import AceEditor from "react-ace";
import ReactModal from 'react-modal'
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-min-noconflict/ext-language_tools";
const fs = require('browserify-fs');


export default function BackupRestore(ac) {
  const [loadingButtonBackup, setloadingButtonBackup] = useState(false);
  const [loadingButtonRestore, setloadingButtonRestore] = useState(false);
  // const [displayButtons, setdisplayButtons] = useState({ display: 'none' });
  const [triggerBackup, settriggerBackup] = useState(0);
  const [triggerFile, settriggerFile] = useState(0);
  const [triggerRestore, settriggerRestore] = useState(0);
  // eslint-disable-next-line
  const [errorMessage, seterrorMessage] = useState(null);
  const [liveLogs, setliveLogs] = useState('');
  const [showLiveLogs, setshowLiveLogs] = useState(false)




  const APIbody2 = {
    "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
    "X-CSRFToken": "frollo",
    ARG_ORGNAME: `${ac.dc.organization}`,
    SERIAL_NUM: `${ac.dc.SNtopUsers}`,
    NET_ID: `${ac.dc.networkID}`,
    ARG_ORGID: `${ac.dc.organizationID}`,
  };



  const handleBackup = (e) => {
    e.stopPropagation()
    ac.dc.setshowRestorescript(false)
    ac.dc.setrestoreScript([])
    ac.dc.setdisplayButtons({ display: 'none' })
    // e.preventDefault();
    settriggerBackup(triggerBackup + 1);
    setliveLogs([])
    setshowLiveLogs(true)
    if (triggerBackup > 3) {
      settriggerBackup(0);
      seterrorMessage(null);
    }
  };


  const handleRestoreFile = (e) => {
    e.preventDefault();
    setshowLiveLogs(false)
    seterrorMessage(null);
    settriggerFile(triggerFile + 1);
    if (triggerFile > 3) {
      settriggerFile(0);
    }

  };


  const HandleRestore = (e) => {
    e.preventDefault();
    ac.dc.setswitchConfirmRestore(true)
    ac.dc.setshowRestorescript(false)
    setshowLiveLogs(false)
  };

  const CancelRestore = (e) => {
    e.preventDefault();
    ac.dc.setswitchConfirmRestore(false);
  };

  const ConfirmRestore = (e) => {
    e.preventDefault();
    ac.dc.setswitchConfirmRestore(false)
    settriggerRestore(triggerRestore + 1);
    setshowLiveLogs(true)
    if (triggerRestore > 3) {
      settriggerRestore(0);
    }
  };

  const downloadScript = () => {
    const element = document.createElement("a");
    const file = new Blob([ac.dc.restoreScript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "meraki_restore_network.py";
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
            ac.dc.setdisplayButtons({ display: 'inline-block' })
          })

        // .catch((err) => {
        //   console.log("Backup -> err", err());
        //   err.json().then((errorMessage) => {
        //     seterrorMessage(
        //       <div className="form-input-error-msg alert alert-danger">
        //         <span className="glyphicon glyphicon-exclamation-sign"></span>
        //         {errorMessage}
        //       </div>
        //     );
        //   });
        //   setloadingButtonBackup(false);

        // });
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

      fetch('/api/backup_restore/meraki_restore_network.py')
        .then(response => { return response.text() })
        .then((data) => {
          ac.dc.setrestoreScript(data)
        })
        .then(() => {
          ac.dc.setshowRestorescript(true)
        })

        .catch((err) => {
          console.log("APIcall -> err", err)
          // err.json().then((errorMessage) => {
          //   seterrorMessage(
          //     <div className="form-input-error-msg alert alert-danger">
          //       <span className="glyphicon glyphicon-exclamation-sign"></span>
          //       {errorMessage}
          //     </div>
          //   );
          // });
        });

    }
    OpenFile();
    return () => {
      ac.dc.setshowRestorescript(false)
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
      // if (ac.dc.showRestorescript === true) {

      setloadingButtonRestore(true);
      ac.dc.setshowRestorescript(false)

      const data = new FormData()
      const file = new Blob([ac.dc.restoreScript], { type: 'text/plain' });
      data.append('file', file, 'meraki_restore_network.py')

      axios.post("/upload", data, { // receive two parameter endpoint url ,form data 
      })


      fetch("/run_restore/", {
        method: ["POST"],
        cache: "no-cache",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify(APIbody2),
      })

        .then((res) => {
          console.log('POST response: ', res);
        })


        .then(() => {
          setloadingButtonRestore(false)
        })

      // } else {
      //   seterrorMessage(
      //     <div className="form-input-error-msg alert alert-danger">
      //       <span className="glyphicon glyphicon-exclamation-sign"></span>
      //     Check the script before restoring the network.
      //   </div>
      //   )
      // }

    }
    Restore();
    return () => {
      ac.dc.setshowRestorescript(false)
      ac.dc.setalert(false);
      seterrorMessage(null);
    };
    // eslint-disable-next-line
  }, [triggerRestore]);


  const isFirstRunLogs = useRef(true);
  useEffect(() => {
    if (isFirstRunLogs.current) {
      isFirstRunLogs.current = false;
      return;
    }

    let interval = null;
    if (showLiveLogs) {
      interval = setInterval(() => {
        try {
          fetch("/api/logs/log_file.log")
            .then((response) => {

              return response.text();
            })
            .then((data) => {
              setliveLogs(data)

            })

        } catch (err) {
          if (err) {
            console.log(err);
            ac.dc.setalert(true);
          }
        }

      }, 1000)
      // auto-clearing after 30 sec
      setTimeout(() => {
        clearInterval(interval)
      }, 60000);

    } else if (!showLiveLogs) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);

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
                style={ac.dc.displayButtons}
                id="openscript"
                className="btn btn-primary"
                onClick={handleRestoreFile}
              >
                Show Script
              </button>
              <button
                style={ac.dc.displayButtons}
                id="downloadscript"
                className="btn btn-primary"
                onClick={downloadScript}
              >
                Download Script
              </button>
              <button
                style={ac.dc.displayButtons}
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
            </div>

          </div>
        </div>
      </div>

      <div>
        <ReactModal
          isOpen={ac.dc.switchConfirmRestore}
          contentLabel="Confirm Modal"
          className="Modal"
          overlayClassName="Overlay"
          onRequestClose={CancelRestore}
        >
          <div>
            <p>Are you sure you want to restore the Network {ac.dc.network}? </p>
            <p className="text-secondary"><small>a new network with name {ac.dc.network}-restore will be created</small></p>
          </div>
          <button onClick={CancelRestore} type="button" className="btn btn-secondary" >Cancel</button>
          <button onClick={ConfirmRestore} type="button" className="btn btn-danger">Restore</button>
        </ReactModal>
      </div>




      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            {showLiveLogs ? (<div style={{ height: 350 }}>
              <LazyLog extraLines={1} enableSearch
                text={liveLogs}
                stream
                caseInsensitive
                selectableLines />
            </div>) : (<div></div>)}

            {ac.dc.showRestorescript ? (
              <div className="panel-body">
                <AceEditor
                  value={ac.dc.restoreScript}
                  // ref="aceEditor"
                  mode="python"
                  theme="twilight"
                  onChange={value => ac.dc.setrestoreScript(value)}
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
                      exec: (value) => { ac.dc.setrestoreScript(value) }
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
