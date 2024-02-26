// authUtils.js

import { useNavigate } from 'react-router-dom';

export const useHandleLogout = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect the user to the login page
    navigate('/login');
  };

  return handleLogout;
};


export const useHandleCartClick = (isAuthenticated) => {
  isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      alert('Please login first before viewing the cart.');
      navigate('/login');
    }
  };

  return handleCartClick;
};