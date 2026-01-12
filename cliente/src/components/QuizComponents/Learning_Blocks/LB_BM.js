import React, { useState } from 'react';

function LB_BM() {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');

    const checkAnswer = () => {
        if (userAnswer === '15') {
            setFeedback('✅ Correct! Keep going!');
        } else {
            setFeedback('❌ Try again! Hint: Add 9 and 6 carefully.');
        }
    };

    return (
        <div style={{
            padding: '20px', 
            maxWidth: '600px', 
            margin: 'auto', 
            backgroundColor: '#ffffff', // ✅ Light background for contrast
            color: '#333',  // ✅ Darker text for visibility
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ color: '#007bff', fontSize: '28px' }}>🧮 Basic Math Learning Block</h1>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Math is the foundation of everything. Let’s explore key concepts:</p>

            <div style={{
                textAlign: 'left', 
                padding: '10px 20px', 
                fontSize: '16px', 
                fontWeight: 'normal'
            }}>
                <p><strong style={{ color: '#dc3545' }}>➕ Addition:</strong> When we combine numbers. Example: 2 + 3 = 5</p>
                <p><strong style={{ color: '#28a745' }}>➖ Subtraction:</strong> Taking away from a number. Example: 7 - 4 = 3</p>
                <p><strong style={{ color: '#ffc107' }}>✖️ Multiplication:</strong> Adding the same number multiple times. Example: 6 × 2 = 12</p>
                <p><strong style={{ color: '#17a2b8' }}>➗ Division:</strong> Splitting into equal parts. Example: 8 ÷ 2 = 4</p>
            </div>

            <h2 style={{ marginTop: '20px', fontSize: '22px', color: '#007bff' }}>✏️ Try it Yourself</h2>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Solve this: <strong>9 + 6 = ?</strong></p>
            
            <input 
                type="number" 
                value={userAnswer} 
                onChange={(e) => setUserAnswer(e.target.value)} 
                placeholder="Enter your answer" 
                style={{
                    padding: '10px', 
                    marginRight: '10px', 
                    textAlign: 'center', 
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                }}
            />
            <button 
                onClick={checkAnswer} 
                style={{
                    padding: '10px 15px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    fontSize: '16px', 
                    cursor: 'pointer'
                }}>
                Check Answer
            </button>
            <p style={{ 
                fontWeight: 'bold', 
                marginTop: '15px', 
                fontSize: '18px',
                color: feedback.includes('✅') ? '#28a745' : '#dc3545'  // ✅ Green if correct, Red if wrong
            }}>
                {feedback}
            </p>
        </div>
    );
}

export default LB_BM;