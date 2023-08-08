import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(() =>
    //     localStorage.getItem("authTokens")
    //         ? JSON.parse(localStorage.getItem("authTokens"))
    //         : null
    // );
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch("/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.email.value,
                password: e.target.passcode.value,
            }),
        });
        const data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            // setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/ALL");
        } else {
            alert("Coś poszło nie tak, sprawdź dane i spróbuj ponownie");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        // setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    };

    const updateToken = async () => {
        if (authTokens) {
            const response = await fetch("/token/refresh/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({'refresh':authTokens?.refresh})

            });
            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                // setUser(jwt_decode(data.refresh));
                localStorage.setItem("authTokens", JSON.stringify(data));
            } else {
                logoutUser();
            }
        }

        if (loading) {
            setLoading(false);
        }
    };

    const contextData = {
        // user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateToken();
        }, 240000); // 4 minutes = 240,000ms
        return () => clearInterval(interval);
    }, [authTokens]);

    return (
        <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
    );
};
