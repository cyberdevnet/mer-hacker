import React from "react";
import "../../../styles/SkeletonLoading.scss";

export default function SkeletonLoading() {
  return (
    <div style={{ textAlign: "center" }} className="panel-body">
      <div className="content">
        <div className="planet">
          <div className="ring"></div>
          <div className="cover-ring"></div>
          <div className="spots">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <p className="p-planet">loading</p>
      </div>
    </div>
  );
}
