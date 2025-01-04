// components/UserInfo/UserInfo.tsx
import React, { useState } from 'react';
import './userInfo.css';

const UserInfo: React.FC = () => {
  // User information from local storage
  const username = localStorage.getItem('username') || 'Unknown';
  const firstName = localStorage.getItem('first_name') || 'Unknown';
  const lastName = localStorage.getItem('last_name') || 'Unknown';
  const email = localStorage.getItem('email') || 'Unknown';

  // State for old and new passwords
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChangePassword = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('User not logged in.');
      return;
    }

    if (!oldPassword || !newPassword) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile/update-password/`, {
        method: 'POST', // Changed from PUT to POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token, // Include the token as part of the request body
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message || 'Password updated successfully.');
        setOldPassword('');
        setNewPassword('');
        setErrorMessage(null);
      } else {
        setErrorMessage(data.error || 'Failed to update password.');
      }
    } catch (error) {
      console.error('Error during password update:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div id="info-section" className="info-section">
      <div className="info-container">
        
        <div className="user-info-display">
        <h2>User Information</h2>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>First Name:</strong> {firstName}</p>
          <p><strong>Last Name:</strong> {lastName}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="password-change-form">
          <h3>Change Password</h3>
          <div className="form-group">
            <label htmlFor="old-password">Old Password</label>
            <input
              type="password"
              id="old-password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <button onClick={handleChangePassword} className="btn btn-primary">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
