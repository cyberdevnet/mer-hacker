import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Route, Redirect, useHistory } from 'react-router-dom';



const ProtectedRoute = ({ component: Component, ac, ...rest }) => {
    const [tempState, settempState] = useState(false)

    useEffect(() => {
        readCookie()

    }, [])

    let history = useHistory();

    const readCookie = async () => {
        try {
            const res = await axios.get('/read-cookie');

            if (res.data.signedIn === true) {
                settempState(res.data.signedIn);
                return res.data.signedIn
            } else {
                history.push('/login')
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
}

export default ProtectedRoute;