//client/src/App.jsx
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {AppRoutes} from "./Routes.jsx";

export const App = () => {

  return (
    <Router>
        <AppRoutes/>
    </Router>
  );
}


