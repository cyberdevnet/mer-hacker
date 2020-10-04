import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
// eslint-disable-next-line
import axios from "axios";
import { useForm } from "react-hook-form";
import "../../styles/SettingsCreateUser.css";

//<===========================================================>
//UNDER DEVELOPMENT

export default function ForgotPassword(ac) {
  // eslint-disable-next-line
  const [newEmail, setnewEmail] = useState([]);
  // eslint-disable-next-line
  const [newUser, setnewUser] = useState([]);
  // eslint-disable-next-line
  const [loading, setloading] = useState(false);
  // eslint-disable-next-line
  const [isRegistredUserError, setisRegistredUserError] = useState([]);
  // eslint-disable-next-line
  const [showRegistredUserError, setshowRegistredUserError] = useState(false);
  // eslint-disable-next-line
  const [isRegistredEmailError, setisRegistredEmailError] = useState([]);
  // eslint-disable-next-line
  const [showRegistredEmailError, setshowRegistredEmailError] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const handleModal = () => {
    ac.setshowforgotPasswordModal(false);
  };

  const handleSendEmail = () => {};

  const setUser = (e) => {
    e.preventDefault();
    setnewUser(e.target.value);
  };

  const setEmail = (e) => {
    e.preventDefault();
    setnewEmail(e.target.value);
  };

  return (
    <Dialog fullWidth open={true}>
      <div className="modal-header">
        <button
          onClick={handleModal}
          type="button"
          className="close"
          data-dismiss="modal"
          aria-hidden="true"
        >
          <span>&times;</span>
        </button>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit(handleSendEmail)} autoComplete="off">
          <div class="text-center">
            <h3>
              <i class="fa fa-lock fa-4x"></i>
            </h3>
            <h2 class="text-center">Forgot Password?</h2>
            <p>You can reset your password here.</p>

            <div class="panel-body">
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) => setUser(e)}
                  type="text"
                  name="username"
                  ref={register({
                    // pattern: /[A-Za-z]/,
                    pattern: {
                      value: /[A-Za-z]$/i,
                      message: "Username can contain only letters",
                    },
                    required: "Field is required",
                    minLength: {
                      value: 5,
                      message: "Username min length 5 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Username max length 15 characters",
                    },
                  })}
                />
                {errors.username && (
                  <span className="form-validation-error">
                    {errors.username.message}
                  </span>
                )}
                <span className="form-validation-error">
                  {showRegistredUserError ? (
                    `${isRegistredUserError}`
                  ) : (
                    <div></div>
                  )}
                </span>
              </div>
              <div class="form-group">
                <input
                  className="form-control"
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e)}
                  type="email"
                  name="email"
                  ref={register({
                    pattern: {
                      // eslint-disable-next-line
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Not a valid e-mail type",
                    },
                    required: "Field is required",
                  })}
                />
                {errors.email && (
                  <span className="form-validation-error">
                    {errors.email.message}
                  </span>
                )}
                <span className="form-validation-error">
                  {showRegistredEmailError ? (
                    `${isRegistredEmailError}`
                  ) : (
                    <div></div>
                  )}
                </span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block btn-lg"
          >
            {loading && (
              <i
                className="fa fa-refresh fa-spin"
                style={{ marginRight: "5px" }}
              />
            )}
            {loading && <span>Send my Password</span>}
            {!loading && <span>Send my Password</span>}
          </button>
        </form>
      </div>
    </Dialog>
  );
}
