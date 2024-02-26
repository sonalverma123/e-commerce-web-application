import React, { useState, useEffect } from 'react';
import Topbar from './Topbar'
import Footer from './Footer'
import Nav from './Nav'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Profile() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
    mobileNumber: '',
  });


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/orders', {
          headers: { Authorization: token },
        });

        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/getProfile', {
          headers: { Authorization: token },
        });

        const { name, email, address, mobileNumber } = response.data;
        setUserData({ name, email, address, mobileNumber });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleRemoveOrder = async (orderId) => {
    console.log('Order ID to remove:', orderId);
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/auth/orders/${orderId}`, {
        headers: { Authorization: token },
      });

      console.log('Response from server:', response);

      if (response.status === 200) {
        
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        alert('Order removed successfully');
      } else {
        console.error('Error removing order:', response.data.message);
        alert('Failed to remove order. Please try again.');
      }
    } catch (error) {
      console.error('Error removing order:', error);
      alert('Failed to remove order. Please try again.');
    }
  };

  // Function to update user profile
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        userData,
        {
          headers: { Authorization: token },
        }
      );

      console.log('Response from server:', response);

      if (response.status === 200) {
        setUserData(response.data);
        alert('Profile updated successfully');
      } else {
        console.error('Error updating profile:', response.data.message);
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <>
      <Topbar />
      <Nav />

      {/* Page Header Start  */}
      <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '300px' }}>
          <h1 className="font-weight-semi-bold text-uppercase mb-3">Shop Detail</h1>
          <div className="d-inline-flex">
            <p className="m-0"><Link to="/navbar">Home</Link></p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shop Detail</p>
          </div>
        </div>
      </div>
      {/* Page Header End  */}


      <div className="container mt-5">
        <div className="row">
          {/* Your Orders Box */}
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header">Your Orders</div>
              <div className="card-body">
                {orders.length === 0 && <p>No orders found.</p>}
                {orders.map((order) => (
                  <div key={order._id} className="mb-4 border p-3">
                    <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    {order.items.length === 0 ? (
                      <p>No products found for this order.</p>
                    ) : (
                      order.items.map((product) => (
                        <div key={product._id} className="mb-3 border p-2">
                          <p>Title: {product.title}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Price: {product.price}</p>
                          <img src={product.image} alt={product.title} style={{ width: '50px' }} />
                        </div>
                      ))
                    )}
                    <button onClick={() => handleRemoveOrder(order._id)} className="btn btn-danger">
                      Remove Order
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="btn btn-block"
              style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', marginTop: '15px', padding: '15px' }}
              onClick={() => navigate('/navbar')}
            >
              Continue Shopping
            </button>
          </div>

          <div className="container mt-5">
            <h2>Your Profile</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  readOnly // Make email readonly, as it should not be editable
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={userData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>


      <Footer />


      {/* Back to Top  */}
      <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>

    </>
  );
}
