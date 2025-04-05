import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AssessmentPage.css';

// Sample questions - in a real app, these would come from your backend
const questions = {
  1: [
    {
      id: 1,
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4"
    },
    {
      id: 2,
      question: "Which of these is a primary color?",
      options: ["Green", "Purple", "Red", "Orange"],
      correctAnswer: "Red"
    },
    // Add more questions for each standard
  ],
  // Add questions for other standards
};

const AssessmentPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  // Get the standard from localStorage or state management
  const standard = localStorage.getItem('userStandard') || 1;
  const currentQuestions = questions[standard] || questions[1];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    currentQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResult(true);
  };

  const getLevel = () => {
    const percentage = (score / currentQuestions.length) * 100;
    if (percentage >= 80) return "Expert";
    if (percentage >= 50) return "Intermediate";
    return "Beginner";
  };

  const handleContinue = () => {
    localStorage.setItem('userLevel', getLevel());
    navigate('/dashboard');
  };

  if (showResult) {
    return (
      <div className="assessment-container">
        <div className="result-card">
          <h2>Assessment Complete!</h2>
          <p>Your Score: {score}/{currentQuestions.length}</p>
          <p>Your Level: {getLevel()}</p>
          <button onClick={handleContinue} className="continue-button">
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="assessment-container">
      <div className="question-card">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%` }}
          />
        </div>
        <h3>Question {currentQuestion + 1} of {currentQuestions.length}</h3>
        <p className="question-text">{currentQuestions[currentQuestion].question}</p>
        <div className="options-container">
          {currentQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswers[currentQuestions[currentQuestion].id] === option ? 'selected' : ''
              }`}
              onClick={() => handleAnswerSelect(currentQuestions[currentQuestion].id, option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          className="next-button"
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestions[currentQuestion].id]}
        >
          {currentQuestion === currentQuestions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default AssessmentPage; 