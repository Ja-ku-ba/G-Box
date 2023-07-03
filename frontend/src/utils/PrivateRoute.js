import React, {useContext} from 'react';

import { Outlet, Navigate } from 'react-router-dom';

import AuthContext from "../context/AuthContext";
const PrivateRoute = () => {
    const authenticated = false; // Replace with your authentication logic
    let user = useContext((AuthContext))
    return(
            user ? <Outlet/> : <Navigate to={"/login"}/>
        )
};

export default PrivateRoute;
