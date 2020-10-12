import React from "react";
import ContentLoader from "react-content-loader";
import Dialog from "@material-ui/core/Dialog";

import "../../../styles/SkeletonLoading.scss";

export default function SkeletonTopologyModal(ac) {
  const handleTopologyModal = () => {
    ac.dc.setshowSkeletonTopologyModal(false);
  };

  const SkeletonTable = (props) => {
    return (
      <ContentLoader
        width={350}
        height={600}
        style={{ width: "100%", height: "100%" }}
        viewBox="0 0 350 600"
        backgroundColor="#f5f5f5"
        foregroundColor="#dbdbdb"
        {...props}
      >
        <rect x="4" y="8" rx="3" ry="3" width="8" height="570" />
        <rect x="5" y="573" rx="3" ry="3" width="331" height="7" />
        <rect x="329" y="9" rx="3" ry="3" width="8" height="570" />
        <rect x="102" y="69" rx="3" ry="3" idth="102" eight="7" />
        <rect x="92" y="47" rx="3" ry="3" width="178" height="6" />
        {/* <circle cx="48" cy="63" r="18" /> */}
        <rect x="95" y="95" rx="3" ry="3" width="178" height="6" />
        <rect x="105" y="169" rx="3" ry="3" width="102" height="7" />
        <rect x="95" y="147" rx="3" ry="3" width="178" height="6" />
        {/* <circle cx="51" cy="163" r="18" /> */}
        <rect x="98" y="195" rx="3" ry="3" width="178" height="6" />
        <rect x="107" y="265" rx="3" ry="3" width="102" height="7" />
        <rect x="97" y="243" rx="3" ry="3" width="178" height="6" />
        {/* <circle cx="53" cy="259" r="18" /> */}
        <rect x="100" y="291" rx="3" ry="3" width="178" height="6" />
        <rect x="108" y="365" rx="3" ry="3" width="102" height="7" />
        <rect x="98" y="343" rx="3" ry="3" width="178" height="6" />
        {/* <circle cx="54" cy="359" r="18" /> */}
        <rect x="101" y="391" rx="3" ry="3" width="178" height="6" />
        <rect x="110" y="458" rx="3" ry="3" width="102" height="7" />
        <rect x="100" y="436" rx="3" ry="3" width="178" height="6" />
        {/* <circle cx="56" cy="452" r="18" /> */}
        <rect x="103" y="484" rx="3" ry="3" width="178" height="6" />
        <rect x="114" y="507" rx="3" ry="3" width="102" height="7" />
        <rect x="103" y="534" rx="3" ry="3" width="178" height="6" />
        <rect x="5" y="8" rx="3" ry="3" width="331" height="7" />
      </ContentLoader>
    );
  };
  return (
    <div>
      {ac.dc.showSkeletonTopologyModal ? (
        <Dialog open={true} fullWidth>
          <div className="modal-dialog modal-confirm">
            <div className="modal-header">
              <button
                onClick={handleTopologyModal}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                style={{ top: "0px", right: "-55px", outline: "none" }}
              >
                <span>&times;</span>
              </button>
            </div>
            <div
              className="modal-body text-center"
              style={{ fontSize: "11px", color: "darkslategray" }}
            >
              <SkeletonTable />;
            </div>
          </div>
        </Dialog>
      ) : (
        <div></div>
      )}
    </div>
  );
}
