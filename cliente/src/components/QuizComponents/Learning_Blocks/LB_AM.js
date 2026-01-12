import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LB_AM() {
    const [eigenMatrix, setEigenMatrix] = useState('[[4,1],[6,3]]');
    const [gradientFunction, setGradientFunction] = useState('x^2 + y^2');
    const [diffEquation, setDiffEquation] = useState('t - y');
    const [quizAnswer, setQuizAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [quizFeedback, setQuizFeedback] = useState('');

    const computeEigenvalues = () => {
        try {
            const matrix = JSON.parse(eigenMatrix);
            const a = matrix[0][0], b = matrix[0][1], c = matrix[1][0], d = matrix[1][1];
            const trace = a + d;
            const determinant = a * d - b * c;
            const eigen1 = (trace + Math.sqrt(trace ** 2 - 4 * determinant)) / 2;
            const eigen2 = (trace - Math.sqrt(trace ** 2 - 4 * determinant)) / 2;
            setFeedback(`Eigenvalues: [${eigen1.toFixed(2)}, ${eigen2.toFixed(2)}]`);
        } catch (error) {
            setFeedback('Invalid matrix input.');
        }
    };

    const computeGradient = () => {
        try {
            const evalPoint = { x: 1, y: 2 };
            const h = 0.0001;
            const f = (x, y) => eval(gradientFunction.replace(/x/g, x).replace(/y/g, y));
            const dfdx = (f(evalPoint.x + h, evalPoint.y) - f(evalPoint.x, evalPoint.y)) / h;
            const dfdy = (f(evalPoint.x, evalPoint.y + h) - f(evalPoint.x, evalPoint.y)) / h;
            setFeedback(`Gradient at (1,2): [${dfdx.toFixed(2)}, ${dfdy.toFixed(2)}]`);
        } catch (error) {
            setFeedback('Invalid function input.');
        }
    };

    const eulerMethod = () => {
        try {
            const f = new Function('t', 'y', `return ${diffEquation};`);
            let y = 1, t = 0, h = 0.1, steps = 10;
            let result = [];
            for (let i = 0; i < steps; i++) {
                y = y + h * f(t, y);
                t = t + h;
                result.push([t.toFixed(2), y.toFixed(2)]);
            }
            setFeedback(`Euler Approximation: ${JSON.stringify(result)}`);
        } catch (error) {
            setFeedback('Invalid differential equation input.');
        }
    };

    const checkQuizAnswer = () => {
        setQuizFeedback(quizAnswer.trim() === '2x' ? '✅ Correct! The derivative is 2x.' : '❌ Incorrect. Try again!');
    };

    return (
        <div className="container mt-5 p-4 bg-white rounded shadow text-center text-dark">
            <h1 className="text-primary">📚 Advanced Math Learning Block</h1>
            
            <div className="mt-4 text-start">
                <h2 className="text-danger">📌 Introduction</h2>
                <p>This section covers three fundamental topics in advanced mathematics:</p>
                <ul>
                    <li><strong>Eigenvalues</strong> – Used in linear algebra to determine matrix properties.</li>
                    <li><strong>Gradients</strong> – Used in multivariable calculus to find rates of change.</li>
                    <li><strong>Differential Equations</strong> – Used to model real-world processes mathematically.</li>
                </ul>
            </div>

            <div className="mt-4 text-start">
                <h2 className="text-danger">📌 1. Linear Algebra: Eigenvalues</h2>
                <p>Eigenvalues are used to understand matrix transformations. Given a 2×2 matrix:</p>
                <p>λ = (trace ± √(trace² - 4 × determinant)) / 2</p>
                <input type="text" className="form-control mb-2" value={eigenMatrix} onChange={(e) => setEigenMatrix(e.target.value)} />
                <button className="btn btn-primary mb-3" onClick={computeEigenvalues}>Compute Eigenvalues</button>
            </div>
            
            <div className="mt-4 text-start">
                <h2 className="text-success">📌 2. Multivariable Calculus: Gradient</h2>
                <p>Gradients indicate the direction of steepest ascent in a function.</p>
                <p>For f(x,y), the gradient is: ∇f = [ ∂f/∂x, ∂f/∂y ]</p>
                <input type="text" className="form-control mb-2" value={gradientFunction} onChange={(e) => setGradientFunction(e.target.value)} />
                <button className="btn btn-success mb-3" onClick={computeGradient}>Compute Gradient</button>
            </div>
            
            <div className="mt-4 text-start">
                <h2 className="text-warning">📌 3. Differential Equations: Euler’s Method</h2>
                <p>Euler’s method approximates solutions to differential equations iteratively.</p>
                <input type="text" className="form-control mb-2" value={diffEquation} onChange={(e) => setDiffEquation(e.target.value)} />
                <button className="btn btn-warning mb-3" onClick={eulerMethod}>Solve with Euler's Method</button>
            </div>
            
            <div className="mt-4 text-start">
                <h2 className="text-info">🧠 Quick Quiz</h2>
                <p>What is the derivative of f(x) = x²?</p>
                <input type="text" className="form-control mb-2 text-dark" value={quizAnswer} onChange={(e) => setQuizAnswer(e.target.value)} />
                <button className="btn btn-info" onClick={checkQuizAnswer}>Submit</button>
                <p className="fw-bold mt-2" style={{ color: quizFeedback.includes('✅') ? '#28a745' : '#dc3545' }}>{quizFeedback}</p>
            </div>
            
            <div className="alert alert-secondary mt-4">
                <strong>Output:</strong> {feedback}
            </div>
        </div>
    );
}

export default LB_AM;
