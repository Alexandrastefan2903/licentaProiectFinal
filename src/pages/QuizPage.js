import React from 'react';
import { Link } from 'react-router-dom';
import './QuizPage.css';

function QuizPage() {
  return (
    <div className="quiz-page-container">
      <Link to="/quiz/start">
        <button>Start Quiz</button>
      </Link>
    </div>
  );
}

export default QuizPage;
