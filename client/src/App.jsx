//client/src/App.jsx
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {AppRoutes} from "./Routes.jsx";
import {Navigation} from "./pages/components/Navigation.jsx";

export const App = () => {

  return (
    <Router>
        <Navigation/>
        <AppRoutes/>
    </Router>
  );
}


