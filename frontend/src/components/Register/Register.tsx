// components/Register/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    turkishId: '', // New field for Turkish Identification Number
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: '',
    turkishId: '', // Add error state for Turkish ID
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
      return;
    }

    if (formData.turkishId.length !== 11 || !/^[0-9]+$/.test(formData.turkishId)) {
      setErrors({ ...errors, turkishId: 'Turkish ID must be 11 digits' });
      return;
    }

    // If no errors, proceed with form submission
    console.log(formData);
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            iconName="user"
          />

          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            iconName="email"
          />

          {errors.email && (
            <ErrorMessage message={errors.email} className="registration-error" />
          )}

          {/* New Turkish Identification Number field */}
          <InputField
            type="text"
            name="turkishId"
            value={formData.turkishId}
            onChange={handleChange}
            placeholder="Enter your Turkish ID"
            iconName="id"
          />

          {errors.turkishId && (
            <ErrorMessage message={errors.turkishId} className="registration-error" />
          )}

          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            iconName="password"
          />

          <InputField
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            iconName="password"
          />

          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword} className="registration-error" />
          )}

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
