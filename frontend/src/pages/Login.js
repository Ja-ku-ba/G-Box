import React, { useState, createContext } from 'react'

import { useNavigate } from "react-router-dom";

const UserContext = createContext("example@mail.com");

const Login = () => {
    let navigate = useNavigate()

    let [mail, setMail] = useState([])
    let [password, setPassword] = useState([])

    const [user, setUser] = useState('example@example.com');

    let display = async () => {
        let response = await fetch('/api/login/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: mail,
                code: password
            })
        })
        if (response.ok) {
            // Login successful, navigate to the inbox page
            setUser(mail)
            console.log("Weszło!", mail)
            navigate('/inbox/ALL');
        } else {
            // Login failed or unauthorized
            alert('Coś poszło nie tak');
        }
    }
    return (
            <form className="card text-center inbox-list login-container">
                <div className="mb-3">
                    <label htmlFor="login-emial" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="login-emial"
                        placeholder="name@example.com"
                        onChange={event => {
                            setMail(event.target.value)
                        }}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor={"login-password"} className="form-label">Kod, a nie hasło, np: "nhbbmjrrhnumrojz"</label>
                    <input
                        type="password"
                        className="form-control"
                        id={"login-password"}
                        onChange={event => {
                            setPassword(event.target.value)
                        }}
                        required
                    />
                </div>
                <div className="mb-3">
                    <button type='button' onClick={display} className="btn btn-primary">Zaloguj</button>
                </div>
            </form>
    )
}

export default Login
export { UserContext };
