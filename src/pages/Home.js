import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ isAuthenticated }) => {
  return (
    <div className="home-container">
      <h1 className="title">Find Yourself</h1>
      <div className="card-container">
        <div className="card">
          <h2>Take a Quiz</h2>
          <p>Start a new quiz and find out more about your personality!</p>
          <Link to="/quiz">
            <button>Start Quiz</button>
          </Link>
        </div>
        {isAuthenticated && (
          <div className="card">
            <h2>View Results</h2>
            <p>Check your previous quiz results and analyze your progress.</p>
            <Link to="/profile">
              <button>View Profile</button>
            </Link>
          </div>
        )}
        <div className="card">
          <h2>Learn More</h2>
          <p>Discover more about personality types and how they influence behavior.</p>
          <Link to="/learn-more">
            <button>Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
