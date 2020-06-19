import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { LazyLog } from "react-lazylog";
import io from "socket.io-client";
import "../../styles/BackupRestore.css";

export default function BackupRestore(ac) {
  const [trigger, settrigger] = useState(0);
  // eslint-disable-next-line
  const [netwanalysis, setnetwanalysis] = useState([]);
  const [errorMessage, seterrorMessage] = useState(null);

  // io.origins("*:*");

  const url = "ws://http://127.0.0.1:5000/";
  // let socket = null;

  let socket = io("http://127.0.0.1:5000");
  socket.on("connect", function () {
    console.log("connected");
    socket.emit("client_connected", { data: "testsend" });
  });
  socket.on("update", function (data) {
    console.log(data);
  });

  socket.on("retrieve_active_users", () => {
    if (errorMessage === null) {
      socket.emit("activate_user", { username: errorMessage });
    }
  });

  // socket.on("any event", function (msg) {
  //   console.log(msg);
  // });

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
    // routeNetwork();
    // ac.dc.setclassOrganization("");
    ac.dc.setisOrgSelected(true);
  };

  const HandleNetwork = (opt) => {
    ac.dc.setnetwork(opt.label);
    ac.dc.setnetworkID(opt.id);
    // routeToolsTemplate();
    // ac.dc.setclassNetwork("");
    ac.dc.setisNetSelected(true);
    // ac.dc.settriggerTopReports(ac.dc.triggerTopReports + 1);
  };

  const HandleDevices = (opt) => {
    ac.dc.setdevice(opt.label);
    // ac.dc.setnetworkID(opt.id);
    // routeToolsTemplate();
    // ac.dc.setclassNetwork("");
    // ac.dc.setisNetSelected(true);
    // ac.dc.settriggerTopReports(ac.dc.triggerTopReports + 1);
  };

  const APIbody2 = {
    "X-Cisco-Meraki-API-Key": `${ac.dc.apiKey}`,
    "X-CSRFToken": "frollo",
    ARG_ORGNAME: `${ac.dc.organization}`,
    SERIAL_NUM: `${ac.dc.SNtopUsers}`,
    NET_ID: `${ac.dc.networkID}`,
    ARG_ORGID: `${ac.dc.organizationID}`,
  };

  const handleTopUsers = (e) => {
    e.preventDefault();
    settrigger(trigger + 1);
    if (trigger > 3) {
      settrigger(0);
      seterrorMessage(null);
    }
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    async function APIcall() {
      // if (ac.dc.isOrgSelected && ac.dc.isNetSelected === true) {
      // if (trigger < 4) {
      // try {
      // ac.dc.setloadingButton(true);

      fetch("/backup_restore/", {
        method: ["POST"],
        cache: "no-cache",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify(APIbody2),
      }).then((response) => {
        return response.json;
      });

      fetch("/backup_restore/", {
        method: ["POST"],
        cache: "no-cache",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify(APIbody2),
      })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })

        .then((backup) => {
          console.log("APIcall -> dataGET", backup);
        })

        .catch((err) => {
          err.json().then((errorMessage) => {
            seterrorMessage(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {errorMessage}
              </div>
            );
          });
          // ac.dc.setloadingButton(false);
        });
      // } catch (err) {
      //   if (err) {
      //     console.log("This is the error:", err);
      //     ac.dc.setalert(true);
      //     // ac.dc.setloadingButton(false);
      //   }
      // }
      // } else {
      //   // ac.dc.setloadingButton(false);
      //   ac.dc.setalert(true);

      //   seterrorMessage(
      //     <div
      //       className="form-input-error-msg alert alert-danger"
      //       style={{ margin: "10px" }}
      //     >
      //       <span className="glyphicon glyphicon-exclamation-sign"></span>
      //       No data was found in the selected time range.
      //     </div>
      //   );
      // }
      // } else {
      //   ac.dc.setswitchAlertModal(true);
      //   ac.dc.setAlertModalError("Please set Organization and Network.");
      //   ac.dc.setswitchToolsTemplate(false);
      // }
    }
    APIcall();
    return () => {
      ac.dc.setalert(false);
      seterrorMessage(null);
    };
    // eslint-disable-next-line
  }, [trigger]);

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
                    //   onClick={routeOrganization}
                    classNamePrefix="backup-restore"
                  />
                  <Select
                    options={NETWORKS}
                    placeholder={ac.dc.network}
                    onChange={HandleNetwork}
                    //   onClick={routeNetwork}
                    className="select-backup-restore"
                    classNamePrefix="backup-restore"
                  />
                  <Select
                    options={DEVICES}
                    placeholder="Devices"
                    onChange={HandleDevices}
                    //   onClick={routeNetwork}
                    className="select-backup-restore"
                    classNamePrefix="backup-restore"
                  />
                </div>
              </form>

              <div>{errorMessage && <span>{errorMessage}</span>}</div>
              <button
                id="runButton"
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
            <button
              style={{ marginBottom: 8, background: "#eee" }}
              onClick={() =>
                socket &&
                socket.send(
                  JSON.stringify({
                    message:
                      "[taskcluster 2018-11-14 21:08:32.452Z] Worker Group: us-east-1",
                  })
                )
              }
            >
              ping
            </button>
            <div style={{ height: 200, width: 902 }}>
              <LazyLog
                enableSearch
                url={url}
                websocket
                websocketOptions={{
                  onOpen: (e, sock) => {
                    socket = sock;
                    sock.send(
                      JSON.stringify({ message: "Socket has been opened!" })
                    );
                  },
                  formatMessage: (e) => JSON.parse(e).message,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
