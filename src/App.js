import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./pages/Chat";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chats" element={<Chat />}></Route>
      </Routes>
    </div>
  );
}

export default App;
