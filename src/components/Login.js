import React, { useState } from 'react';
import axios from 'axios';
import Topbar from './Topbar';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      localStorage.setItem('token', response?.data?.token);

      console.log('User logged in successfully');
      // Redirect the user to another page
      navigate('/cart');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || 'An unexpected error occurred');

      alert('Invalid email or password');

    }
  };

  return (
    <>
      <Topbar />
      {/* Login Form */}
      <div className="container-fluid pt-5 ">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div className="mb-4">
              <h4 className="font-weight-semi-bold mb-4">Log In</h4>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>E-mail</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="example@email.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <button type="button" className="btn btn-primary" onClick={handleLogin}>
                    Log In
                  </button>
                </div>
                <div className="col-md-12">
                  <p>
                    Don't have an account? <Link to="/register">Create one</Link>
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
