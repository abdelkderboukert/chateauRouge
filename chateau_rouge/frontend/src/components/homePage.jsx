import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Register from "./register";
import Test from "./login";
import Home from "./home";

import PrivateRoute from "../utils/PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import Company from "./company";
import CreateClent from "./createClent";
import Datteadd from "./datteadd";
import Versadd from "./versadd";
import Clientliste from "./clientliste";
import Test2 from "./test2";
import Invoice from "./invoice";
import Balitesadd from "./balitesadd";

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
          <Route
            path="/datteadd"
            element={
              <PrivateRoute>
                <Datteadd />
              </PrivateRoute>
            }
          />
          <Route
            path="/versadd"
            element={
              <PrivateRoute>
                <Versadd />
              </PrivateRoute>
            }
          />
          <Route
            path="/companycreate"
            element={
              <PrivateRoute>
                <Company />
              </PrivateRoute>
            }
          />
          <Route
            path="/client"
            element={
              <PrivateRoute>
                <Clientliste />
              </PrivateRoute>
            }
          />
          <Route
            path="/buying"
            element={
              <PrivateRoute>
                <Invoice />
              </PrivateRoute>
            }
          />
          <Route
            path="/balit_add"
            element={
              <PrivateRoute>
                <Balitesadd />
              </PrivateRoute>
            }
          />
          <Route path="/cherts" element={<Clientliste />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/" element={<Test />} />
          <Route path="/companycreate" element={<Company />} />
          <Route path="/balit" element={<Balitesadd />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
