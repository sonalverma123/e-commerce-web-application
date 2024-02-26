import React from 'react'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');
    const handleLogout = () => {

        localStorage.removeItem('token');

        navigate('/login');
    };

    const handleCartClick = () => {
        if (isAuthenticated) {
            navigate('/cart');
        } else {
            alert('Please login first before viewing the cart.');
            navigate('/login');
        }
    };

    return (
        <>
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
                            </Link>f
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
                            <span className="badge">0</span>
                        </button>
                    </div>
                </div>
            </div>

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
                        <div id="header-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" style={{ height: '410px' }}>
                                    <img className="img-fluid" src="img/carousel-1.jpg" alt="Image" />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: '700px' }}>
                                            <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
                                            <Link to="/womencategory" className="btn btn-light py-2 px-3">Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item" style={{ height: '410px' }}>
                                    <img className="img-fluid" src="img/carousel-2.jpg" alt="Image" />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: '700px' }}>
                                            <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">Reasonable Price</h3>
                                            <Link to="/womencategory" className="btn btn-light py-2 px-3">Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                                <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
                                    <span className="carousel-control-prev-icon mb-n2"></span>
                                </div>
                            </a>
                            <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                                <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
                                    <span className="carousel-control-next-icon mb-n2"></span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/*  Navbar End  */}


            {/* <!-- Featured Start --> */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: '30px' }}>
                            <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: '30px' }}>
                            <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                            <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: '30px' }}>
                            <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: '30px' }}>
                            <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                        </div>
                    </div>
                </div>
            </div>
            {/*  Featured End  */}


            {/*  Categories Start */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-4 col-md-6 pb-1">
                        <div className="cat-item d-flex flex-column border mb-4" style={{ padding: '30px' }}>

                            <Link to="/mencategory" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-1.jpg" alt="" />
                            </Link>
                            <h5 className="font-weight-semi-bold m-0">Men's dresses</h5>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pb-1">
                        <div className="cat-item d-flex flex-column border mb-4" style={{ padding: '30px' }}>

                            <Link to="/womencategory" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-2.jpg" alt="" />
                            </Link>
                            <h5 className="font-weight-semi-bold m-0">Women's dresses</h5>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 pb-1">
                        <div className="cat-item d-flex flex-column border mb-4" style={{ padding: '30px' }}>

                            <Link to="/appliances" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-4.jpg" alt="" />
                            </Link>
                            <h5 className="font-weight-semi-bold m-0">Appliances</h5>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pb-1">
                        <div className="cat-item d-flex flex-column border mb-4" style={{ padding: '30px' }}>

                            <Link to="/bagscategory" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-5.jpg" alt="" />
                            </Link>
                            <h5 className="font-weight-semi-bold m-0">Bags</h5>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pb-1">
                        <div className="cat-item d-flex flex-column border mb-4" style={{ padding: '30px' }}>

                            <Link to="/shoecategory" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-6.jpg" alt="" />
                            </Link>
                            <h5 className="font-weight-semi-bold m-0">Shoes</h5>
                        </div>
                    </div>
                </div>
            </div>
            {/* Categories End */}

            <Footer />
            {/* Back to Top */}

            <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>

        </>
    )
}
