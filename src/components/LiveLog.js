import React, { useEffect, useState, useRef } from "react";
// import myLogs from "/home/cyberdevnet/mer-hacker-dev/src/DebugsLogs/debug.log";
import { LazyLog } from "react-lazylog";
import "../styles/LiveLog.css";

export default function LiveLog(ac) {
  const [trigger, settrigger] = useState(0);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    async function APICallLog() {


      // try {
      //   fetch("/stream")
      //     .then((response) => {
      //       console.log('response', response);

      //       return response.text();
      //     })
      //     .then((data) => {
      //       console.log('data', data);

      //       document.getElementById("log").innerHTML = data;
      //     })
      //     .then(() => {
      //       var logBody = document.getElementById("log");
      //       logBody.scrollTop = logBody.scrollHeight;
      //     });
      // } catch (err) {
      //   if (err) {
      //     console.log(err);
      //     ac.dc.setalert(true);
      //   }
      // }






      // try {
      //   fetch(myLogs)
      //     .then((response) => {
      //       return response.text();
      //     })
      //     .then((data) => {
      //       document.getElementById("log").innerHTML = data;
      //     })
      //     .then(() => {
      //       var logBody = document.getElementById("log");
      //       logBody.scrollTop = logBody.scrollHeight;
      //     });
      // } catch (err) {
      //   if (err) {
      //     console.log(err);
      //     ac.dc.setalert(true);
      //   }
      // }
    }
    APICallLog();
    // setup interval to fetch logs
    // const intervalTimer = setInterval(APICallLog, 1000);
    // return () => clearInterval(intervalTimer);
    // eslint-disable-next-line
  }, [trigger]);

  const toggle = () => {
    settrigger(trigger + 1);
  };

  // function updateScroll() {
  //   var logBody = document.getElementById("log");
  //   logBody.scrollTop = logBody.scrollHeight;
  // }

  // // once a second
  // setInterval(updateScroll, 1000);

  const url = "../DebugsLogs/debug.log";

  return (
    <div>
      <button
        onClick={toggle}
        href="#myModal"
        id="openBtn"
        data-toggle="modal"
        className="btn btn-primary"
      >
        Logs
      </button>
      {/* <div style={{ height: 500, width: 902 }}>
        <LazyLog extraLines={1} enableSearch url={url} caseInsensitive />
      </div> */}
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-xl">
          <div className="modal-content-log">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div id="log" className="modal-body-log"></div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default "
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => settrigger(trigger + 1)}
                type="button"
                className="btn btn-primary"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
