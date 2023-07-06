import { createContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

import jwt_decode from "jwt-decode";


const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null)
    let [authTokens, setAuthToken] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [loading, setLoadnig] = useState(true)

    let navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch("/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({'email': e.target.email.value, 'passcode': e.target.passcode.value})
        })

        let data = await response.json();

        if (response.status === 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate("/")
        } else {
            alert("Coś poszło nie tak, sprawdź dane i spróbuj ponownie")
        }
    }

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate("/login")
    }
    // let updateToken = async () => {
    //     console.log(("-----------------------------"))
    //     console.log(authTokens)
    //     let response = await fetch("/token/refresh/", {
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({'refresh':authTokens?.refresh})
    //     })
    //     console.log(response)
    //     let data = await response.json()
    //     if (response.status === 200){
    //         console.log("Poszło cacy")
    //         setAuthToken(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens', JSON.stringify(data))
    //     }else{
    //         console.log("Coś poszło nie tak")
    //     }
    //
    // }
    let updateToken = async () => {
        console.log(("-----------------------------"))
        console.log(authTokens)
        let response = await fetch("/token/refresh/", {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens?.refresh}`
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        console.log(response)
        let data = await response.json()
        if (response.status === 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoadnig(false)
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
        }, 1000) // 4 minutes = 24000ms
        return () => clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}