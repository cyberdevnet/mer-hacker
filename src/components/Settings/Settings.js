import React, { useEffect, useState } from "react";
import axios from "axios";
import SettingsAlertsModal from "./SettingsAlertModal";
import SettingsCreateUser from "./SettingsCreateUser";
import SettingsDeleteUser from "./SettingsDeleteUser";
import SettingsEditUser from "./SettingsEditUser";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "../../styles/Settings.css";
// import "../../styles/Settings.css";

export default function Settings(ac) {
  const [showtable, setshowtable] = useState(false);
  const [showtablesessions, setshowtablesessions] = useState(false);
  const [allUsers, setallUsers] = useState([]);
  const [allSessions, setallSessions] = useState([]);
  const [triggerSessions, settriggerSessions] = useState(0);
  const [triggerUsers, settriggerUsers] = useState(0);
  const [AlertModalError, setAlertModalError] = useState([]);
  const [AlertDeleteError, setAlertDeleteError] = useState([]);
  const [switchAlertModal, setswitchAlertModal] = useState(false);
  const [switchCreateUser, setswitchCreateUser] = useState(false);
  const [switchDeleteUser, setswitchDeleteUser] = useState(false);
  const [switchEditUser, setswitchEditUser] = useState(false);
  const [sessionID, setsessionID] = useState([]);
  const [userID, setuserID] = useState([]);
  const [isAdminUser, setisAdminUser] = useState(false);
  const [buttonStyle, setbuttonStyle] = useState({ display: "block" });

  useEffect(() => {
    async function GetAllUsers() {
      fetch("/node/get-all-users", {
        method: ["POST"],
        cache: "no-cache",
        headers: {
          content_type: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            ac.setflashMessages(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {data.error[0]}
              </div>
            );
          } else {
            let userData = [];
            let row = [];
            //eslint-disable-next-line
            data.map((item) => {
              var rowModel = {
                username: item.username,
                apiKey: item.apiKey,
                id: item._id,
                signed: item.signed,
              };
              row.push(rowModel);
              userData.push(rowModel);
              setallUsers({ ...columns, rows: row });
            });
          }
        })
        .then(() => setshowtable(true));
    }

    GetAllUsers();
    return () => {
      //   ac.setclientList([]);
      setshowtable(false);
    };
    // eslint-disable-next-line
  }, [triggerUsers, triggerSessions]);

  useEffect(() => {
    async function GetAllSessions() {
      setshowtablesessions(false);
      fetch("/node/get-all-sessions", {
        method: ["POST"],
        cache: "no-cache",
        headers: {
          content_type: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            ac.setflashMessages(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {data.error[0]}
              </div>
            );
          } else {
            let userSessions = [];
            let row = [];
            //eslint-disable-next-line
            data.map((item) => {
              let sessions = JSON.parse(item.session);
              let ExpDate = item.expires.split("(Coor")[0];
              var rowModel = {
                username: sessions.user,
                sessionID: item._id,
                expires: ExpDate,
              };
              row.push(rowModel);
              userSessions.push(rowModel);
              setallSessions({ ...columns, rows: row });
            });
          }
        })
        .then(() => setshowtablesessions(true));
    }

    GetAllSessions();
    return () => {
      //   ac.setclientList([]);
      setshowtable(false);
    };
    // eslint-disable-next-line
  }, [triggerSessions]);

  const columns = [
    {
      dataField: "username",
      text: "Username",
      editable: false,
      key: "username",
      sort: false,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "id",
      text: "User ID",
      editable: false,
      key: "id",
      sort: false,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "apiKey",
      text: "API Key",
      editable: false,
      key: "apiKey",
      sort: false,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "signed",
      text: "Signed",
      editable: false,
      key: "signed",
      sort: false,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "options",
      text: "options",
      editable: false,
      key: "options",
      sort: false,
      formatter: rankFormatterUsers,
      headerStyle: (colum, colIndex) => {
        return { width: "100px", textAlign: "center" };
      },
    },
  ];
  const columnsSessions = [
    {
      dataField: "username",
      text: "Username",
      editable: false,
      key: "username",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "sessionID",
      text: "Session ID",
      editable: false,
      key: "sessionID",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "expires",
      text: "Expiration Date",
      editable: false,
      key: "expires",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "options",
      text: "options",
      editable: false,
      key: "options",
      sort: false,
      formatter: rankFormatterSessions,
      headerStyle: (colum, colIndex) => {
        return { width: "100px", textAlign: "center" };
      },
    },
  ];

  function rankFormatterUsers(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{ textAlign: "center", cursor: "pointer", lineHeight: "normal" }}
      >
        <i
          className="fas fa-edit"
          style={{ marginRight: "15px" }}
          onClick={() => editUser(row)}
        ></i>
        <i className="far fa-trash-alt" onClick={() => deleteUser(row)}></i>
      </div>
    );
  }

  function rankFormatterSessions(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{ textAlign: "center", cursor: "pointer", lineHeight: "normal" }}
      >
        <i className="far fa-trash-alt" onClick={() => deleteSession(row)}></i>
      </div>
    );
  }

  const deleteSession = (row) => {
    if (row.username === ac.User) {
      setsessionID(row.sessionID);

      setswitchAlertModal(true);
      setAlertModalError(`Are you sure you want to clear your own session?`);
    } else {
      setsessionID(row.sessionID);
      setswitchAlertModal(true);
      setAlertModalError(
        `Are you sure you want to clear the session for user ${row.username}?`
      );
    }
  };

  const deleteUser = (row) => {
    if (row.username === "admin") {
      setisAdminUser(true);
      setbuttonStyle({ display: "none" });
      setuserID(row.id);
      setswitchDeleteUser(true);
      setAlertDeleteError(`admin user cannot be deleted!`);
    } else {
      setuserID(row.id);
      setswitchDeleteUser(true);

      setAlertDeleteError(
        `Are you sure you want to delete the user ${row.username}?`
      );
    }
  };

  const editUser = (row) => {
    if (row.username === "admin") {
      setisAdminUser(true);
      setbuttonStyle({ display: "none" });
      setuserID(row.id);
      setswitchEditUser(true);
      setAlertDeleteError(`admin user cannot be deleted!`);
    } else {
      setuserID(row.id);
      setswitchEditUser(true);

      setAlertDeleteError(
        `Are you sure you want to delete the user ${row.username}?`
      );
    }
  };

  const dc = {
    AlertModalError,
    setAlertModalError,
    switchAlertModal,
    setswitchAlertModal,
    triggerSessions,
    settriggerSessions,
    triggerUsers,
    settriggerUsers,
    sessionID,
    setsessionID,
    switchCreateUser,
    setswitchCreateUser,
    AlertDeleteError,
    setAlertDeleteError,
    switchDeleteUser,
    setswitchDeleteUser,
    switchEditUser,
    setswitchEditUser,
    userID,
    setuserID,
    isAdminUser,
    setisAdminUser,
    buttonStyle,
    setbuttonStyle,
  };

  return (
    <div id="page-inner-main-templates">
      {switchAlertModal ? (
        <SettingsAlertsModal {...ac.dc} dc={dc} />
      ) : (
        <div></div>
      )}
      {switchCreateUser ? (
        <SettingsCreateUser {...ac.dc} dc={dc} />
      ) : (
        <div></div>
      )}
      {switchDeleteUser ? (
        <SettingsDeleteUser {...ac.dc} dc={dc} />
      ) : (
        <div></div>
      )}
      {switchEditUser ? <SettingsEditUser {...ac.dc} dc={dc} /> : <div></div>}
      <div className="col-xs-12">
        <div className="panel-debug panel-default">
          <div className="panel-body">
            <i style={{ color: "#337ab7" }} className="fas fa-users"></i> Users
            <i
              style={{
                float: "right",
                fontSize: "21px",
                color: "#337ab7",
                cursor: "pointer",
              }}
              className="fas fa-user-plus"
              onClick={() => setswitchCreateUser(true)}
            ></i>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 settings">
          <div className="panel panel-default">
            {showtable ? (
              <div>
                <div className="bootstrap-table-panel">
                  <ToolkitProvider
                    search
                    keyField="username"
                    data={allUsers.rows}
                    columns={columns}
                  >
                    {(props) => (
                      <div>
                        <BootstrapTable {...props.baseProps} striped hover />
                      </div>
                    )}
                  </ToolkitProvider>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <div className="col-xs-12">
        <div className="panel-debug panel-default">
          <div className="panel-body">
            <i style={{ color: "#337ab7" }} className="far fa-clock"></i> Active
            Sessions
            <i
              style={{
                float: "right",
                fontSize: "17px",
                color: "#337ab7",
                cursor: "pointer",
              }}
              class="fa fa-refresh"
              aria-hidden="true"
              onClick={() => settriggerSessions(triggerSessions + 1)}
            ></i>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 settings">
          <div className="panel panel-default">
            {showtablesessions ? (
              <div>
                <div className="bootstrap-table-panel">
                  <ToolkitProvider
                    search
                    keyField="username"
                    data={allSessions.rows}
                    columns={columnsSessions}
                  >
                    {(props) => (
                      <div>
                        <BootstrapTable {...props.baseProps} striped hover />
                      </div>
                    )}
                  </ToolkitProvider>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
