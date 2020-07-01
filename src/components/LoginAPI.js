import React, { useEffect, useState, useRef } from "react";
import $ from 'jquery'


import "../styles/LoginAPI.css";

export default function LoginAPI(ac) {
  const [trigger, settrigger] = useState(0);
  const [loading, setloading] = useState(false);
  const [errorMessageLogin, seterrorMessageLogin] = useState(null);
  const [errorMessValidation, seterrorMessValidation] = useState(null);



  const isFirstTryLogin = useRef(true);
  useEffect(() => {
    if (isFirstTryLogin.current) {
      isFirstTryLogin.current = false;
      return;
    }
    const TryLogin = () => {
      if (ac.dc.inputKey === ac.dc.inputConfKey && ac.dc.inputKey !== "") {
        setloading(true);
        ac.dc.setapiKey(ac.dc.inputConfKey);
        ac.dc.settriggerGetOrg(ac.dc.triggerGetOrg + 1);
      } else {
        setloading(false);
        seterrorMessValidation(
          <div className="form-input-error-msg alert alert-danger">
            <span className="glyphicon glyphicon-exclamation-sign-login"></span>
            Please check if your key matchs and try again.
          </div>
        );
      }
    };
    TryLogin();
    // eslint-disable-next-line
  }, [trigger]);

  const isFirstAllowLogin = useRef(true);
  useEffect(() => {
    if (isFirstAllowLogin.current) {
      isFirstAllowLogin.current = false;
      return;
    }
    const AllowLogin = () => {
      if (ac.dc.getOrgStatusCode === 200) {
        setTimeout(() => {
          ac.dc.setisLoggedIn(true);
          ac.dc.setswitchLoggedIn(true);
          ac.dc.sethideLogin({ display: "none" });
          setloading(false);
        }, 2500);
      } else {
        setloading(false);
        seterrorMessageLogin(
          <div className="form-input-error-msg alert alert-danger">
            <span className="glyphicon glyphicon-exclamation-sign-login"></span>
            We are unable to complete your login please check your API key, your
            Internet connection or try again later
          </div>
        );
      }
    };
    AllowLogin();
    // eslint-disable-next-line
  }, [ac.dc.getOrgStatusCode]);

  const handleLogin = () => {
    settrigger(trigger + 1);
    seterrorMessageLogin(null);
    seterrorMessValidation(null);
  };



  useEffect(() => {
    if (ac.dc.isLoggedIn) {
      $('.navbar-side').animate({ left: '0px' });
      $(this).removeClass('closed');
      $('#page-wrapper').animate({ 'margin-left': '260px' });
    } else {
      $(this).addClass('closed');
      $('.navbar-side').css({ left: '-260px' });
      $('#page-wrapper').css({ 'margin-left': '0px' });
    }
  }, [])



  return (

    <div style={ac.dc.hideLogin} className="container register">
      <div className="row">
        <div className="col-md-3 register-left">
          <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
          <h3>Welcome</h3>
          <p>Please set your Meraki API key</p>

          <br />
        </div>
        <div className="col-md-9 register-right">
          <div className="tab-content" id="myTabContent">
            <div>
              <div className="row register-form">
                {errorMessageLogin && <span>{errorMessageLogin}</span>}
                {errorMessValidation && <span>{errorMessValidation}</span>}

                <div className="col-md-6">
                  <form>
                    <div className="form-group">
                      <input
                        type="password"
                        required={true}
                        className="form-control"
                        placeholder="API key *"
                        value={ac.dc.inputKey}
                        autoComplete="api"
                        onChange={(e) => ac.dc.setinputKey(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="col-md-6">

                  <form>
                    <div className="form-group">
                      <input
                        type="password"
                        required={true}
                        className="form-control"
                        placeholder="Confirm API key *"
                        value={ac.dc.inputConfKey}
                        autoComplete="api"
                        onChange={(e) => ac.dc.setinputConfKey(e.target.value)}
                      />
                    </div>
                  </form>
                  <button
                    onClick={!loading ? handleLogin : null}
                    disabled={loading}
                    className="btnRegister"
                  >
                    {loading && (
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                      />
                    )}
                    {loading && <span>Login</span>}
                    {!loading && <span>Login</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
