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
           <Route path="/" exact Component={Login}></Route>
          <Route path="/inbox/:filter" exact Component={Inbox}></Route>
          <Route path="/mail/<str:subject>/<str:date>" Component={Mail}></Route>
          <Route path="/send" exact Component={Send}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
