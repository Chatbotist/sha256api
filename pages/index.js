import { useState } from 'react';

export default function HomePage() {
  const [inputText, setInputText] = useState('');
  const [hashedText, setHashedText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sha256', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const { hash } = await response.json();
      setHashedText(hash);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setInputText('');
    setHashedText('');
  };

  return (
    <div>
      <h1>SHA-256 Encoder</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-text">Enter text:</label>
        <input
          type="text"
          id="input-text"
          value={inputText}
          onChange={handleInputChange}
        />
        <button type="submit">Encode</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
      {hashedText && (
        <div>
          <h2>Encoded Text:</h2>
          <p>{hashedText}</p>
        </div>
      )}
    </div>
  );
}
