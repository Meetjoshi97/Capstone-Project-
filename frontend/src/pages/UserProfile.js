import React, { useState, useEffect } from 'react';
import './UserPage.css';
import { useAuth } from '../components/AuthContext'; // Adjust the path as necessary

const UserPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    country: '',
    city: '',
    zipCode: '',
    bio: '',
  });

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    country: '',
    city: '',
    zipCode: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/user/profile?email=${user.email}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setProfile(data);
            setForm(data); // Initialize form with profile data
          }
        })
        .catch(error => {
          console.error("There was an error fetching the profile data!", error);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(response => response.json())
      .then(data => {
        setProfile(data);
        setForm(data);
      })
      .catch(error => {
        console.error("There was an error updating the profile!", error);
      });
  };

  return (
    <section className="profile-management">
      <div className="form-container">
        <h2>Profile Management</h2>
        <p>Update your personal details and preferences.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={form.email} onChange={handleChange} placeholder="Enter your email" readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter your first name" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter your last name" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={form.address} onChange={handleChange} placeholder="Enter your address" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" value={form.country} onChange={handleChange} placeholder="Enter your country" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" value={form.city} onChange={handleChange} placeholder="Enter your city" />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input type="text" id="zipCode" value={form.zipCode} onChange={handleChange} placeholder="Enter your zip code" />
          </div>
        
          <button className='user-button' type="submit">Save Changes</button>
        </form>
      </div>
      <div className="current-profile">
        <h2>Current Profile</h2>
        <div className="profile-card">
          <div className="profile-avatar">{profile.firstName ? profile.firstName.charAt(0) : ''}</div>
          <div className="profile-details">
            <h3>{profile.firstName} {profile.lastName}</h3>
            <p>{profile.email}</p>
            <p><strong>Phone: </strong>{profile.phone}</p>
            <p><strong>Address: </strong>{profile.address}</p>
            <p><strong>City: </strong>{profile.city}</p>
            <p><strong>Country: </strong>{profile.country}</p>
            <p><strong>Zip Code: </strong>{profile.zipCode}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
