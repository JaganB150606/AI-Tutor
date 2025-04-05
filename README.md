# EduBot - Educational AI Assistant

EduBot is a web application that provides an AI-powered educational assistant to help students with their studies. It features a chatbot for answering questions and a YouTube video search functionality for finding educational content.

## Features

- AI-powered educational chatbot using Qwen2 model
- YouTube video search for educational content
- Modern React frontend with Vite
- FastAPI backend
- User authentication and dashboard
- Subject-based learning interface

## Tech Stack

### Frontend
- React
- Vite
- React Router
- CSS Modules

### Backend
- FastAPI
- Qwen2 AI Model
- YouTube Search API

## Installation

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - Linux/Mac:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Start the backend server:
   ```bash
   python main.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Register or log in to access the dashboard
3. Use the chatbot to ask educational questions
4. Search for educational videos using the YouTube search feature

## Project Structure

```
edubot/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── venv/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 