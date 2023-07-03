import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <form onSubmit={loginUser}>
                <label htmlFor={"email"}>Email</label>
                <input type={"text"} id={"email"}/>
                <label htmlFor={"password"}>Kod</label>
                <input type={"password"} id={"password"}/>
                <input type={"submit"} value={"Zaloguj się"}/>
        </form>
    );
};

export default Login;
