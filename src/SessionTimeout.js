import React, { useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import $ from 'jquery'





export default function SessionTimeout(ac) {



    // useEffect(() => {

    //     const timer =
    //         ac.dc.isSignedIn === true && ac.dc.sessionTime > 0 && setInterval(() => ac.dc.setsessionTime(ac.dc.sessionTime - 1), 1000);


    //     if (ac.dc.sessionTime === 20) {
    //         ac.dc.setsessionTimeout(true)

    //     }
    //     if (ac.dc.sessionTime === 0) {
    //         handleLogOff()
    //         ac.dc.setsessionTime(3600)

    //     }

    //     return () => clearInterval(timer);


    //     // eslint-disable-next-line
    // }, [ac.dc.isSignedIn, ac.dc.sessionTime]);



    // const handleClose = () => {
    //     ac.dc.setsessionTimeout(false);
    //     ac.dc.setsessionTime(3600)
    // };



    // const handleLogOff = () => {
    //     ac.dc.setapiKey("");
    //     ac.dc.setgetOrgStatusCode(0);
    //     ac.dc.setsessionTimeout(false);
    //     ac.dc.setsessionTime(3600)
    //     ac.dc.setisSignedIn(false)
    //     ac.dc.setswitchLoginAPI(true);
    //     ac.dc.setswitchDashboard(false);
    //     ac.dc.setswitchLoggedout(false);
    //     ac.dc.setinputKey("");
    //     ac.dc.setinputConfKey("");
    //     ac.dc.setorganization("Set Organization");
    //     ac.dc.setnetworkID(0);
    //     ac.dc.setnetwork("Networks");
    //     // if (ac.dc.switchLoggedOut === true) {
    //     ac.dc.setcollapseButton({ display: 'none' })
    //     $(this).addClass('closed');
    //     $('.navbar-side').css({ left: '-260px' });
    //     $('#page-wrapper').css({ 'margin-left': '0px' });
    //     // }
    //     ac.dc.sethideLogin({ display: "block" });
    // };



    return (
        <div></div>
        // <Dialog
        //     open={ac.dc.sessionTimeout}
        //     onClose={handleClose}
        //     aria-labelledby="alert-dialog-title"
        //     aria-describedby="alert-dialog-description"
        // >
        //     <div className="modal-content">
        //         <div className="modal-header">
        //             <h4 className="modal-title-idle">Your session is about to expire</h4>
        //         </div>
        //         <div className="modal-body-idle">
        //             <p className>
        //                 Please choose to stay signed in or to logoff.
        //                 Otherwise, you will be logged off automatically.
        //               </p>
        //         </div>
        //         <div className="modal-footer">
        //             <button
        //                 onClick={handleClose}
        //                 type="button"
        //                 className="btn btn-info"
        //             >
        //                 Stay Logged in ({ac.dc.sessionTime})
        //               </button>
        //             <button
        //                 onClick={handleLogOff}
        //                 type="button"
        //                 className="btn btn-danger"
        //                 data-dismiss="modal"
        //             >
        //                 Log Off
        //               </button>
        //         </div>
        //     </div>
        // </Dialog>

    )




}
