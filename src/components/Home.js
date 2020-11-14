import React from "react";
import GetApiKey from "../GetApiKey";
import MerHackerLogo from "../../public/Mer-Hacker.png";

export default function Home(ac) {
  let callApikey = GetApiKey(ac.User);
  // eslint-disable-next-line
  let apiKey = callApikey.apikey.current;

  return (
    <div>
      <div>{ac.flashMessages && <span>{ac.flashMessages}</span>}</div>
      <div className="col-md-3 register-left home-logo" style={{ width: "100%" }}>
        <img src={MerHackerLogo} alt="" style={{ width: "370px" }} />
        <h3 style={{ textAlign: "center", color: "#9aa0ac" }}>
          Select Organization and network to start!
        </h3>
        <br />
      </div>
    </div>
  );
}
