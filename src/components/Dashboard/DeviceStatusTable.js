import React, { useState, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import { MDBDataTableV5 } from "mdbreact";
import GetApiKey from '../../GetApiKey.js'

import "../../styles/Dashboard.css";

export default function DeviceStatusTable(ac) {
  const [mapRows, setmapRows] = useState([]);
  const [pagination, setpagination] = useState(false);
  const [fullPagination, setfullPagination] = useState(false);
  const [showtable, setshowtable] = useState(false);
  const [trigger, settrigger] = useState(0);

  let callApikey = GetApiKey(ac.User, ac.isSignedIn);
  let apiKey = callApikey.apikey.current;

  const APIbody = {
    "X-Cisco-Meraki-API-Key": `${apiKey}`,
    organizationId: `${ac.organizationID}`,
    NET_ID: `${ac.networkID}`,
  };

  useEffect(() => {
    setTimeout(() => {
      settrigger(trigger + 1)
      
    }, 2000);
    return () => {
      
    }
    // eslint-disable-next-line
  }, [])

      const isFirst = useRef(true);

    useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      if (isFirst.current) {
        isFirst.current = false;
        return;
      }
      async function callDeviceStatus() {

        if (ac.organizationID !== 0 && ac.networkID !== 0) {
          setpagination(false);
          setfullPagination(false);
          try {
            fetch("/flask/device_status", {
              method: ["POST"],
              cache: "no-cache",
              headers: {
                content_type: "application/json",
              },
              body: JSON.stringify(APIbody),
            }).then((response) => {
              return response.json;
            });
            fetch("/flask/device_status", { signal: signal })
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  ac.setflashMessages(
                    <div className="form-input-error-msg alert alert-danger">
                      <span className="glyphicon glyphicon-exclamation-sign"></span>
                      {data.error[0]}
                    </div>
                  );
                } else {
                  ac.setdeviceStatusList(data.deviceStatus);
                  ac.settotaldeviceStatusList(data.deviceStatus.length);
  
                  if (data.deviceStatus.length > 25) {
                    setpagination(true);
                    setfullPagination(true);
                  }
  
                  //devices list table
  
                  let row = [];
                  // eslint-disable-next-line
                  data.deviceStatus.map((item) => {
                    const name = [];
                    // eslint-disable-next-line
                    ac.networkList.map((network) => {
                      if (network.id === item.networkId) {
                        name.push(network.name);
                      }
                    });
                    if (item.usingCellularFailover) {
                      row.push({
                        name: item.name,
                        status: item.status,
                        networkId: name,
                        lanIp: item.lanIp,
                        publicIp: item.publicIp,
                        wan1Ip: item.wan1Ip,
                        wan2Ip: item.wan2Ip,
                        serial: item.serial,
                        usingCellularFailover: (
                          <span
                            className="glyphicon glyphicon-check"
                            style={{ color: "#1ABC9C" }}
                          ></span>
                        ),
                      });
                    } else {
                      row.push({
                        name: item.name,
                        status: item.status,
                        networkId: name,
                        lanIp: item.lanIp,
                        publicIp: item.publicIp,
                        wan1Ip: item.wan1Ip,
                        wan2Ip: item.wan2Ip,
                        serial: item.serial,
                      });
                    }
                    setmapRows(row);
                  });
                }
              })
              .then(() => {
                setshowtable(true);
              });
          } catch (err) {
            if (err) {
              console.log(err);
            }
          }
        } else {
          return function cleanup() {
            abortController.abort();
            setshowtable(false);
          };
        }

      }

      callDeviceStatus();
      return function cleanup() {
        abortController.abort();
        setshowtable(false);
      };
      // eslint-disable-next-line
    }, [trigger, ac.organizationID, ac.networkID]);
    




  const datatable = {
    columns: [
      {
        label: "Name",
        field: "name",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Description",
        },
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 270,
      },
      {
        label: "Network",
        field: "networkId",
        sort: "asc",
        width: 270,
      },
      {
        label: "Lan IP",
        field: "lanIp",
        sort: "asc",
        width: 100,
      },
      {
        label: "Public IP",
        field: "publicIp",
        sort: "asc",
        width: 100,
      },
      {
        label: "WAN 1",
        field: "wan1Ip",
        sort: "asc",
        width: 100,
      },
      {
        label: "WAN 2",
        field: "wan2Ip",
        sort: "asc",
        width: 100,
      },
      {
        label: "Cellular",
        field: "usingCellularFailover",
        sort: "asc",
        width: 50,
      },
      {
        label: "Serial",
        field: "serial",
        sort: "asc",
        width: 100,
      },
    ],
    rows: mapRows,
  };

  return (
    <div>
      {showtable ? (
        <div className="panel-body">
          <CSVLink data={mapRows} separator={","}>
            <button className="btnCSV" color="primary">
              Download CSV
            </button>
          </CSVLink>
          <MDBDataTableV5
            hover
            striped
            bordered
            small
            data={datatable}
            paging={pagination}
            searchTop
            searchBottom={false}
            exportToCSV={true}
            entriesOptions={[25, 100, 250, 500]}
            entries={25}
            fullPagination={fullPagination}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
