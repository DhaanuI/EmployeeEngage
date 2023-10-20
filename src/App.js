import "./App.css";
import { QuestLogin } from "./Components/Login";
import FeedBack from "./Components/Feedback";
import Navbar from "./Components/Navbar";


function App() {
  return (
    <div className="App">
      <Navbar />
      <QuestLogin />

      <FeedBack />
    </div>
  );
}

export default App;
