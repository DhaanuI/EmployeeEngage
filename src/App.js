import "./App.css";
import { QuestLogin } from "./Components/Login";
import FeedBack from "./Components/Feedback";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import "@questlabs/react-sdk/dist/style.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      {/* <QuestLogin />
      <FeedBack /> */}
    </div>
  );
}

export default App;
