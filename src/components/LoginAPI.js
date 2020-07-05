import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import $ from 'jquery'
import axios from 'axios'




import "../styles/LoginAPI.css";

export default function LoginAPI(ac) {
  const [triggertryLogin, settriggertryLogin] = useState(0);
  const [loading, setloading] = useState(false);
  const [errorMessageLogin, seterrorMessageLogin] = useState(null);

  let history = useHistory();


  // setCookie Function if successeful Login
  const setCookie = async () => {
    try {
      // eslint-disable-next-line
      const res = await axios.get('/set-cookie');

    } catch (e) {
    }
  };


  // readCookie Function checks if SignedIN or not
  const readCookie = async () => {
    try {
      const res = await axios.get('/read-cookie');

      if (res.data.signedIn === true) {
        ac.setisSignedIn(res.data.signedIn);

      } else {
        history.push('/login')
        $(this).addClass('closed');
        $('.navbar-side').css({ left: '-260px' });
        $('#page-wrapper').css({ 'margin-left': '0px' });
      }
    } catch (e) {
      ac.setisSignedIn(false);
    }
  };

  useEffect(() => {
    readCookie();
    // eslint-disable-next-line
  }, []);



  const handleLogin = () => {
    settriggertryLogin(triggertryLogin + 1);

  };

  JSON.stringify({
    "X-Cisco-Meraki-API-Key": `${ac.inputConfKey}`,
    organizationId: `${ac.organizationID}`,
    networkId: `${ac.networkID}`,
  })


  //Authentication Request to Server

  const isFirstTryLogin = useRef(true);
  useEffect(() => {

    const abortController = new AbortController()
    const signal = abortController.signal
    if (isFirstTryLogin.current) {
      isFirstTryLogin.current = false;
      return;
    }
    const auth = async () => {
      setloading(true);

      let username = ac.User
      let password = ac.Password
      try {
        const res = await axios.post('/authenticate',
          { "username": `${username}`, "password": `${password}` }, { signal: signal }
        );

        //simulate delay
        setTimeout(() => {
          if (res.data === 'Allowed') {
            ac.sethideLogin({ display: "none" });
            setCookie()
            ac.setswitchLoggedIn(true)
            ac.setisSignedIn(res.data.signedIn)
            setloading(false)
          } else {
            setloading(false);
            seterrorMessageLogin(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign-login"></span>
                {res.data}: We are unable to complete your login please check your username and password, your
              Internet connection or try again later
            </div>
            );
          }
        }, 1500);
      } catch (e) {
        setloading(false);
        seterrorMessageLogin(
          <div className="form-input-error-msg alert alert-danger">
            <span className="glyphicon glyphicon-exclamation-sign-login"></span>
            We are unable to complete your login please check your username and password, your
            Internet connection or try again later
          </div>
        );
        console.log(e);
      }
    };
    auth()
    return () => {
      abortController.abort()
      console.log("cleanup -> abortController")
      seterrorMessageLogin([])
      ac.setAlertModalError([]);
      ac.setflashMessages([])
    }
    // eslint-disable-next-line
  }, [triggertryLogin])


  //style={ac.hideLogin}

  return (

    <div style={ac.hideLogin} className="container register">
      <div className="row">
        <div className="col-md-3 register-left">
          <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
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
                        onChange={e => ac.setUser(e.target.value)}
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
                        onChange={e => ac.setPassword(e.target.value)}
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
