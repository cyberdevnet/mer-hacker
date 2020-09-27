import React, { useEffect } from "react";

export default function StatePersister(ac) {
  //  PERSISTANT VARIABLES ON RE-RENDER

  useEffect(() => {
    // const isSignedIn = localStorage.getItem("my-isSignedIn");
    const switchLoginAPI = localStorage.getItem("my-switchLoginAPI");
    const getOrgStatusCode = localStorage.getItem("my-getOrgStatusCode");
    const collapseButton = localStorage.getItem("my-collapseButton");
    // const User = localStorage.getItem("my-User");

    // ac.dc.setisSignedIn(JSON.parse(isSignedIn));
    ac.dc.setswitchLoginAPI(JSON.parse(switchLoginAPI));
    ac.dc.setgetOrgStatusCode(JSON.parse(getOrgStatusCode));
    ac.dc.setcollapseButton(JSON.parse(collapseButton));
    // ac.dc.setUser(JSON.parse(User));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // localStorage.setItem("my-isSignedIn", JSON.stringify(ac.dc.isSignedIn));
    localStorage.setItem(
      "my-switchLoginAPI",
      JSON.stringify(ac.dc.switchLoginAPI)
    );
    localStorage.setItem(
      "my-getOrgStatusCode",
      JSON.stringify(ac.dc.getOrgStatusCode)
    );
    localStorage.setItem(
      "my-collapseButton",
      JSON.stringify(ac.dc.collapseButton)
    );
    // localStorage.setItem("my-User", JSON.stringify(ac.dc.User));
  });
  return <div></div>;
}
