import React from "react";
import Dialog from "@material-ui/core/Dialog";
import "../../../styles/CreateTemplateModal.css";

export default function SwitchPortConfig(ac) {
  let PortList = Number(ac.dc.portListID);

  const Cancel = () => {
    ac.dc.setshowportConfig(false);
  };

  const handleClientUp = () => {
    if (
      PortList < ac.dc.allSwitchports.length &&
      ac.dc.portListID !== ac.dc.allSwitchports.length - 1
    ) {
      ac.dc.setsingleSwitchports(ac.dc.allSwitchports[PortList + 1]);
      ac.dc.setportListID(PortList + 1);
    }
  };

  const handleClientDown = () => {
    if (PortList > 0) {
      ac.dc.setsingleSwitchports(ac.dc.allSwitchports[PortList - 1]);
      ac.dc.setportListID(PortList - 1);
    }
  };

  return (
    <Dialog open={true} fullWidth>
      <div>
        <div className="modal-dialog-summary modal-confirm-summary">
          <div>
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <button
                onClick={Cancel}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                style={{ top: "0px", right: "-55px", outline: "none" }}
              ></button>
              <button
                onClick={handleClientUp}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                style={{
                  top: "65px",
                  right: "-45px",
                  fontSize: "23px",
                  color: "black",
                  outline: "none",
                }}
              >
                <span className="glyphicon glyphicon-circle-arrow-right"></span>
              </button>
              <button
                onClick={handleClientDown}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                style={{
                  top: "65px",
                  left: "-45px",
                  fontSize: "23px",
                  color: "black",
                  outline: "none",
                }}
              >
                <span className="glyphicon glyphicon-circle-arrow-left"></span>
              </button>
            </div>
            <div
              className="modal-body text-center"
              style={{ fontSize: "11px", color: "darkslategray" }}
            >
              <h4>Switchport Configuration</h4>
              <table className="table table-striped" id="table2">
                <thead>
                  <tr>
                    <th id="col11" scope="col">
                      Hostname
                    </th>
                    <th id="col21" scope="col">
                      IP address
                    </th>
                    <th id="col31" scope="col">
                      Model
                    </th>
                  </tr>
                </thead>
                <tbody key="2">
                  <tr>
                    <th scope="row">{ac.dc.switchDeviceName}</th>
                    <td>{ac.dc.switchDeviceIp}</td>
                    <td>{ac.dc.switchDeviceModel}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="modal-body text-center"
              style={{ fontSize: "11px", color: "darkslategray" }}
            >
              <table className="table table-striped table-bordered" id="table1">
                <tbody key="1">
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Switchport{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.number} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Name{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.name} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Tags{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.tags} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Port enabled{" "}
                    </th>
                    <td> {`${ac.dc.singleSwitchports.enabled}`} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      PoE{" "}
                    </th>
                    <td> {`${ac.dc.singleSwitchports.poeEnabled}`} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Type{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.type} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Native VLAN{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.vlan} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Allowed VLANs{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.allowedVlans} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Access policy{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.accessPolicyNumber} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Whitelisted MACs{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.stickyMacWhitelist} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Whitelist size limit{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.stickyMacWhitelistLimit} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      VLAN{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.vlan} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Voice VLAN{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.voiceVlan} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Link{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.linkNegotiation} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      RSTP{" "}
                    </th>
                    <td> {`${ac.dc.singleSwitchports.rstpEnabled}`} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      STP guard{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.stpGuard} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Port schedule{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.portScheduleId} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Port isolation{" "}
                    </th>
                    <td> {`${ac.dc.singleSwitchports.isolationEnabled}`} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      Storm Control{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.stormControlEnabled} </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "100%", float: "left" }}>
                      {" "}
                      UDLD{" "}
                    </th>
                    <td> {ac.dc.singleSwitchports.udld} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
