// QuoteApp.jsx
import { useEffect, useState } from "react";

function QuoteApp() {
  const [quote, setQuote] = useState("");

  const fetchQuote = async () => {
    const res = await fetch("http://localhost:8080/api/quote");
    const data = await res.text();
    setQuote(data);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">오늘의 명언</h1>
      <p className="text-lg italic">{quote}</p>
      <button 
        onClick={fetchQuote} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        다른 명언 보기
      </button>
    </div>
  );
}

export default QuoteApp;
