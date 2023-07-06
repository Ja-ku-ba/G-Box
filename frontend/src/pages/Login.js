import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
    let {loginUser} = useContext(AuthContext)

    // const log = async () => {
    //     let response = await fetch("/login/", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({'passocde': passcode, 'email': email})
    //
    //     })
    //
    //     let data = await response.json();
    //     console.log(data, "---------")
    //     if (response.status === 200){
    //         console.log(data, "------------------------")
    //     }
    // }


    return (
        <form onSubmit={loginUser} className={"login-container"}>
        {/* <form onSubmit={log} className={"login-container"}>*/}
            <div className={"login-element"}>
                <label htmlFor={"email"}>Email</label>
                <input type={"email"} id={"email"}/>
            </div>
            <div className={"login-element"}>
                <label htmlFor={"passcode"}>Kod np:  nhbbmjrrhnumrojz</label>
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
