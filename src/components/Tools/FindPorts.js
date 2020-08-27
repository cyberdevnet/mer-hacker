import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import "../../styles/FindPorts.css";

export default function NetworkTopUsers(ac) {
  const [showtable, setshowtable] = useState(false);
  const [showError, setshowError] = useState(false);
  const [triggerMAC, settriggerMAC] = useState(0);
  const [triggerIP, settriggerIP] = useState(0);
  const [findPort, setfindPort] = useState([]);
  const [findPortTable, setfindPortTable] = useState([]);
  const [errorMessageMAC, seterrorMessageMAC] = useState(null);
  const [errorMessageIP, seterrorMessageIP] = useState(null);
  const [errorMessageMAC_IP, seterrorMessageMAC_IP] = useState(null);
  const [IPAddress, setIPAddress] = useState("");
  const [macAddressbeforeTransf, setmacAddressbeforeTransf] = useState("");
  // eslint-disable-next-line
  const [macAddressafterTransf, setmacAddressafterTransf] = useState("");
  const [switchTimeInterval, setswitchTimeInterval] = useState(15);
  console.log("NetworkTopUsers -> switchTimeInterval", switchTimeInterval);

  const isFirstRunMAC = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunMAC.current) {
      isFirstRunMAC.current = false;
      return;
    }
    async function APICallMAC() {
      if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
        // VALIDATION FORM
        const transormMacAddress = (address) => {
          const a = address.replace(/\W/g, "");
          if (a.length === 12) {
            seterrorMessageMAC(null);
            seterrorMessageMAC_IP(null);
            setmacAddressafterTransf(
              a
                .replace(/(.{2})/g, "$1:")
                .toUpperCase()
                .slice(0, -1)
            );
            const macAddress = a
              .replace(/(.{2})/g, "$1:")
              .toUpperCase()
              .slice(0, -1);

            ac.dc.setloadingButton(true);

            fetch("/flask/find_ports", {
              signal: signal,
              method: ["POST"],
              cache: "no-cache",
              headers: {
                content_type: "application/json",
              },
              body: JSON.stringify({
                "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
                "X-CSRFToken": "frollo",
                ORG_ID: `${ac.dc.organizationID}`,
                MAC_ADDR: macAddress,
                IP_ADDR: "",
                TIME_SPAN: switchTimeInterval,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.error) {
                  ac.dc.setflashMessages(
                    <div className="form-input-error-msg alert alert-danger">
                      <span className="glyphicon glyphicon-exclamation-sign"></span>
                      {data.error[0]}
                    </div>
                  );
                } else {
                  setfindPort(data.data);
                }
              })
              .then(() => setshowtable(true))
              .then(() => ac.dc.setloadingButton(false));
          } else {
            seterrorMessageMAC(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                Please insert a valid MAC Address. Format accepted are:
                "AA.BB.CC.DD.EE.FF", "112233445566", "AACC.DDEE.BBFF",
                "AA.BB.CC.DD.EE.FF", "AB12CD34EF56", "ab-12-cd-34-ef-56",
                "AB-12:CD-34:EF-56", "ab 12 cd 34 ef 56", "AB 12 CD 34 EF 56",
              </div>
            );
          }
        };

        [macAddressbeforeTransf].forEach(transormMacAddress);
      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }
    }
    APICallMAC();
    return () => {
      abortController.abort();
      setfindPort([]);
      setshowtable(false);
      setshowError(false);
    };
    // eslint-disable-next-line
  }, [triggerMAC]);

  const isFirstRunIP = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunIP.current) {
      isFirstRunIP.current = false;
      return;
    }
    async function APICallIP() {
      if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
        // VALIDATION FORM
        const validateIPaddress = (address) => {
          const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
          if (IPAddress.match(ipformat)) {
            seterrorMessageIP(null);
            seterrorMessageMAC_IP(null);
            const validIP = IPAddress;

            ac.dc.setloadingButton(true);

            fetch("/flask/find_ports", {
              signal: signal,
              method: ["POST"],
              cache: "no-cache",
              headers: {
                content_type: "application/json",
              },
              body: JSON.stringify({
                "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
                "X-CSRFToken": "frollo",
                ORG_ID: `${ac.dc.organizationID}`,
                MAC_ADDR: "",
                IP_ADDR: validIP,
                TIME_SPAN: switchTimeInterval,
              }),
            })
              .then((response) => response.json())
              .then((data) => setfindPort(data.data))

              .then(() => setshowtable(true))
              .then(() => ac.dc.setloadingButton(false))
              .catch((err) => {
                console.log("this is the err: ", err);
                ac.dc.setloadingButton(false);
              });
          } else {
            seterrorMessageIP(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                Please insert a valid IP Address.
              </div>
            );
          }
        };

        [IPAddress].forEach(validateIPaddress);
      } else {
        ac.dc.setswitchAlertModal(true);
        ac.dc.setAlertModalError("Please set Organization and Network.");
        ac.dc.setswitchToolsTemplate(false);
      }
    }
    APICallIP();
    return () => {
      abortController.abort();
      setfindPort([]);
      setshowtable(false);
      setshowError(false);
    };
    // eslint-disable-next-line
  }, [triggerIP]);

  const isFirstRunPort = useRef(true);

  useEffect(() => {
    if (isFirstRunPort.current) {
      isFirstRunPort.current = false;
      return;
    }
    if (findPort === null || findPort === undefined) {
      setshowError(true);
      setshowtable(false);
    } else {
      setfindPortTable(findPort);
    }
  }, [findPort]);

  const handleTopUsers = (e) => {
    e.preventDefault();
    if (IPAddress !== "" && macAddressbeforeTransf === "") {
      settriggerIP(triggerIP + 1);
      seterrorMessageMAC(false);
      seterrorMessageIP(false);
      seterrorMessageMAC_IP(null);
    } else if (macAddressbeforeTransf !== "" && IPAddress === "") {
      settriggerMAC(triggerMAC + 1);
      seterrorMessageMAC(false);
      seterrorMessageIP(false);
      seterrorMessageMAC_IP(null);
    } else {
      seterrorMessageMAC(false);
      seterrorMessageIP(false);
      seterrorMessageMAC_IP(
        <div className="form-input-error-msg alert alert-danger">
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          You can perform a search either by MAC Address or IP Address, please
          insert only one search parameter.
        </div>
      );
    }
  };

  const time_interval = [
    { time: "15 minutes" },
    { time: "30 minutes" },
    { time: "60 minutes" },
  ];

  const TIMEINTERVAL = time_interval.map((opt, index) => ({
    label: opt.time,
    index: index,
  }));

  const selectTimeInterval = (opt) => {
    if (opt.index === 0) {
      setswitchTimeInterval(15);
    } else if (opt.index === 1) {
      setswitchTimeInterval(30);
    } else if (opt.index === 2) {
      setswitchTimeInterval(60);
    }
  };

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
                      <dl>
                        <dt>
                          This script finds the switch and ports where a clients
                          is connected, searching either by clients MAC address
                          or IP address.
                        </dt>
                        <dt>This script works only on MS-series switchs.</dt>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex"></div>
            </div>
            <div className="panel-body">
              <form className="form-inline">
                <div className="form-group">
                  <Select
                    className="select_network_time-interval"
                    options={TIMEINTERVAL}
                    placeholder="Select Interval"
                    onChange={selectTimeInterval}
                    classNamePrefix="time-interval"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MAC Address"
                    onChange={(e) => setmacAddressbeforeTransf(e.target.value)}
                    name="mac-address"
                    id="mac-address"
                    required="required"
                    data-error="Please enter a valid mac-address."
                  />

                  {errorMessageMAC && <span>{errorMessageMAC}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="IP Address"
                    onChange={(e) => setIPAddress(e.target.value)}
                    name="ip-address"
                    id="ip-address"
                    required="required"
                    data-error="Please enter a valid ip-address."
                  />

                  {errorMessageIP && <span>{errorMessageIP}</span>}
                </div>

                <div>
                  {errorMessageMAC_IP && <span>{errorMessageMAC_IP}</span>}
                </div>
              </form>

              <button
                id="runButton"
                type="submit"
                className="btn btn-primary"
                onClick={!ac.dc.loadingButton ? handleTopUsers : null}
                disabled={ac.dc.loadingButton}
              >
                {ac.dc.loadingButton && (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
                {ac.dc.loadingButton && <span>Loading Data</span>}
                {!ac.dc.loadingButton && <span>RUN</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            {showError ? (
              <div className="panel-body">
                <div className="table-responsive table-bordered">
                  <div className="form-input-error-msg alert alert-danger">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    Found 0 total ports matching search criteria. Select another
                    time interval and be sure the client is connected to a wired
                    network.
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            {showtable ? (
              <div className="panel-body">
                <div className="table-responsive table-bordered">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Switch</th>
                        <th>Port</th>
                        <th>Description</th>
                        <th>IP Address</th>
                        <th>VLAN</th>
                        <th>MAC Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>

                        <td>{findPortTable[0]}</td>
                        <td>{findPortTable[1]}</td>
                        <td>{findPortTable[2]}</td>
                        <td>{findPortTable[3]}</td>
                        <td>{findPortTable[4]}</td>
                        <td>{findPortTable[5]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
