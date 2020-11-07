import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import SkeletonProfile from "./SkeletonProfile";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function Step7Summary(ac) {
  const [showtable, setshowtable] = useState(false);
  const [triggerSummary, settriggerSummary] = useState(0);
  const [retryCounter, setretryCounter] = useState(0);
  const [alertError, setalertError] = useState([]);
  const [dataRows, setdataRows] = useState([]);

  useEffect(() => {
    async function DeviceSummary() {
      setshowtable(false);

      let row = [];

      if (ac.dc.DevicesInfo.length > 0) {
        // eslint-disable-next-line
        ac.dc.DevicesInfo.map((opt) => {
          if (opt.length === 0) {
            setalertError(
              <div className="form-input-error-msg alert alert-danger">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                Ooops
              </div>
            );
            setTimeout(() => {
              setalertError([]);
            }, 6000);
            setshowtable(false);
          } else {
            var SummaryModel = {
              name: opt.name,
              serial: opt.serial,
              model: opt.model,
              address: opt.address,
              networkname: ac.dc.networkSelected,
              templateName: ac.dc.templateSelected,
            };
            row.push(SummaryModel);
          }
        });
      } else {
        ac.dc.setnextStepDisabled(false);
      }

      setdataRows(row);

      if (dataRows.length > 0) {
        setshowtable(true);
      } else {
        if (retryCounter < 4) {
          settriggerSummary(triggerSummary + 1);
          setretryCounter(retryCounter + 1);
        } else {
          ac.dc.setnextStepDisabled(false);
        }
      }
    }

    DeviceSummary();
    return () => {
      setshowtable(false);
    };
    // eslint-disable-next-line
  }, [triggerSummary]);

  const columns = [
    {
      dataField: "name",
      text: "Name",
      editable: false,
    },
    {
      dataField: "serial",
      text: "Serial",
      editable: false,
    },
    {
      dataField: "model",
      text: "Switch Model",
      editable: false,
    },
    {
      dataField: "address",
      text: "Address",
      editable: false,
    },
    {
      dataField: "networkname",
      text: "Network",
      editable: false,
    },
    {
      dataField: "templateName",
      text: "Template",
      editable: false,
    },
  ];

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-body" style={{ minHeight: "400px" }}>
            <div className="row">
              <div className="col-xs-12">
                {ac.dc.DevicesInfo.length > 0 ? (
                  <div>
                    {showtable ? (
                      <div className="panel panel-default">
                        <div className="bootstrap-table-panel">
                          <BootstrapTable
                            keyField="serial"
                            data={dataRows}
                            columns={columns}
                            tabIndexCell
                            striped
                            hover
                          ></BootstrapTable>
                        </div>
                      </div>
                    ) : (
                      <SkeletonProfile />
                    )}
                  </div>
                ) : (
                  <div className="text-center" style={{ position: "relative", top: "115px" }}>
                    <div className="display-1  mb-5">
                      <i className="fas fa-network-wired" aria-hidden="true"></i>
                    </div>
                    <h1 className="h2 mb-3">No changes have been made to your devices</h1>
                    <p className="h4  font-weight-normal mb-7">Click finish to exit the Wizard.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {alertError}
      </div>
    </div>
  );
}
