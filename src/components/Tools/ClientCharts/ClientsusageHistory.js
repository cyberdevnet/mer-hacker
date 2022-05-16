import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import GetApiKey from "../../../GetApiKey.js";
import axios from "axios";

export default function ClientsusageHistory(ac) {
  const [chart, setchart] = useState(false);

  let callApikey = GetApiKey(ac.cc.User);
  let apiKey = callApikey.apikey.current;

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    organizationId: `${ac.cc.organizationID}`,
    NET_ID: `${ac.cc.networkID}`,
    CLIENT_ID: `${ac.dc.clientID}`,
  };

  const usageHistory = {
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            customIcons: [
              {
                icon: '<span class="glyphicon glyphicon-refresh Usagehistory"></span>',
                index: 0,
                title: "Refresh",
                class: "custom-icon",
                click: function (chart, options, e) {
                  ac.dc.settriggerUsageHistory(ac.dc.triggerUsageHistory + 1);
                },
              },
            ],
          },
          autoSelected: "customIcons",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      title: {
        text: "Client usage history (1 month)",
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
      axios
        .post("/flask/usageHistory", APIbody)
        .then((data) => {
          if (data.data.error) {
            ac.dc.setloadingUsage(false);
            ac.dc.setflashMessages(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                {data.data.error[0]}
              </div>
            );
            setTimeout(() => {
              ac.dc.setflashMessages([]);
            }, 5000);
          } else {
            if (data.data.usageHistory.length > 30) {
              let range = data.data.usageHistory.length - 30;
              let dataCut = data.data.usageHistory.slice(range);
              // eslint-disable-next-line
              dataCut.map((opt, index) => {
                // let unix_timestamp = opt.ts;
                // var date = new Date(unix_timestamp * 1000);
                let newArray = { ...usageHistory };

                newArray.series[0].data[index] = {
                  x: opt.ts,
                  y: opt.sent,
                };
                newArray.series[1].data[index] = {
                  x: opt.ts,
                  y: opt.received,
                };
              });
            } else {
              let dataCut = data.data.usageHistory;
              // eslint-disable-next-line
              dataCut.map((opt, index) => {
                // let unix_timestamp = opt.ts;
                // var date = new Date(unix_timestamp * 1000);
                let newArray = { ...usageHistory };

                newArray.series[0].data[index] = { x: opt.ts, y: opt.sent };
                newArray.series[1].data[index] = { x: opt.ts, y: opt.received };
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
            />
          );
        })
        .then(() => {
          ac.dc.setloadingUsage(false);
        });

      return () => {
        abortController.abort();
        ac.dc.setflashMessages([]);
        ac.dc.setloadingUsage(false);
      };
    }
    UsageHistory();
    // eslint-disable-next-line
  }, [ac.dc.triggerUsageHistory]);

  return (
    <div>
      <div className="modal-dialog-summary modal-confirm-summary">
        <div>
          <div
            className="modal-body text-center"
            style={{
              fontSize: "11px",
              color: "darkslategray",
              padding: 0,
            }}
          >
              <div className="mixed-chart">{chart}</div>
            {/* <div className="row">
              <div className="mixed-chart">{chart}</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
