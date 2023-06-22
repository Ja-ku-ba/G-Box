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

function App() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <Router>
            <div className="App">
                <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                <Routes>
                    <Route path="/" element={<MailsList showSidebar={showSidebar} />} exact />
                    <Route path="/mail/:id" element={<MailView />} exact />
                </Routes>
                <Footbar />
            </div>
        </Router>
    );

}

export default App;
