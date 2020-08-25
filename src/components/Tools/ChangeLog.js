import React, { useEffect, useState, useRef } from "react";
import GetAllClientsModal from './GetAllClientsModal'
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import Select from "react-select";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '../../styles/GetAllClients.css'


export default function ChangeLog(ac) {
    const [showtable, setshowtable] = useState(false);
    const [trigger, settrigger] = useState(0);
    const [triggerAdmins, settriggerAdmins] = useState(0);
    const [loading, setloading] = useState(false);
    const [loadingAdmins, setloadingAdmins] = useState(false);
    const [flashMessages, setflashMessages] = useState([]);
    const [allLogs, setallLogs] = useState([]);
    const [allAdmins, setallAdmins] = useState([]);
    const [singleClient, setsingleClient] = useState([])
    const [showclientModal, setshowclientModal] = useState(false);
    const [dataLogs, setdataLogs] = useState([])
    const [clientListID, setclientListID] = useState([])
    const [timeIntervalID, settimeIntervalID] = useState(604800)
    const [networkID, setnetworkID] = useState([])
    const [adminID, setadminID] = useState([])
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;

    const APIbody = {
        "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
        organizationId: `${ac.dc.organizationID}`,
        NET_ID: `${networkID}`,
        ADMIN_ID: `${adminID}`,
        TIME_SPAN: timeIntervalID,
    };


    const handleClients = (e) => {
        e.preventDefault();
        settrigger(trigger + 1);
        setflashMessages([])
        ac.dc.setflashMessages([])
    };

    const isFirstRunHosts = useRef(true);
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        if (isFirstRunHosts.current) {
            isFirstRunHosts.current = false;
            return;
        }
        async function callClients() {
            if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
                setdataLogs({ ...columns, rows: [] })
                setshowtable(false)
                setloading(true)
                fetch("/flask/change_log", {
                    method: ["POST"],
                    cache: "no-cache",
                    headers: {
                        content_type: "application/json",
                    },
                    body: JSON.stringify(APIbody),
                }).then((response) => {
                    return response.json;
                });
                fetch("/flask/change_log", { signal: signal })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.error) {
                            setloading(false)
                            setflashMessages(<div className="form-input-error-msg alert alert-danger">
                                <span className="glyphicon glyphicon-exclamation-sign"></span>
                                {data.error[0]}
                            </div>)
                        } else {
                            setallLogs(data.change_log)
                            let change_log = []
                            let row = [];


                            if (data.change_log.length !== 0) {
                                // eslint-disable-next-line
                                data.change_log.map((opt, index) => {

                                    var d = new Date(opt.ts)
                                    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                    var year = d.getFullYear();
                                    var month = months[d.getMonth()];
                                    var date = d.getDate();
                                    var hour = d.getHours();
                                    var min = d.getMinutes();
                                    var sec = d.getSeconds();
                                    var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;

                                    function truncateString(str, num) {
                                        // If the length of str is less than or equal to num
                                        // just return str--don't truncate it.
                                        if (str.length <= num) {
                                            return str
                                        }
                                        // Return str truncated with '(Click to expand)' concatenated to the end of str.
                                        return str.slice(0, num) + '...(Click to expand)'
                                    }

                                    let label = truncateString(opt.label, 15);
                                    let oldValue = truncateString(opt.oldValue, 15);
                                    let newValue = truncateString(opt.newValue, 15);

                                    let randomKey = Math.random().toString(36).substring(7);

                                    var LogModel = {
                                        ts: time,
                                        adminName: opt.adminName,
                                        networkName: opt.networkName,
                                        page: opt.page,
                                        label: label,
                                        oldValue: oldValue,
                                        newValue: newValue,
                                        key: randomKey,
                                        Expandlabel: opt.label,
                                        ExpandoldValue: opt.oldValue,
                                        ExpandnewValue: opt.newValue
                                    }

                                    change_log.push(LogModel)
                                    row.push(LogModel);
                                    setdataLogs({ ...columns, rows: row })
                                })
                            }
                            else {
                                setloading(false)
                                setflashMessages(<div className="form-input-error-msg alert alert-danger">
                                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                            No change logs in selected time frame/network/administrator, please try again.
                        </div>)
                            }
                        }
                    })
                    .then(() => {
                        setshowtable(true)
                        setloading(false)
                    })
            } else {
                ac.dc.setswitchAlertModal(true);
                ac.dc.setAlertModalError("Please set Organization and Network.");
                ac.dc.setswitchToolsTemplate(false);
            }


            return () => {
                abortController.abort()
                setloading(false)
            };
        }
        callClients();
        // eslint-disable-next-line
    }, [trigger]);





    const isFirstAdmins = useRef(true);
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        if (isFirstAdmins.current) {
            isFirstAdmins.current = false;
            return;
        }
        async function callClients() {
            if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
                setloadingAdmins(true)
                fetch("/flask/admins", {
                    method: ["POST"],
                    cache: "no-cache",
                    headers: {
                        content_type: "application/json",
                    },
                    body: JSON.stringify(APIbody),
                }).then((response) => {
                    return response.json;
                });
                fetch("/flask/admins", { signal: signal })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.error) {
                            setloadingAdmins(false)
                            setflashMessages(<div className="form-input-error-msg alert alert-danger">
                                <span className="glyphicon glyphicon-exclamation-sign"></span>
                                {data.error[0]}
                            </div>)
                        } else {
                            if (data.admins.length !== 0) {
                                setallAdmins(data.admins)
                                setloadingAdmins(false)

                            }
                            else {
                                setloadingAdmins(false)
                                setflashMessages(<div className="form-input-error-msg alert alert-danger">
                                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                            there was an error loading the administrators, please try again.
                        </div>)

                            }

                        }
                    })
            } else {
                setloadingAdmins(false)
                ac.dc.setswitchAlertModal(true);
                ac.dc.setAlertModalError("Please set Organization and Network.");
                ac.dc.setswitchToolsTemplate(false);
            }


            return () => {
                abortController.abort()
                setloadingAdmins(false)
            };
        }
        callClients();
        // eslint-disable-next-line
    }, [triggerAdmins]);






    const columns = [
        {
            dataField: "ts",
            text: "Time (UTC)",
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '110px', textAlign: 'center' };
            },
        },
        {
            dataField: "adminName",
            text: "Admin",
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '120px', textAlign: 'center' };
            },
        },
        {
            dataField: "networkName",
            text: "Network",
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '180px', textAlign: 'center' };
            },
        },
        {
            dataField: "page",
            text: "Page",
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '130px', textAlign: 'center' };
            }
        },
        {
            dataField: "label",
            text: "Label",
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '250px', textAlign: 'center' };
            },
        },
        {
            dataField: "oldValue",
            text: "Old Value",
            editable: false,
            // headerStyle: (colum, colIndex) => {
            //     return {  };
            // },

        },
        {
            dataField: "newValue",
            text: "New Value",
            editable: false,
            // headerStyle: (colum, colIndex) => {
            //     return {  };
            // },

        },
        {
            dataField: "key",
            text: "key",
            editable: false,
            hidden: 'true'

        },
    ];

    const expandRow = {

        renderer: row => (
            <div>
                <table className="table table-striped table-bordered" id="table1">

                    <tbody key='1'>
                        <tr>
                            <th style={{ border: 'none', float: 'left' }}> Label </th>
                            <td style={{ width: '90%' }}> {`${row.Expandlabel}`}</td>
                        </tr>
                        <tr>
                            <th style={{ border: 'none', float: 'left' }}> Old Value </th>
                            <td style={{ width: '90%' }}> {`${row.ExpandoldValue}`}</td>
                        </tr>
                        <tr>
                            <th style={{ border: 'none', float: 'left' }}> New Value </th>
                            <td style={{ width: '90%' }}> {`${row.ExpandnewValue}`}</td>
                        </tr>
                    </tbody>
                </table>


            </div>

        ),
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) {
                return <b><span className="glyphicon glyphicon-arrow-up"></span></b>;
            }
            return <b><span className="glyphicon glyphicon-arrow-down"></span></b>;
        },
        expandColumnRenderer: ({ expanded }) => {
            if (expanded) {
                return (
                    <b><span className="glyphicon glyphicon-arrow-up"></span></b>
                );
            }
            return (
                <b><span className="glyphicon glyphicon-arrow-down"></span></b>
            );
        }
    };


    const NETWORKS = ac.dc.networkList.map((opt, index) => ({
        label: opt.name,
        value: index,
        id: opt.id,
    }));

    const time_Interval = [
        { span: '15 minutes', seconds: 900 },
        { span: '30 minutes', seconds: 1800 },
        { span: '1 hour', seconds: 3600 },
        { span: '8 hours', seconds: 28800 },
        { span: '1 day', seconds: 86400 },
        { span: '1 week', seconds: 604800 },
        { span: '1 month', seconds: 2592000 },
        { span: '6 months', seconds: 15552000 },
        { span: '1 year', seconds: 31104000 }
    ]

    const TIMEINTERVAL = time_Interval.map((opt, index) => ({
        label: opt.span,
        seconds: opt.seconds

    }));

    const ADMINS = allAdmins.map((opt, index) => ({
        label: opt.name,
        id: opt.id

    }));



    const HandleInterval = (opt) => {
        if (opt === null) {
            settimeIntervalID(604800)
        } else {
            settimeIntervalID(opt.seconds)

        }
    };

    const HandleNetwork = (opt) => {
        if (opt === null) {
            setnetworkID([])
        } else {
            setnetworkID(opt.id)

        }
    };

    const HandleAdmins = (opt) => {
        if (opt === null) {
            setadminID([])
        } else {
            setadminID(opt.id)

        }
    };




    const dc = {
        showtable,
        setshowtable,
        trigger,
        settrigger,
        showclientModal, setshowclientModal,
        allLogs, setallLogs,
        singleClient, setsingleClient,
        clientListID, setclientListID
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
                                                <dt>This scripts returns all changes have been made in an organization.</dt>
                                            </dl>
                                            <ul>
                                                <li>You can filter the result based on Administrator, specific network or time Interval (default 1 week)</li>
                                                <li>Click on a row to display the change details</li>
                                                <li>The table is exportable in CSV format</li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {flashMessages}

                        <div className="panel-body">
                            <form className="form-inline">
                                <div className="form-group">
                                    <Select
                                        className='select_network_change-log'
                                        options={TIMEINTERVAL}
                                        placeholder='Select Time Interval'
                                        onChange={HandleInterval}
                                        classNamePrefix="change-log"
                                        isClearable={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <Select
                                        className='select_network_change-log'
                                        options={NETWORKS}
                                        placeholder='Select Network'
                                        onChange={HandleNetwork}
                                        classNamePrefix="change-log"
                                        isClearable={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <Select
                                        className='select_network_change-log'
                                        options={ADMINS}
                                        placeholder='Select Administrator'
                                        onChange={HandleAdmins}
                                        classNamePrefix="change-log"
                                        onMenuOpen={() => settriggerAdmins(triggerAdmins + 1)}
                                        isLoading={loadingAdmins}
                                        isClearable={true}
                                    />
                                </div>
                            </form>
                            <button
                                className="btn btn-primary-clients"
                                onClick={!loading ? handleClients : null}
                                disabled={loading}
                            >
                                {loading && (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                    />
                                )}
                                {loading && <span>Loading Data</span>}
                                {!loading && <span>RUN</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        {showtable ? (
                            <div className="bootstrap-table-panel">
                                <ToolkitProvider
                                    search
                                    keyField="key"
                                    data={dataLogs.rows}
                                    columns={columns}
                                >
                                    {
                                        props => (
                                            <div>
                                                <SearchBar
                                                    style={{ width: '299px' }}
                                                    {...props.searchProps}
                                                />
                                                <ExportCSVButton className='export-csv' {...props.csvProps}>Export CSV</ExportCSVButton>
                                                {/* <hr /> */}
                                                <BootstrapTable
                                                    {...props.baseProps}
                                                    striped
                                                    hover
                                                    expandRow={expandRow}
                                                />
                                            </div>
                                        )
                                    }
                                </ToolkitProvider>
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


