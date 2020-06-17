import React from "react";
import "../styles/ChangeApiKey.css";

export default function ChangeApiKey(ac) {
  return (
    <div className="container register">
      <div className="row">
        <div className="col-md-3 register-left">
          <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
          <h3>Hi</h3>
          <p>You are already logged in</p>
          <p>Click here to change you API Key</p>
          <br />
        </div>
        <div className="col-md-9 register-right">
          <div className="tab-content" id="myTabContent">
            <div>
              <div className="row register-form">
                <div className="col-md-6">
                  <input
                    // onClick={handleLogin}
                    type="submit"
                    className="btnRegister"
                    value="Login"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
