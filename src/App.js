import React, { useState, useEffect, useRef } from "react";
import StatePersister from "./StatePersister";
import Template from "./components/Template";

const MainContext = React.createContext(null);

function App() {
  // eslint-disable-next-line
  const [apiKey, setapiKey] = useState([]);
  const [User, setUser] = useState([]);
  const [Password, setPassword] = useState([]);
  const [triggerGetOrg, settriggerGetOrg] = useState(0);
  const [triggerSelectOrg, settriggerSelectOrg] = useState(0);
  const [getOrgStatusCode, setgetOrgStatusCode] = useState(0);
  const [organizationList, setorganizationList] = useState([]);
  const [networkList, setnetworkList] = useState([]);
  const [deviceStatusList, setdeviceStatusList] = useState([]);
  const [totaldeviceStatusList, settotaldeviceStatusList] = useState(0);
  const [allNetworksIDList, setallNetworksIDList] = useState([]);
  const [combindeNetworksIDList, setcombindeNetworksIDList] = useState([]);
  const [organization, setorganization] = useState("Set Organization");
  const [organizationID, setorganizationID] = useState(0);
  const [networkID, setnetworkID] = useState(0);
  const [network, setnetwork] = useState("Networks");
  const [deviceList, setdeviceList] = useState([]);
  const [device, setdevice] = useState([]);
  const [hostList, sethostList] = useState([]);
  const [SNtopUsers, setSNtopUsers] = useState("");
  const [clientList, setclientList] = useState([]);
  const [vlanList, setvlanList] = useState([]);
  const [allVlanList, setallVlanList] = useState([]);
  const [timeZone, settimeZone] = useState(0);
  const [inputKey, setinputKey] = useState("");
  const [inputConfKey, setinputConfKey] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isSignedIn, setisSignedIn] = useState(false);
  const [switchLoginAPI, setswitchLoginAPI] = useState(true);
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
  const [totalDevices, settotalDevices] = useState(0);
  const [totalHosts, settotalHosts] = useState(0);
  const [reports, setreports] = useState([]);
  const [triggerTopReports, settriggerTopReports] = useState(1);
  const [loadingButton, setloadingButton] = useState(false);
  const [datab, setdatab] = useState([]);
  const [isOrgSelected, setisOrgSelected] = useState(false);
  const [isNetSelected, setisNetSelected] = useState(false);
  const [flashMessages, setflashMessages] = useState([]);
  const [restoreScript, setrestoreScript] = useState("");
  const [showRestorescript, setshowRestorescript] = useState(false);
  const [collapseButton, setcollapseButton] = useState({ display: "none" });
  const [hideLogin, sethideLogin] = useState({ display: "block" });
  const [loadingOrg, setloadingOrg] = useState(false);
  const [loadingNet, setloadingNet] = useState(false);
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

  // automatic get key from server on-render and on-refresh
  useEffect(() => {
    async function getKey() {
      try {
        fetch("node/get-api-key")
          .then((res) => res.json())
          .then((data) => {
            setapiKey(data.key);
          })
          .catch((error) => console.log("An error occured ", error));
      } catch (e) {
        console.log("Error:", e);
      }
    }
    getKey();
  }, []);

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    organizationId: `${organizationID}`,
    NET_ID: `${networkID}`,
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
          } else {
            setorganizationList(data.organizations);
            setloadingOrg(false);
          }
        });
    }
    callOrganization();
    return () => {
      abortController.abort();
      console.log("cleanup -> abortController");
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
          .then((r) => r.json())
          .then((data) => {
            if (data.error) {
              setflashMessages(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error[0]}
                </div>
              );
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
        console.log("cleanup -> abortController");
        setAlertModalError([]);
        setflashMessages([]);
      };
    }
    callNetworks();

    // eslint-disable-next-line
  }, [organization]);

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
              setflashMessages(
                <div className="form-input-error-msg alert alert-danger">
                  <span className="glyphicon glyphicon-exclamation-sign"></span>
                  {data.error[0]}
                </div>
              );
            } else {
              sethostList(data.clients);
              settotalHosts(data.clients.length);
            }
          });
      }
      return () => {
        abortController.abort();
        console.log("cleanup -> abortController");
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
            setflashMessages(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {data.error[0]}
              </div>
            );
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
      console.log("cleanup -> abortController");
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
  };

  return (
    <MainContext.Provider dc={dc}>
      <Template dc={dc} />
      <StatePersister dc={dc} />
    </MainContext.Provider>
  );
}

export default App;
