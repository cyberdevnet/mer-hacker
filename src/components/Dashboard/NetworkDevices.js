import React, { useState, useEffect, useRef } from "react";
import ContentLoader from "react-content-loader";
import GetApiKey from "../../GetApiKey.js";
import axios from "axios";

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryTooltip,
} from "victory";
import "../../styles/Dashboard.css";

export default function NetworkDevices(ac) {
  const [showNetDevChart, setshowNetDevChart] = useState(false);
  const [trigger, settrigger] = useState(0);

  // eslint-disable-next-line
  const [deviceTypeData, setdeviceTypeData] = useState([
    { id: 1, device_type: 5, fill: "#f36a5a", label: 5 },
    { id: 2, device_type: 10, fill: "#FABE28", label: 10 },
    { id: 3, device_type: 20, fill: "#1ABC9C", label: 20 },
  ]);

  const MyLoaderNetworkDevices = (props) => (
    <ContentLoader
      speed={2}
      width={400}
      height={400}
      viewBox="0 0 400 400"
      style={{ width: "100%", height: "100%" }}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="45" y="270" rx="2" ry="2" width="42" height="100" />
      <rect x="180" y="170" rx="2" ry="2" width="42" height="200" />
      <rect x="320" y="50" rx="2" ry="2" width="42" height="320" />
      <rect x="15" y="35" rx="0" ry="0" width="14" height="355" />
      <rect x="45" y="375" rx="0" ry="0" width="320" height="14" />
    </ContentLoader>
  );

  let callApikey = GetApiKey(ac.User);
  let apiKey = callApikey.apikey.current;

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    organizationId: `${ac.organizationID}`,
    NET_ID: `${ac.networkID}`,
  };

  useEffect(() => {
    setTimeout(() => {
      settrigger(trigger + 1);
    }, 2000);
    return () => {};
    // eslint-disable-next-line
  }, []);

  const isFirstRun = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    async function callDevices() {
      if (ac.organizationID !== 0 && ac.networkID !== 0) {
        try {
          setshowNetDevChart(false);
          axios
            .post("/flask/devices", APIbody)
            .then((data) => {
              if (data.data.error) {
                ac.setflashMessages(
                  <div className="form-input-error-msg alert alert-danger">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    {data.data.error[0]}
                  </div>
                );
                setTimeout(() => {
                  ac.setflashMessages([]);
                }, 5000);
              } else {
                ac.setdeviceList(data.data.devices);
                ac.settotalDevices(data.data.devices.length);

                let ModelObj = {};
                for (var x = 0; x < data.data.devices.length; x++) {
                  ModelObj[x] = data.data.devices[x].model;
                }

                const MODELOBJ = Object.values(ModelObj);
                let Firewalls = [];
                let Switches = [];
                let AccessPoint = [];
                for (var z = 0; z < data.data.devices.length; z++) {
                  if (MODELOBJ[z].startsWith("MX") || MODELOBJ[z].startsWith("Z")) {
                    Firewalls.push(MODELOBJ[z]);
                  } else if (MODELOBJ[z].startsWith("MS")) {
                    Switches.push(MODELOBJ[z]);
                  } else if (MODELOBJ[z].startsWith("MR")) {
                    AccessPoint.push(MODELOBJ[z]);
                  }
                }

                //Find index of specific object using findIndex method.
                const objID1 = deviceTypeData.findIndex((obj) => obj.id === 1);
                const objID2 = deviceTypeData.findIndex((obj) => obj.id === 2);
                const objID3 = deviceTypeData.findIndex((obj) => obj.id === 3);

                //Update object's count property.
                deviceTypeData[objID1].device_type = Firewalls.length;
                deviceTypeData[objID2].device_type = Switches.length;
                deviceTypeData[objID3].device_type = AccessPoint.length;
                deviceTypeData[objID1].label = Firewalls.length;
                deviceTypeData[objID2].label = Switches.length;
                deviceTypeData[objID3].label = AccessPoint.length;
              }
            })
            .then(() => {
              setshowNetDevChart(true);
            })
            .catch((err) => console.log(err));
        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      } else {
        return function cleanup() {
          abortController.abort();
        };
      }
    }
    callDevices();
    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [ac.networkID, trigger]);

  return (
    <div>
      {showNetDevChart ? (
        <div className="mixed-chart">
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryLabel
              text="Network Devices"
              x={180}
              y={25}
              textAnchor="middle"
              style={{
                fontWeight: "600",
                color: "#AAB5BC",
                textTransform: "uppercase",
                fontSize: 12,
                fontFamily: "Open Sans, sans-serif",
              }}
            />
            <VictoryAxis
              tickValues={[1, 2, 3]}
              tickFormat={["Firewalls", "Switches", "Access Points"]}
              style={{
                tickLabels: {
                  fontWeight: "600",
                  color: "#AAB5BC",
                  textTransform: "uppercase",
                  fontSize: 12,
                  fontFamily: "Open Sans, sans-serif",
                },
              }}
            />
            <VictoryAxis dependentAxis tickFormat={(x) => x} />
            <VictoryBar
              labelComponent={<VictoryTooltip />}
              style={{
                data: {
                  fill: ({ datum }) => datum.fill,
                  width: 35,
                },
              }}
              data={deviceTypeData}
              x="id"
              y="device_type"
            />
          </VictoryChart>
        </div>
      ) : (
        <MyLoaderNetworkDevices />
      )}
    </div>
  );
}
