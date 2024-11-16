// src/components/Profile/PrivacySettings.tsx
import React from 'react';
import './PrivacySettings.css';

const PrivacySettings: React.FC = () => {
    return (
        <div className="privacy-settings-container">
            <h2>Privacy Settings</h2>
            <label>
                <input type="checkbox" />
                Allow Data Sharing for Personalized Ads
            </label>
            <label>
                <input type="checkbox" />
                Enable Two-Factor Authentication
            </label>
            <button className="save-button">Save Settings</button>
        </div>
    );
};

export default PrivacySettings;
