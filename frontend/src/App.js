import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";
import MailsList from "./pages/MailsList";
import MailView from "./pages/MailView";
import Login from "./pages/Login";

function App() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <Router>
            <div className="App">
                <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                <Routes>
                    <Route path="/" element={<MailsList showSidebar={showSidebar} />} exact />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/mail/:id" element={<MailView showSidebar={showSidebar} /> } exact />
                </Routes>
                <Footbar />
            </div>
        </Router>
    );

}

export default App;
