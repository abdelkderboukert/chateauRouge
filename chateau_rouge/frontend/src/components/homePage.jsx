import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Register from "./register";
import Test from "./test";
import Home from "./home";

import PrivateRoute from "../utils/PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import Charts from "./charts";
import Test2 from "./test2";
import Company from "./company";
import CreateClent from "./createClent";

export default function HomePage() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<Test />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/createclient"
            element={
              <PrivateRoute>
                <CreateClent />
              </PrivateRoute>
            }
          />
          <Route path="/cherts" element={<Charts />} />
          <Route path="/" element={<Test />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/companycreate" element={<Company />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
