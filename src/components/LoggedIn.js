import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'

import { useHistory } from "react-router-dom";

import $ from 'jquery'
import "../styles/LoggedIn.css";

export default function LoggedIn(ac) {

  const [inputKey, setinputKey] = useState('')
  const [triggerLogin, settriggerLogin] = useState(0)
  console.log("LoggedIn -> inputKey", inputKey)


  // const postKey = () => {
  //   (async () => {
  //     const rawResponse = await fetch('/post-api-key', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ key: `${inputKey}` })
  //     })
  //       .then((res) => {
  //         return res.json;
  //       })
  //     const content = await rawResponse.json();
  //     console.log("postKey -> content", content)

  //   })();
  // }




  async function postKey() {

    const rawResponse = await fetch('/post-api-key', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: `${inputKey}` })
    })
    return await rawResponse.json();
  }

  async function getKey() {
    try {
      fetch('/get-api-key')
        .then(res => res.text())
        .then((data) => {
          console.log("getKey -> res", data)
          ac.dc.setapiKey(data)
        })
        .catch(error => console.log('An error occured ', error))
    } catch (e) {
      console.log('Error:', e);
    }
  }


  let history = useHistory();

  const isFirstSetKey = useRef(true);

  useEffect(() => {
    if (isFirstSetKey.current) {
      isFirstSetKey.current = false;
      return;
    }
    const handleLoginSuccess = () => {
      postKey()
        .then(() => getKey())
        .then(() =>
          ac.dc.setswitchLoggedIn(false),
          ac.dc.setswitchLoginAPI(false),
          ac.dc.setswitchDashboard(true),
          ac.dc.setswitchLoggedout(false),
          history.push('/home'),
          ac.dc.setcollapseButton({ display: 'block' }),
          $('.navbar-side').animate({ left: '0px' }),
          $(this).removeClass('closed'),
          $('#page-wrapper').animate({ 'margin-left': '260px' }),
        )

    };
    handleLoginSuccess()
  }, [triggerLogin])


  return (
    <div>
      <div id="myModal">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header">
              <div className="icon-box-login">
                <i className="material-icons">&#xE876;</i>
              </div>
              <h4 className="modal-title">Awesome!</h4>
            </div>
            <div className="modal-body">
              <div>
                <p>Please set your Meraki API key</p>
              </div>
              <div className="col-md-6">
                <form >
                  <div className="form-group">
                    <input
                      type="password"
                      required={true}
                      className="form-control"
                      placeholder="API key *"
                      value={inputKey}
                      autoComplete="api"
                      onChange={(e) => setinputKey(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => settriggerLogin(triggerLogin + 1)}
                className="btn btn-success btn-block"
                data-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
