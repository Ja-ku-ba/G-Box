import React, {useContext} from 'react';

import { Outlet, Navigate } from 'react-router-dom';

import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
    let user = useContext(AuthContext)
    return(
            user.user ? <Outlet/> : <Navigate to={"/login"}/>
        )
};

export default PrivateRoute;
