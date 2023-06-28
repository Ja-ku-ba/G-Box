import React from "react";

const Login = () => {

    return (
        <form>
                <label htmlFor={"email"}>Email</label>
                <input type={"text"} id={"email"}/>
                <label htmlFor={"passcode"}>Kod</label>
                <input type={"password"} id={"passcode"}/>
                <input type={"submit"} value={"Zaloguj się"}/>
        </form>
    );
};

export default Login;
