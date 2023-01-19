import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Register'
import CallList from './pages/CallList/callList'
const App = () => {
  return (
    <>
      
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/call-list" element={<CallList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
