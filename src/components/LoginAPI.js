import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import $ from 'jquery'
import axios from 'axios'




import "../styles/LoginAPI.css";

export default function LoginAPI(ac) {
  const [triggertryLogin, settriggertryLogin] = useState(0);
  const [loading, setloading] = useState(false);
  const [errorMessageLogin, seterrorMessageLogin] = useState(null);
  const [errorMessValidation, seterrorMessValidation] = useState(null);

  const [keyTest, setkeyTest] = useState('')



  const postKey = () => {
    (async () => {
      const rawResponse = await fetch('/post-api-key', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: `${keyTest}` })
      });
      const content = await rawResponse.json();
      console.log("postKey -> content", content)

    })();
  }

  async function getKey() {
    try {
      fetch('/get-api-key')
        .then(res => res.text())
        .then((data) => {
          console.log("getKey -> res", data)
          ac.setapiKey(data)
        })
        .catch(error => console.log('An error occured ', error))
    } catch (e) {
      console.log('Error:', e);
    }
  }



  let history = useHistory();


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
      console.log('ReadCookie Error:', e);
    }
  };

  useEffect(() => {
    readCookie();
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
        const res = await axios.get('/authenticate', { auth: { username, password } });

        if (res.data.signedIn === true) {
          ac.setisSignedIn(res.data.signedIn);

          ac.setswitchLoggedIn(true);
          ac.sethideLogin({ display: "none" });
          setloading(false);
          // settriggerAllowLogin(triggerAllowLogin + 1)

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
      } catch (e) {
        setloading(false);
        seterrorMessageLogin(
          <div className="form-input-error-msg alert alert-danger">
            <span className="glyphicon glyphicon-exclamation-sign-login"></span>
            We are unable to complete your login please check your API key, your
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
  }, [triggertryLogin])




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
                {errorMessValidation && <span>{errorMessValidation}</span>}

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
