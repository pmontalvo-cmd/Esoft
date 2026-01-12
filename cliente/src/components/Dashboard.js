// Dashboard.js
import React from 'react';
import { learningBlocks } from './learningBlocks';
import { Container, Row, Col, Card, Button} from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import LearningBlock from './QuizComponents/learningblock';
import { useNavigate } from 'react-router-dom';
  
const Dashboard = ({ scores }) => {
  const navigate = useNavigate();
  
console.log("Received scores in Dashboard:", scores);
/*Gets Scores from navegation state, passed on quiz.js */

console.log("Checking recommendedBlocks with scores:", scores);
const recommendedBlocks = learningBlocks.filter((block) => block.criteria(scores));
  
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start",
        padding: "20px"
      }}>
        {/* Left Side - Learning Blocks Container */}
        <div style={{ flex: "1", paddingRight: "280px" }}> {/* Push content left */}
          <h1 className="text-center mb-4">Recommended Learning Blocks</h1>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
            {recommendedBlocks.map((block, index) => (
              <Card key={index} className="p-4 shadow-lg" style={{ width: "400px" }}>
                <h3>{block.title}</h3>
                <p>{block.description || "This is your recommended learning block."}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => navigate(block.path1)} style={{ margin: "5px", padding: "10px", background: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
            {block.bLabel1}
          </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      
        {/* Right Side - Insight Panel */}
        <div style={{
          position: "fixed",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          width: "250px",
          zIndex: 1000
        }}>
          <Card className="p-3 shadow-lg text-white bg-primary">
            <h2 className="text-center">User Scores</h2>
            <p><strong>Math Score:</strong> {scores.math}</p>
            <p><strong>Language Score:</strong> {scores.language}</p>
          </Card>
        </div>
      </div>
  );
};

export default Dashboard;