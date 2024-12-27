import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60); // 60 seconds
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  // Cek jika user sudah login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // Redirect ke halaman login jika belum login
    }
  }, [navigate]);

  // Ambil status quiz dari localStorage
  useEffect(() => {
    const savedQuestionIndex = localStorage.getItem("currentQuestionIndex");
    const savedScore = localStorage.getItem("score");
    const savedHasStarted = localStorage.getItem("hasStarted");
    const savedTimer = localStorage.getItem("timer");

    if (savedQuestionIndex) setCurrentQuestionIndex(parseInt(savedQuestionIndex, 10));
    if (savedScore) setScore(parseInt(savedScore, 10));
    if (savedHasStarted === "true") setHasStarted(true);
    if (savedTimer) setTimer(parseInt(savedTimer, 10));
  }, []);

  // Simpan status quiz ke localStorage saat terjadi perubahan
  useEffect(() => {
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    localStorage.setItem("score", score);
    localStorage.setItem("hasStarted", hasStarted);
    localStorage.setItem("timer", timer);
  }, [currentQuestionIndex, score, hasStarted, timer]);

  // Ambil pertanyaan quiz
  const fetchQuestions = async () => {
    try {
      const cachedQuestions = localStorage.getItem("quizQuestions");
      if (cachedQuestions) {
        setQuestions(JSON.parse(cachedQuestions));
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch questions. Try again later.");
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setQuestions(data.results);
        localStorage.setItem("quizQuestions", JSON.stringify(data.results));
        setLoading(false);
      } else {
        throw new Error("No questions received from the API.");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!loading && hasStarted && timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleQuizEnd();
    }
  }, [timer, loading, hasStarted]);

  const handleQuizEnd = useCallback(() => {
    navigate("/result", {
      state: {
      score,
      total: currentQuestionIndex + 1 === questions.length ? currentQuestionIndex + 1 : currentQuestionIndex + 0,
      wrong: (currentQuestionIndex + 1) - score,
      },
    });

    // Hapus status quiz setelah selesai
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("score");
    localStorage.removeItem("hasStarted");
    localStorage.removeItem("timer");
  }, [navigate, score, currentQuestionIndex]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setScore((s) => s + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      handleQuizEnd();
    }
  };

  // Handle offline scenario
  useEffect(() => {
    const handleOffline = () => {
      alert("You are offline. Your progress has been saved.");
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (loading) {
    return <div className="quiz-container">Loading questions...</div>;
  }

  if (error) {
    return (
      <div className="quiz-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h2>Welcome to the Quiz!</h2>
          <p>Click the button below to {currentQuestionIndex > 0 ? "continue" : "start"} the quiz.</p>
          <button
            className="start-button"
            onClick={() => setHasStarted(true)}
          >
            {currentQuestionIndex > 0 ? "Lanjutkan Quiz" : "Start Quiz"}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="timer">Time remaining: {timer}s</div>
        <h2
          className="question"
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        />
        <div className="answers-grid">
          {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
            .sort()
            .map((answer, index) => (
              <button
                key={index}
                className="answer-button"
                onClick={() => handleAnswer(answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            ))}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div>
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
