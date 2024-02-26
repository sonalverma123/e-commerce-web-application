import React from 'react'
import { Link } from 'react-router-dom'
import { useHandleLogout } from '../Utils/authUtils';

export default function Nav() {
    const handleLogout = useHandleLogout();
    const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated

    return (
        <>

            {/* Navbar Start */}

            <div className="container-fluid mb-5">
                <div className="row border-top px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <a
                            className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                            data-toggle="collapse"
                            href="#navbar-vertical"
                            style={{ height: '65px', marginTop: '-1px', padding: '0 30px' }}
                        >
                            <h6 className="m-0">Categories</h6>
                            <i className="fa fa-angle-down text-dark"></i>
                        </a>
                        <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                            <div className="navbar-nav w-100 overflow-hidden" style={{ height: '410px' }}>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link" data-toggle="dropdown">Dresses <i className="fa fa-angle-down float-right mt-1"></i></a>
                                    <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                        <Link to="/mencategory" className="dropdown-item">Men's Dresses</Link>
                                        <Link to="/womencategory" className="dropdown-item">Women's Dresses</Link>
                                    </div>
                                </div>
                                <Link to="/appliances" className="nav-item nav-link">Appliances</Link>
                                <Link to="/bagscategory" className="nav-item nav-link">Bags</Link>
                                <Link to="/shoecategory" className="nav-item nav-link">Shoes</Link>

                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <div className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                            </a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to="/navbar" className="nav-item nav-link active">Home</Link>

                                    <Link to="/ItemAdd" className="nav-item nav-link">Add Item</Link>
                                    <Link to="/contact" className="nav-item nav-link">Contact</Link>
                                </div>
                                <div className="navbar-nav ml-auto py-0">                                  
                                    {isAuthenticated ? (
                                        <button className="btn btn-link" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    ) : (
                                        <>
                                            <a href="/login" className="nav-item nav-link">Login</a>
                                            <Link to="/register" className="nav-item nav-link">Register</Link>
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
