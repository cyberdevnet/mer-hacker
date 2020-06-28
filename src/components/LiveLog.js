import React, { useEffect, useState, useRef } from "react";
// import myLogs from "/home/cyberdevnet/mer-hacker-dev/api/logs/debug_file.log";
// import myLogs from "/home/cyberdevnet/mer-hacker-dev/src/DebugsLogs/debug.log";
import { LazyLog } from "react-lazylog";
import "../styles/LiveLog.css";

export default function LiveLog(ac) {
  const [debug_logs, setdebug_logs] = useState([]);
  const [showDebug, setshowDebug] = useState(false)
  const [buttonPHolder, setbuttonPHolder] = useState('Debug')

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
          fetch("/api/logs/debug_file.log")
            .then((response) => {

              return response.text();
            })
            .then((data) => {
              setdebug_logs(data)

            })

        } catch (err) {
          if (err) {
            console.log(err);
            ac.dc.setalert(true);
          }
        }

      }, 1500)

      // auto-clearing after 30 sec
      setTimeout(() => {
        clearInterval(interval)
      }, 600000);

    } else if (!showDebug) {
      clearInterval(interval)
    }
    if (showDebug === true) {
      setbuttonPHolder('Close')
    } else {
      setbuttonPHolder('Debug')
    }
    return () => clearInterval(interval);

  }, [showDebug]);

  const OpenDebug = () => {
    setTimeout(() => {
      setshowDebug(!showDebug)
    }, 800);

  };


  return (
    <div>
      <button
        onClick={OpenDebug}
        className="btn btn-primary-live-log"
      >
        {buttonPHolder}
      </button>
      {showDebug ? (
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <div style={{ height: 800 }}>
                  <LazyLog extraLines={1} enableSearch text={debug_logs} stream caseInsensitive selectableLines />
                </div>

              </div>
            </div>
          </div>

        </div>
      ) : (<div></div>)}
    </div>
  );
}
