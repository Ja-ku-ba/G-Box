import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
    let {loginUser} = useContext(AuthContext)

    return (
        <form onSubmit={loginUser} className={"login-container"}>
            <div className={"login-element"}>
                <label htmlFor={"email"}>Email</label>
                <input type={"text"} id={"email"}/>
            </div>
            <div className={"login-element"}>
                <label htmlFor={"passcode"}>Kod np:  cfsadqbpuoxsaezo</label>
                <input  type={"password"} id={"passcode"}/>
                <div className={"how-to-get-code"}>
                    <small>
                        Nie wiesz jak zdobyć kod? &nbsp;
                        <a href={"https://www.youtube.com/watch?v=1YXVdyVuFGA"} rel="noreferrer" target={"_blank"}>Kliknij ten link</a>
                    </small>
                </div>
            </div>
            <div className={"login-element"}>
                <input className={"login-button"} type={"submit"} value={"Zaloguj się"}/>
            </div>
        </form>
    );
};

export default Login;
