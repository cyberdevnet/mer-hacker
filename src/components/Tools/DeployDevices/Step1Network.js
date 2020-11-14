import React, { useState } from "react";
import Select from "react-select";

export default function Step1Network(ac) {
  const [selectIsDisabled, setselectIsDisabled] = useState(false);

  let NETWORKS = ac.networkList.map((opt, index) => ({
    label: opt.name,
    value: index,
    id: opt.id,
  }));

  const HandleNetwork = (opt) => {
    ac.dc.setnetworkSelected(opt.label);
    ac.dc.setnetworkIDSelected(opt.id);
    ac.dc.setnextStepDisabled(false);
    ac.dc.setnetworkisSelected(true);
  };

  const HandleNewNetwork = (e) => {
    if (e.target.value) {
      ac.dc.setnewNetwork(true);
      ac.dc.setnextStepDisabled(false);
      ac.dc.setnewNetworkName(e.target.value);
      ac.dc.setnetworkSelected(e.target.value);
      ac.dc.setnetworkisSelected(true);
      ac.dc.setnetworkIDSelected([]);
      setselectIsDisabled(true);
    } else {
      ac.dc.setnewNetwork(false);
      setselectIsDisabled(false);
    }
  };

  return (
    <div className="row-inventory">
      <div className="card">
        <div className="card-body" style={{ minHeight: "400px" }}>
          <form style={{ float: "left" }}>
            <div>
              <div className="form-group">
                <Select
                  className="select_network_stepzilla"
                  options={NETWORKS}
                  placeholder="Select Network"
                  onChange={HandleNetwork}
                  classNamePrefix="time-interval"
                  isDisabled={selectIsDisabled}
                />
              </div>
              <label htmlFor="or">Or</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control networkname"
                  placeholder="New Network name"
                  onChange={(e) => HandleNewNetwork(e)}
                  required="required"
                  data-error="Please enter a network name."
                  value={ac.dc.newNetworkName}
                />
              </div>
            </div>
          </form>
        </div>
        {ac.dc.validationError}
      </div>
    </div>
  );
}
