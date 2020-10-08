import React, { useState, useEffect, useRef } from "react";
import Template from "./components/Template";
import { BrowserRouter as Router } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const MainContext = React.createContext(null);

function App() {
  // eslint-disable-next-line
  const [apiKey, setapiKey] = useState([]);
  const [Password, setPassword] = useState([]);
  const [triggerGetOrg, settriggerGetOrg] = useState(0);
  const [triggerSelectOrg, settriggerSelectOrg] = useState(0);
  const [triggerSelectNetwork, settriggerSelectNetwork] = useState(0);
  const [organizationList, setorganizationList] = useState([]);
  const [deviceStatusList, setdeviceStatusList] = useState([]);
  const [totaldeviceStatusList, settotaldeviceStatusList] = useState(0);
  const [allNetworksIDList, setallNetworksIDList] = useState([]);
  const [combindeNetworksIDList, setcombindeNetworksIDList] = useState([]);
  const [deviceList, setdeviceList] = useState([]);
  const [device, setdevice] = useState([]);
  const [hostList, sethostList] = useState([]);
  const [SNtopUsers, setSNtopUsers] = useState("");
  const [clientList, setclientList] = useState([]);
  const [vlanList, setvlanList] = useState([]);
  const [allVlanList, setallVlanList] = useState([]);
  const [inputKey, setinputKey] = useState("");
  const [inputConfKey, setinputConfKey] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [switchDashboard, setswitchDashboard] = useState(false);
  const [switchLoggedIn, setswitchLoggedIn] = useState(false);
  const [switchLoggedout, setswitchLoggedout] = useState(false);
  const [switchToolsTemplate, setswitchToolsTemplate] = useState(false);
  const [switchMainTools, setswitchMainTools] = useState(false);
  const [switchAlertModal, setswitchAlertModal] = useState(false);
  const [switchConfirmRestore, setswitchConfirmRestore] = useState(false);
  const [switchConfirmRestoreSwitch, setswitchConfirmRestoreSwitch] = useState(
    false
  );
  const [AlertModalError, setAlertModalError] = useState([]);
  const [switchswitchChangeApiKey, setswitchswitchChangeApiKey] = useState(
    false
  );
  const [ulClassorg, setulClassorg] = useState("nav nav-second-level");
  const [ulClassnet, setulClassnet] = useState("nav nav-second-level");
  const [totalHosts, settotalHosts] = useState(0);
  const [reports, setreports] = useState([]);
  const [triggerTopReports, settriggerTopReports] = useState(1);
  const [loadingButton, setloadingButton] = useState(false);
  const [datab, setdatab] = useState([]);
  const [flashMessages, setflashMessages] = useState([]);
  const [restoreScript, setrestoreScript] = useState("");
  const [showRestorescript, setshowRestorescript] = useState(false);
  const [hideLogin, sethideLogin] = useState({ display: "block" });
  const [loadingOrg, setloadingOrg] = useState(false);
  const [loadingNet, setloadingNet] = useState(false);
  const [toolSelected, settoolSelected] = useState(false);
  const [showAlreadyisSignedInModal, setshowAlreadyisSignedInModal] = useState(
    false
  );
  const [showforgotPasswordModal, setshowforgotPasswordModal] = useState(false);
  const [switchAllTools, setswitchAllTools] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  });

  // <================================================================================>
  //                             LOCAL STORAGE 
  // <================================================================================>

  //set the logged user in local storage to be retrieved from getKey() function

  const [isSignedIn, setisSignedIn] = useState(() => {
    const stickyValue = localStorage.getItem("my-isSignedIn");
    return stickyValue !== null ? JSON.parse(stickyValue) : [];
  });

  useEffect(() => {
    localStorage.setItem("my-isSignedIn", JSON.stringify(isSignedIn));
  }, [isSignedIn]);

  const [organization, setorganization] = useLocalStorage("my-organization","Set Organization");
  const [User, setUser] = useLocalStorage("my-User",[]);
  const [network, setnetwork] = useLocalStorage('my-networks',"Networks");
  const [organizationID, setorganizationID] = useLocalStorage('my-organizationID',0);
  const [networkID, setnetworkID] = useLocalStorage('my-networkID',0);
  const [switchLoginAPI, setswitchLoginAPI] = useLocalStorage("my-switchLoginAPI",true);
  const [getOrgStatusCode, setgetOrgStatusCode] = useLocalStorage("my-getOrgStatusCode",0);
  const [collapseButton, setcollapseButton] = useLocalStorage("my-collapseButton",{ display: "none" });
  const [isOrgSelected, setisOrgSelected] = useLocalStorage('my-isOrgSelected',false);
  const [isNetSelected, setisNetSelected] = useLocalStorage('my-isNetSelected',false);
  const [isUsingADauth, setisUsingADauth] = useLocalStorage("my-isUsingADauth", false);
  const [networkList, setnetworkList] = useLocalStorage("my-networkList",[]);
  const [totalDevices, settotalDevices] = useLocalStorage("my-totalDevices",0);
  const [timeZone, settimeZone] = useLocalStorage("my-timeZone",0);

  
  // <================================================================================>
  //                            END LOCAL STORAGE 
  // <================================================================================>

  // automatic get key from server on-render and on-refresh
  useEffect(() => {
    async function getKey() {
      fetch("/node/get-api-key", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: `${User}`, isSignedIn: isSignedIn }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setapiKey(data.apiKey);
        })
        .catch((error) => {});
    }

    getKey();
    // eslint-disable-next-line
  }, []);

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    organizationId: `${organizationID}`,
    NET_ID: `${networkID}`,
    USER: `${User}`,
  };

  const isFirstRunOrg = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunOrg.current) {
      isFirstRunOrg.current = false;
      return;
    }
    async function callOrganization() {
      setloadingOrg(true);
      fetch("/flask/organizations", {
        method: ["POST"],
        cache: "no-cache",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify(APIbody),
      }).then((response) => {
        return response.json;
      });
      fetch("/flask/organizations", { signal: signal })
        .then((res) => {
          if (res.status === 500) {
            setflashMessages(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                Organization not found, please check your API key and your
                internet connection
              </div>
            );
            setloadingOrg(false);
          }
          setgetOrgStatusCode(res.status);
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            setflashMessages(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {data.error}
              </div>
            );
            setloadingOrg(false);
          } else {
            setorganizationList(data.organizations);
            setloadingOrg(false);
          }
        });
    }
    callOrganization();
    return () => {
      abortController.abort();
      setAlertModalError([]);
      setflashMessages([]);
    };
    // eslint-disable-next-line
  }, [triggerGetOrg, triggerSelectOrg]);

  const isFirstRunNetwork = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunNetwork.current) {
      isFirstRunNetwork.current = false;
      return;
    }
    async function callNetworks() {
      if (organization !== "Set Organization") {
        setflashMessages([]);
        setloadingNet(true);
        fetch("/flask/networks", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody),
        }).then((response) => {
          return response.json;
        });
        fetch("/flask/networks", { signal: signal })
          .then((res) => {
            if (res.status === 500) {
              setflashMessages(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  There was an error loading the networks, please try again.
                </div>
              );
              setloadingNet(false);
            }
            setgetOrgStatusCode(res.status);
            return res.json();
          })
          .then((data) => {
            if (data.error) {
              setflashMessages(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error[0]}
                </div>
              );
              setloadingNet(false);
            } else {
              const NET = Object.values(data.networks);

              let networkIDList = [];
              let combinedIDList = [];
              // eslint-disable-next-line
              NET.map((item) => {
                var a = item.productTypes.indexOf("appliance");
                if (
                  (item.type === "combined" && a !== -1) ||
                  (item.type === "appliance" && a !== -1)
                ) {
                  var IDcombinedListModel = [
                    {
                      id: item.id,
                      name: item.name,
                      type: item.type,
                    },
                  ];
                  combinedIDList.push(...IDcombinedListModel);
                  setcombindeNetworksIDList(combinedIDList);
                }

                var IDListModel = [
                  {
                    id: item.id,
                  },
                ];
                networkIDList.push(...IDListModel);
                setallNetworksIDList(networkIDList);
              });
              setnetworkList(data.networks);
              settimeZone(data.networks[0].timeZone);
              setloadingNet(false);
            }
          });
      }
      return () => {
        abortController.abort();
        setAlertModalError([]);
        setflashMessages([]);
      };
    }
    callNetworks();

    // eslint-disable-next-line
  }, [organization, triggerSelectNetwork]);

  const isFirstRunHosts = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunHosts.current) {
      isFirstRunHosts.current = false;
      return;
    }
    async function callClients() {
      if (network !== "Networks") {
        fetch("/flask/clients", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify(APIbody),
        }).then((response) => {
          return response.json;
        });
        fetch("/flask/clients", { signal: signal })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              console.log("callClients -> data.error", data.error);
            } else {
              sethostList(data.clients);
              settotalHosts(data.clients.length);
            }
          });
      }
      return () => {
        abortController.abort();
      };
    }
    callClients();
    // eslint-disable-next-line
  }, [network]);

  const isFirstDevices = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstDevices.current) {
      isFirstDevices.current = false;
      return;
    }
    if (isOrgSelected && isNetSelected === true) {
      fetch("/flask/devices", { signal: signal })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log("devices -> data.error", data.error);
          } else {
            setdeviceList(data.devices);
            let Dev1 = {};
            for (var device = 0; device < data.devices.length; device++) {
              Dev1[device] = data.devices[device];
              let model = Dev1[device].model;
              if (model.startsWith("MX") || model.startsWith("Z")) {
                setSNtopUsers(Dev1[device].serial);
              }
            }
          }
        });
    }
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [networkID]);

  const dc = {
    triggerGetOrg,
    settriggerGetOrg,
    getOrgStatusCode,
    setgetOrgStatusCode,
    organizationList,
    setorganizationList,
    networkList,
    setnetworkList,
    networkID,
    setnetworkID,
    organization,
    setorganization,
    organizationID,
    setorganizationID,
    timeZone,
    settimeZone,
    network,
    setnetwork,
    apiKey,
    setapiKey,
    inputKey,
    setinputKey,
    inputConfKey,
    setinputConfKey,
    isLoggedIn,
    setisLoggedIn,
    switchLoginAPI,
    setswitchLoginAPI,
    switchDashboard,
    setswitchDashboard,
    switchLoggedIn,
    setswitchLoggedIn,
    switchLoggedout,
    setswitchLoggedout,
    switchToolsTemplate,
    setswitchToolsTemplate,
    switchswitchChangeApiKey,
    setswitchswitchChangeApiKey,
    switchMainTools,
    setswitchMainTools,
    switchAlertModal,
    setswitchAlertModal,
    ulClassorg,
    setulClassorg,
    ulClassnet,
    setulClassnet,
    totalDevices,
    settotalDevices,
    deviceList,
    setdeviceList,
    clientList,
    setclientList,
    vlanList,
    setvlanList,
    allNetworksIDList,
    setallNetworksIDList,
    allVlanList,
    setallVlanList,
    reports,
    setreports,
    datab,
    setdatab,
    triggerTopReports,
    settriggerTopReports,
    loadingButton,
    setloadingButton,
    SNtopUsers,
    setSNtopUsers,
    isOrgSelected,
    setisOrgSelected,
    isNetSelected,
    setisNetSelected,
    AlertModalError,
    setAlertModalError,
    hostList,
    sethostList,
    totalHosts,
    settotalHosts,
    deviceStatusList,
    setdeviceStatusList,
    totaldeviceStatusList,
    settotaldeviceStatusList,
    device,
    setdevice,
    flashMessages,
    setflashMessages,
    restoreScript,
    setrestoreScript,
    showRestorescript,
    setshowRestorescript,
    switchConfirmRestore,
    setswitchConfirmRestore,
    switchConfirmRestoreSwitch,
    setswitchConfirmRestoreSwitch,
    collapseButton,
    setcollapseButton,
    hideLogin,
    sethideLogin,
    switchAllTools,
    setswitchAllTools,
    triggerSelectOrg,
    settriggerSelectOrg,
    triggerSelectNetwork,
    settriggerSelectNetwork,
    isSignedIn,
    setisSignedIn,
    User,
    setUser,
    Password,
    setPassword,
    combindeNetworksIDList,
    setcombindeNetworksIDList,
    loadingOrg,
    setloadingOrg,
    loadingNet,
    setloadingNet,
    toolSelected,
    settoolSelected,
    showAlreadyisSignedInModal,
    setshowAlreadyisSignedInModal,
    showforgotPasswordModal,
    setshowforgotPasswordModal,
    isUsingADauth,
    setisUsingADauth,
  };

  return (
    <MainContext.Provider dc={dc}>
      <Router>
        <Template dc={dc} />
      </Router>
    </MainContext.Provider>
  );
}

export default App;
