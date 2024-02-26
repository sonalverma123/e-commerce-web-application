import React from 'react'
import Topbar from './Topbar';
import Nav from './Nav';
import { Link } from 'react-router-dom'
import Footer from './Footer';

export default function Contact() {
  const handleClick = () => {
    const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=support@example.com&su=Feedback`;
    window.location.href = emailLink;
  };
  return (
    <>
      <Topbar />
      <Nav />

      {/* Page Header Start  */}
      <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '300px' }}>

          <h1 className="font-weight-semi-bold text-uppercase mb-3">Contact Us</h1>
          <div className="d-inline-flex">
            <p className="m-0"><Link to="/navbar">Home</Link></p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Contact</p>
          </div>
        </div>
      </div>
      {/* Page Header End  */}

      {/* Contact Start  */}
      <div class="container-fluid pt-5">
        <div class="text-center mb-4">
          <h2 class="section-title px-5"><span class="px-2">Contact For Any Queries</span></h2>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img
            src={process.env.PUBLIC_URL + '/img/email-icon.jpg'}
            alt="Email Icon"
            onClick={handleClick}
            style={{ cursor: 'pointer', width: '400px', height: '300px' }}
          />
        </div>

      </div>
      {/* Contact End  */}

      <Footer />
    </>
  )
}
