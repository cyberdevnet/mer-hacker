import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Step3Deploy(ac) {
  const [loadingDeployBtn, setloadingDeployBtn] = useState(false);
  const [triggerclaimDevices, settriggerclaimDevices] = useState(0);
  const [alertError, setalertError] = useState([]);

  const isFirstRuncreateNetwork = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRuncreateNetwork.current) {
      isFirstRuncreateNetwork.current = false;
      return;
    }

    async function createNetwork() {
      setloadingDeployBtn(true);
      setalertError([]);
      if (ac.dc.newNetwork === true) {
        await axios.post("/flask/get-api-key", { username: ac.User }).then((data) => {
          let key = data.data.apiKey;
          fetch("/flask/createNetwork", {
            method: ["POST"],
            cache: "no-cache",
            headers: {
              content_type: "application/json",
            },
            body: JSON.stringify({
              "X-Cisco-Meraki-API-Key": `${key}`,
              organizationId: `${ac.organizationID}`,
              newNetworkName: `${ac.dc.newNetworkName}`,
            }),
          }).then((response) => {
            return response.json;
          });
          fetch("/flask/createNetwork", { signal: signal })
            .then((res) => {
              if (res.status === 500) {
                setloadingDeployBtn(false);
                setalertError(
                  <div className="form-input-error-msg alert alert-danger">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    {`${res.statusText} please try again.`}
                  </div>
                );
                setTimeout(() => {
                  setalertError([]);
                }, 6000);
                return res.json();
              } else {
                return res.json();
              }
            })
            .then((data) => {
              if (data.error) {
                setalertError(
                  <div className="form-input-error-msg alert alert-danger">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    {data.error[0]}
                  </div>
                );
                setTimeout(() => {
                  setalertError([]);
                }, 6000);
                setloadingDeployBtn(false);
                ac.dc.setnextStepDisabled(true);
              } else {
                ac.dc.setnetworkIDSelected(data.createNetwork.id);
                ac.dc.setnewNetworkCreated(true);
                // ac.dc.setnextStepDisabled(false);
                setloadingDeployBtn(false);
                setalertError(
                  <div className="form-input-error-msg alert alert-success">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    {`New Network ${ac.dc.newNetworkName} created`}
                  </div>
                );
                settriggerclaimDevices(triggerclaimDevices + 1);
                setTimeout(() => {
                  setalertError([]);
                }, 6000);
              }
            });
        });
      }
    }
    createNetwork();
    return () => {
      abortController.abort();
      setloadingDeployBtn(false);
      ac.dc.setnextStepDisabled(true);
    };
    // eslint-disable-next-line
  }, [ac.dc.triggerCreateNetwork]);

  let ListSN = [];
  if (ac.dc.serialNumbers.length > 0) {
    ListSN = ac.dc.serialNumbers.split(",");
  } else {
  }

  const isFirstRunclaimDevices = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunclaimDevices.current) {
      isFirstRunclaimDevices.current = false;
      return;
    }

    async function claimDevices() {
      setloadingDeployBtn(true);
      setalertError([]);
      let FormattedSN = ac.dc.serialNumbers.split(",");
      await axios.post("/flask/get-api-key", { username: ac.User }).then((data) => {
        let key = data.data.apiKey;
        fetch("/flask/claimDevices", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify({
            "X-Cisco-Meraki-API-Key": `${key}`,
            serials: FormattedSN,
            network_id: `${ac.dc.networkIDSelected}`,
          }),
        }).then((response) => {
          return response.json;
        });
        fetch("/flask/claimDevices", { signal: signal })
          .then((res) => {
            if (res.status === 500) {
              setloadingDeployBtn(false);
              setalertError(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {`${res.statusText} please try again.`}
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
              return res.json();
            } else {
              return res.json();
            }
          })
          .then((data) => {
            if (data.error) {
              setalertError(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error[0]}
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
              setloadingDeployBtn(false);
              ac.dc.setnextStepDisabled(true);
            } else {
              setloadingDeployBtn(false);
              ac.dc.setnextStepDisabled(false);
              setalertError(
                <div className="form-input-error-msg alert alert-success">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  Devices claimed
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
            }
          });
      });
    }
    claimDevices();
    return () => {
      abortController.abort();
      setloadingDeployBtn(false);
      ac.dc.setnextStepDisabled(true);
    };
    // eslint-disable-next-line
  }, [triggerclaimDevices]);

  function HandleDeploy() {
    if (ac.dc.newNetwork === true) {
      ac.dc.settriggerCreateNetwork(ac.dc.triggerCreateNetwork + 1);
    } else {
      settriggerclaimDevices(triggerclaimDevices + 1);
    }
  }

  return (
    <div className="row-inventory">
      <div className="card">
        <div className="card-body" style={{ minHeight: "400px" }}>
          <div
            className="modal-body text-center"
            style={{ fontSize: "11px", color: "darkslategray" }}
          >
            <h4>Deploy Details</h4>
            <table className="table table-striped" id="table1">
              <tbody>
                <tr>
                  <th scope="row">Network</th>
                  {ac.dc.newNetwork ? (
                    <td>{ac.dc.newNetworkName}</td>
                  ) : (
                    <td>{ac.dc.networkSelected}</td>
                  )}
                </tr>
                {ListSN.length > 0 ? (
                  ListSN.map((opt, index) => (
                    <tr key={index}>
                      <th key={opt} scope="row">
                        Serial Number
                      </th>
                      <td key={index}>{opt}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <th scope="row"></th>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ borderTop: "transparent" }} className="modal-footer text-center">
          {ListSN.length > 0 ? (
            <button
              onClick={HandleDeploy}
              className="btn-summary btn-primary"
              disabled={loadingDeployBtn}
            >
              {loadingDeployBtn && (
                <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
              )}
              {loadingDeployBtn && <span>Deploy</span>}
              {!loadingDeployBtn && <span>Deploy</span>}
            </button>
          ) : (
            <button
              className="btn-summary btn-primary"
              disabled={true}
              style={{ backgroundColor: "#337ab79c", borderColor: "transparent" }}
            >
              Deploy
            </button>
          )}
        </div>
        {alertError}
      </div>
    </div>
  );
}
