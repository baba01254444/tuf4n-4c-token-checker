import { useState } from 'react';
import '../styles/global.css';

export default function Home() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setError('');
    setResult(null);
    const res = await fetch('/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    if (data.success) {
      setResult(data);
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="main-container">
      <h1>TUF4N 4C - FB Token Checker 🔥</h1>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste your FB Token"
        className="token-input"
      />
      <br /><br />
      <button onClick={handleCheck} className="check-button">
        Check Token
      </button>

      <div className="result-container">
        {result && <p>✅ Valid Token: <b>{result.name}</b></p>}
        {error && <p className="error-message">❌ {error}</p>}
      </div>

      <footer>
        <p className="footer-text">Developed by <span className="tufan-name">TUFAN</span></p>
      </footer>
    </div>
  );
}