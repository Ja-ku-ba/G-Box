import React, { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";
import MailsList from "./pages/MailsList";
function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="App">
      <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <MailsList showSidebar={showSidebar} />
      <Footbar />
    </div>
  );
}

export default App;
