
import React, { useEffect, useState, useRef } from "react";
import { LazyLog } from "react-lazylog";
import "../../styles/MigrateTool.css";
import axios from 'axios';
import "ace-builds";
import AceEditor from "react-ace";
import ReactModal from 'react-modal'
import { useForm } from 'react-hook-form'
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-min-noconflict/ext-language_tools";
// eslint-disable-next-line
const fs = require('browserify-fs');


export default function MigrateTool(ac) {
    const [loadingButtonConvertConfig, setloadingButtonConvertConfig] = useState(false);
    const [loadingButtonMigrateSwitchConfig, setloadingButtonMigrateSwitchConfig] = useState(false);
    const [displayButtons, setdisplayButtons] = useState({ display: 'none' });
    const [displayRestoreButtons, setdisplayRestoreButtons] = useState({ display: 'none' });
    const [triggerConvertConfig, settriggerConvertConfig] = useState(0);
    const [triggerFile, settriggerFile] = useState(0);
    const [triggerRestore, settriggerRestore] = useState(0);
    // eslint-disable-next-line
    const [errorMessage, seterrorMessage] = useState(null);
    // eslint-disable-next-line
    const [liveLogs, setliveLogs] = useState('');
    const [showLiveLogs, setshowLiveLogs] = useState(false)
    const [lazyLog, setlazyLog] = useState([]);
    const [switchPortScript, setswitchPortScript] = useState('')
    const [showswitchPortScript, setshowswitchPortScript] = useState(false)
    const [SNpresent, setSNpresent] = useState(false)
    const [backupFileUploaded, setbackupFileUploaded] = useState(false)
    const [messageFileUpload, setmessageFileUpload] = useState(null);
    const [serialNumbers, setserialNumbers] = useState([])
    const { register, handleSubmit } = useForm()



    const APIbody1 = {
        "serial_numbers": `${serialNumbers}`,
        "X-CSRFToken": "frollo",
    };

    const APIbody2 = {
        "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
        "X-CSRFToken": "frollo",
    };


    // function used to upload the backup file on the xpress server
    const onSubmitUpload = async (data) => {
        const formData = new FormData()
        formData.append("backup", data.backup[0])

        const res = await fetch("/upload_backupfile", {
            method: "POST",
            body: formData
        }).then(res => res.json())
        if (res.status === true) {
            setbackupFileUploaded(true)
            setmessageFileUpload
                (<div className="form-input-error-msg alert alert-success">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    {res.message}
                </div>)
            //  remove message after 8 seconds
            setTimeout(() => {
                setmessageFileUpload(null)
            }, 8000);
        } else {
            setbackupFileUploaded(false)
            setmessageFileUpload
                (<div className="form-input-error-msg alert alert-danger">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    {res.message}
                </div>)
            axios.post("/delete_backupfile", {
            })
            setshowLiveLogs(false)
            setdisplayRestoreButtons({ display: 'none' })
            setdisplayButtons({ display: 'none' })

        }
    }

    // function used to upload the build_meraki_switchconfig file on the xpress server
    // after has been modified by the AceEditor GUI
    const UploadModifiedScript = (value) => {
        const data = new FormData()
        const file = new Blob([value], { type: 'text/plain' });
        data.append('file', file, 'build_meraki_switchconfig.py')
        axios.post("/upload_build_meraki_switchconfig", data)

    }


    const handleConvertConfig = (e) => {
        e.stopPropagation()
        setshowswitchPortScript(false)
        setswitchPortScript([])
        setdisplayButtons({ display: 'none' })
        // e.preventDefault();
        settriggerConvertConfig(triggerConvertConfig + 1);
        setliveLogs([])
        // setshowLiveLogs(true)
        if (triggerConvertConfig > 3) {
            settriggerConvertConfig(0);
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
        setshowswitchPortScript(false)
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
        const file = new Blob([switchPortScript], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "build_meraki_switchconfig.py";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }



    const isFirstRunConvertConfig = useRef(true);
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        if (isFirstRunConvertConfig.current) {
            isFirstRunConvertConfig.current = false;
            return;
        }

        async function ConvertConfig() {
            if (backupFileUploaded === true) {
                if (SNpresent === true) {
                    // SN VALIDATION FORM
                    const validateSerialNumbers = (address) => {
                        const SNformat = /^((^|,)([a-zA-Z\d]{4}-[a-zA-Z\d]{4}-[a-zA-Z\d]{4}|[a-zA-Z\d]{4}-[a-zA-Z\d]{4}-[a-zA-Z\d]{4}|[a-zA-Z\d]{4}-[a-zA-Z\d]{4}-[a-zA-Z\d]{4}|[a-zA-Z\d]{4}-[a-zA-Z\d]{4}-[a-zA-Z\d]{4}))+$/;
                        if (serialNumbers.match(SNformat)) {
                            ac.dc.setAlertModalError(null);

                            setloadingButtonConvertConfig(true);
                            setshowLiveLogs(true)

                            fetch("/ios_to_meraki/", {
                                signal: signal,
                                method: ["POST"],
                                cache: "no-cache",
                                headers: {
                                    content_type: "application/json",
                                },
                                body: JSON.stringify(APIbody1),
                            })

                                .then((res) => {
                                    if (res.status !== 200) {
                                        ac.dc.setswitchAlertModal(true);
                                        ac.dc.setAlertModalError("Pleas check your configuration file or serial-numbers. If the switch configuration has multiple stack interfaces, insert a list of comma-separated serial-numbers (I2TN-B63E-SB6F,I2TN-B63E-SB6F,I2TN-B63E-SB6F...) ");
                                        ac.dc.setswitchToolsTemplate(false);
                                        setshowLiveLogs(false)
                                        setdisplayRestoreButtons({ display: 'none' })
                                        setloadingButtonConvertConfig(false);
                                    } else {
                                        res.json()
                                        setloadingButtonConvertConfig(false);
                                        setdisplayButtons({ display: 'inline-block' })
                                        setdisplayRestoreButtons({ display: 'inline-block' })

                                    }
                                })

                        } else {
                            ac.dc.setswitchAlertModal(true);
                            ac.dc.setAlertModalError("Please insert a valid Meraki serial-number in format AAAA-BBBB-CCCC or a list of comma-separated serial-numbers (I2TN-B63E-SB6F,I2TN-B63E-SB6F,I2TN-B63E-SB6F...).");
                            ac.dc.setswitchToolsTemplate(false);
                            setshowLiveLogs(false)
                            setdisplayRestoreButtons({ display: 'none' })

                        }
                    };

                    [serialNumbers].forEach(validateSerialNumbers);

                } else {
                    ac.dc.setswitchAlertModal(true);
                    ac.dc.setAlertModalError("Please insert a valid Meraki serial-number in format AAAA-BBBB-CCCC or a list of comma-separated serial-numbers (I2TN-B63E-SB6F,I2TN-B63E-SB6F,I2TN-B63E-SB6F...).");
                    ac.dc.setswitchToolsTemplate(false);
                    setshowLiveLogs(false)
                    setdisplayRestoreButtons({ display: 'none' })

                }

            } else {
                ac.dc.setswitchAlertModal(true);
                ac.dc.setAlertModalError("Please upload a valid .txt file containing the configuration");
                ac.dc.setswitchToolsTemplate(false);
                setshowLiveLogs(false)
                setdisplayRestoreButtons({ display: 'none' })
            }

        }
        ConvertConfig();
        return () => {
            abortController.abort()
            seterrorMessage(null);
        };
        // eslint-disable-next-line
    }, [triggerConvertConfig]);



    const isFirstRunFile = useRef(true);
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        if (isFirstRunFile.current) {
            isFirstRunFile.current = false;
            return;
        }
        async function OpenFile() {

            fetch('api/cisco_meraki_migrate_tool/build_meraki_switchconfig.py', { signal: signal })
                .then(response => { return response.text() })
                .then((data) => {
                    setswitchPortScript(data)
                })
                .then(() => {
                    setshowswitchPortScript(true)
                })

                .catch((err) => {
                    console.log("APIcall -> err", err)

                });

        }
        OpenFile();
        return () => {
            abortController.abort()
            setshowswitchPortScript(false)
            seterrorMessage(null);
        };
        // eslint-disable-next-line
    }, [triggerFile]);



    const isFirstRunMigrateConfig = useRef(true);
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        if (isFirstRunMigrateConfig.current) {
            isFirstRunMigrateConfig.current = false;
            return;
        }
        async function MigrateSwitchConfig() {

            setloadingButtonMigrateSwitchConfig(true);
            setshowswitchPortScript(false)

            fetch("/run_migrate_switch_config/", {
                signal: signal,
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
                    setdisplayRestoreButtons({ display: 'none' })
                    setloadingButtonMigrateSwitchConfig(false)
                })

        }
        MigrateSwitchConfig();
        return () => {
            abortController.abort()
            setshowswitchPortScript(false)
            seterrorMessage(null);
        };
        // eslint-disable-next-line
    }, [triggerRestore]);




    const isFirstRunLogs = useRef(true);
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        if (isFirstRunLogs.current) {
            isFirstRunLogs.current = false;
            return;
        }

        let interval = null;
        if (showLiveLogs) {
            interval = setInterval(() => {
                try {
                    fetch("/api/logs/log_file.log", { signal: signal })
                        .then((response) => {

                            return response.text();
                        })
                        .then((data) => {
                            setlazyLog(
                                <LazyLog
                                    extraLines={1}
                                    enableSearch={true}
                                    text={data}
                                    stream={true}
                                    caseInsensitive={true}
                                    selectableLines={true}
                                />)
                        })

                } catch (err) {
                    if (err) {
                        console.log(err);
                    }
                }

            }, 900)
            // auto-clear Interval
            setTimeout(() => {
                clearInterval(interval)
            }, 600000);

        } else if (!showLiveLogs) {
            clearInterval(interval)
        }
        return () => {
            abortController.abort()
            clearInterval(interval)
        };

    }, [showLiveLogs]);



    return (
        <div id="page-inner-main-templates">
            <div>{ac.dc.flashMessages && <span>{ac.dc.flashMessages}</span>}</div>
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
                                            <p><strong>Please read carefully before starting the migration.</strong></p>

                                            <dl>
                                                <dt>This script converts a cisco running-config into a Meraki Switch-Port configuration and creates a downloadable python file used to push the new switchport configuration.</dt>
                                                <dt>Before to convert and push the configuration be sure to:</dt>
                                                <br />
                                                <dt>Check if the switch serial-number has been claimed for you Organization</dt>
                                                <dt>Check if the new switch has been added to the right Network</dt>
                                                <dt>Check if the an Access Policy is configured</dt>
                                                <br />
                                                <dt>Instructions:</dt>

                                            </dl>
                                            <ul>
                                                <li>Insert the serial number or a list of comma-separated serial-numbers</li>
                                                <li>Load the Cisco running-config, the file must be in .txt format</li>
                                                <li>Convert the configuration</li>
                                                <li>Check the script</li>
                                                <dt>The script can be modified before the pushing the configuration (basic knowledge of python required).</dt>
                                                <li>Download the script(optional).</li>
                                                <li>Push the configuration to the meraki Switch</li>
                                                <li>Go to your Meraki dashboard and check if the configuration is successfully uploaded</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Serial Numbers"
                                    onChange={(e) => {
                                        setSNpresent(true)
                                        setserialNumbers(e.target.value)
                                    }}
                                    name="serial-numbers"
                                    id="serial-numbers"
                                    required="required"
                                    data-error="Please enter a valid serial-number."
                                />

                                {/* {errorMessageMAC && <span>{errorMessageMAC}</span>} */}
                                {/* </div> */}


                                {/* <div className="form-group"> */}
                                <form
                                    onSubmit={handleSubmit(onSubmitUpload)}
                                    className="btn-file btn-file-primary"
                                >
                                    <input
                                        ref={register}
                                        type="file"
                                        name="backup"
                                        className="btn-file btn-file-primary"
                                    />
                                    <button className="btn-file btn-file-primary">Load Backupfile</button>
                                </form>
                                <div>{messageFileUpload && <span>{messageFileUpload}</span>}</div>
                            </div>





                            <div>{errorMessage && <span>{errorMessage}</span>}</div>
                            <button
                                type='button'
                                id="runButton"
                                className="btn btn-primary"
                                onClick={(e) => !loadingButtonConvertConfig ? handleConvertConfig(e) : null}
                                disabled={loadingButtonConvertConfig}
                            >
                                {loadingButtonConvertConfig && (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                    />
                                )}
                                {loadingButtonConvertConfig && <span>Loading Data</span>}
                                {!loadingButtonConvertConfig && <span>Convert Config</span>}
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
                                onClick={!loadingButtonMigrateSwitchConfig ? HandleRestore : null}
                                disabled={loadingButtonMigrateSwitchConfig}
                            >
                                {loadingButtonMigrateSwitchConfig && (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                    />
                                )}
                                {loadingButtonMigrateSwitchConfig && <span>Pushing Config</span>}
                                {!loadingButtonMigrateSwitchConfig && <span>Push Config</span>}
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
                        <p>Are you sure you want to push the configuration to the switch {serialNumbers}? </p>
                        <p className="text-secondary"><small>before pushing the configuration be sure the switch has been added to the right network
                            and Access Policy is configured</small></p>
                    </div>
                    <button onClick={CancelRestore} type="button" className="btn btn-secondary" >Cancel</button>
                    <button onClick={ConfirmRestore} type="button" className="btn btn-danger">Push Config</button>
                </ReactModal>
            </div>


            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        {showLiveLogs ? (<div style={{ height: 700 }}>
                            {lazyLog}
                            {/* <LazyLog
                                extraLines={1}
                                enableSearch={true}
                                text={liveLogs}
                                stream={true}
                                caseInsensitive={true}
                                selectableLines={true}
                            /> */}
                        </div>) : (<div></div>)}

                        {showswitchPortScript ? (
                            <div className="panel-body">
                                <AceEditor
                                    value={switchPortScript}
                                    // ref="aceEditor"
                                    mode="python"
                                    theme="twilight"
                                    onChange={value => { setswitchPortScript(value); UploadModifiedScript(value) }}
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
                                            exec: (value) => { setswitchPortScript(value) }
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
