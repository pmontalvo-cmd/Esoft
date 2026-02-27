// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import StudentManagement from '../pages/Admin/studentManagment';
import SingIn from '../pages/Authentication/LogIn';
import Navbar from '../components/Navbar/navbar';
import Home from '../pages/Home/home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Quiz from '../pages/Quiz/quiz';
import QuizIn from '../pages/Quiz/quizInstrucciones';
import BlockDetail from '../pages/LearningBlocks/BlockDetails';
import Account from '../pages/Account/account';





function App() {
  const [vprueba,] = useState("");
  const [user, setUser] = useState(null);
  
  const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("grade");

  setUser(null);
};
  useEffect(() => {
    const id = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const grade = localStorage.getItem("grade");

    if (id) {
      setUser({ id: Number(id), username, grade: grade ? Number(grade) : null });
    }
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser)); // <-- importante
  };
  return (
    <Router>
      <Navbar vprueba={vprueba} user={user} onLogout={handleLogout} />
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
        <Route path="/account" element={user ? <Account user={user} /> : <Navigate to="/singin" />}/>
      </Routes>
    </Router>
  );
}

export default App;
