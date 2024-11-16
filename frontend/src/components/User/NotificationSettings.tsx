// src/components/Profile/NotificationSettings.tsx
import React from 'react';
import './NotificationSettings.css';

const NotificationSettings: React.FC = () => {
    return (
        <div className="notification-settings-container">
            <h2>Notification Settings</h2>
            <label>
                <input type="checkbox" />
                Receive Email Notifications
            </label>
            <label>
                <input type="checkbox" />
                Receive SMS Notifications
            </label>
            <button className="save-button">Save Settings</button>
        </div>
    );
};

export default NotificationSettings;
