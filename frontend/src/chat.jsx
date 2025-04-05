import { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post('http://localhost:8000/chat', { message: input });
      const botMessage = { sender: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
        <div className="h-96 overflow-y-auto mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`my-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            className="flex-grow p-2 border rounded-l-lg"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

