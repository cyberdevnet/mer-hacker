import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";

import "../../styles/Logout.css";

export default function Logout(ac, props) {
  const [loading, setloading] = useState(false);

  axios.defaults.withCredentials = true;

  // send a 'leer' string to server on logout to clear the key

  async function postKey() {
    try {
      const rawResponse = await axios.post("/flask/post-api-key", {
        username: "leer",
        realUsername: ac.User,
        apiKey: "leer",
      });
      return await rawResponse.json();
    } catch (error) {}
  }

  const ConfirmLogout = () => {
    setloading(true);
    setTimeout(() => {
      ac.setswitchLoginAPI(true);
      ac.setgetOrgStatusCode(0);
      ac.setswitchDashboard(false);
      ac.setswitchLoggedout(false);
      ac.setisOrgSelected(false);
      ac.setisNetSelected(false);
      ac.setnetworkList([]);
      ac.setdeviceList([]);
      ac.settotalDevices(0);
      ac.settimeZone(0);
      ac.setinputKey("");
      ac.setinputConfKey("");
      ac.setorganization("Set Organization");
      ac.setnetworkID(0);
      ac.setorganizationID(0);
      ac.setnetwork("Networks");
      ac.setdeviceList([]);
      ac.setSNtopUsers("");
      ac.setcollapseButton({ display: "none" });
      ac.sethideLogin({ display: "block" });
      axios.post("/flask/delete_backupfile", { User: ac.User });
      axios.post("/flask/deletebackupRestoreFiles", { User: ac.User });
      axios.post("/flask/deletebuild_meraki_switchconfigFiles", { User: ac.User });
      axios.post("/logout", {});
      postKey();
      ac.setUser("john.doe@mer-hacker.com");
      setloading(false);
    }, 2300);
  };

  const Cancel = () => {
    ac.dc.history.goBack();
  };

  return (
    <Dialog open={true}>
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          {/* <div className="modal-header">
            <h4 className="modal-title">Are you sure?</h4>
            <button
              onClick={Cancel}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            ></button>
          </div> */}
          <div className="modal-body">
            <h4 className="modal-title">Are you sure?</h4>

            <p>Do you really want to Logout?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-info btn-icon btn-sm" onClick={Cancel}>
              Cancel
            </button>
            <button
              href="#"
              className="btn btn-danger btn-sm"
              onClick={!loading ? ConfirmLogout : null}
            >
              {loading && <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />}
              {loading && <span>Logout</span>}
              {!loading && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

// <Dialog open={true}>
//   <div>
//     <div className="modal-dialog modal-confirm">
//       <div>
//         <div className="modal-header">
//           <div className="icon-box-logout">
//             <i className="material-icons">&#xE5CD;</i>
//           </div>
//           <h4 className="modal-title">Are you sure?</h4>
//           <button
//             onClick={Cancel}
//             type="button"
//             className="close"
//             data-dismiss="modal"
//             aria-hidden="true"
//           >
//             &times;
//           </button>
//         </div>
//         <div className="modal-body">
//           <p>Do you really want to Logout?</p>
//         </div>
//         <div className="modal-footer">
//           <button onClick={Cancel} type="button" className="btn btn-info" data-dismiss="modal">
//             Cancel
//        </button>
// <button
//   onClick={!loading ? ConfirmLogout : null}
//   disabled={loading}
//   className="btn btn-danger"
// >
//   {loading && <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />}
//   {loading && <span>Logout</span>}
//   {!loading && <span>Logout</span>}
// </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </Dialog>
