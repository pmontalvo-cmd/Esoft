// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import StudentManagement from '../pages/Admin/studentManagment';
import SingIn from '../pages/Authentication/LogIn';
import Navbar from '../components/Navbar/navbar';
import Home from '../pages/Home/home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Quiz from '../pages/Quiz/quiz';
import QuizIn from '../pages/Quiz/quizInstrucciones';
import BlockDetail from '../pages/LearningBlocks/BlockDetails';

function App() {
  const [vprueba, setVprueba] = useState("");
  // Add user state here
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const id = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const grade = localStorage.getItem("grade");

    if (id) {
      setUser({ id: Number(id), username, grade: grade ? Number(grade) : null });
    }
  }, []);

  // A function for when login is successful
  const handleLoginSuccess = (loggedInUser, pruebaValue) => {
    console.log("User logged in:", loggedInUser);
    setUser(loggedInUser);
  };
  return (
    <Router>
      <Navbar vprueba={vprueba} user={user}/>
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
{/*Rutas*/}
        <Route path="/quizIn" element={<QuizIn />} />
        <Route path="/quiz" element={user? <Quiz userId={user.id} />: <div>Please log in before taking the quiz.</div>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/singin" element={<SingIn onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/alumnos" element={<StudentManagement />} />
        <Route path="/blocks/:id" element={<BlockDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
