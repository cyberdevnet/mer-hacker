import React, { useEffect, useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import Step1Network from "./Step1Network";
import Step2Claim from "./Step2Claim";
import Step3Deploy from "./Step3Deploy";
import Step4Template from "./Step4Template";
import Step5Profile from "./Step5Profile";
import Step6DeviceInfo from "./Step6DeviceInfo";
import Step7Summary from "./Step7Summary";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import "../../../styles/DeployDevices.css";

export default function DeployDevices(ac) {
  const [startWizard, setstartWizard] = useState(false);
  const [SNpresent, setSNpresent] = useState(false);
  const [showInput, setshowInput] = useState(false);
  const [newNetwork, setnewNetwork] = useState(false);
  const [newNetworkCreated, setnewNetworkCreated] = useState(false);
  const [nextStepDisabled, setnextStepDisabled] = useState(false);
  const [networkisSelected, setnetworkisSelected] = useState(false);
  const [SNisValidated, setSNisValidated] = useState(false);
  const [networkSelected, setnetworkSelected] = useState([]);
  const [networkIDSelected, setnetworkIDSelected] = useState([]);
  const [newNetworkName, setnewNetworkName] = useState([]);
  const [serialNumbers, setserialNumbers] = useState([]);
  const [templatesList, settemplatesList] = useState([]);
  const [profilesList, setprofilesList] = useState([]);
  const [templateSelected, settemplateSelected] = useState([]);
  const [isTemplateSelected, setisTemplateSelected] = useState(false);
  const [profileSelected, setprofileSelected] = useState([]);
  const [configTemplateId, setconfigTemplateId] = useState([]);
  const [switchProfileId, setswitchProfileId] = useState([]);
  const [switchProfileModel, setswitchProfileModel] = useState([]);
  const [validationError, setvalidationError] = useState([]);
  const [triggerValidateSN, settriggerValidateSN] = useState(0);
  const [triggerCreateNetwork, settriggerCreateNetwork] = useState(0);
  const [DevicesInfo, setDevicesInfo] = useState([]);

  function CloseWizard() {
    setstartWizard(false);
    setSNpresent(false);
    setnewNetwork(false);
    setnextStepDisabled(false);
    setnetworkisSelected(false);
    setSNisValidated(false);
    setisTemplateSelected(false);
    setnetworkSelected([]);
    setnewNetworkName([]);
    setnetworkIDSelected([]);
    setnewNetworkName([]);
    setserialNumbers([]);
    settemplatesList([]);
    settemplateSelected([]);
    settemplateSelected([]);
    setprofileSelected([]);
    setconfigTemplateId([]);
    setswitchProfileId([]);
    setswitchProfileModel([]);
    setvalidationError([]);
    setDevicesInfo([]);
    handleReset();
  }

  const theme = createMuiTheme({
    overrides: {
      root: {
        width: "100%",
      },
      MuiStepIcon: {
        root: {
          "&$active": {
            color: "#337ab7",
            fontSize: "30px",
          },
          "&$completed": {
            color: "#1ABC9C",
            fontSize: "30px",
          },
        },
      },
      MuiTypography: {
        body1: {
          fontSize: "14px",
          fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
        },
        body2: {
          fontSize: "12px",
        },
      },
    },
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const dc = {
    SNpresent,
    setSNpresent,
    showInput,
    setshowInput,
    serialNumbers,
    setserialNumbers,
    networkSelected,
    setnetworkSelected,
    networkIDSelected,
    setnetworkIDSelected,
    newNetwork,
    setnewNetwork,
    newNetworkName,
    setnewNetworkName,
    templatesList,
    settemplatesList,
    templateSelected,
    settemplateSelected,
    configTemplateId,
    setconfigTemplateId,
    profilesList,
    setprofilesList,
    profileSelected,
    setprofileSelected,
    switchProfileId,
    setswitchProfileId,
    switchProfileModel,
    setswitchProfileModel,
    startWizard,
    setstartWizard,
    nextStepDisabled,
    setnextStepDisabled,
    validationError,
    setvalidationError,
    networkisSelected,
    setnetworkisSelected,
    triggerCreateNetwork,
    settriggerCreateNetwork,
    newNetworkCreated,
    setnewNetworkCreated,
    isTemplateSelected,
    setisTemplateSelected,
    DevicesInfo,
    setDevicesInfo,
  };

  // <================================================================================>

  function getSteps() {
    return ["Network", "Claim", "Deploy", "Template", "Switch Profile", "Devices Info", "Summary"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Step1Network {...ac.dc} dc={dc} />;
      case 1:
        return <Step2Claim {...ac.dc} dc={dc} />;
      case 2:
        return <Step3Deploy {...ac.dc} dc={dc} />;
      case 3:
        return <Step4Template {...ac.dc} dc={dc} />;
      case 4:
        return <Step5Profile {...ac.dc} dc={dc} />;
      case 5:
        return <Step6DeviceInfo {...ac.dc} dc={dc} />;
      case 6:
        return <Step7Summary {...ac.dc} dc={dc} />;
      default:
        return "Unknown step";
    }
  }

  const isStepOptional = (step) => {
    return step === 3 || step === 4 || step === 5 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setnextStepDisabled(false);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isFirstRunValidateSN = useRef(true);
  useEffect(() => {
    if (isFirstRunValidateSN.current) {
      isFirstRunValidateSN.current = false;
      return;
    }
    function validateSerialNumbers() {
      const SNformat = /^((^|,)([a-zA-Z\d]{4}-[a-zA-Z\d]{4}-[a-zA-Z\d]{4}|[a-zA-Z\d]{4}-[a-zA-Z\d]{4}-[a-zA-Z\d]{4}|[a-zA-Z\d]{4}-[a-zA-Z\d]{4}-[a-zA-Z\d]{4}|[a-zA-Z\d]{4}-[a-zA-Z\d]{4}-[a-zA-Z\d]{4}))+$/;
      if (serialNumbers.length > 0) {
        if (serialNumbers.match(SNformat)) {
          setSNisValidated(true);
          handleNext();
          setnextStepDisabled(true);
          setvalidationError([]);
        } else {
          setSNisValidated(false);
          setvalidationError(
            <div className="form-input-error-msg alert alert-danger">
              <span className="glyphicon glyphicon-exclamation-sign"></span>
              Please insert a valid Meraki serial-number in format AAAA-BBBB-CCCC or a list of
              comma-separated serial-numbers (I2TN-B63E-SB6F,I2TN-B63E-SB6F,I2TN-B63E-SB6F...)
            </div>
          );
          setTimeout(() => {
            setvalidationError([]);
          }, 5000);
        }
      } else {
        setSNisValidated(false);
        setvalidationError(
          <div className="form-input-error-msg alert alert-danger">
            <span className="glyphicon glyphicon-exclamation-sign"></span>
            Please insert a valid Meraki serial-number in format AAAA-BBBB-CCCC or a list of
            comma-separated serial-numbers (I2TN-B63E-SB6F,I2TN-B63E-SB6F,I2TN-B63E-SB6F...)
          </div>
        );
        setTimeout(() => {
          setvalidationError([]);
        }, 5000);
      }
    }

    [serialNumbers].forEach(validateSerialNumbers);
    // eslint-disable-next-line
  }, [triggerValidateSN]);

  const handleNext = () => {
    //validate if network is selected or new must be created
    if (activeStep === 0 && networkisSelected === false) {
      setvalidationError(
        <div className="form-input-error-msg alert alert-danger">
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          Network is required
        </div>
      );
      setTimeout(() => {
        setvalidationError([]);
      }, 6000);
      return;
    }
    // validate serial numbers
    if (activeStep === 1 && SNisValidated === false) {
      settriggerValidateSN(triggerValidateSN + 1);
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  return (
    <div>
      <Dialog open={startWizard} fullWidth={true} maxWidth="md">
        <div className="deploy-devices">
          <div className="modal-header stepzilla">
            <button
              onClick={CloseWizard}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              style={{ top: "0px", right: "-30px", outline: "none", position: "relative" }}
            ></button>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography component={"span"} variant="caption">
                        Optional
                      </Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div style={{ marginTop: "1px" }}>
                    <div id="myModal">
                      <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                          <div className="modal-body">
                          <div className="fa fa-check-circle" style={{ color: "#1ABC9C", fontSize:'60px' }}></div>
                            <h4 className="modal-title">Awesome!</h4>
                            <div>
                              <p>Your devices have been claimed and updated.</p>
                            </div>
                          </div>
                          <div className="modal-footer-logged-in">
                            <button
                              onClick={CloseWizard}
                              className="btn btn-success btn-block summary"
                              data-dismiss="modal"
                            >
                              Exit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Typography component={"span"}>{getStepContent(activeStep)}</Typography>
                    <div>
                      <button
                        className="btn btn-primary back"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                      >
                        Back
                      </button>
                      <button
                        className="btn btn-primary next"
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        type="submit"
                        disabled={nextStepDisabled}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </button>
                      {isStepOptional(activeStep) && (
                        <button
                          className="btn btn-primary skip"
                          variant="contained"
                          color="primary"
                          onClick={handleSkip}
                        >
                          Skip
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ThemeProvider>
          </div>
        </div>
      </Dialog>
      <div id="page-inner-main-templates">
        <div className="row-inventory tools">
          <div className="col-xs-12">
            <div className="card">
              <div className="card-body">
                <div id="accordion">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-description">
                        <a
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseOne"
                          className="collapsed"
                        >
                          <span className="fas fa-info-circle"></span>
                        </a>
                      </h4>
                    </div>
                    <div id="collapseOne" className="panel-collapse collapse">
                      <div className="panel-body">
                        <dl>
                          <dt>DESCRIPTION WIP</dt>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={() => setstartWizard(true)}>
                  Start Wizard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
