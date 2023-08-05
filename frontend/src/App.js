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
                        <Route element={<Login setStatus={setStatus}/>} path={"/login"} exact/>
                        <Route element={<PrivateRoute/>}>
                            <Route path="/:filter" element={<MailsList showSidebar={showSidebar} />} exact />
                            <Route path="/mail/:id" element={<MailView showSidebar={showSidebar} />} exact />
                        </Route>
                    </Routes>
                    <Footbar />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
