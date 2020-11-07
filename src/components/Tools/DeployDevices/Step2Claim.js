import React from "react";

export default function Step2Claim(ac) {
  function HandleSerialNumbers(e) {
    ac.dc.setserialNumbers(e.target.value);
    ac.dc.setSNpresent(true);
  }
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-body" style={{ minHeight: "400px" }}>
            <form className="form-inline" style={{ float: "left" }}>
              <label style={{ display: "block" }} htmlFor="Textarea">
                Insert serial-numbers
              </label>
              <div className="form-group">
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
    </div>
  );
}
