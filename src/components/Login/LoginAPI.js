import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";
import AlreadyisSignedInModal from "../AlreadyisSignedInModal";
import "../../styles/LoginAPI.css";

export default function LoginAPI(ac) {
  const [triggertryLogin, settriggertryLogin] = useState(0);
  const [triggerAlreadyisSignedIn, settriggerAlreadyisSignedIn] = useState(0);
  const [loading, setloading] = useState(false);

  const [errorMessageLogin, seterrorMessageLogin] = useState(null);

  let history = useHistory();

  axios.defaults.withCredentials = true;


  // setCookie Function if successeful Login
  const setCookie = async () => {
    try {
      // eslint-disable-next-line
      const res = await axios.post("/node/set-cookie", { user: ac.User });
      ac.setisSignedIn(true);
    } catch (e) {}
  };

  // readCookie Function checks if SignedIN or not
  const readCookie = async () => {
    try {
            // eslint-disable-next-line
      const res = await axios.post("/node/read-cookie", { username: ac.User, isSignedIn: ac.isSignedIn }  )
        .then((res) => {
          if (res.data.signedIn === true) {
            ac.setisSignedIn(true);
            history.push("/home");
          } else {
            ac.setisSignedIn(false);
            history.push("/login");
            $(this).addClass("closed");
            $(".navbar-side").css({ left: "-260px" });
            $("#page-wrapper").css({ "margin-left": "0px" });
          }
        });
    } catch (e) {
      ac.setisSignedIn(false);
    }
  };

  useEffect(() => {
    readCookie();
    // eslint-disable-next-line
  }, []);

  // function used to upload a Mock backup file on the xpress server
  const UploadMockBackupFile = async (data) => {
    const formData = new FormData();
    const blob = new Blob(["this is\na mock file"], { type: "text/plain" });
    formData.append("backup", blob, "backup.txt");

    await fetch("/node/upload_backupfile", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  };

  const setUser = (e) => {    
    e.preventDefault();
    ac.setUser(e.target.value);
  };

  const setPass = (e) => {
    e.preventDefault();
    ac.setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (ac.User && ac.Password.length > 0) {
      settriggerAlreadyisSignedIn(triggerAlreadyisSignedIn + 1);
    }
  };

  const handleLoginEnter = (e) => {
    if (ac.User && ac.Password.length > 0) {
      if (e.key === "Enter") {
        settriggerAlreadyisSignedIn(triggerAlreadyisSignedIn + 1);
      }
    }
  };

  JSON.stringify({
    "X-Cisco-Meraki-API-Key": `${ac.inputConfKey}`,
    organizationId: `${ac.organizationID}`,
    networkId: `${ac.networkID}`,
  });

  const isFirstAlreadyisSignedIn = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    if (isFirstAlreadyisSignedIn.current) {
      isFirstAlreadyisSignedIn.current = false;
      return;
    }
    async function AlreadyisSignedIn() {
      fetch("/node/get-AlreadyisSignedIn", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: `${ac.User}` }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let response = data.signed;

          if (response === true) {
            // deny login because another user is using the application
            ac.setshowAlreadyisSignedInModal(true);
            ac.setPassword([]);
          } else if (response === false) {
            //no another user is using the application, trigger the real Login
            settriggertryLogin(triggertryLogin + 1);
          }
        });
    }
    AlreadyisSignedIn();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [triggerAlreadyisSignedIn]);

  //Authentication Request to Server

  const isFirstTryLogin = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstTryLogin.current) {
      isFirstTryLogin.current = false;
      return;
    }
    const auth = async () => {
      setloading(true);

      let username = ac.User;
      let password = ac.Password;
      try {
        const res = await axios.post(
          "/node/authenticate",
          { username: `${username}`, password: `${password}` },
          { signal: signal }
        );

        //simulate delay
        setTimeout(() => {
          if (res.data.auth === true) {
            UploadMockBackupFile();
            ac.setisUsingADauth(res.data.isUsingADauth);;
            ac.sethideLogin({ display: "none" });
            setCookie();
            ac.setswitchLoggedIn(true);
            setloading(false);
          } else {
            setloading(false);
            seterrorMessageLogin(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign-login"></span>
                We are unable to complete your login please check your username and
                password, your Internet connection or try again later
              </div>
            );
            ac.setPassword([]);
          }
        }, 1500);
      } catch (e) {
        setloading(false);
        seterrorMessageLogin(
          <div className="form-input-error-msg alert alert-danger">
            <span className="glyphicon glyphicon-exclamation-sign-login"></span>
            We are unable to complete your login please check your username and
            password, your Internet connection or try again later
          </div>
        );
        ac.setPassword([]);

        console.log(e);
      }
    };
    auth();
    return () => {
      abortController.abort();
      seterrorMessageLogin([]);
      ac.setAlertModalError([]);
      ac.setflashMessages([]);
    };
    // eslint-disable-next-line
  }, [triggertryLogin]);

  let dc = { triggertryLogin, settriggertryLogin };

  return (
    <div style={ac.hideLogin} className="container register">
      {ac.showAlreadyisSignedInModal ? (
        <AlreadyisSignedInModal {...ac} dc={dc} />
      ) : (
        <div></div>
      )}
      {ac.showforgotPasswordModal ? (
        <ForgotPassword {...ac} dc={dc} />
      ) : (
        <div></div>
      )}
      <div className="row">
        <div className="col-md-3 register-left">
          <img
            src="https://i.ibb.co/1XQKfyd/Mer-Haker-white.png"
            alt="Mer-Haker-big"
            style={{ width: "230px" }}
          />
          {/* <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" /> */}
          <h3>Welcome</h3>
          <br />
        </div>
        <div className="col-md-9 register-right">
          <div className="tab-content" id="myTabContent">
            <div>
              <div className="row register-form">
                {errorMessageLogin && <span>{errorMessageLogin}</span>}
                <div className="col-md-6">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        required={true}
                        className="form-control"
                        placeholder="Username"
                        value={ac.User}
                        autoComplete="User"
                        onChange={(e) => setUser(e)}
                        onKeyDown={(e) => {
                          e.key === "Enter" && e.preventDefault(e);
                          handleLoginEnter(e);
                        }}
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
                        placeholder="Password"
                        value={ac.Password}
                        autoComplete="Password"
                        onChange={(e) => setPass(e)}
                        onKeyDown={(e) => {
                          e.key === "Enter" && e.preventDefault(e);
                          handleLoginEnter(e);
                        }}
                      />
                    </div>
                  </form>
                  {/* <===========================================================>
                                        UNDER DEVELOPMENT
                  <button
                    onClick={() => ac.setshowforgotPasswordModal(true)}
                    type="submit"
                    className="link-button-forgot-password"
                  >
                    Forgot password?
                  </button> */}
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
