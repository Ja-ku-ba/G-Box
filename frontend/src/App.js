import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Inbox from './pages/Inbox'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact component={Inbox}></Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
