import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // Optional: SweetAlert2 CSS styles

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    } else {
      setEmailError('');
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const isExistingUser = registeredUsers.some((user) => user.username === username || user.email === email);

    if (isExistingUser) {
      setError('Username or email already exists');
      return;
    }

    // Add new user to registered users
    const newUser = { username, email, password };
    localStorage.setItem('registeredUsers', JSON.stringify([...registeredUsers, newUser]));

    // SweetAlert2 success popup
    Swal.fire({
      title: 'Registration Successful!',
      text: 'You can now log in to your account.',
      icon: 'success',
      confirmButtonText: 'Go to Login',
      timer: 5000, // Auto-close after 5 seconds
      timerProgressBar: true,
    }).then(() => {
      navigate('/'); // Navigate to login page after popup closes
    });
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-message" style={{ color: 'red' }}>{emailError}</p>}
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
        <div className="input-group">
          <input
            className="input-field"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="login-button"
          onClick={handleRegister}
          disabled={!username || !email || !password || !confirmPassword}
        >
          Register
        </button>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
