import React, { useState } from 'react';
import InputField from '../Register/InputField';
import ErrorMessage from '../Register/ErrorMessage';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
  const [errorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = { username: '', password: '' };

    // Validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
      formIsValid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      try {
        // Send POST request to backend API
        const response = await fetch(import.meta.env.VITE_LOGIN_API_URL as string, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        });

        const data = await response.json();
        console.log("Server Response:", data);

        if (response.ok) {
          // Store user details and token in localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.user.username);
          localStorage.setItem('email', data.enail); // Access the typo "enail"
          localStorage.setItem('first_name', data.user.first_name || ''); // Handle missing first name
          localStorage.setItem('last_name', data.user.last_name || ''); // Handle missing last name
          
          navigate('/'); // Redirect to home page
          window.location.reload();
        } else {
          alert(data.error || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div id="login-page">
      <div className="main-section">
        <div
          className="header"
          onClick={() => {
            navigate('/');
          }}
          style={{ cursor: 'pointer' }}
        >
          BagAndGo
        </div>
        <form className="login-form w-100" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login</h2>

          <InputField
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            iconName="user"
          />
          {errors.username && (
            <ErrorMessage message={errors.username} className="login-error" />
          )}

          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            iconName="password"
          />
          {errors.password && (
            <ErrorMessage message={errors.password} className="login-error" />
          )}

          {errorMessage && (
            <div className="backend-error text-danger text-center">
              {errorMessage}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          Don't have an account?{' '}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
