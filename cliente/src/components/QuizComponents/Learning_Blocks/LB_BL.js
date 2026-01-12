import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LB_BL = () => {
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizFeedback, setQuizFeedback] = useState('');

    const checkAnswer = () => {
        setQuizFeedback(quizAnswer.toLowerCase() === 'bird' ? '✅ Correct! "Bird" is the noun in the sentence.' : '❌ Incorrect. Try again!');
    };

    return (
        <div className="container mt-5 p-4 bg-white rounded shadow text-center text-dark">
            <h1 className="text-success">📗 Basic Language Learning Block</h1>
            <p className="lead">Improve your grammar and vocabulary with fundamental language concepts.</p>
            
            <div className="mt-4 text-start">
                <h2 className="text-primary">1️⃣ Nouns & Verbs</h2>
                <p><strong className="text-dark">Noun:</strong> A noun represents a person, place, or thing.</p>
                <p><strong className="text-dark">Verb:</strong> A verb is an action or state.</p>
                <p><strong>Example:</strong> <span className="text-danger fw-bold">Cat</span> (noun), <span className="text-success fw-bold">Run</span> (verb).</p>
            </div>
            
            <div className="mt-4 text-start">
                <h2 className="text-warning">2️⃣ Sentence Structure</h2>
                <p>Every sentence needs a subject (who or what) and a verb (what they do).</p>
                <p><strong>Example:</strong> "The <span className="text-primary fw-bold">dog</span> (subject) <span className="text-success fw-bold">runs</span> (verb)."</p>
            </div>
            
            <div className="mt-4 text-start">
                <h2 className="text-info">3️⃣ Quick Quiz</h2>
                <p>Identify the noun in this sentence: <strong className="text-dark">"The bird flies in the sky."</strong></p>
                <input type="text" className="form-control mb-2 text-dark" value={quizAnswer} onChange={(e) => setQuizAnswer(e.target.value)} placeholder="Enter your answer" />
                <button className="btn btn-info" onClick={checkAnswer}>Submit</button>
                <p className="fw-bold mt-2" style={{ color: quizFeedback.includes('✅') ? '#28a745' : '#dc3545' }}>{quizFeedback}</p>
            </div>
            
            <div className="mt-4 text-start">
                <h2 className="text-secondary">📚 Further Resources</h2>
                <ul className="list-group">
                    <li className="list-group-item text-dark"><a href="https://www.grammarly.com/" target="_blank" className="text-primary">Grammarly</a></li>
                    <li className="list-group-item text-dark"><a href="https://www.englishclub.com/grammar/" target="_blank" className="text-primary">English Club - Grammar</a></li>
                </ul>
            </div>
        </div>
    );
};

export default LB_BL;
