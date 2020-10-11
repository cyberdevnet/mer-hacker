import React, { useState, useEffect, useRef } from "react";
import ContentLoader from "react-content-loader";
import GetApiKey from "../../GetApiKey.js";

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryTooltip,
} from "victory";
import "../../styles/Dashboard.css";

export default function TotalDevices(ac) {
  const [showTotDevChart, setshowTotDevChart] = useState(false);
  const [trigger, settrigger] = useState(0);


  // eslint-disable-next-line
  let [deviceStatusData, setdeviceStatusData] = useState([
    { id: 1, device_count: 5, fill: "#f36a5a", label: 5 },
    { id: 2, device_count: 10, fill: "#FABE28", label: 10 },
    { id: 3, device_count: 20, fill: "#1ABC9C", label: 20 },
  ]);

  const MyLoaderTotalDevices = (props) => (
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

  let callApikey = GetApiKey(ac.User, ac.isSignedIn);
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
    async function callDeviceStatus() {
      if (ac.organizationID !== 0) {
        try {
          setshowTotDevChart(false);
          fetch("/flask/device_status", {
            method: ["POST"],
            cache: "no-cache",
            headers: {
              content_type: "application/json",
            },
            body: JSON.stringify(APIbody),
          }).then((response) => {
            return response.json;
          });
          fetch("/flask/device_status", { signal: signal })
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
                // ac.setdeviceStatusList(data.deviceStatus);
                // ac.settotaldeviceStatusList(data.deviceStatus.length);

                let DeviceStatusobjects = {};
                let DeviceListobjects = {};
                for (var x = 0; x < data.deviceStatus.length; x++) {
                  DeviceStatusobjects[x] = data.deviceStatus[x].status;
                  DeviceListobjects[x] = data.deviceStatus[x];
                }
                const DEVICEOBJ = Object.values(DeviceStatusobjects);

                let OnlineObj = [];
                let OfflineObj = [];
                let AlertingObj = [];
                for (var y = 0; y < data.deviceStatus.length; y++) {
                  if (DEVICEOBJ[y] === "online") {
                    OnlineObj.push(DEVICEOBJ[y]);
                  } else if (DEVICEOBJ[y] === "offline") {
                    OfflineObj.push(DEVICEOBJ[y]);
                  } else if (DEVICEOBJ[y] === "alerting") {
                    AlertingObj.push(DEVICEOBJ[y]);
                  }
                }

                //Find index of specific object using findIndex method.
                const objID1 = deviceStatusData.findIndex((obj) => obj.id === 1);
                const objID2 = deviceStatusData.findIndex((obj) => obj.id === 2);
                const objID3 = deviceStatusData.findIndex((obj) => obj.id === 3);

                //Update object's count property.
                deviceStatusData[objID1].device_count = AlertingObj.length;
                deviceStatusData[objID2].device_count = OfflineObj.length;
                deviceStatusData[objID3].device_count = OnlineObj.length;
                deviceStatusData[objID1].label = AlertingObj.length;
                deviceStatusData[objID2].label = OfflineObj.length;
                deviceStatusData[objID3].label = OnlineObj.length;
              }
            })
            .then(() => {
              setshowTotDevChart(true);
            });
        } catch (err) {
          if (err) {
            console.log(err);
            setshowTotDevChart(false);
          }
        }
      } else {
        return function cleanup() {
          abortController.abort();
          setshowTotDevChart(false);
        };
      }
    }
    callDeviceStatus();
    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [ac.organizationID, trigger]);

  return (
    <div>
      {showTotDevChart ? (
        <div className="mixed-chart">
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryLabel
              text="Total Devices"
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
              tickFormat={["Alerting", "Offline", "Online"]}
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
              data={deviceStatusData}
              x="id"
              y="device_count"
            />
          </VictoryChart>
        </div>
      ) : (
        <MyLoaderTotalDevices />
      )}
    </div>
  );
}
