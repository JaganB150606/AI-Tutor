import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';

const subjects = [
  { id: 1, name: 'Mathematics', icon: '🔢' },
  { id: 2, name: 'Science', icon: '🔬' },
  { id: 3, name: 'English', icon: '📚' },
  { id: 4, name: 'History', icon: '⏳' },
  { id: 5, name: 'Geography', icon: '🌍' },
  { id: 6, name: 'Art', icon: '🎨' },
  { id: 7, name: 'Music', icon: '🎵' },
  { id: 8, name: 'Physical Education', icon: '⚽' },
  { id: 9, name: 'Computer Science', icon: '💻' },
  { id: 10, name: 'Language', icon: '🗣️' },
];

const DashboardPage = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [youtubeQuery, setYoutubeQuery] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('userLevel');
    localStorage.removeItem('userStandard');
    // Navigate to landing page
    navigate('/');
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    const newMessage = { text: messageInput, sender: 'user' };
    setChatMessages(prev => [...prev, newMessage]);
    setMessageInput('');

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageInput }),
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleYoutubeSearch = async () => {
    if (!youtubeQuery.trim()) return;

    try {
      const response = await fetch('http://localhost:8000/youtube-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: youtubeQuery }),
      });
      const data = await response.json();
      setYoutubeLink(data.link);
    } catch (error) {
      console.error('Error searching YouTube:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome to Your Dashboard</h1>
          <p>Your Level: {localStorage.getItem('userLevel') || 'Beginner'}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="subjects-grid">
        <h2>Subjects</h2>
        <div className="grid-container">
          {subjects.map(subject => (
            <div key={subject.id} className="subject-card">
              <span className="subject-icon">{subject.icon}</span>
              <h3>{subject.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="chat-section">
          <h2>Chat with EduBot</h2>
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>

        <div className="study-material-section">
          <h2>Find Study Materials</h2>
          <div className="youtube-search">
            <input
              type="text"
              value={youtubeQuery}
              onChange={(e) => setYoutubeQuery(e.target.value)}
              placeholder="Search for study materials..."
              onKeyPress={(e) => e.key === 'Enter' && handleYoutubeSearch()}
            />
            <button onClick={handleYoutubeSearch}>Search</button>
          </div>
          {youtubeLink && (
            <div className="youtube-result">
              <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 