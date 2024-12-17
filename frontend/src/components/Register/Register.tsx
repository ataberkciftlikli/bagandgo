import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    address: '',
    tc: '', // Turkish Identification Number
    birth_year: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    tc: '',
    birth_year: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      tc: '',
      birth_year: '',
    };

    if (!formData.username) {
      newErrors.username = 'Username is required';
      formIsValid = false;
    }

    if (!formData.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      formIsValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      formIsValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      formIsValid = false;
    }

    if (!/^\d{11}$/.test(formData.tc)) {
      newErrors.tc = 'Turkish ID must be exactly 11 digits';
      formIsValid = false;
    }

    if (!formData.birth_year || isNaN(Number(formData.birth_year))) {
      newErrors.birth_year = 'Birth year must be a valid number';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      address: formData.address,
      tc: formData.tc,
      birth_year: Number(formData.birth_year),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_REGISTER_API_URL as string, // Use import.meta.env for Vite
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Registration Successful:', data);
        alert('Registration successful! Redirecting to login page.');
        navigate('/login'); // Redirect to Login page
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div id="register-page">
      <div className="main-section">
        <div
          className="header"
          onClick={() => {
            navigate('/home');
          }}
          style={{ cursor: 'pointer' }}
        >
          BagAndGo
        </div>
        <form className="register-form w-100" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Register</h2>

          <InputField
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            iconName="user"
          />
          {errors.username && <ErrorMessage message={errors.username} className="registration-error" />}

          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            iconName="email"
          />
          {errors.email && <ErrorMessage message={errors.email} className="registration-error" />}

          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            iconName="password"
          />
          {errors.password && <ErrorMessage message={errors.password} className="registration-error" />}

          <InputField
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            iconName="password"
          />
          {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword} className="registration-error" />}

          <InputField
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
            iconName="user"
          />

          <InputField
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
            iconName="user"
          />

          <InputField
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            iconName="id"
          />

          <InputField
            type="text"
            name="tc"
            value={formData.tc}
            onChange={handleChange}
            placeholder="Enter your Turkish ID"
            iconName="id"
          />
          {errors.tc && <ErrorMessage message={errors.tc} className="registration-error" />}

          <InputField
            type="number"
            name="birth_year"
            value={formData.birth_year}
            onChange={handleChange}
            placeholder="Enter your birth year"
            iconName="id"
          />
          {errors.birth_year && <ErrorMessage message={errors.birth_year} className="registration-error" />}

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          Already have an account?{' '}
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
