// src/Sidebar.js
import React from 'react';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h2>Logo</h2>
            </div>
            <ul className="sidebar-menu">
                <li className="menu-item">
                    <a href="/">Home</a>
                </li>
                <li className="menu-item">
                    <a href="/tasks">Tasks</a>
                </li>
                <li className="menu-item">
                    <a href="/users">Users</a>
                </li>
                <li className="menu-item">
                    <a href="/apis">APIs</a>
                </li>
                <li className="menu-item">
                    <a href="/subscription">Subscription</a>
                </li>
                <li className="menu-item">
                    <a href="/settings">Settings</a>
                </li>
                <li className="menu-item">
                    <a href="/help-support">Help & Support</a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
