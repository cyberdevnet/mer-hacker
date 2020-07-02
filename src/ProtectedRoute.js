import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Route, Redirect } from 'react-router-dom';
import LoginAPI from "../src/components/LoginAPI";




// const PrivateRoute = ({ component, ...ac }) => {
//     console.log("PrivateRoute -> ac", ac)
//     const { cookie } = readCookie();

//     const finalComponent = ac.isSignedIn ? component : LoginAPI;

//     return <Route {...ac} component={finalComponent} />;
//   };





const ProtectedRoute = ({ component: Component, ac, ...rest }) => {

    const [tempState, settempState] = useState(false)
    console.log("ProtectedRoute -> tempState", tempState)

    useEffect(() => {
        readCookie()

    }, [])


    const readCookie = async () => {
        try {
            const res = await axios.get('/read-cookie');

            if (res.data.signedIn === true) {
                settempState(res.data.signedIn);
                return res.data.signedIn
            }
        } catch (e) {
            console.log('ReadCookie Error:', e);
        }
    };






    return (
        <div>
            {tempState ? (<Route {...rest}
                render={props => {

                    if (rest.isSignedIn === true) {

                        return <Component {...rest} {...props} />
                    }
                    else {
                        return (<Redirect
                            to={{
                                pathname: '/login',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                        )
                    }



                }} />) : (<div></div>)}
        </div>
    )

    // return (
    //     <Route {...rest}
    //         render={props => {


    //             if (rest.isSignedIn === true) {
    //                 return <Component {...rest} {...props} />
    //             }
    //             else {
    //                 return (<Redirect
    //                     to={{
    //                         pathname: '/login',
    //                         state: {
    //                             from: props.location
    //                         }
    //                     }}
    //                 />
    //                 )
    //             }



    //         }} />
    // )




}



// const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
//     <Route {...rest} render={props => (
//         isAuthenticated ? (
//             <Component {...props} />
//         ) : (
//                 <Redirect to={{
//                     pathname: '/login',
//                     state: { from: props.location }
//                 }} />
//             )
//     )} />
// )

export default ProtectedRoute;