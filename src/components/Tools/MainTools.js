import React from "react";
import GetAllDevicesIP from "./GetAllDevicesIP";
import GetAllSubnets from "./GetAllSubnets";
import GetAllOrganizationSubnets from "./GetAllOrganizationSubnets";
import GetAllClients from "./GetAllClients";
import GetAllSwitchPorts from "./GetAllSwitchPorts";
import NetworkTopUsers from "./NetworkTopUsers";
import FindPorts from "./FindPorts";
import TrafficAnalysis from "./TrafficAnalysis";
import BackupRestore from "./BackupRestore";
import MigrateTool from "./MigrateTool";
import SwitchPortTemplate from "./SwitchPortTemplate";
import "../../styles/MainTools.css";

export default function MainTools(ac) {
  return (
    <div>
      {ac.dc.switchAllTools[1] ? (
        <GetAllDevicesIP dc={ac.dc} />
      ) : (
          <div></div>
        )}
      {ac.dc.switchAllTools[2] ? (
        <GetAllSubnets dc={ac.dc} />
      ) : (
          <div></div>
        )}
      {ac.dc.switchAllTools[3] ? (
        <GetAllOrganizationSubnets dc={ac.dc} />
      ) : (
          <div></div>
        )}
      {ac.dc.switchAllTools[4] ? (
        <GetAllClients dc={ac.dc} />
      ) : (
          <div></div>
        )}
      {ac.dc.switchAllTools[5] ? (
        <GetAllSwitchPorts dc={ac.dc} />
      ) : (
          <div></div>
        )}
      {ac.dc.switchAllTools[6] ? (
        <NetworkTopUsers dc={ac.dc} />
      ) : (
          <div></div>
        )}
      {ac.dc.switchAllTools[7] ? (
        <FindPorts dc={ac.dc} />
      ) : (
          <div></div>
        )}
      {ac.dc.switchAllTools[8] ? (
        <TrafficAnalysis dc={ac.dc} />
      ) : (
          <div></div>
        )}
      {ac.dc.switchAllTools[9] ? (
        <BackupRestore dc={ac.dc} />
      ) : (
          <div></div>
        )}
      {ac.dc.switchAllTools[10] ? (
        <MigrateTool dc={ac.dc} />
      ) : (
          <div></div>
        )}
      {ac.dc.switchAllTools[11] ? (
        <SwitchPortTemplate dc={ac.dc} />
      ) : (
          <div></div>
        )}
    </div>
  );
}
