import React, { useEffect } from "react";







export default function StatePersister(ac) {

    //  PERSISTANT VARIABLES ON RE-RENDER





    useEffect(() => {
        const isSignedIn = localStorage.getItem("my-isSignedIn");

        const apiKey = localStorage.getItem("my-apiKey");
        // const organization = localStorage.getItem("my-organization");
        // const organizationID = localStorage.getItem("my-organizationID");
        // const isOrgSelected = localStorage.getItem("my-isOrgSelected");
        // const network = localStorage.getItem("my-network");
        // const networkID = localStorage.getItem("my-networkID");
        // const isNetSelected = localStorage.getItem("my-isNetSelected");
        const switchLoginAPI = localStorage.getItem("my-switchLoginAPI");
        const getOrgStatusCode = localStorage.getItem("my-getOrgStatusCode");
        // const triggerGetOrg = localStorage.getItem("my-triggerGetOrg");
        // const collapseButton = localStorage.getItem("my-collapseButton");
        // const inputKey = localStorage.getItem("my-inputKey");
        // const inputConfKey = localStorage.getItem("my-inputConfKey");
        const sessionTime = localStorage.getItem("my-sessionTime");
        const sessionTimeout = localStorage.getItem("my-sessionTimeout");


        ac.dc.setisSignedIn(JSON.parse(isSignedIn));

        ac.dc.setapiKey(JSON.parse(apiKey));
        // ac.dc.setorganization(JSON.parse(organization));
        // ac.dc.setorganizationID(JSON.parse(organizationID));
        // ac.dc.setisOrgSelected(JSON.parse(isOrgSelected));
        // ac.dc.setnetwork(JSON.parse(network));
        // ac.dc.setnetworkID(JSON.parse(networkID));
        // ac.dc.setisNetSelected(JSON.parse(isNetSelected));
        ac.dc.setswitchLoginAPI(JSON.parse(switchLoginAPI));
        ac.dc.setgetOrgStatusCode(JSON.parse(getOrgStatusCode));
        // ac.dc.settriggerGetOrg(JSON.parse(triggerGetOrg));
        // ac.dc.setcollapseButton(JSON.parse(collapseButton));
        // ac.dc.setinputKey(JSON.parse(inputKey));
        // ac.dc.setinputConfKey(JSON.parse(inputConfKey));
        ac.dc.setsessionTime(JSON.parse(sessionTime));
        ac.dc.setsessionTimeout(JSON.parse(sessionTimeout));

        // eslint-disable-next-line
    }, []);




    useEffect(() => {
        localStorage.setItem("my-isSignedIn", JSON.stringify(ac.dc.isSignedIn));

        localStorage.setItem("my-apiKey", JSON.stringify(ac.dc.apiKey));
        // localStorage.setItem("my-organization", JSON.stringify(ac.dc.organization));
        // localStorage.setItem("my-organizationID", JSON.stringify(ac.dc.organizationID));
        // localStorage.setItem("my-isOrgSelected", JSON.stringify(ac.dc.isOrgSelected));
        // localStorage.setItem("my-network", JSON.stringify(ac.dc.network));
        // localStorage.setItem("my-networkID", JSON.stringify(ac.dc.networkID));
        // localStorage.setItem("my-isNetSelected", JSON.stringify(ac.dc.isNetSelected));
        localStorage.setItem("my-switchLoginAPI", JSON.stringify(ac.dc.switchLoginAPI));
        localStorage.setItem("my-getOrgStatusCode", JSON.stringify(ac.dc.getOrgStatusCode));
        // localStorage.setItem("my-triggerGetOrg", JSON.stringify(ac.dc.triggerGetOrg));
        // localStorage.setItem("my-collapseButton", JSON.stringify(ac.dc.collapseButton));
        // localStorage.setItem("my-inputKey", JSON.stringify(ac.dc.inputKey));
        // localStorage.setItem("my-inputConfKey", JSON.stringify(ac.dc.inputConfKey));
        localStorage.setItem("my-sessionTime", JSON.stringify(ac.dc.sessionTime));
        localStorage.setItem("my-sessionTimeout", JSON.stringify(ac.dc.sessionTimeout));


    });
    return (
        <div>

        </div>
    )
}
