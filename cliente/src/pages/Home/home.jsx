import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div class="hero">
    <div class="hero-content">
        <h1>Knowledge Adapted for You</h1>
        <p>Start, transform, and enhance your learning journey with courseware tailored to your strengths and needs,
            powered by our community-driven platform.</p>
        <Link to="/students" class="btn-primary">Get Started</Link>
    </div>
    <img 
        src="https://i.postimg.cc/wMS5RKJX/Captura-de-pantalla-2025-03-05-111057.png"
        alt="Software Logo"
        style={{width: "400px",height: "400px",marginRight: "10px",borderRadius: "10%",
        }}/>
{/*\Features_Section*/}
<section class="features">
    <div class="feature-list">
            <div class="feature-item">
                <i class="fas fa-user-friends"></i>
                <h3>Personalized Learning</h3>
                <p>AI-driven profiles create individualized learning paths based on your strengths and areas for
                    improvement.</p>
            </div>
            <div class="feature-item">
                <i class="fas fa-chart-line"></i>
                <h3>Progress Tracking</h3>
                <p>Monitor your progress with detailed analytics and insights to keep you motivated and on track.</p>
            </div>
            <div class="feature-item">
                <i class="fas fa-brain"></i>
                <h3>Adaptive AI</h3>
                <p>Our intelligent system assigns tasks that match your unique learning needs, ensuring optimal growth.
                </p>
            </div>
        </div>
        {/*Footer*/}
        <footer class="footer">
        <p>&copy; 2025 esoft. All rights reserved.</p>
    </footer>
  </section>  
</div>
  );
}

export default Home;