import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import axios from "axios";

export default function Step3Template(ac) {
  const [triggerGetTemplates, settriggerGetTemplates] = useState(0);
  const [triggerBindTemplate, settriggerBindTemplate] = useState(0);
  const [loadingTemplates, setloadingTemplates] = useState(false);
  const [loadingBindBtn, setloadingBindBtn] = useState(false);
  const [alertError, setalertError] = useState([]);

  const ALLTEMPLATES = ac.dc.templatesList.map((opt, index) => ({
    label: opt.name,
    value: index,
    id: opt.id,
  }));

  function HandleTemplates(opt) {
    ac.dc.settemplateSelected(opt.label);
    ac.dc.setconfigTemplateId(opt.id);
    ac.dc.setisTemplateSelected(true);
  }

  const isFirstRungetTemplates = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRungetTemplates.current) {
      isFirstRungetTemplates.current = false;
      return;
    }

    async function getTemplates() {
      setloadingTemplates(true);
      await axios.post("/flask/get-api-key", { username: ac.User }).then((data) => {
        let key = data.data.apiKey;
        fetch("/flask/getTemplates", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify({
            "X-Cisco-Meraki-API-Key": `${key}`,
            organizationId: `${ac.organizationID}`,
          }),
        }).then((response) => {
          return response.json;
        });
        fetch("/flask/getTemplates", { signal: signal })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.error) {
              setalertError(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error}
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
              setloadingTemplates(false);
            } else {
              ac.dc.settemplatesList(data.getTemplates);
              setloadingTemplates(false);
            }
          });
      });
    }
    getTemplates();
    return () => {
      abortController.abort();
      setloadingTemplates(false);
    };
    // eslint-disable-next-line
  }, [triggerGetTemplates]);

  const isFirstRunbindTemplate = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunbindTemplate.current) {
      isFirstRunbindTemplate.current = false;
      return;
    }

    async function bindTemplate() {
      setloadingBindBtn(true);
      await axios.post("/flask/get-api-key", { username: ac.User }).then((data) => {
        let key = data.data.apiKey;
        fetch("/flask/bindTemplate", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify({
            "X-Cisco-Meraki-API-Key": `${key}`,
            network_id: `${ac.dc.networkIDSelected}`,
            config_template_id: `${ac.dc.configTemplateId}`,
          }),
        }).then((response) => {
          return response.json;
        });
        fetch("/flask/bindTemplate", { signal: signal })
          .then((res) => {
            if (res.status === 500) {
              setloadingBindBtn(false);
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
                  {data.error}
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
              setloadingBindBtn(false);
            } else {
              ac.dc.setnextStepDisabled(false);
              setalertError(
                <div className="form-input-error-msg alert alert-success">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {`Network ${ac.dc.networkSelected} bound to Template ${ac.dc.templateSelected}`}
                </div>
              );
              setTimeout(() => {
                setalertError([]);
              }, 6000);
              setloadingBindBtn(false);
            }
          });
      });
    }
    bindTemplate();
    return () => {
      abortController.abort();
      setloadingBindBtn(false);
    };
    // eslint-disable-next-line
  }, [triggerBindTemplate]);

  function HandleBind() {
    settriggerBindTemplate(triggerBindTemplate + 1);
  }

  return (
    <div className="row-inventory">
      <div className="card">
        <div className="card-body" style={{ minHeight: "400px" }}>
          <form style={{ float: "left" }}>
            <label htmlFor="bind">Bind Network to template</label>
            <div className="form-group" style={{ marginBottom: "70px" }}>
              <Select
                className="select_network_stepzilla"
                isLoading={loadingTemplates}
                options={ALLTEMPLATES}
                placeholder="Select Template"
                onChange={HandleTemplates}
                onMenuOpen={() => settriggerGetTemplates(triggerGetTemplates + 1)}
                classNamePrefix="time-interval"
              />
            </div>
          </form>
        </div>
        <div>
          {ac.dc.templateSelected.length === 0 ? (
            <button
              className="btn-summary btn-primary"
              disabled={true}
              style={{
                position: "relative",
                bottom: "45px",
                right: "10px",
                backgroundColor: "#337ab79c",
                borderColor: "transparent",
              }}
            >
              Bind to Template
            </button>
          ) : (
            <button
              onClick={HandleBind}
              className="btn-summary btn-primary"
              disabled={loadingBindBtn}
              style={{ position: "relative", bottom: "45px", right: "10px" }}
            >
              {loadingBindBtn && (
                <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
              )}
              {loadingBindBtn && <span>Bind to Template</span>}
              {!loadingBindBtn && <span>Bind to Template</span>}
            </button>
          )}
        </div>
        {alertError}
      </div>
    </div>
  );
}
