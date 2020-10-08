import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Redirect, useHistory } from "react-router-dom";

const ProtectedRouteSettings = ({ component: Component, ac, ...rest }) => {
  const [tempState, settempState] = useState(false);


  axios.defaults.withCredentials = true;


  useEffect(() => {
    readCookie();
    // eslint-disable-next-line
  }, []);

  let history = useHistory();

  const readCookie = async () => {
    try {
      // eslint-disable-next-line
      const res = await axios
        .post("/node/read-cookie", {
              username: rest.User,
              isSignedIn: rest.isSignedIn,
            })

        .then((res) => {
          if (res.data.user === "admin") {
            settempState(res.data.signedIn);
            rest.setisSignedIn(true);
            return res.data.signedIn;
          } else {
            rest.setisSignedIn(false);

            history.push("/home");
          }
        });
    } catch (e) {
      console.log("ReadCookie Error:", e);
    }
  };

  return (
    <div>
      {tempState ? (
        <Route
          {...rest}
          render={(props) => {
            if (tempState === true) {
              return <Component {...rest} {...props} />;
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/home",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            }
          }}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProtectedRouteSettings;
