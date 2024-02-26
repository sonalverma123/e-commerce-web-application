import React from 'react'
import { Link } from 'react-router-dom';
import { useCart } from './useCart';
import { useHandleCartClick } from '../Utils/authUtils';
export default function Topbar({ isAuthenticated }) {
  const handleCartClick = useHandleCartClick(isAuthenticated);
  const { cart } = useCart();
  const cartItemCount = cart ? cart.reduce((total, product) => total + product?.items?.length, 0) : 0;


  return (
    <>
      {/* topbar */}

      <div className="container-fluid">
        <div className="row bg-secondary py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center">

              <Link to="/contact" className="text-dark">
                Help
              </Link>
              <span className="text-muted px-2">|</span>
              <Link to="/contact" className="text-dark">
                Support
              </Link>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark px-2" href="https://www.facebook.com/your-facebook-profile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="text-dark px-2" href="https://twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-dark px-2" href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="text-dark px-2" href="https://www.instagram.com/your-instagram-profile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="text-dark pl-2" href="https://www.youtube.com/your-youtube-channel" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

        </div>
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a href="" className="text-decoration-none">
              <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">Shop</span>Nest</h1>
            </a>
          </div>
          <div className="col-lg-6 col-6 text-left">
            <form action="">

            </form>
          </div>
          <div className="col-lg-3 col-6 text-right">

            <button className="btn border" onClick={handleCartClick}>
              <i className="fas fa-shopping-cart text-primary"></i>
              {cartItemCount > 0 && <span className="badge badge-danger">{cartItemCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
