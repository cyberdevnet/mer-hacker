import React, { useEffect, useState, useRef } from "react";
import GetAllClientsModal from './GetAllClientsModal'
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '../../styles/GetAllClients.css'


export default function SwitchPortTemplate(ac) {
    const [showtable, setshowtable] = useState(false);
    const [trigger, settrigger] = useState(0);
    const [loading, setloading] = useState(false);
    const [flashMessages, setflashMessages] = useState([]);
    const [allClients, setallClients] = useState([]);
    const [singleClient, setsingleClient] = useState([])
    const [showclientModal, setshowclientModal] = useState(false);
    const [dataClients, setdataClients] = useState([])
    const [clientListID, setclientListID] = useState([])




    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;

    const APIbody = {
        "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
        organizationId: `${ac.dc.organizationID}`,
        NET_ID: `${ac.dc.networkID}`,
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
                setdataClients({ ...columns, rows: [] })
                setshowtable(false)
                setloading(true)
                fetch("/flask/clients", {
                    method: ["POST"],
                    cache: "no-cache",
                    headers: {
                        content_type: "application/json",
                    },
                    body: JSON.stringify(APIbody),
                }).then((response) => {
                    return response.json;
                });
                fetch("/flask/clients", { signal: signal })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.error) {
                            setloading(false)
                            setflashMessages(<div className="form-input-error-msg alert alert-danger">
                                <span className="glyphicon glyphicon-exclamation-sign"></span>
                                {data.error[0]}
                            </div>)
                        } else {
                            setallClients(data.clients)
                            let clients = []
                            let row = [];

                            if (data.clients.length !== 0) {
                                // eslint-disable-next-line
                                data.clients.map((opt, index) => {
                                    if (opt.status === 'Online') {
                                        var portModel = {
                                            key: opt.index,
                                            description: opt.description,
                                            firstSeen: opt.firstSeen,
                                            groupPolicy8021x: opt.groupPolicy8021x,
                                            id: opt.id,
                                            ip: opt.ip,
                                            ip6: opt.ip6,
                                            ip6Local: opt.ip6Local,
                                            lastSeen: opt.lastSeen,
                                            mac: opt.mac,
                                            manufacturer: opt.manufacturer,
                                            notes: opt.notes,
                                            os: opt.os,
                                            recentDeviceMac: opt.recentDeviceMac,
                                            recentDeviceName: opt.recentDeviceName,
                                            recentDeviceSerial: opt.recentDeviceSerial,
                                            smInstalled: opt.smInstalled,
                                            ssid: opt.ssid,
                                            status: <span className="glyphicon glyphicon-check" style={{ color: '#1ABC9C' }}></span>,
                                            switchport: opt.switchport,
                                            usage: opt.usage,
                                            user: opt.user,
                                            vlan: opt.vlan,
                                        }
                                    } else {
                                        // eslint-disable-next-line
                                        var portModel = {
                                            key: opt.index,
                                            description: opt.description,
                                            firstSeen: opt.firstSeen,
                                            groupPolicy8021x: opt.groupPolicy8021x,
                                            id: opt.id,
                                            ip: opt.ip,
                                            ip6: opt.ip6,
                                            ip6Local: opt.ip6Local,
                                            lastSeen: opt.lastSeen,
                                            mac: opt.mac,
                                            manufacturer: opt.manufacturer,
                                            notes: opt.notes,
                                            os: opt.os,
                                            recentDeviceMac: opt.recentDeviceMac,
                                            recentDeviceName: opt.recentDeviceName,
                                            recentDeviceSerial: opt.recentDeviceSerial,
                                            smInstalled: opt.smInstalled,
                                            ssid: opt.ssid,
                                            status: <span className="glyphicon glyphicon-check" style={{ color: '#f36a5a' }}></span>,
                                            switchport: opt.switchport,
                                            usage: opt.usage,
                                            user: opt.user,
                                            vlan: opt.vlan,
                                        }
                                    }

                                    clients.push(portModel)
                                    row.push(portModel);
                                    setdataClients({ ...columns, rows: row })



                                })
                            } else {
                                setloading(false)
                                setflashMessages(<div className="form-input-error-msg alert alert-danger">
                                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                            No Clients active or there was an error loading the data, please try again.
                        </div>)

                            }


                        }
                    })
                    .then(() => {
                        setshowtable(true)
                        setloading(false)
                    })
            }
            return () => {
                abortController.abort()
                setloading(false)
            };
        }
        callClients();
        // eslint-disable-next-line
    }, [trigger]);




    const columns = [
        {
            dataField: "description",
            text: "Description",
            editable: false,
            key: "description",
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        },
        {
            dataField: "ip",
            text: "IP",
            editable: false,
            key: 'ip',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        },
        {
            dataField: "mac",
            text: "mac",
            editable: false,
            key: 'mac',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        },
        {
            dataField: "vlan",
            text: "VLAN",
            editable: false,
            key: 'vlan',
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            }
        },
        {
            dataField: "recentDeviceName",
            text: "CDP Device",
            editable: false,
            key: 'recentDeviceName',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            },
        },
        {
            dataField: "ssid",
            text: "ssid",
            editable: false,
            key: 'ssid',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            },
        },
        {
            dataField: "switchport",
            text: "Port",
            editable: false,
            key: 'switchport',
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            },
        },
        {
            dataField: "status",
            text: "status",
            editable: false,
            key: 'status',
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            },
        },

    ];



    const rowEvents = {
        onDoubleClick: (e, row, rowIndex) => {
            setclientListID(rowIndex)
            setsingleClient(allClients[rowIndex])
            setshowclientModal(true)

        }
    };



    const dc = {
        showtable,
        setshowtable,
        trigger,
        settrigger,
        showclientModal, setshowclientModal,
        allClients, setallClients,
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
                                                <dt>This scripts returns all the clients active in the last 1 hour on a network.</dt>
                                            </dl>
                                            <ul>
                                                <li>Double Click on a row to display the client's details</li>
                                                <li>The table is exportable in CSV format</li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {flashMessages}
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
                                    keyField="mac"
                                    data={dataClients.rows}
                                    columns={columns}
                                >
                                    {
                                        props => (
                                            <div>
                                                <SearchBar
                                                    style={{ width: '299px' }}
                                                    {...props.searchProps} />
                                                <hr />
                                                <BootstrapTable
                                                    {...props.baseProps}
                                                    rowEvents={rowEvents}
                                                    striped
                                                    hover
                                                />
                                                <ExportCSVButton {...props.csvProps}>Export CSV</ExportCSVButton>
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
            {showclientModal ? (<GetAllClientsModal dc={dc} cc={ac.dc} />) : (<div></div>)}


        </div>
    );
}


