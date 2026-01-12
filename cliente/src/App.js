// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import StudentManagement from './pages/studentManagment';
import SingIn from './pages/LogIn';
import Navbar from './components/navbar';
import Home from './pages/home';
import Dashboard from './components/Dashboard';
import Quiz from './components/QuizComponents/quiz';
import QuizIn from './components/QuizComponents/quizInstrucciones';

import LB_BM from './components/QuizComponents/Learning_Blocks/LB_BM';
import LB_AM from './components/QuizComponents/Learning_Blocks/LB_AM';
import LB_BL from './components/QuizComponents/Learning_Blocks/LB_BL';
import LB_AL from './components/QuizComponents/Learning_Blocks/LB_AL';


function App() {

  const [vprueba, setVprueba] = useState("");

  const [scores, setScores] = useState({ math: 0, language: 0 });
  
  // Add user state here
  const [user, setUser] = useState(null);

  const handleQuizCompletion = (quizScores) => {
    setScores(quizScores);
  };

  // A function for when login is successful
  const handleLoginSuccess = (loggedInUser, pruebaValue) => {
    console.log("User logged in:", loggedInUser);
    setUser(loggedInUser);
    setVprueba(pruebaValue);
  };
  return (
    <Router>
      <Navbar vprueba={vprueba} user={user}/>
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
{/*Cursos */}
        <Route path="/mateBasico" element={<LB_BM />} />
        <Route path="/mateAvanzado" element={<LB_AM />} />
        <Route path="/lenguajeBasico" element={<LB_BL />} />
        <Route path="/lenguajeAvanzado" element={<LB_AL />} />
{/*Final Cursos*/}
        <Route path="/quizIn" element={<QuizIn />} />
        <Route path="/quiz" element={user? <Quiz userId={user.id} onComplete={handleQuizCompletion} />: <div>Please log in before taking the quiz.</div>}/>

        <Route path="/dashboard" element={<Dashboard scores={scores} />} />
        
        <Route path="/singin" element={<SingIn onLoginSuccess={handleLoginSuccess} />} />

        <Route path="/students" element={<StudentManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
