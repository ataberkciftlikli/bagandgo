// src/components/Profile/HelpCenter.tsx
import React from 'react';
import './HelpCenter.css';

const HelpCenter: React.FC = () => {
    return (
        <div className="help-center-container">
            <h2>Help Center</h2>
            <p>If you have questions or need assistance, please refer to the sections below:</p>
            <ul className="help-topics">
                <li>
                    <h3>Contact Support</h3>
                    <p>Need help? Our support team is here for you. Reach out via the contact form or email.</p>
                </li>
                <li>
                    <h3>Account and Privacy Settings</h3>
                    <p>Learn how to manage your account, update your settings, and protect your privacy.</p>
                </li>
                <li>
                    <h3>Billing and Payments</h3>
                    <p>Get information about payment methods, invoices, and resolving billing issues.</p>
                </li>
            </ul>
            <button className="contact-button">Contact Support</button>
        </div>
    );
};

export default HelpCenter;
