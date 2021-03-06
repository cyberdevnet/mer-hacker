import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";


export default function ChangeApiKey(ac) {
  const [inputApiKey, setinputApiKey] = useState([]);
  const [loadingButton, setloadingButton] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [triggerKey, settriggerKey] = useState(0);

  axios.defaults.withCredentials = true;


  useEffect(() => {
    if (inputApiKey.length < 1) {
      setbuttonDisabled(true);
    }
    // eslint-disable-next-line
  }, []);

  const isFirstRunKey = useRef(true);
  useEffect(() => {
    if (isFirstRunKey.current) {
      isFirstRunKey.current = false;
      return;
    }
    setloadingButton(true);
    setTimeout(() => {
      async function PostNewKey() {
        try {
          const postRes = await axios
            .post("/node/post-api-key", {
              isSignedIn: ac.isSignedIn,
              username: ac.User,
              realUsername: ac.User,
              apiKey: inputApiKey,
            })
            .then(() => {
              // ac.history.goBack();
              ac.setorganization("Set Organization");
              ac.setnetworkID(0);
              ac.setorganizationID(0);
              ac.setnetwork("Networks");
              ac.history.push("/home");
              setloadingButton(false);
            })


          return await postRes.json();
        } catch (error) {}
      }

      PostNewKey();
    }, 3000);
    return () => {
      setloadingButton(false);
    };

    // eslint-disable-next-line
  }, [triggerKey]);


  const HandleApiKey = () => {
    settriggerKey(triggerKey + 1);
  };

  const Cancel = () => {
    ac.history.goBack();
  };

  return (
    <Dialog open={true}>
      <div className="modal-content" style={{ width: "360px" }}>
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={Cancel}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title" id="myModalLabel">
            Change API key
          </h4>
        </div>
        <div className="modal-body" style={{ margin: "5px 15px 5px -2px" }}>
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="API key"
              onChange={(e) => setinputApiKey(e.target.value)}
              name="api-key"
              id="api-key"
              required="required"
            />
          </form>
              <h6 style={{marginLeft: '78px', color: '#999'}}>Refresh the page after change</h6>
        </div>
        <div className="modal-footer" style={{ borderTop: "none" }}>
          <button
            id="runButton"
            type="submit"
            className="btn btn-danger"
            onClick={!loadingButton ? HandleApiKey : null}
            disabled={inputApiKey.length < 1 ? buttonDisabled : loadingButton}
          >
            {loadingButton && (
              <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
            )}
            {loadingButton && <span>Saving Key</span>}
            {!loadingButton && <span>Save</span>}
          </button>
          <button onClick={Cancel} type="button" className="btn btn-primary" data-dismiss="modal">
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
}
