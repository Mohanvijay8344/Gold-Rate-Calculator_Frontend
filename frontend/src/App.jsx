import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../components/Home/Home";
import Login from "./Login";
import Registration from "./Registration";
import Forgot from "./Forgot";
import Update from "./Update";
import  Home  from "./Home";



function App() {
  const [count, setCount] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Update/:id/:token" element={<Update />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
