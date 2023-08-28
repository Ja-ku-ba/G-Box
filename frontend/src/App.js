import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  { AuthProvider } from "./context/AuthContext";

import "./App.css";
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";
import MailsList from "./pages/MailsList";
import MailView from "./pages/MailView";
import Login from "./pages/Login";
import SendMail from "./pages/SendMail";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [status, setStatus] = useState(false);
    
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} status={status}/>
                    <Routes>
                        {/* if conditions in <PrivateRoute/> are not met, then redirects you to login page */}
                        <Route element={<PrivateRoute/>}>
                            <Route path="/:filter/results:query?" element={<MailsList showSidebar={showSidebar} />} />
                            <Route path="/mail/:id" element={<MailView showSidebar={showSidebar} />} />
                            <Route path="/send" element={<SendMail showSidebar={showSidebar}></SendMail>}/>
                            {/* <Route path="/"></Route> allows you to use Private ROtes */}
                            <Route path="/" exact></Route>
                        </Route>
                        <Route element={<Login setStatus={setStatus}/>} path={"/login"}/>

                    </Routes>
                    <Footbar />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
