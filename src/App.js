import "./App.css";
import "@questlabs/react-sdk/dist/style.css";
import Login from "./Components/Login";
import FeedBack from "./Components/Feedback";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
