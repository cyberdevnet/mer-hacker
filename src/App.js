import React, { useState, useEffect, useRef } from "react";
import Template from "./components/Template";
import { BrowserRouter as Router } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import GetApiKey from "./GetApiKey";
import axios from "axios";

const MainContext = React.createContext(null);

function App() {
  const [Password, setPassword] = useState([]);
  const [triggerGetOrg, settriggerGetOrg] = useState(0);
  const [triggerSelectOrg, settriggerSelectOrg] = useState(0);
  const [triggerSelectNetwork, settriggerSelectNetwork] = useState(0);
  const [organizationList, setorganizationList] = useState([]);
  const [deviceStatusList, setdeviceStatusList] = useState([]);
  const [totaldeviceStatusList, settotaldeviceStatusList] = useState(0);
  const [allNetworksIDList, setallNetworksIDList] = useState([]);
  const [combindeNetworksIDList, setcombindeNetworksIDList] = useState([]);
  const [device, setdevice] = useState([]);
  const [hostList, sethostList] = useState([]);
  const [clientList, setclientList] = useState([]);
  const [vlanList, setvlanList] = useState([]);
  const [allVlanList, setallVlanList] = useState([]);
  const [inputKey, setinputKey] = useState("");
  const [inputConfKey, setinputConfKey] = useState("");
  const [switchDashboard, setswitchDashboard] = useState(false);
  const [switchLoggedout, setswitchLoggedout] = useState(false);
  const [switchToolsTemplate, setswitchToolsTemplate] = useState(false);
  const [switchMainTools, setswitchMainTools] = useState(false);
  const [switchAlertModal, setswitchAlertModal] = useState(false);
  const [switchConfirmRestore, setswitchConfirmRestore] = useState(false);
  const [switchConfirmRestoreSwitch, setswitchConfirmRestoreSwitch] = useState(false);
  const [AlertModalError, setAlertModalError] = useState([]);
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

  const [organization, setorganization] = useLocalStorage("my-organization", "Set Organization");
  const [User, setUser] = useLocalStorage("my-User", "admin");
  const [network, setnetwork] = useLocalStorage("my-networks", "Networks");
  const [organizationID, setorganizationID] = useLocalStorage("my-organizationID", 0);
  const [networkID, setnetworkID] = useLocalStorage("my-networkID", 0);
  const [switchLoginAPI, setswitchLoginAPI] = useLocalStorage("my-switchLoginAPI", true);
  const [getOrgStatusCode, setgetOrgStatusCode] = useLocalStorage("my-getOrgStatusCode", 0);
  const [collapseButton, setcollapseButton] = useLocalStorage("my-collapseButton", {
    display: "none",
  });
  const [isOrgSelected, setisOrgSelected] = useLocalStorage("my-isOrgSelected", false);
  const [isNetSelected, setisNetSelected] = useLocalStorage("my-isNetSelected", false);
  const [networkList, setnetworkList] = useLocalStorage("my-networkList", []);
  const [totalDevices, settotalDevices] = useLocalStorage("my-totalDevices", 0);
  const [timeZone, settimeZone] = useLocalStorage("my-timeZone", 0);
  const [deviceList, setdeviceList] = useLocalStorage("my-deviceList", []);
  const [SNtopUsers, setSNtopUsers] = useLocalStorage("my-SNtopUsers", "");
  const [showSetApiKey, setshowSetApiKey] = useLocalStorage("my-showSetApiKey", true);

  // <================================================================================>
  //                            END LOCAL STORAGE
  // <================================================================================>

  let callApikey = GetApiKey(User);
  // eslint-disable-next-line
  let apiKey = callApikey.apikey.current;

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
      setnetworkID(0);
      setnetwork("Networks");
      setnetworkList([]);
      await axios.post("/node/get-api-key", { username: User }).then((data) => {
        let key = data.data.apiKey;
        fetch("/flask/organizations", {
          method: ["POST"],
          cache: "no-cache",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify({
            "X-Cisco-Meraki-API-Key": `${key}`,
            organizationId: `${organizationID}`,
            NET_ID: `${networkID}`,
            USER: `${User}`,
          }),
        }).then((response) => {
          return response.json;
        });
        fetch("/flask/organizations", { signal: signal })
          .then((res) => {
            if (res.status === 500) {
              setflashMessages(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  Organization not found, please check your API key and your internet connection
                </div>
              );
              setTimeout(() => {
                setflashMessages([]);
              }, 5000);
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
              setTimeout(() => {
                setflashMessages([]);
              }, 5000);
              setloadingOrg(false);
            } else {
              setorganizationList(data.organizations);
              setloadingOrg(false);
            }
          });
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
        await axios.post("/node/get-api-key", { username: User }).then((data) => {
          let key = data.data.apiKey;
          fetch("/flask/networks", {
            method: ["POST"],
            cache: "no-cache",
            headers: {
              content_type: "application/json",
            },
            body: JSON.stringify({
              "X-Cisco-Meraki-API-Key": `${key}`,
              organizationId: `${organizationID}`,
              NET_ID: `${networkID}`,
              USER: `${User}`,
            }),
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
                setTimeout(() => {
                  setflashMessages([]);
                }, 5000);
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
                setTimeout(() => {
                  setflashMessages([]);
                }, 5000);
                setloadingNet(false);
              } else {
                const NET = Object.values(data.networks);

                let networkIDList = [];
                let combinedIDList = [];
                // eslint-disable-next-line
                NET.map((item) => {
                  var a = item.productTypes.indexOf("appliance");
                  if (a !== -1) {
                    // if (
                    //   (item.type === "combined" && a !== -1) ||
                    //   (item.type === "appliance" && a !== -1)
                    // )
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
                if (data.networks.length > 0) {
                  settimeZone(data.networks[0].timeZone);
                }
                setloadingNet(false);
              }
            });
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
        await axios.post("/node/get-api-key", { username: User }).then((data) => {
          let key = data.data.apiKey;
          fetch("/flask/clients", {
            method: ["POST"],
            cache: "no-cache",
            headers: {
              content_type: "application/json",
            },
            body: JSON.stringify({
              "X-Cisco-Meraki-API-Key": `${key}`,
              organizationId: `${organizationID}`,
              NET_ID: `${networkID}`,
              USER: `${User}`,
            }),
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
    async function callDevices() {
      if (isOrgSelected && isNetSelected === true) {
        await axios.post("/node/get-api-key", { username: User }).then((data) => {
          let key = data.data.apiKey;
          fetch("/flask/devices", {
            method: ["POST"],
            cache: "no-cache",
            headers: {
              content_type: "application/json",
            },
            body: JSON.stringify({
              "X-Cisco-Meraki-API-Key": `${key}`,
              organizationId: `${organizationID}`,
              NET_ID: `${networkID}`,
              USER: `${User}`,
            }),
          });
          fetch("/flask/devices", { signal: signal })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
              } else {
                let SN = [];
                setdeviceList(data.devices);
                let Dev1 = {};
                for (var device = 0; device < data.devices.length; device++) {
                  Dev1[device] = data.devices[device];
                  let model = Dev1[device].model;
                  if (model.startsWith("MX") || model.startsWith("Z")) {
                    SN.push(Dev1[device].serial);
                    setSNtopUsers(SN);
                  } else {
                    if (SN.length === 0) {
                      setSNtopUsers("");
                    }
                  }
                }
              }
            });
        });
      }
      return () => {
        abortController.abort();
      };
    }
    callDevices();
    // eslint-disable-next-line
  }, [network]);

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
    inputKey,
    setinputKey,
    inputConfKey,
    setinputConfKey,
    switchLoginAPI,
    setswitchLoginAPI,
    switchDashboard,
    setswitchDashboard,
    switchLoggedout,
    setswitchLoggedout,
    switchToolsTemplate,
    setswitchToolsTemplate,
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
    showSetApiKey,
    setshowSetApiKey,
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
