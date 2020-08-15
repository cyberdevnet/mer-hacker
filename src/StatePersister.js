import React, { useEffect } from "react";



export default function StatePersister(ac) {

    //  PERSISTANT VARIABLES ON RE-RENDER


    useEffect(() => {
        const isSignedIn = localStorage.getItem("my-isSignedIn");
        const switchLoginAPI = localStorage.getItem("my-switchLoginAPI");
        const getOrgStatusCode = localStorage.getItem("my-getOrgStatusCode");
        const sessionTime = localStorage.getItem("my-sessionTime");
        const sessionTimeout = localStorage.getItem("my-sessionTimeout");


        ac.dc.setisSignedIn(JSON.parse(isSignedIn));
        ac.dc.setswitchLoginAPI(JSON.parse(switchLoginAPI));
        ac.dc.setgetOrgStatusCode(JSON.parse(getOrgStatusCode));
        ac.dc.setsessionTime(JSON.parse(sessionTime));
        ac.dc.setsessionTimeout(JSON.parse(sessionTimeout));

        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        localStorage.setItem("my-isSignedIn", JSON.stringify(ac.dc.isSignedIn));
        localStorage.setItem("my-switchLoginAPI", JSON.stringify(ac.dc.switchLoginAPI));
        localStorage.setItem("my-getOrgStatusCode", JSON.stringify(ac.dc.getOrgStatusCode));
        localStorage.setItem("my-sessionTime", JSON.stringify(ac.dc.sessionTime));
        localStorage.setItem("my-sessionTimeout", JSON.stringify(ac.dc.sessionTimeout));


    });
    return (
        <div>

        </div>
    )
}
