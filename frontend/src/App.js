import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import './App.css';
import Inbox from './pages/Inbox'
import Navbar from './components/Navbar'
import Mail from './pages/Mail'
import Send from './pages/Send'
import Login from "./pages/Login";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/inbox/:filter" element={<Inbox />} />
                    <Route path="/mail/:subject/:date" element={<Mail />} />
                    <Route path="/send" element={<Send />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
