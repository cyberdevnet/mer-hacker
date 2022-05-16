import React from "react";
import Dialog from "@material-ui/core/Dialog";
import "../../../styles/TopologyModal.css";

export default function TopologyVPNModal(ac) {
  const handleTopologyVPNModal = () => {
    ac.dc.setswitchTopologyVPNModal(false);
  };

  let IDList = Number(ac.dc.nodeVPNListID);

  const handleVPNnodeUp = () => {
    if (IDList < ac.dc.VPNModel.length - 1) {
      ac.dc.setnodeVPNListID(IDList + 1);
      ac.dc.setmodelVPN(ac.dc.VPNModel[IDList]);
    }
  };

  const handleVPNnodeDown = () => {
    if (IDList > 0) {
      ac.dc.setnodeVPNListID(IDList - 1);
      ac.dc.setmodelVPN(ac.dc.VPNModel[IDList]);
    }
  };

  let subnets = [];
  let glyphicon = [];
  // eslint-disable-next-line
  ac.dc.modelVPN.subnets.map((item, index) => {
    if (item.useVpn) {
      glyphicon.push(<span className="fas fa-check" style={{ color: "#1ABC9C" }}></span>);
    } else {
      glyphicon.push(<span className="fas fa-check" style={{ color: "#f36a5a" }}></span>);
    }

    subnets.push(
      <tr key={index}>
        <th scope="row">{index}</th>
        <td style={{ textAlign: "center" }}>{item.localSubnet}</td>
        <td style={{ textAlign: "center" }}>
          {item.useVpn}
          {glyphicon[index]}
        </td>
      </tr>
    );
  });
  return (
    <Dialog open={true} fullWidth>
      <div>
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header">
              {/*eslint-disable-next-line */}
              <a
                onClick={handleVPNnodeDown}
                type="button"
                data-dismiss="modal"
                aria-hidden="true"
                style={{
                  outline: "none",
                  fontSize:'25px',
                  position:'relative',
                  left:'390px',
                  marginRight:'10px'
                }}
              >
                <span className="fas fa-arrow-circle-left"></span>
              </a>
              {/*eslint-disable-next-line */}
              <a
                onClick={handleVPNnodeUp}
                type="button"
                data-dismiss="modal"
                aria-hidden="true"
                style={{
                  outline: "none",
                  fontSize:'25px',
                  position:'relative',
                  left:'390px',
                  marginRight:'10px'
                }}
              >
                <span className="fas fa-arrow-circle-right"></span>
              </a>
              <button
                onClick={handleTopologyVPNModal}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                style={{ bottom: "45px", left: "95px", outline: "none",position:'relative' }}
              ></button>
            </div>
            <div
              className="modal-body text-center"
              style={{ margin:'-30px' }}
            >
              <h4>VPN Node Details</h4>
              <table className="table table-striped" id="table1">
                <tbody>
                  <tr>
                    <th scope="row">Name</th>
                    <td>{ac.dc.modelVPN.name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Mode</th>
                    <td>{ac.dc.modelVPN.mode}</td>
                  </tr>
                </tbody>
              </table>
              <table className="table table-striped table-bordered" id="table2">
                <thead>
                  <tr>
                    <th id="col1" scope="col">
                      #
                    </th>
                    <th id="col2" scope="col">
                      Subnets
                    </th>
                    <th id="col3" scope="col">
                      Subnet in VPN
                    </th>
                  </tr>
                </thead>
                <tbody>{subnets}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
