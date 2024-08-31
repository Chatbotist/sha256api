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
      console.error('Ошибка:', error);
    }
  };

  const handleReset = () => {
    setInputText('');
    setHashedText('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hashedText);
    alert('Скопировано в буфер обмена!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4">SHA-256 Кодировщик</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="input-text" className="block font-medium mb-1">
              Введите текст:
            </label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={handleInputChange}
              rows={inputText.split('\n').length}
              className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-md px-4 py-2 w-full resize-none"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
            >
              Кодировать
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-300"
            >
              Сбросить
            </button>
          </div>
        </form>
        {hashedText && (
          <div
            onClick={handleCopy}
            className="mt-6 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-md px-4 py-2 cursor-pointer hover:bg-opacity-75 transition-all duration-300"
          >
            <h2 className="text-lg font-medium">Закодированный текст:</h2>
            <p className="text-xl font-bold">{hashedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
