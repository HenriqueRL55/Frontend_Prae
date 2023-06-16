import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import RoutesFunction from "./routes";
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Router>
    <RoutesFunction />
  </Router>
  
);

