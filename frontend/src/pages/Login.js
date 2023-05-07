import React from 'react'

import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate()
    let nav = () => {
        navigate('/inbox/ALL')
    }
    return (
        <div>
            majl page
            <button type='button' onClick={nav}>Zaloguj</button>
        </div>
    )
}

export default Login
