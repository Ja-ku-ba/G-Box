import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";
import MailsList from "./pages/MailsList";
import MailView from "./pages/MailView";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <Router>
            <div className="App">
                <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                <Routes>
                    {/* if conditions in <PrivateRoute/> are not met, then redirects you to login page */}
                    <Route element={<Login/>} path={"/login"} exact/>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/" element={<MailsList showSidebar={showSidebar} />} exact />
                        <Route path="/mail/:id" element={<MailView showSidebar={showSidebar} />} exact />
                    </Route>
                </Routes>
                <Footbar />
            </div>
        </Router>
    );
}

export default App;
