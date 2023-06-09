import "./App.css";
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";
import MailsList from "./components/MailsList";
function App() {
  return (
    <div className="App">
      <Navbar />
      <MailsList />
      <Footbar />
    </div>
  );
}

export default App;
