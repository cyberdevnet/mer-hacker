import React from "react";
import Dialog from "@material-ui/core/Dialog";
import "../../../styles/TopologyModal.css";

export default function TopologyModal(ac) {
  let IDList = Number(ac.dc.nodeListID);

  const handleTopologyModal = () => {
    ac.dc.setswitchTopologyModal(false);
  };

  const handleClientUp = () => {
    if (IDList < ac.dc.nodeslist.length) {
      ac.dc.setnodeListID(IDList + 1);
      ac.dc.APIcallClient(IDList);
      ac.dc.setswitchTopologyModal(false);
      ac.dc.setshowSkeletonTopologyModal(true);

    }
  };

  const handleClientDown = () => {
    if (IDList > 0) {
      ac.dc.setnodeListID(IDList - 1);
      ac.dc.APIcallClient(IDList);
      ac.dc.setswitchTopologyModal(false);
      ac.dc.setshowSkeletonTopologyModal(true);

    }
  };
  return (
    <Dialog open={true} fullWidth>
      <div>
        <div className="modal-dialog modal-confirm">
          <div>
            <div className="modal-header">
              <button
                onClick={handleTopologyModal}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                style={{ top: "0px", right: "-55px", outline: "none" }}
              >
                <span>&times;</span>
              </button>
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
              <h4>Client Details</h4>
              <table className="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      Name
                    </th>
                    <td>{ac.dc.model.name}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      Description
                    </th>
                    <td>{ac.dc.model.description}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      Connected to
                    </th>
                    <td>{ac.dc.sourceDeviceName}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      Port
                    </th>
                    <td>{ac.dc.model.switchport}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      VLAN
                    </th>
                    <td>{ac.dc.model.vlan}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      IP address
                    </th>
                    <td>{ac.dc.model.ipaddress}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      MAC address
                    </th>
                    <td>{ac.dc.model.mac}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      CDP
                    </th>
                    <td>{ac.dc.model.cdp}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      clientVpnConnections
                    </th>
                    <td>{ac.dc.model.clientVpnConnections}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      ip6
                    </th>
                    <td>{ac.dc.model.ip6}</td>
                  </tr>

                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      lldp
                    </th>
                    <td>{ac.dc.model.lldp}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      manufacturer
                    </th>
                    <td>{ac.dc.model.manufacturer}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      os
                    </th>
                    <td>{ac.dc.model.os}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      recentDeviceMac
                    </th>
                    <td>{ac.dc.model.recentDeviceMac}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      smInstalled
                    </th>
                    <td>{ac.dc.model.smInstalled}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      ssid
                    </th>
                    <td>{ac.dc.model.ssid}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      status
                    </th>
                    <td>{ac.dc.model.status}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      user
                    </th>
                    <td>{ac.dc.model.user}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "100%", float: "left" }} scope="row">
                      wirelessCapabilities
                    </th>
                    <td>{ac.dc.model.wirelessCapabilities}</td>
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
