import React, { useState, useEffect, useRef } from "react";
import GetApiKey from "../../GetApiKey.js";

import ContentLoader from "react-content-loader";
import {
  VictoryChart,
  VictoryTheme,
  VictoryStack,
  VictoryArea,
  VictoryLabel,
  VictoryLegend,
} from "victory";
import "../../styles/Dashboard.css";

export default function LatencyLoss(ac) {
  // eslint-disable-next-line
  const [LicenceDevices, setLicenceDevices] = useState([]);
  const [latencyLossText, setlatencyLossText] = useState("Latency/Loss");
  const [latencyLossColor, setlatencyLossColor] = useState(["#FABE28", "#1ABC9C"]);
  const [showChart, setshowChart] = useState(false);
  const [trigger, settrigger] = useState(0);


  const MyLoader = (props) => (
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
      <rect x="45" y="35" rx="2" ry="2" width="320" height="320" />
      <rect x="15" y="35" rx="0" ry="0" width="14" height="355" />
      <rect x="45" y="375" rx="0" ry="0" width="320" height="14" />
    </ContentLoader>
  );

  // eslint-disable-next-line
  const [UplinkLatencyData, setUplinkLatencyData] = useState([
    { x: "1min", y: 10 },
    { x: "2min", y: 15 },
    { x: "3min", y: 89 },
    { x: "4min", y: 67 },
    { x: "5min", y: 43 },
  ]);
  // eslint-disable-next-line
  const [UplinkLossData, setUplinkLossData] = useState([
    { x: "1min", y: 56 },
    { x: "2min", y: 43 },
    { x: "3min", y: 4 },
    { x: "4min", y: 59 },
    { x: "5min", y: 15 },
  ]);

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

  const isFirstRunuplink_loss = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let interval = null;
    if (isFirstRunuplink_loss.current) {
      isFirstRunuplink_loss.current = false;
      return;
    }
    async function UplinkStatus() {
      if (ac.organizationID !== 0 && ac.networkID !== 0) {
        try {
          setshowChart(false);
          fetch("/flask/uplink_loss", {
            method: ["POST"],
            cache: "no-cache",
            headers: {
              content_type: "application/json",
            },
            body: JSON.stringify(APIbody),
          }).then((response) => {
            return response.json;
          });
          fetch("/flask/uplink_loss", { signal: signal })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
              } else {
                try {
                  var UplinkLossNetObj = data.uplinkLoss.filter(function (obj) {
                    return obj.networkId === ac.networkID;
                  })[0];

                  const UPLINKOBJ = Object.values(UplinkLossNetObj.timeSeries);
                  let latencyMs = [];
                  let lossPercent = [];
                  let ts = [];
                  let UplinkSeries = {};

                  for (var y = 0; y < UplinkLossNetObj.timeSeries.length; y++) {
                    UplinkSeries[y] = UPLINKOBJ[y];
                    latencyMs.push(UplinkSeries[y].latencyMs);
                    lossPercent.push(UplinkSeries[y].lossPercent);
                    ts.push(UplinkSeries[y].ts);
                  }

                  //Find index of specific object using findIndex method.
                  const objID1 = UplinkLatencyData.findIndex((obj) => obj.x === "1min");
                  const objID2 = UplinkLatencyData.findIndex((obj) => obj.x === "2min");
                  const objID3 = UplinkLatencyData.findIndex((obj) => obj.x === "3min");
                  const objID4 = UplinkLatencyData.findIndex((obj) => obj.x === "4min");
                  const objID5 = UplinkLatencyData.findIndex((obj) => obj.x === "5min");

                  //Update object's count property.
                  UplinkLatencyData[objID1].y = latencyMs[0];
                  UplinkLatencyData[objID2].y = latencyMs[1];
                  UplinkLatencyData[objID3].y = latencyMs[2];
                  UplinkLatencyData[objID4].y = latencyMs[3];
                  UplinkLatencyData[objID5].y = latencyMs[4];

                  const obj2ID1 = UplinkLossData.findIndex((obj) => obj.x === "1min");
                  const obj2ID2 = UplinkLossData.findIndex((obj) => obj.x === "2min");
                  const objI2D3 = UplinkLossData.findIndex((obj) => obj.x === "3min");
                  const obj2ID4 = UplinkLossData.findIndex((obj) => obj.x === "4min");
                  const obj2ID5 = UplinkLossData.findIndex((obj) => obj.x === "5min");

                  //Update object's count property.
                  UplinkLossData[obj2ID1].y = lossPercent[0];
                  UplinkLossData[obj2ID2].y = lossPercent[1];
                  UplinkLossData[objI2D3].y = lossPercent[2];
                  UplinkLossData[obj2ID4].y = lossPercent[3];
                  UplinkLossData[obj2ID5].y = lossPercent[4];
                  setlatencyLossText("Latency/Loss");
                  setlatencyLossColor(["#FABE28", "#1ABC9C"]);
                } catch (err) {
                  if (err) {
                    console.log(err);
                    setlatencyLossText("data not available");
                    setlatencyLossColor(["#333", "#d6d6d6"]);
                  }
                }
              }
            })
            .then(() => {
              setshowChart(true);
            })
            .catch((err) => {
              if (err.name === "AbortError") return;
              throw err.name;
            });
        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      } else {
        return function cleanup() {
          abortController.abort();
          clearInterval(interval);
        };
      }

      interval = setTimeout(() => {
        UplinkStatus();
      }, 300000);
    }
    UplinkStatus();
    return function cleanup() {
      abortController.abort();
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [ac.networkID, trigger]);

  return (
    <div>
      {showChart ? (
        <div className="mixed-chart">
          <VictoryChart theme={VictoryTheme.material} domainPadding={1}>
            <VictoryLabel
              text={latencyLossText}
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
            <VictoryStack colorScale={latencyLossColor}>
              <VictoryArea
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
                interpolation="natural"
                data={UplinkLossData}
              />
              <VictoryArea
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
                interpolation="natural"
                data={UplinkLatencyData}
              />
            </VictoryStack>
            <VictoryLegend
              x={110}
              y={325}
              orientation="horizontal"
              gutter={20}
              data={[
                { name: "Latency", symbol: { fill: "#1ABC9C" } },
                { name: "Loss", symbol: { fill: "#FABE28" } },
              ]}
            />
          </VictoryChart>
        </div>
      ) : (
        <div>
          <MyLoader />
        </div>
      )}
    </div>
  );
}
