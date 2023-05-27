import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Home  from "./Home";
import Forgot  from "./Forgot";
import { Reset } from "./Reset";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



function App() {
  const navigate = useNavigate();
  let Logout = async () => {
    let sure = await swal("Are you sure to Logout?", {
        buttons: ["No", true],
    });
    console.log(sure);
    if (sure === true) {
        localStorage.clear();
        navigate('/')
    }
  }
  return (
    <div>
      <AppBar className="App" sx={{ backgroundColor: "green" }}>
          <Toolbar>
            {/* <Button onClick={()=>navigate("/")} color="inherit">SIGNIN</Button> */}
            <Button onClick={()=>navigate("/signup")} color="inherit">SIGNUP</Button>
            <Button onClick={()=>navigate("/forgot-password")} color="inherit">FORGOT</Button>
            <Button sx={{ marginLeft: "auto" }} onClick={() => Logout()}color="inherit">Logout</Button>
          </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<Reset />} />
      </Routes>
    </div>
  );
}

function ProtectedRoute({children}){
  const token = localStorage.getItem("token");
  return token ? (
    <section>{children}</section>
  ) : (
    <Navigate replace to="/" />
  )
}

export default App;
