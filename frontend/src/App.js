
import './App.css';
import Inbox from './pages/Inbox'
import Sendbox from './pages/Sendbox'
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Inbox></Inbox>
    </div>
  );
}

export default App;
