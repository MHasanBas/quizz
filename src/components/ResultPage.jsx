import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil nilai dari state
  const { score = 0, total = 0, wrong = 0 } = location.state || {};

  const handleRestart = () => {
    localStorage.removeItem("quizState"); // Hapus status quiz
    navigate("/"); // Arahkan ke halaman awal
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("isLoggedIn"); // Hapus status login
        localStorage.removeItem("quizState"); // Hapus status quiz jika ada
        Swal.fire("Logged Out!", "You have been logged out.", "success");
        navigate("/"); // Arahkan ke halaman login
      }
    });
  };

  return (
    <div className="results-container">
      <div className="results-card">
        <h1 className="results-title">Quiz Results</h1>
        <div className="score-grid">
          <div className="score-item">
            <div className="score-label">Correct</div>
            <div className="score-value">{score}</div>
          </div>
          <div className="score-item">
            <div className="score-label">Wrong</div>
            <div className="score-value">{wrong}</div>
          </div>
          <div className="score-item">
            <div className="score-label">Attempted</div>
            <div className="score-value">{total}</div>
          </div>
        </div>
        <div className="button-group">
          <button className="restart-button" onClick={handleRestart}>
            Start New Quiz
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
