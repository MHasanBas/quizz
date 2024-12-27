import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/quiz");
    }
  }, [navigate]);

  const handleLogin = () => {
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const user = registeredUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", username); // Menyimpan nama pengguna yang login

      Swal.fire({
        title: "Login Successful",
        text: "Welcome to Quizatmin!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Start Quiz",
      }).then(() => {
        navigate("/quiz"); // Arahkan ke halaman quiz setelah popup ditutup
      });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">Quiz aja</div>
        <div className="input-group">
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={!username || !password}
        >
          Login
        </button>
        <p className="register-link">
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
