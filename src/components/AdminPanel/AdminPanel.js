import React, { useEffect, useState } from "react";
import axios from "axios";
import SettingsAlertsModal from "./SettingsAlertModal";
import SettingsCreateUser from "./SettingsCreateUser";
import SettingsDeleteUser from "./SettingsDeleteUser";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "../../styles/Settings.css";

export default function AdminPanel(ac) {
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
  const [sessionID, setsessionID] = useState([]);
  const [userID, setuserID] = useState([]);
  const [isAdminUser, setisAdminUser] = useState(false);
  const [buttonStyle, setbuttonStyle] = useState({ display: "block" });
  const [notEditableUsers, setnotEditableUsers] = useState([]);


  const Axios = axios.create({
    withCredentials: true,
  });


  useEffect(() => {
    async function GetAllUsers() {
      let users = [];

      //If AD Auth i used this function never gets fired
      if (ac.isUsingADauth) {
        return
      }
      try {
        Axios.post("/node/get-all-users",{isSignedIn:ac.isSignedIn})
        .then((data) => {
            let userData = [];
            let row = [];
            //eslint-disable-next-line
            data.data.map((item) => {
              var rowModel = {
                username: item.username,
                password: item.password,
                email: item.email,
                id: item._id,
                signed: item.signed,
              };
              row.push(rowModel);
              users.push(item.username);
              userData.push(rowModel);
              setallUsers({ ...columns, rows: row });
            });
          
        })
        .then(() => {
          let indexofCurrentuser = users.indexOf(ac.User);
          if (indexofCurrentuser > -1) {
            users.splice(indexofCurrentuser, 1);
            setnotEditableUsers(users);
          }
        })
        .then(() => setshowtable(true));
        
      } catch (error) {
        ac.setflashMessages(
          <div className="form-input-error-msg alert alert-danger">
            <span className="glyphicon glyphicon-exclamation-sign"></span>
            {error.response}
          </div>
        ); 
      }
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

      try {
        Axios.post("/node/get-all-sessions",{isSignedIn:ac.isSignedIn})
        .then((data) => {
  
          let userSessions = [];
          let row = [];
          //eslint-disable-next-line
          data.data.map((item) => {
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
        
      })
      .then(() => setshowtablesessions(true));
      } catch (error) {
        ac.setflashMessages(
          <div className="form-input-error-msg alert alert-danger">
            <span className="glyphicon glyphicon-exclamation-sign"></span>
            {error.response}
          </div>
        );
        
      }
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
      dataField: "email",
      text: "E-mail",
      editable: false,
      key: "email",
      sort: false,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
      style: (colum, colIndex) => {
        return {
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        };
      },
    },
    {
      dataField: "password",
      text: "Hashed Password",
      editable: false,
      key: "password",
      sort: false,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
      style: (colum, colIndex) => {
        return {
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        };
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
      style: (colum, colIndex) => {
        return {
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        };
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
      style: (colum, colIndex) => {
        return {
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        };
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
      style: (colum, colIndex) => {
        return {
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        };
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
        <SettingsAlertsModal {...ac.dc} cc={ac} dc={dc} />
      ) : (
        <div></div>
      )}
      {switchCreateUser ? (
        <SettingsCreateUser {...ac.dc} cc={ac} dc={dc} />
      ) : (
        <div></div>
      )}
            {switchDeleteUser ? (
        <SettingsDeleteUser {...ac.dc}    cc={ac} dc={dc} />
      ) : (
        <div></div>
      )}
      {ac.isUsingADauth ? ( <div></div> ) : (<div><div className="col-xs-12">
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
                        <BootstrapTable
                          {...props.baseProps}
                          striped
                          hover
                          cellEdit={cellEditFactory({
                            mode: "click",
                            blurToSave: true,
                            nonEditableRows: () => {
                              return notEditableUsers;
                            },
                            // afterSaveCell: (
                            //   oldValue,
                            //   newValue,
                            //   row,
                            //   column
                            // ) => {
                            //   editApiKeyCell(oldValue, newValue, row, column);
                            // },
                          })}
                        />
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
      </div></div>)}

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
              className="fa fa-refresh"
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
