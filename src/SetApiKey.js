import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";

export default function SetApiKey(ac) {
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
            .post("/flask/post-api-key", {
              username: ac.User,
              realUsername: ac.User,
              apiKey: inputApiKey,
            })
            .then(() => {
              ac.setorganization("Set Organization");
              ac.setnetworkID(0);
              ac.setorganizationID(0);
              ac.setnetwork("Networks");
              ac.setshowSetApiKey(false);
              setloadingButton(false);
            });

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
    ac.setshowSetApiKey(false);
  };

  return (
    <Dialog open={true}>
      <div className="modal-content" style={{ width: "360px" }}>
        <div className="modal-header">
          <h4 className="modal-title" id="myModalLabel">
            Set API key
          </h4>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={Cancel}
          ></button>
        </div>
        <div className="modal-body" style={{ margin: "5px 15px 5px -2px" }}>
          <form>
            <input
              type="password"
              className="form-control"
              placeholder="API key"
              onChange={(e) => setinputApiKey(e.target.value)}
              name="api-key"
              id="api-key"
              required="required"
            />
          </form>
        </div>
        <div className="modal-footer" style={{ borderTop: "none" }}>
          <button onClick={Cancel} type="button" className="btn btn-primary" data-dismiss="modal">
            Cancel
          </button>
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
        </div>
      </div>
    </Dialog>
  );
}
