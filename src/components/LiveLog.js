import React, { useEffect, useState, useRef } from "react";
import { LazyLog } from "react-lazylog";
import "../styles/LiveLog.css";

export default function LiveLog(ac) {
  const [lazyLog, setlazyLog] = useState([]);
  const [showDebug, setshowDebug] = useState(false);
  const [buttonPHolder, setbuttonPHolder] = useState("Debug");

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    let interval = null;
    if (showDebug) {
      interval = setInterval(() => {
        try {
          fetch(`/node/flask/logs/debug_file.log`)
            .then((response) => {
              return response.text();
            })
            .then((data) => {
              setlazyLog(
                <LazyLog
                  extraLines={1}
                  enableSearch
                  text={data}
                  stream
                  caseInsensitive
                  selectableLines
                />
              );
            });
        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      }, 1500);

      // auto-clearing after 30 sec
      setTimeout(() => {
        clearInterval(interval);
      }, 600000);
    } else if (!showDebug) {
      clearInterval(interval);
    }
    if (showDebug === true) {
      setbuttonPHolder("Close");
    } else {
      setbuttonPHolder("Debug");
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [showDebug]);

  const OpenDebug = () => {
    setTimeout(() => {
      setshowDebug(!showDebug);
    }, 800);
  };

  return (
    <div>
      <button onClick={OpenDebug} className="btn btn-primary-live-log">
        {buttonPHolder}
      </button>
      {showDebug ? (
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <div style={{ height: 800 }}>{lazyLog}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
