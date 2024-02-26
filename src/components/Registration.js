import React, { useState } from 'react';
import axios from 'axios';
import Topbar from './Topbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default function Registration() {

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all required fields');
      return;
    }
    try {

      if (!validatePhoneNumber(formData.mobileNumber)) {
        alert('Invalid phone number format. Please enter exactly 10 digits.');
        return;
      }

      await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('User registered successfully');
      alert('User registered successfully');

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        mobileNumber: '',
      });

    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.error === 'Passwords do not match') {
          alert('Passwords do not match');
        } else {
          alert(error.response.data.message);
        }

      } else {
        alert('Registration Failed');
        console.error('Registration failed:', error.response.data.message);
      }
    }
  };

  return (
    <>
      <Topbar />
      {/* Registration Form */}
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div className="mb-4">


              <h4 className="font-weight-semi-bold mb-4">Create Account</h4>
              <div className="row">

                <div className="col-md-6 form-group">

                  <label>Your Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="John"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>E-mail</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="example@email.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Mobile Number</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="+123 456 789"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Address</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="123 Street"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="At least 6 characters"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Confirm Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12 form-group">

                  <button type="button" className="btn btn-primary" onClick={handleRegister}>
                    Create an account
                  </button>

                </div>


                <div className="col-md-12">
                  <p>
                    Already have an account? <Link to="/login">Log in</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
