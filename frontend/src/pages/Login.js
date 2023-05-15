import React, {useState} from 'react'

import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate()
    let nav = () => {
        navigate('/inbox/ALL')
    }

    let [mail, setMail] = useState([])
    let [password, setPassword] = useState([])

    let display = async () => {
        let response = await fetch('/api/login/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:{}
        })
    }
    return (
    <div className="card text-center inbox-list login-container">
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
            <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                onChange={event => {
                    setMail(event.target.value)
                }}
            />
        </div>
        <div className="mb-3">
            <label htmlFor={"login-password"} className="form-label">Kod, a nie hasło</label>
            <input
                type="password"
                className="form-control"
                id={"login-password"}
                placeholder="name@example.com"
                onChange={event => {
                    setPassword(event.target.value)
                }}
            />
        </div>
        <div className="mb-3">
            <button type='button' onClick={display} className="btn btn-primary">Zaloguj</button>
        </div>
    </div>
    )
}

export default Login
