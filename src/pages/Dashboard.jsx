import React, { useState } from 'react';
import { mockUser } from '../constants';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(mockUser);
  const [editMode, setEditMode] = useState({ name: false, email: false });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

  const handleUserChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const toggleEdit = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const updatePassword = (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert('Passwords do not match');
      return;
    }
    // Simulate password update
    alert('Password updated (demo)');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Your Dashboard</h2>
      </div>

      <div className="profile-section">
        <div className="profile-photo">
          <img src={user.avatar} alt="profile" />
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <label>Name</label>
            {editMode.name ? (
              <div className="edit-field">
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleUserChange('name', e.target.value)}
                  autoFocus
                />
                <button onClick={() => toggleEdit('name')}>Save</button>
              </div>
            ) : (
              <div className="display-field">
                <span>{user.name}</span>
                <button onClick={() => toggleEdit('name')}>Edit</button>
              </div>
            )}
          </div>

          <div className="detail-row">
            <label>Email</label>
            {editMode.email ? (
              <div className="edit-field">
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => handleUserChange('email', e.target.value)}
                />
                <button onClick={() => toggleEdit('email')}>Save</button>
              </div>
            ) : (
              <div className="display-field">
                <span>{user.email}</span>
                <button onClick={() => toggleEdit('email')}>Edit</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="password-section">
        <h3>Change Password</h3>
        <form onSubmit={updatePassword}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="current"
              value={passwordData.current}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="new"
              value={passwordData.new}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirm"
              value={passwordData.confirm}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Update Password</button>
        </form>
      </div>

      <div className="account-settings">
        <h3>Account Settings</h3>
        <div className="settings-option">
          <span>Two-Factor Authentication</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="settings-option">
          <span>Email Notifications</span>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;