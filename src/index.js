import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AuthProvider } from "./AuthContext"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import { Payments } from "./Components/Payments";
import Navbar from "./Components/Navbar";
import Organisation from "./Components/OrgAccount";
import Employee from "./Components/UserAccount";
import FeedBack from "./Components/Feedback";
import Footer from "./Components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/organisation/profile"
          element={
            <>
              <Navbar />
              <Organisation />
              <Footer />
            </>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <>
              <Navbar />
              <Employee />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/pricing"
          element={
            <>
              <Navbar />
              <Payments />
              <Footer />
            </>
          }
        />
        <Route
          path="/feedback"
          element={
            <>
              <Navbar />
              <FeedBack />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
