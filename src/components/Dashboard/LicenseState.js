import React, { useState, useEffect, useRef } from "react";
import ContentLoader from "react-content-loader";
import GetApiKey from "../../GetApiKey.js";
import axios from "axios";

import "../../styles/Dashboard.css";

export default function LicenseState(ac) {
  const [licenseState, setlicenseState] = useState([]);
  // eslint-disable-next-line
  const [LicenceDevices, setLicenceDevices] = useState([]);
  const [showLicense, setshowLicense] = useState(false);
  const [trigger, settrigger] = useState(0);

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

  const MyLoader = (props) => (
    <ContentLoader
      speed={2}
      width={400}
      height={376}
      style={{ width: "100%", height: "100%" }}
      viewBox="20 30 350 350"
      backgroundColor="#f5f5f5"
      foregroundColor="#dbdbdb"
      {...props}
    >
      <rect x="117" y="52" rx="6" ry="6" width="300" height="15" />
      <circle cx="30" cy="60" r="15" />
      <rect x="117" y="105" rx="6" ry="6" width="300" height="15" />
      <circle cx="30" cy="113" r="15" />
      <rect x="117" y="158" rx="6" ry="6" width="300" height="15" />
      <circle cx="30" cy="166" r="15" />
      <rect x="117" y="211" rx="6" ry="6" width="300" height="15" />
      <circle cx="30" cy="219" r="15" />
      <rect x="117" y="263" rx="6" ry="6" width="300" height="15" />
      <circle cx="30" cy="271" r="15" />
      <rect x="117" y="316" rx="6" ry="6" width="300" height="15" />
      <circle cx="30" cy="324" r="15" />
    </ContentLoader>
  );

  const isFirstRun = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    async function LicenseStatus() {
      if (ac.organizationID !== 0) {
        try {
          setshowLicense(false);
          axios
            .post("/flask/licenseState", APIbody)
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
                const DEVICES = Object.values(data.data.licenseState.licensedDeviceCounts);
                setlicenseState(data.data.licenseState);
                setLicenceDevices(DEVICES);
              }
            })
            .then(() => {
              setshowLicense(true);
            });
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
    LicenseStatus();
    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [ac.organizationID, trigger]);

  return (
    <div>
      {showLicense ? (
        <div className="license-overflow">
          <div className="license">
            <p className="p-license">Licence status: {licenseState.status}</p>
            <p className="p-license">Expiration date: {licenseState.expirationDate}</p>
            <div className="p-license">
              {Object.keys(licenseState.licensedDeviceCounts).map((key, i) => (
                <p className="p-license" key={i}>
                  <span>{key}: </span>
                  <span>{licenseState.licensedDeviceCounts[key]}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <MyLoader />
        </div>
      )}
    </div>
  );
}
