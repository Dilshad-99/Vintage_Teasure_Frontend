import './AIClient.css';
import { useState, useRef, useEffect } from 'react';
import api from '../../api.js';

function AIClient() {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput(''); setLoading(true);
    try {
      const res = await api.post('/api/ai/aiChat', { message: text });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong 😢 Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <div className="ai-chat-page">
      <div className="ai-chat">

        <div className="ai-chat-header">
          <span>🤖 AI Assistant</span>
          {messages.length > 0 && <button className="clear-btn" onClick={() => setMessages([])}>Clear Chat</button>}
        </div>

        <div className="chat-body">
          {messages.length === 0 && (
            <div className="chat-empty">
              <span className="chat-empty-icon">🤖</span>
              <p>Hello! I'm your AI Assistant.</p>
              <p className="chat-empty-sub">Ask me anything and I'll help you out.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              <span className="message-role">{m.role === 'user' ? 'You' : 'AI'}</span>
              <p className="message-content">{m.content}</p>
            </div>
          ))}
          {loading && <div className="typing"><span></span><span></span><span></span></div>}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input">
          <textarea rows="3" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="Ask anything... (Enter to send, Shift+Enter for new line)" disabled={loading} />
          <button onClick={sendMessage} disabled={loading || !input.trim()}>{loading ? '...' : 'Send'}</button>
        </div>

      </div>
    </div>
  );
}

export default AIClient;