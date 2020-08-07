import React, { useEffect, useState, useRef } from "react";
import { MDBDataTableV5 } from "mdbreact";
import Select from "react-select";
import CreateTemplateModal from './CreateTemplateModal'
import ShowTemplateModal from './ShowTemplateModal'


export default function SwitchPortTemplate(ac) {
    const [showtable, setshowtable] = useState(false);
    const [trigger, settrigger] = useState(0);
    const [triggerTemplate, settriggerTemplate] = useState(0);
    const [loading, setloading] = useState(false);
    const [loadingDevices, setloadingDevices] = useState(false);
    const [mapRows, setmapRows] = useState([]);
    const [switchSerial, setswitchSerial] = useState([])
    const [switchDeviceName, setswitchDeviceName] = useState([])
    const [switchDeviceIp, setswitchDeviceIp] = useState([])
    const [switchDeviceMac, setswitchDeviceMac] = useState([])
    const [switchDeviceModel, setswitchDeviceModel] = useState([])
    const [checkbox1, setCheckbox1] = useState([])
    const [createTemplateModal, setcreateTemplateModal] = useState(false);
    const [showTemplateModal, setshowTemplateModal] = useState(false);
    const [templates, setTemplates] = useState([])
    const [templateProperty, setTemplateProperty] = useState([])
    const [formData, setformData] = useState([])
    const [showSwitchInfo, setshowSwitchInfo] = useState(false)
    const initialFormSwitchesState = { mySelectKey: null }
    const initialFormTemplatesState = { mySelectKey: null }
    const [switchesSelectKey, setswitchesSelectKey] = useState(initialFormSwitchesState);
    const [templatesSelectKey, settemplatesSelectKey] = useState(initialFormTemplatesState);

    async function readTemplate() {
        try {
            fetch('/read_templateFile')
                .then(res => res.json())
                .then((data) => {
                    const TEMPLATELIST = data.map((opt, index) => ({
                        label: opt.templateName,
                        index: index
                    }))

                    setTemplates(TEMPLATELIST)

                    const TEMPLATEPROPS = data.map((opt, index) => ({
                        opt
                    }))
                    setTemplateProperty(TEMPLATEPROPS)

                })
                .catch(error => console.log('An error occured ', error))
        } catch (e) {
            console.log('Error:', e);
        }

    }

    //call readTemplate() on render to update available Templates
    useEffect(() => {
        const abortController = new AbortController()
        readTemplate()
        return () => {
            abortController.abort()
        }
    }, [])


    const showLogs2 = (e) => {
        setCheckbox1(e);
    };



    let Switches = []
    ac.dc.deviceList.map((opt, index) => {
        let model = opt.model
        if (model.startsWith("MS")) {
            var SWModel = {
                label: opt.name,
                value: index,
                id: opt.id,
                serial: opt.serial,
                ipaddress: opt.lanIp,
                mac: opt.mac,
                model: opt.model
            }
            Switches.push(SWModel)
        }
    })



    const APIbody = {
        "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
        organizationId: `${ac.dc.organizationID}`,
        SERIAL_NUM: `${switchSerial}`,
    };

    const callTemplate = () => {
        settriggerTemplate(triggerTemplate + 1);
    };

    const isFirstRunreadTemplate = useRef(true);
    useEffect(() => {
        if (isFirstRunreadTemplate.current) {
            isFirstRunreadTemplate.current = false;
            return;
        }
        const abortController = new AbortController()
        async function Template() {
            readTemplate()
        }
        Template()
        return () => {
            abortController.abort()
        }
    }, [triggerTemplate])


    const isFirstRun = useRef(true);
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        async function APIcall() {
            if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
                setshowtable(false)
                fetch("/device_switchports", {
                    method: ["POST"],
                    cache: "no-cache",
                    headers: {
                        content_type: "application/json",
                    },
                    body: JSON.stringify(APIbody),
                }).then((response) => {
                    return response.json;
                });
                fetch("/device_switchports", { signal: signal })
                    .then((res) => res.json())
                    .then(readTemplate())
                    .then((data) => {
                        // setloadingDevices(true)
                        if (data.error) {

                            ac.dc.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                                <span className="glyphicon glyphicon-exclamation-sign"></span>
                                {data.error[0]}
                            </div>)
                        } else {

                            let switchports = []
                            let row = [];
                            data.switchports.map((opt) => {
                                var portModel = {
                                    label: opt.number,
                                    accessPolicyNumber: opt.accessPolicyNumber,
                                    allowedVlans: opt.allowedVlans,
                                    enabled: opt.enabled,
                                    isolationEnabled: opt.isolationEnabled,
                                    linkNegotiation: opt.linkNegotiation,
                                    macWhitelist: opt.macWhitelist,
                                    name: opt.name,
                                    number: opt.number,
                                    poeEnabled: opt.poeEnabled,
                                    portScheduleId: opt.portScheduleId,
                                    rstpEnabled: opt.rstpEnabled,
                                    stickyMacWhitelist: opt.stickyMacWhitelist,
                                    stickyMacWhitelistLimit: opt.stickyMacWhitelistLimit,
                                    stpGuard: opt.stpGuard,
                                    tags: opt.tags,
                                    type: opt.type,
                                    udld: opt.udld,
                                    vlan: opt.vlan,
                                    voiceVlan: opt.voiceVlan,
                                    template: <Select
                                        className='select-tolopology'
                                        options={templates}
                                        placeholder='Select Template'
                                        onChange={selectTemplate}
                                        onMenuOpen={callTemplate}
                                        classNamePrefix="topology"
                                    />
                                }

                                switchports.push(portModel)
                                row.push(portModel);
                                setmapRows(row);
                                setDatatable({ ...datatable, rows: row })

                            })

                        }

                    })
                    .then(() => setshowtable(true))
                    .then(() => setloadingDevices(false))
                    .then(() => setshowSwitchInfo(true))
                    .then(() => ac.dc.setflashMessages([]))



            } else {
                ac.dc.setswitchAlertModal(true);
                ac.dc.setAlertModalError("Please set Organization and Network.");
                ac.dc.setswitchToolsTemplate(false);
            }
        }

        APIcall();
        return () => {
            abortController.abort()
            setmapRows([]);
            setshowtable(false);
        };
        // eslint-disable-next-line
    }, [trigger]);


    const [datatable, setDatatable] = React.useState({
        columns: [
            {
                label: "Number",
                field: "number",
                sort: "asc",
                width: 200,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Number',
                },
            },
            {
                label: "name",
                field: "name",
                sort: "asc",
                width: 200,
            },
            {
                label: "VLAN",
                field: "vlan",
                sort: "asc",
                width: 200,
            },
            // {
            //     label: "Voice VLAN",
            //     field: "voiceVlan",
            //     sort: "asc",
            //     width: 200,
            // },
            {
                label: "Type",
                field: "type",
                sort: "asc",
                width: 200,
            },
            {
                label: "Template",
                field: "template",
                sort: "asc",
                width: 200,
            },
            // {
            //     label: "accessPolicyNumber",
            //     field: "accessPolicyNumber",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "allowedVlans",
            //     field: "allowedVlans",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "enabled",
            //     field: "enabled",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "isolationEnabled",
            //     field: "isolationEnabled",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "linkNegotiation",
            //     field: "linkNegotiation",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "macWhitelist",
            //     field: "macWhitelist",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "poeEnabled",
            //     field: "poeEnabled",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "portScheduleId",
            //     field: "portScheduleId",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "rstpEnabled",
            //     field: "rstpEnabled",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "stickyMacWhitelist",
            //     field: "stickyMacWhitelist",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "stickyMacWhitelistLimit",
            //     field: "stickyMacWhitelistLimit",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "STP Guard",
            //     field: "stpGuard",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "tags",
            //     field: "tags",
            //     sort: "asc",
            //     width: 200,
            // },
            // {
            //     label: "udld",
            //     field: "udld",
            //     sort: "asc",
            //     width: 200,
            // },

        ],
        rows: []

    });

    const handleIPs = (e) => {
        e.preventDefault();
        settrigger(trigger + 1);
    };

    const HandleDevices = (opt) => {
        setswitchesSelectKey({ ...switchesSelectKey, mySelectKey: opt.value });
        settrigger(trigger + 1);
        setloadingDevices(true)
        setshowSwitchInfo(false)
        setswitchSerial(opt.serial);
        setswitchDeviceName(opt.label)
        setswitchDeviceIp(opt.ipaddress)
        setswitchDeviceMac(opt.mac)
        setswitchDeviceModel(opt.model)
    };

    const selectTemplate = (opt) => {
        console.log("selectTemplate -> opt", opt)

    };


    const createTemplate = () => {
        setcreateTemplateModal(true)
        setshowtable(false)
        setswitchesSelectKey(initialFormSwitchesState);
        setshowSwitchInfo(false)

    };

    const showTemplate = (opt) => {
        settemplatesSelectKey({ ...templatesSelectKey, mySelectKey: opt.value });
        setshowTemplateModal(true)
        setformData(templateProperty[opt.index])
        setshowtable(false)
        setswitchesSelectKey(initialFormSwitchesState);
        setshowSwitchInfo(false)

    };

    const dc = {
        showtable,
        setshowtable,
        createTemplateModal,
        setcreateTemplateModal,
        showTemplateModal,
        setshowTemplateModal,
        formData,
        setformData,
        readTemplate,
        trigger,
        settrigger,
        templatesSelectKey,
        settemplatesSelectKey,
        switchesSelectKey,
        setswitchesSelectKey,
        initialFormSwitchesState,
        initialFormTemplatesState
    }

    return (
        <div id="page-inner-main-templates">
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="panel-group"
                                style={{ marginBottom: "-5px" }}

                                id="accordion">
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
                                            <dl>
                                                <dt>This scripts iterates through all networks in an
                                    organization and returns all the IPs, serial-numbers and models of all devices.</dt>
                                            </dl>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                            >
                                <button
                                    onClick={createTemplate}
                                    className="btn icon-btn-add btn-success-add"
                                >
                                    <span
                                        className="glyphicon-add btn-glyphicon-add glyphicon-plus img-circle text-success-add">
                                    </span>
                                </button>
                                <Select
                                    className='select-tolopology'
                                    options={templates}
                                    placeholder="Show Templates"
                                    onChange={showTemplate}
                                    classNamePrefix="topology"
                                    onMenuOpen={readTemplate}
                                    value={templates.filter(({ value }) => value === templatesSelectKey.mySelectKey)}
                                    getOptionLabel={({ label }) => label}
                                    getOptionValue={({ value }) => value}
                                />
                                <Select
                                    className='select-tolopology'
                                    options={Switches}
                                    placeholder="Select Switch"
                                    classNamePrefix="topology"
                                    isLoading={loadingDevices}
                                    value={Switches.filter(({ value }) => value === switchesSelectKey.mySelectKey)}
                                    getOptionLabel={({ label }) => label}
                                    getOptionValue={({ value }) => value}
                                    onChange={HandleDevices}
                                />
                                {showSwitchInfo ? (
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item-template"><strong>Name:</strong> {switchDeviceName}</li>
                                        <li className="list-group-item-template"><strong>IP:</strong> {switchDeviceIp}</li>
                                        <li className="list-group-item-template"><strong>Model:</strong> {switchDeviceModel}</li>
                                    </ul>) : (<div></div>)}

                                <button
                                    className="btn btn-primary"
                                    onClick={!loading ? handleIPs : null}
                                    disabled={loading}
                                >
                                    {loading && (
                                        <i
                                            className="fa fa-refresh fa-spin"
                                            style={{ marginRight: "5px" }}
                                        />
                                    )}
                                    {loading && <span>Configuring Ports</span>}
                                    {!loading && <span>Configure</span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        {showtable ? (
                            <div className="panel-body">
                                <MDBDataTableV5
                                    paging={false}
                                    searchTop
                                    hover
                                    data={datatable}
                                    checkbox="true"
                                    headCheckboxID='id6'
                                    bodyCheckboxID='checkboxes6'
                                    getValueCheckBox={(e) => {
                                        showLogs2(e);
                                    }}
                                    getValueAllCheckBoxes={(e) => {
                                        showLogs2(e);
                                    }}
                                    multipleCheckboxes
                                    scrollX
                                />
                            </div>
                        ) : (
                                <div></div>
                            )}
                    </div>
                </div>
            </div>
            {createTemplateModal ? (<CreateTemplateModal dc={dc} cc={ac.dc} />) : (<div></div>)}
            {showTemplateModal ? (<ShowTemplateModal dc={dc} cc={ac.dc} />) : (<div></div>)}

        </div>
    );
}
