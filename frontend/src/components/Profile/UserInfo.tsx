// components/UserInfo/UserInfo.tsx
import React, { useState } from 'react';
import './userInfo.css';
import placeholderProfilePicture from '../icons/profile.png'; // Add a placeholder image

const UserInfo: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string>(placeholderProfilePicture); // Set dummy profile picture
  const [name, setName] = useState<string>('John Doe'); // Dummy name
  const [email, setEmail] = useState<string>('johndoe@example.com'); // Dummy email
  const [phoneNumber, setPhoneNumber] = useState<string>('123-456-7890'); // Dummy phone number
  const [password, setPassword] = useState<string>(''); // Placeholder for password input
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message

  // Handle profile picture change (no actual upload, just set a local URL)
  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string); // Set the new picture locally
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission (just a dummy function to display success message)
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage('Your information has been updated successfully!');
    setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
  };

  return (
    <div id="info-section" className="info-section">
      <div className="info-container">
        <div className="picture-container">
          <img src={profilePicture} alt="Profile" className="profile-picture" />
          <label htmlFor="change-picture" className="change-picture-button">
            Change Picture
          </label>
          <input
            type="file"
            id="change-picture"
            accept="image/*"
            onChange={handlePictureChange}
            style={{ display: 'none' }}
          />
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form className="info-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
