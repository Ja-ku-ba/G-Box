import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  { AuthProvider } from "./context/AuthContext";

import "./App.css";
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";
import MailsList from "./pages/MailsList";
import MailView from "./pages/MailView";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import sendMail from "./pages/SendMail";
import SendMail from "./pages/SendMail";

function App() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                    <Routes>
                        {/* if conditions in <PrivateRoute/> are not met, then redirects you to login page */}
                        <Route element={<Login/>} path={"/login"} exact/>
                        <Route element={<PrivateRoute/>}>
                            <Route path="/" element={<MailsList showSidebar={showSidebar} />} exact />
                            <Route path="/mail/:id" element={<MailView showSidebar={showSidebar} />} exact />
                            <Route path={"/send/"} element={<SendMail showSidebar={showSidebar} />} exact/>
                        </Route>
                    </Routes>
                    <Footbar />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
