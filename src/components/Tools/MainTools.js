import React from "react";
import GetAllDevicesIP from "./GetAllDevicesIP";
import GetAllSubnets from "./GetAllSubnets";
import GetAllOrganizationSubnets from "./GetAllOrganizationSubnets";
import NetworkTopUsers from "./NetworkTopUsers";
import FindPorts from "./FindPorts";
import TrafficAnalysis from "./TrafficAnalysis";
import "../../styles/MainTools.css";

export default function MainTools(ac) {
  return (
    <div>
      {ac.ts.switchAllTools[1] ? (
        <GetAllDevicesIP dc={ac.dc} ts={ac.ts} />
      ) : (
        <div></div>
      )}
      {ac.ts.switchAllTools[2] ? (
        <GetAllSubnets dc={ac.dc} ts={ac.ts} />
      ) : (
        <div></div>
      )}
      {ac.ts.switchAllTools[3] ? (
        <GetAllOrganizationSubnets dc={ac.dc} ts={ac.ts} />
      ) : (
        <div></div>
      )}
      {ac.ts.switchAllTools[4] ? (
        <NetworkTopUsers dc={ac.dc} ts={ac.ts} />
      ) : (
        <div></div>
      )}
      {ac.ts.switchAllTools[5] ? (
        <FindPorts dc={ac.dc} ts={ac.ts} />
      ) : (
        <div></div>
      )}
      {ac.ts.switchAllTools[6] ? (
        <TrafficAnalysis dc={ac.dc} ts={ac.ts} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
