import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import Dialog from "@material-ui/core/Dialog";

export default function ClientsusageHistory(ac) {
  const [showModal, setshowModal] = useState(false);
  const [chart, setchart] = useState(false);
  const [refreshUsage, setrefreshUsage] = useState(false);

  const usageHistory = {
    options: {
      chart: {
        type: "area",
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      title: {
        text: "Client usage history(1 month)",
        align: "left",
        style: {
          fontSize: "12px",
        },
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        tickAmount: 6,
        floating: false,

        labels: {
          style: {
            colors: "#8e8da4",
          },
          offsetY: -7,
          offsetX: 0,
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
      },
      fill: {
        opacity: 0.5,
      },
      tooltip: {
        x: {
          format: "dd MMM",
        },
        fixed: {
          enabled: false,
          position: "topRight",
        },
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30,
          },
        },
        padding: {
          left: 20,
        },
      },
    },

    series: [
      {
        name: "sent Kb",
        data: [
          {
            x: 1996,
            y: 322,
          },
        ],
      },
      {
        name: "received Kb",
        data: [
          {
            x: 1996,
            y: 162,
          },
        ],
      },
    ],
  };

  const Cancel = () => {
    setshowModal(false);
  };

  const isFirstRunUsageHistory = useRef(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (isFirstRunUsageHistory.current) {
      isFirstRunUsageHistory.current = false;
      return;
    }
    async function UsageHistory() {
      ac.dc.setflashMessages([]);
      ac.dc.setloadingUsage(true);
      setrefreshUsage(true);
      fetch("/flask/usageHistory", {
        method: ["POST"],
        cache: "no-cache",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify(ac.dc.APIbody),
      }).then((response) => {
        return response.json;
      });
      fetch("/flask/usageHistory", { signal: signal })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            ac.dc.setloadingUsage(false);
            setrefreshUsage(false);
            ac.dc.setflashMessages(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {data.error[0]}
              </div>
            );
          } else {
            if (data.usageHistory.length > 30) {
              let range = data.usageHistory.length - 30;
              let dataCut = data.usageHistory.slice(range);
              dataCut.map((opt, index) => {
                let unix_timestamp = opt.ts;
                var date = new Date(unix_timestamp * 1000);
                let newArray = { ...usageHistory };

                newArray.series[0].data[index] = {
                  x: date,
                  y: opt.sent,
                };
                newArray.series[1].data[index] = {
                  x: date,
                  y: opt.received,
                };
              });
            } else {
              let dataCut = data.usageHistory;
              dataCut.map((opt, index) => {
                let unix_timestamp = opt.ts;
                var date = new Date(unix_timestamp * 1000);
                let newArray = { ...usageHistory };

                newArray.series[0].data[index] = { x: date, y: opt.sent };
                newArray.series[1].data[index] = { x: date, y: opt.received };
              });
            }
          }
        })

        .then(() => {
          setchart(
            <Chart
              options={usageHistory.options}
              series={usageHistory.series}
              type="area"
              height={350}
              // width="500"
            />
          );
        })
        .then(() => {
          setshowModal(true);
          ac.dc.setloadingUsage(false);
          setrefreshUsage(false);
        });

      return () => {
        abortController.abort();
        ac.dc.setflashMessages([]);
        ac.dc.setloadingUsage(false);
        setrefreshUsage(false);
      };
    }
    UsageHistory();
    // eslint-disable-next-line
  }, [ac.dc.triggerUsageHistory]);

  return (
    <div>
      {showModal ? (
        <Dialog open={true} fullWidth maxWidth={"md"}>
          <div>
            <div className="modal-dialog-summary modal-confirm-summary">
              <div>
                <div
                  style={{ borderBottom: "none", padding: 0 }}
                  className="modal-header"
                >
                  <button
                    onClick={Cancel}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                    style={{ top: "0px", right: "-55px", outline: "none" }}
                  >
                    <span>&times;</span>
                  </button>
                  <button
                    className="btn btn-light-refresh"
                    onClick={() =>
                      ac.dc.settriggerUsageHistory(
                        ac.dc.triggerUsageHistory + 1
                      )
                    }
                    type="button"
                    disabled={refreshUsage}
                  >
                    {refreshUsage && (
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                      />
                    )}
                    {refreshUsage && <span>Refresh</span>}
                    {!refreshUsage && <span>Refresh</span>}
                  </button>
                </div>
                <div
                  className="modal-body text-center"
                  style={{
                    fontSize: "11px",
                    color: "darkslategray",
                    padding: 0,
                  }}
                >
                  <h4>{ac.dc.clientName}</h4>
                  <div className="row">
                    <div className="mixed-chart">{chart}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      ) : (
        <div></div>
      )}
    </div>
  );
}
