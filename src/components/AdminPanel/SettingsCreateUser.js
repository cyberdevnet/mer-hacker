import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import { useForm } from "react-hook-form";
import "../../styles/SettingsCreateUser.css";

export default function SettingsCreateUser(ac) {
  const [newUser, setnewUser] = useState([]);
  const [newPassword, setnewPassword] = useState([]);
  const [newEmail, setnewEmail] = useState([]);
  const [loading, setloading] = useState(false);
  const [isRegistredUserError, setisRegistredUserError] = useState([]);
  const [showRegistredUserError, setshowRegistredUserError] = useState(false);
  const [isRegistredEmailError, setisRegistredEmailError] = useState([]);
  const [showRegistredEmailError, setshowRegistredEmailError] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const handleModal = () => {
    ac.dc.setswitchCreateUser(false);
  };

  const handleCreateUser = () => {
    setloading(true);
    let AllUsers = [];
    let AllEmails = [];

    axios.post("/node/get-all-users", {}).then((res) => {
      // eslint-disable-next-line
      res.data.map((opt) => {
        AllUsers.push(opt.username);
        AllEmails.push(opt.email);
      });

      let isRegistredUser = AllUsers.indexOf(newUser);
      let isRegistredEmail = AllEmails.indexOf(newEmail);

      if (isRegistredUser === -1) {
        if (isRegistredEmail === -1) {
          if (newUser !== "admin") {
            setTimeout(() => {
              axios.post("/node/hash-users", {
                username: newUser,
                email: newEmail,
                password: newPassword,
                apiKey: "tzu",
                signed: "false",
              });
              setloading(false);
              ac.dc.setswitchCreateUser(false);
              ac.dc.settriggerSessions(ac.dc.triggerSessions + 1);
              ac.dc.settriggerUsers(ac.dc.triggerUsers + 1);
            }, 3000);
          } else {
            setisRegistredUserError("This username is not available");
            setshowRegistredUserError(true);
            setloading(false);
          }
        } else {
          setisRegistredEmailError(
            "The email address is already taken. Please choose another one."
          );
          setshowRegistredEmailError(true);
          setloading(false);
        }
      } else {
        setisRegistredUserError("This username is not available");
        setshowRegistredUserError(true);
        setloading(false);
      }
    });
  };

  const setUser = (e) => {
    e.preventDefault();
    setnewUser(e.target.value);
  };
  const setEmail = (e) => {
    e.preventDefault();
    setnewEmail(e.target.value);
  };

  const setPass = (e) => {
    e.preventDefault();
    setnewPassword(e.target.value);
  };

  return (
    <Dialog open={true}>
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
        <form onSubmit={handleSubmit(handleCreateUser)} autoComplete="off">
          <div className="avatar">
            <i className="material-icons">&#xE7FF;</i>
          </div>
          <h4 className="modal-title">Create User</h4>
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
              {showRegistredUserError ? `${isRegistredUserError}` : <div></div>}
            </span>
          </div>
          <div className="form-group">
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
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPass(e)}
              type="password"
              name="password"
              ref={register({
                pattern: {
                  value: /(?=.*[!@#$%&*])/,
                  message:
                    "Password must contain at least one special characters(!@#$%&*)",
                },
                required: "Field is required",
                minLength: {
                  value: 5,
                  message: "Password min length 5 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Password max length 15 characters",
                },
              })}
            />
            {errors.password && (
              <span className="form-validation-error">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            // onClick={!loading ? handleCreateUser : null}
            disabled={loading}
            className="btn btn-primary btn-block btn-lg"
          >
            {loading && (
              <i
                className="fa fa-refresh fa-spin"
                style={{ marginRight: "5px" }}
              />
            )}
            {loading && <span>Submit</span>}
            {!loading && <span>Submit</span>}
          </button>
        </form>
      </div>
    </Dialog>
  );
}
