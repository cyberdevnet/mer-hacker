import React from "react";

export default function Step2Claim(ac) {
  function HandleSerialNumbers(e) {
    ac.dc.setserialNumbers(e.target.value);
    ac.dc.setSNpresent(true);
  }
  return (
    <div className="row-inventory">
      <div className="card">
        <div className="card-body" style={{ minHeight: "400px" }}>
          <form style={{ float: "left" }}>
            <div className="form-group">
              <label style={{ display: "block" }} htmlFor="Textarea">
                Insert serial-numbers
              </label>
              <textarea
                onChange={(e) => HandleSerialNumbers(e)}
                style={{ width: "300px", height: "200px" }}
                className="form-control"
                id="Textarea"
                rows="3"
                value={ac.dc.serialNumbers}
              ></textarea>
            </div>
          </form>
        </div>
        {ac.dc.validationError}
      </div>
    </div>
  );
}
