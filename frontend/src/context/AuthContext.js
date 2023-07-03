import { createContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

import jwt_decode from "jwt-decode";


const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({children}) => {

    // localStorage.getItem("authTokens")

    let [user, setUser] = useState(null)
    let [authTokens, setAuthToken] = useState(null)

    let navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch("/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({'username': e.target.email.value, 'password': e.target.password.value})
        })

        let data = await response.json();

        if (response.status === 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate("/")
        } else {
            alert("Something went wrong")
        }
    }

    let contextData = {
        user:user,
        loginUser:loginUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}