import React, { useEffect, useState, useRef } from "react";
import axios from 'axios'

import $ from 'jquery'


import "../styles/LoginAPI.css";

export default function LoginAPI(ac) {
  const [triggertryLogin, settriggertryLogin] = useState(0);
  const [triggerAllowLogin, settriggerAllowLogin] = useState(0);
  const [loading, setloading] = useState(false);
  const [errorMessageLogin, seterrorMessageLogin] = useState(null);
  const [errorMessValidation, seterrorMessValidation] = useState(null);





  //Authentication Request to Server

  const [signedIn, setsignedIn] = useState('auth');




  // readCookie Function checks if SignedIN or not
  const readCookie = async () => {
    try {
      const res = await axios.get('/read-cookie');

      if (res.data.signedIn !== undefined) {
        setsignedIn(res.data.signedIn);
      }
    } catch (e) {
      setsignedIn('auth');
      console.log('ReadCookie Error:', e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);



  // const { signedIn, setsignedIn } = props;

  const [data, setData] = useState();


  const getAuthStatus = async () => {
    try {
      const res = await axios.get('/get-auth-status');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }















  const handleLogin = () => {
    settriggertryLogin(triggertryLogin + 1);
    // seterrorMessageLogin(null);
    // seterrorMessValidation(null);
  };

  JSON.stringify({
    "X-Cisco-Meraki-API-Key": `${ac.inputConfKey}`,
    organizationId: `${ac.organizationID}`,
    networkId: `${ac.networkID}`,
  })





  // const isFirstTryLogin = useRef(true);
  // useEffect(() => {
  //   // const abortController = new AbortController()
  //   // const signal = abortController.signal
  //   if (isFirstTryLogin.current) {
  //     isFirstTryLogin.current = false;
  //     return;
  //   }
  //   const auth = async () => {
  //     // setloading(true);

  //     try {
  //       const res = await axios.get('/authenticate',
  //         { auth: { ciccio, pasticcio } })
  //       // const res = await axios.get('/authenticate',
  //       //   { auth: { 'user': `${ac.User}`, 'password': `${ac.Password}` } })
  //       // const res = await axios.get('/authenticate', { auth: [ac.User, ac.Password] });
  //       console.log("auth -> res", res)

  //       if (res.data.signedIn !== undefined) {
  //         setsignedIn(res.data.signedIn);

  //         console.log(res.data);
  //         // setloading(false);

  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }

  //   };
  //   auth();
  //   return () => {
  //     // abortController.abort()
  //     // console.log("cleanup -> abortController")
  //     ac.setAlertModalError([]);
  //     ac.setflashMessages([])
  //   }
  //   // eslint-disable-next-line
  // }, [triggertryLogin]);

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



  // const isFirstAllowLogin = useRef(true);
  // useEffect(() => {
  //   if (isFirstAllowLogin.current) {
  //     isFirstAllowLogin.current = false;
  //     return;
  //   }
  //   const AllowLogin = () => {
  //     if (ac.isSignedIn === true) {
  //       setTimeout(() => {
  //         ac.setswitchLoggedIn(true);
  //         ac.sethideLogin({ display: "none" });
  //         setloading(false);



  //       }, 2500);
  //     } else {
  //       setloading(false);
  //       seterrorMessageLogin(
  //         <div className="form-input-error-msg alert alert-danger">
  //           <span className="glyphicon glyphicon-exclamation-sign-login"></span>
  //           We are unable to complete your login please check your API key, your
  //           Internet connection or try again later
  //         </div>
  //       );
  //     }
  //   };
  //   AllowLogin();
  //   // eslint-disable-next-line
  // }, [triggerAllowLogin]);   //ac.getOrgStatusCode





  useEffect(() => {
    if (ac.isSignedIn) {
      $('.navbar-side').animate({ left: '0px' });
      $(this).removeClass('closed');
      $('#page-wrapper').animate({ 'margin-left': '260px' });
    } else {
      $(this).addClass('closed');
      $('.navbar-side').css({ left: '-260px' });
      $('#page-wrapper').css({ 'margin-left': '0px' });
    }
  }, [ac.isSignedIn])



  return (

    <div style={ac.hideLogin} className="container register">
      <div className="row">
        <div className="col-md-3 register-left">
          <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
          <h3>Welcome</h3>
          {/* <p>Please set your Meraki API key</p> */}

          <br />
        </div>
        <div className="col-md-9 register-right">
          <div className="tab-content" id="myTabContent">
            <div>
              <div className="row register-form">
                {errorMessageLogin && <span>{errorMessageLogin}</span>}
                {errorMessValidation && <span>{errorMessValidation}</span>}

                <div className="col-md-6">
                  {/* <form>
                    <div className="form-group">
                      <input
                        type="password"
                        required={true}
                        className="form-control"
                        placeholder="API key *"
                        value={ac.inputKey}
                        autoComplete="api"
                        onChange={(e) => ac.setinputKey(e.target.value)}
                      />
                    </div>
                  </form> */}
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

                  {/* <form>
                    <div className="form-group">
                      <input
                        type="password"
                        required={true}
                        className="form-control"
                        placeholder="Confirm API key *"
                        value={ac.dc.inputConfKey}
                        autoComplete="api"
                        onChange={(e) => ac.setinputConfKey(e.target.value)}
                      />
                    </div>
                  </form> */}
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
                  <button onClick={readCookie}>Get Data</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
