import React, { useEffect, useState, useRef } from "react";
import { MDBDataTableV5 } from "mdbreact";
import Select from "react-select";
import { Select as Selector } from "react-dropdown-select";
import CreateTemplateModal from './CreateTemplateModal'
import ShowTemplateModal from './ShowTemplateModal'
import SwitchPortTemplateSummary from './SwitchPortTemplateSummary'
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


export default function SwitchPortTemplate(ac) {
    const [showtable, setshowtable] = useState(false);
    const [trigger, settrigger] = useState(0);
    const [triggerTemplate, settriggerTemplate] = useState(0);
    const [retryCounter, setretryCounter] = useState(0);
    const [loading, setloading] = useState(false);
    const [configureDisabled, setconfigureDisabled] = useState(true);
    const [loadingDevices, setloadingDevices] = useState(false);
    const [mapRows, setmapRows] = useState([]);
    const [errorMessage, seterrorMessage] = useState([]);
    const [switchSerial, setswitchSerial] = useState([])
    const [switchDeviceName, setswitchDeviceName] = useState([])
    const [switchDeviceIp, setswitchDeviceIp] = useState([])
    const [switchDeviceMac, setswitchDeviceMac] = useState([])
    const [switchDeviceModel, setswitchDeviceModel] = useState([])
    const [createTemplateModal, setcreateTemplateModal] = useState(false);
    const [showTemplateModal, setshowTemplateModal] = useState(false);
    const [showSummary, setshowSummary] = useState(false);
    const [templates, setTemplates] = useState([])
    const [templateProperty, setTemplateProperty] = useState([])
    const [formData, setformData] = useState([])
    const [showSwitchInfo, setshowSwitchInfo] = useState(false)
    const initialFormSwitchesState = { mySelectKey: null }
    const initialFormTemplatesState = { mySelectKey: null }
    const [switchesSelectKey, setswitchesSelectKey] = useState(initialFormSwitchesState);
    const [templatesSelectKey, settemplatesSelectKey] = useState(initialFormTemplatesState);
    const [selecttemplates, setselectTemplates] = useState([])
    const [dataPorts, setdataPorts] = useState([])

    const [allSelectedPorts, setallSelectedPorts] = useState([])
    console.log("SwitchPortTemplate -> allSelectedPorts", allSelectedPorts)






    async function readTemplate() {
        try {
            fetch('/read_templateFile')
                .then(res => res.json())
                .then((data) => {
                    const TEMPLATELIST = data.map((opt, index) => ({
                        value: opt.templateName,
                        label: opt.templateName,
                        templateID: index,
                        template: opt.templateName,
                        id: index

                    }))
                    const TEMPLATELIST2 = data.map((opt, index) => ({
                        value: index,
                        label: opt.templateName,
                        index: index

                    }))

                    setTemplates(TEMPLATELIST)
                    setselectTemplates(TEMPLATELIST2)

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

                            data.switchports.map((opt, index) => {
                                var portModel = {
                                    name: opt.name,
                                    number: opt.number,
                                    type: opt.type,
                                    vlan: opt.vlan,
                                    template: 'Select Template',
                                    templateID: [],
                                    payload: []
                                }


                                switchports.push(portModel)
                                row.push(portModel);
                                setmapRows(row);
                                setDatatable({ ...datatable, rows: row })
                                setdataPorts({ ...datatable, rows: row })

                            })


                        }

                    })
                    .then(() => {
                        if (dataPorts.length !== 0) {
                            setshowtable(true)
                            ac.dc.setflashMessages([])
                        } else {
                            if (retryCounter < 4) {
                                settrigger(trigger + 1)
                                setretryCounter(retryCounter + 1)
                            } else {
                                ac.dc.setflashMessages(<div className="form-input-error-msg alert alert-danger">
                                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                                There was an error loading the data, please try again.
                            </div>)
                            }

                        }
                    })
                    // .then(() => setshowtable(true))
                    .then(() => setloadingDevices(false))
                    .then(() => setshowSwitchInfo(true))
                // .then(() => ac.dc.setflashMessages([]))



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
            }
        ],
        rows: []

    });


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

    const createTemplate = () => {
        setcreateTemplateModal(true)
        // setshowtable(false)
        setswitchesSelectKey(initialFormSwitchesState);
        setshowSwitchInfo(false)

    };

    const showTemplate = (opt) => {
        settemplatesSelectKey({ ...templatesSelectKey, mySelectKey: opt.value });
        setshowTemplateModal(true)
        setformData(templateProperty[opt.index])
        // setshowtable(false)
        setswitchesSelectKey(initialFormSwitchesState);
        setshowSwitchInfo(false)
    };


    // const clearSelectedTemplate = (row, rowIndex) => {
    //     // console.log("clearSelectedTemplate -> row", row)

    //     if (row.template !== 'Select Template') {
    // let newArray = [...dataPorts.rows]
    // newArray[rowIndex] = { ...newArray[rowIndex], template: 'Select Template' }
    // setdataPorts({ ...dataPorts, rows: newArray })
    //     } else {
    //         console.log('PORCO DIO');
    //     }

    //     // const elementsIndex = dataPorts.rows.findIndex(element => element.number === row.number)
    //     // const notSelectedTemplate = dataPorts.rows.findIndex(element => element.template === 'Select Template')
    // };






    // function rankFormatter(cell, row, rowIndex, formatExtraData) {
    //     return (
    //         < div
    //             style={{
    //                 textAlign: "center",
    //                 cursor: "pointer",
    //                 lineHeight: "normal"
    //             }}>

    //             <button onClick={() => clearSelectedTemplate(row, rowIndex)} type="button" className="btn btn-default" style={{ width: '39px', marginLeft: '-3px' }}>
    //                 <span className="glyphicon glyphicon-remove"></span>
    //             </button>
    //         </div>
    //     );
    // }



    const columns = [
        {
            dataField: "number",
            text: "Port",
            editable: false
        },
        {
            dataField: "name",
            text: "Name",
            editable: false
        },
        {
            dataField: "vlan",
            text: "VLAN",
            editable: false
        },
        {
            dataField: "type",
            text: "Type",
            editable: false
        },
        {
            dataField: "templateID",
            text: "templateID",
            editable: false,
            hidden: true
        },
        {
            dataField: "template",
            text: "Template",
            editCellClasses: 'edit-cell-class',
            editor: {
                type: Type.SELECT,
                getOptions: () => templates
                // options: templates
            }
        },
        // {
        //     dataField: "X",
        //     editable: false,
        //     text: "",
        //     sort: false,
        //     formatter: rankFormatter,
        //     headerAttrs: { width: 50 },
        //     // attrs: { width: 50, class: "EditRow" }
        // }
    ];




    const selectRow = {
        mode: 'checkbox',
        hideSelectAll: true,

        onSelect: (row, isSelect, rowIndex) => {
            if (isSelect === true) {
                setallSelectedPorts([...allSelectedPorts, row])
                setconfigureDisabled(false)

            } else if (isSelect === false) {
                const index = allSelectedPorts.findIndex(i => i.number === row.number)
                allSelectedPorts.splice(index, 1)
                if (allSelectedPorts.length === 0) {
                    setconfigureDisabled(true)
                }

            }
        }
    };

    const ConfigurePorts = () => {


        seterrorMessage([])


        if (allSelectedPorts.length === 0) {
            seterrorMessage(<div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {`No Port selected, select at least one port to configure.`}
            </div>)
        } else {

            let newArray = [...allSelectedPorts]
            allSelectedPorts.map((port, index) => {
                const templateID = templateProperty.findIndex(i => i.opt.templateName === port.template)
                const notSelectedTemplate = allSelectedPorts.findIndex(element => element.template === 'Select Template')
                console.log("ConfigurePorts -> notSelectedTemplate", notSelectedTemplate)

                if (templateID > -1) {
                    // console.log(`configuring port${port.number} with template ${port.template} amd templateID`, templateID)



                    let templatePayload = templateProperty[templateID].opt
                    console.log("ConfigurePorts -> templatePayload", templatePayload)


                    newArray[index] = { ...newArray[index], payload: templatePayload }

                    setallSelectedPorts(newArray)
                    // setallSelectedPorts({ ...allSelectedPorts, newArray })
                    // console.log("ConfigurePorts -> allSelectedPorts", allSelectedPorts)

                    if (notSelectedTemplate === -1) {
                        setshowSummary(true)
                    }



                } else {
                    seterrorMessage(<div className="form-input-error-msg alert alert-danger">
                        <span className="glyphicon glyphicon-exclamation-sign"></span>
                        {`No Template selected on checked Port ${port.number}`}
                    </div>)
                }



            })

        }

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
        initialFormTemplatesState,
        showSummary,
        setshowSummary,
        allSelectedPorts,
        setallSelectedPorts
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
                                    options={selecttemplates}
                                    placeholder="Show Templates"
                                    onChange={showTemplate}
                                    classNamePrefix="topology"
                                    onMenuOpen={readTemplate}
                                    value={selecttemplates.filter(({ value }) => value === templatesSelectKey.mySelectKey)}
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
                                {errorMessage}
                                {/* <button onClick={test}>Test</button> */}
                                <button
                                    className="btn btn-primary"
                                    onClick={!loading ? ConfigurePorts : null}
                                    disabled={configureDisabled}
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
                                <BootstrapTable
                                    keyField="number"
                                    data={dataPorts.rows}
                                    columns={columns}
                                    selectRow={selectRow}
                                    tabIndexCell
                                    striped
                                    hover
                                    // rowEvents={rowEvents}

                                    cellEdit={cellEditFactory({
                                        mode: "click",
                                        blurToSave: true,
                                        afterSaveCell: selectRow
                                    })}
                                >
                                    <div className="well">There are no items to show</div>
                                </BootstrapTable>
                            </div>

                        ) : (
                                <div></div>
                            )}

                    </div>
                </div>
            </div>
            {createTemplateModal ? (<CreateTemplateModal dc={dc} cc={ac.dc} />) : (<div></div>)}
            {showTemplateModal ? (<ShowTemplateModal dc={dc} cc={ac.dc} />) : (<div></div>)}
            {showSummary ? (<SwitchPortTemplateSummary dc={dc} cc={ac.dc} />) : (<div></div>)}

        </div>
    );
}


