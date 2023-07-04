import { createContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

import jwt_decode from "jwt-decode";


const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null)
    let [authTokens, setAuthToken] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null)
    let [loading, setLoadnig] = useState(true)

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

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate("/login")
    }

    let updateToken = async () => {
        let response = await fetch("/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({'refresh': authTokens.refresh})
        })
        console.log("Update token")
        console.log(authTokens.refresh)

        let data = await response.json()

        if (response.status === 200) {
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
        }
        else {
            logoutUser()
        }
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (authTokens){
                updateToken()
            }
        }, 100)
        return () => clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}