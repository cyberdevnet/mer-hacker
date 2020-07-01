import React, { useState, useEffect } from "react";


export default function StatePersister(ac) {

    //  PERSISTANT VARIABLES ON RE-RENDER

    useEffect(() => {
        const apiKey = localStorage.getItem("my-apiKey");
        const isLoggedIn = localStorage.getItem("my-isLoggedIn");
        const organization = localStorage.getItem("my-organization");
        const organizationID = localStorage.getItem("my-organizationID");
        const isOrgSelected = localStorage.getItem("my-isOrgSelected");
        const network = localStorage.getItem("my-network");
        const networkID = localStorage.getItem("my-networkID");
        const isNetSelected = localStorage.getItem("my-isNetSelected");
        const switchLoggedout = localStorage.getItem("my-switchLoggedout")
        const switchDashboard = localStorage.getItem("my-switchDashboard")
        const switchToolsTemplate = localStorage.getItem("my-switchToolsTemplate")
        const classDashboard = localStorage.getItem("my-classDashboard")
        const classToolsTemplate = localStorage.getItem("my-classToolsTemplate")
        const classNetwork = localStorage.getItem("my-classNetwork")
        const classLogin = localStorage.getItem("my-classLogin")
        const classOrganization = localStorage.getItem("my-classOrganization")
        const ulClassnet = localStorage.getItem("my-ulClassnet")
        const switchLoginAPI = localStorage.getItem("my-switchLoginAPI");
        const getOrgStatusCode = localStorage.getItem("my-getOrgStatusCode");
        const triggerGetOrg = localStorage.getItem("my-triggerGetOrg");
        const switchLoggedIn = localStorage.getItem("my-switchLoggedIn");
        const collapseButton = localStorage.getItem("my-collapseButton");
        const hideLogin = localStorage.getItem("my-hideLogin");
        const switchAllTools = localStorage.getItem("my-switchAllTools");
        const switchMainTools = localStorage.getItem("my-switchMainTools");
        const logInlogOut = localStorage.getItem("my-logInlogOut");
        const inputKey = localStorage.getItem("my-inputKey");
        const inputConfKey = localStorage.getItem("my-inputConfKey");





        ac.dc.setapiKey(JSON.parse(apiKey));
        ac.dc.setisLoggedIn(JSON.parse(isLoggedIn));
        ac.dc.setorganization(JSON.parse(organization));
        ac.dc.setorganizationID(JSON.parse(organizationID));
        ac.dc.setisOrgSelected(JSON.parse(isOrgSelected));
        ac.dc.setnetwork(JSON.parse(network));
        ac.dc.setnetworkID(JSON.parse(networkID));
        ac.dc.setisNetSelected(JSON.parse(isNetSelected));
        ac.dc.setswitchLoggedout(JSON.parse(switchLoggedout))
        ac.dc.setswitchDashboard(JSON.parse(switchDashboard))
        ac.dc.setswitchToolsTemplate(JSON.parse(switchToolsTemplate))
        ac.dc.setclassDashboard(JSON.parse(classDashboard))
        ac.dc.setclassToolsTemplate(JSON.parse(classToolsTemplate))
        ac.dc.setclassNetwork(JSON.parse(classNetwork))
        ac.dc.setclassLogin(JSON.parse(classLogin))
        ac.dc.setclassOrganization(JSON.parse(classOrganization))
        ac.dc.setulClassnet(JSON.parse(ulClassnet))
        ac.dc.setswitchLoginAPI(JSON.parse(switchLoginAPI));
        ac.dc.setgetOrgStatusCode(JSON.parse(getOrgStatusCode));
        ac.dc.settriggerGetOrg(JSON.parse(triggerGetOrg));
        ac.dc.setswitchLoggedIn(JSON.parse(switchLoggedIn));
        ac.dc.setcollapseButton(JSON.parse(collapseButton));
        ac.dc.sethideLogin(JSON.parse(hideLogin));
        ac.dc.setswitchAllTools(JSON.parse(switchAllTools));
        ac.dc.setswitchMainTools(JSON.parse(switchMainTools));
        ac.dc.setlogInlogOut(JSON.parse(logInlogOut));
        ac.dc.setinputKey(JSON.parse(inputKey));
        ac.dc.setinputConfKey(JSON.parse(inputConfKey));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        localStorage.setItem("my-isLoggedIn", JSON.stringify(ac.dc.isLoggedIn));
        localStorage.setItem("my-apiKey", JSON.stringify(ac.dc.apiKey));
        localStorage.setItem("my-organization", JSON.stringify(ac.dc.organization));
        localStorage.setItem("my-organizationID", JSON.stringify(ac.dc.organizationID));
        localStorage.setItem("my-isOrgSelected", JSON.stringify(ac.dc.isOrgSelected));
        localStorage.setItem("my-network", JSON.stringify(ac.dc.network));
        localStorage.setItem("my-networkID", JSON.stringify(ac.dc.networkID));
        localStorage.setItem("my-isNetSelected", JSON.stringify(ac.dc.isNetSelected));
        localStorage.setItem("my-switchLoggedout", JSON.stringify(ac.dc.switchLoggedout))
        localStorage.setItem("my-switchDashboard", JSON.stringify(ac.dc.switchDashboard))
        localStorage.setItem("my-switchToolsTemplate", JSON.stringify(ac.dc.switchToolsTemplate))
        localStorage.setItem("my-classDashboard", JSON.stringify(ac.dc.classDashboard))
        localStorage.setItem("my-classToolsTemplate", JSON.stringify(ac.dc.classToolsTemplate))
        localStorage.setItem("my-classNetwork", JSON.stringify(ac.dc.classNetwork))
        localStorage.setItem("my-classLogin", JSON.stringify(ac.dc.classLogin))
        localStorage.setItem("my-classOrganization", JSON.stringify(ac.dc.classOrganization))
        localStorage.setItem("my-ulClassnet", JSON.stringify(ac.dc.ulClassnet))
        localStorage.setItem("my-switchLoginAPI", JSON.stringify(ac.dc.switchLoginAPI));
        localStorage.setItem("my-getOrgStatusCode", JSON.stringify(ac.dc.getOrgStatusCode));
        localStorage.setItem("my-triggerGetOrg", JSON.stringify(ac.dc.triggerGetOrg));
        localStorage.setItem("my-switchLoggedIn", JSON.stringify(ac.dc.switchLoggedIn));
        localStorage.setItem("my-collapseButton", JSON.stringify(ac.dc.collapseButton));
        localStorage.setItem("my-hideLogin", JSON.stringify(ac.dc.hideLogin));
        localStorage.setItem("my-switchAllTools", JSON.stringify(ac.dc.switchAllTools));
        localStorage.setItem("my-switchMainTools", JSON.stringify(ac.dc.switchMainTools));
        localStorage.setItem("my-logInlogOut", JSON.stringify(ac.dc.logInlogOut));
        localStorage.setItem("my-inputKey", JSON.stringify(ac.dc.inputKey));
        localStorage.setItem("my-inputConfKey", JSON.stringify(ac.dc.inputConfKey));


    });
    return (
        <div>

        </div>
    )
}
