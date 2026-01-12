import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LB_AL = () => {
    const [quizAnswer, setQuizAnswer] = useState("");
    const [quizFeedback, setQuizFeedback] = useState("");

    const checkAnswer = () => {
        setQuizFeedback(
            quizAnswer.toLowerCase() === "was" 
                ? "✅ Correct! 'Was' should be 'were' in the subjunctive mood."
                : "❌ Incorrect. The correct answer is 'were'. Try again!"
        );
    };

    return (
        <div className="container mt-5 p-4 bg-light rounded shadow text-center text-dark">
            <h1 className="text-warning">📙 Advanced Language Learning Block</h1>
            <p className="lead">Deepen your understanding of advanced grammar and sentence structures.</p>
            
            <div className="mt-4 text-start">
                <h2 className="text-primary">1️⃣ Subjunctive Mood</h2>
                <p>The subjunctive is used to express hypothetical or non-real situations.</p>
                <p><strong>Example:</strong> "If I <span className="text-danger fw-bold">were</span> you, I would study more."</p>
            </div>
            
            <div className="mt-4 text-start">
                <h2 className="text-success">2️⃣ Complex Sentence Structure</h2>
                <p>Complex sentences use **clauses** to express detailed ideas.</p>
                <p><strong>Example:</strong> "The book <span className="text-primary fw-bold">that I borrowed</span> is interesting."</p>
            </div>

            <div className="mt-4 text-start">
                <h2 className="text-info">3️⃣ Passive vs. Active Voice</h2>
                <p>Active voice makes sentences direct. Passive voice can shift focus.</p>
                <p><strong>Active:</strong> "The chef cooked the meal."</p>
                <p><strong>Passive:</strong> "The meal <span className="text-danger fw-bold">was cooked</span> by the chef."</p>
            </div>
            
            <div className="mt-4 text-start">
                <h2 className="text-warning">4️⃣ Quick Quiz</h2>
                <p>Find the grammatical mistake: <strong>"If I was rich, I will travel the world."</strong></p>
                <input type="text" className="form-control mb-2 text-dark" value={quizAnswer} onChange={(e) => setQuizAnswer(e.target.value)} placeholder="Enter the incorrect word" />
                <button className="btn btn-warning" onClick={checkAnswer}>Submit</button>
                <p className="fw-bold mt-2" style={{ color: quizFeedback.includes("✅") ? "#28a745" : "#dc3545" }}>{quizFeedback}</p>
            </div>
            
            <div className="mt-4 text-start">
                <h2 className="text-secondary">📚 Further Resources</h2>
                <ul className="list-group">
                    <li className="list-group-item text-dark"><a href="https://www.grammarly.com/blog/subjunctive-mood/" target="_blank" className="text-primary">Grammarly - Subjunctive Mood</a></li>
                    <li className="list-group-item text-dark"><a href="https://www.ef.com/wwen/english-resources/english-grammar/" target="_blank" className="text-primary">EF English Resources</a></li>
                </ul>
            </div>
        </div>
    );
};

export default LB_AL;
