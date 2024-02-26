import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Footer from './Footer'
import { useParams, Link, useNavigate } from 'react-router-dom';
import Topbar from './Topbar'
import { useCart } from './useCart';
import Nav from './Nav';

export default function Detail() {

  const { addToCart } = useCart();
  const { category, _id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  const [comparisonProducts, setComparisonProducts] = useState([]);

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Inside your useEffect in detail.js
  useEffect(() => {
    const fetchComparisonProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/auth/compareProducts/${category}/${_id}`, {
          headers: { Authorization: token },
        });

        const { comparisonProducts } = response.data;

        setComparisonProducts(comparisonProducts);
        console.log('Comparison Products:', comparisonProducts);
      } catch (error) {
        console.error('Error fetching comparison products:', error);
      }
    };

    fetchComparisonProducts();
  }, [category, _id]);


  useEffect(() => {
    // Fetch feedbacks for the current product
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/auth/feedbacks/${_id}`,
          {
            headers: { Authorization: token },
          });
        setFeedbacks(response.data.feedbacks);

        if (isAuthenticated) {
          const userResponse = await axios.get('http://localhost:5000/api/auth/getProfile', {
            headers: { Authorization: token },
          });

          const { name, email } = userResponse.data;
          setName(name);
          setEmail(email);
        }

      } catch (error) {
        console.error('Error fetching feedbacks:', error);

      }
    };

    fetchFeedbacks();
  }, [_id, isAuthenticated]);


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/auth/men/${category}/${_id}`, {
          headers: { Authorization: token },
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };


    fetchProductDetails();
  }, [category, _id,]);


  console.log('Selected quantity:', quantity);
  const handleAddToCart = () => {
    if (isAuthenticated) {
      if (quantity > 0) {
        const productDetails = {
          itemId: product._id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: quantity,
        };

        console.log('Product details:', productDetails);
        addToCart(productDetails);
        alert('Product added to cart!');

      }
    } else {
      alert('Please login first before adding products to the cart.');
      navigate('/login');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('Please login first before submitting a review.');
      navigate('/login');
      return;
    }

    if (!name || !email) {
      alert('Please provide your name and email.');
      return;
    }

    if (!rating || !review) {
      alert('Please provide a rating and review.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      // console.log('productId:', product);

      const response = await axios.post(
        'http://localhost:5000/api/auth/submitFeedback',
        {
          itemId: _id,
          rating,
          review,
          name,
          email,
        },
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 201) {
        console.log('Review submitted successfully!');
        console.log('Server Response:', response.data);

        // Fetch the updated feedbacks and update the state
        const updatedFeedbacksResponse = await axios.get(`http://localhost:5000/api/auth/feedbacks/${_id}`, {
          headers: { Authorization: token },
        });

        setFeedbacks(updatedFeedbacksResponse.data.feedbacks);

        // Optionally, you can reset the form fields here
        setRating(0);
        setReview('');
      } else {
        alert('Failed to submit review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderStars = (averageRating) => {
    const stars = [];
    const roundedRating = Math.round(averageRating);

    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars.push(<small key={i} className="fas fa-star"></small>);
      } else {
        stars.push(<small key={i} className="far fa-star"></small>);
      }
    }

    return stars;
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


      {/* Shop Detail Start  */}
      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 pb-5" style={{ width: '30%', height: '30%' }}>
            <div id="product-carousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                {product?.images.map((image, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img src={process.env.PUBLIC_URL + '/' + image.trim()} className="d-block w-100" alt={`Product ${index + 1}`} />
                  </div>
                ))}
              </div>
              <a className="carousel-control-prev" href="#product-carousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#product-carousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>

          </div>

          <div className="col-lg-7 pb-5">
            <h3 className="font-weight-semi-bold">{product?.title}</h3>
            <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                {renderStars(product?.averageRating)}
              </div>
              <small className="pt-1">{product?.averageRating} ratings  {feedbacks.length} reviews</small>
            </div>

            <h3 className="font-weight-semi-bold mb-4">${product?.price}</h3>
            <p className="mb-4">{product?.description}</p>
      
            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3" style={{ width: '130px' }}>
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-minus" onClick={decrementQuantity}>
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control bg-secondary text-center"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10); 
                    setQuantity(isNaN(value) ? 0 : value); 
                  }}
                />
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-plus" onClick={incrementQuantity}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>


              <button className="btn btn-primary px-3" onClick={handleAddToCart}><i className="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
            </div>
            <div className="d-flex pt-2">
              <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
              <div className="d-inline-flex">
                <a className="text-dark px-2" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="text-dark px-2" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="text-dark px-2" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="text-dark px-2" href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <div className="nav nav-tabs justify-content-center border-secondary mb-4">
              <a className="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Information</a>
              <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Top-Rated Alternatives</a>
              <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Reviews ({feedbacks.length})</a>
            </div>
            <div className="tab-content">

              <div className="tab-pane fade show active" id="tab-pane-1">
                <h4 className="mb-3">Additional Information</h4>
                <div className="product-description">
                  {product?.information.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
                <style>{`
        .product-description {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .product-description p {
          margin: 0;
        }

        .product-description strong {
          font-weight: bold;
          margin-right: 5px;
        }
      `}</style>
              </div>

              <div className="tab-pane fade" id="tab-pane-2">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    {/* Section to display comparison products */}
                    <div className="container-fluid py-5">
                      <h3 className="font-weight-semi-bold mb-4 text-center">Best Picks for You</h3>
                      <div className="row justify-content-center">
                        {comparisonProducts.map((product) => (
                          <div key={product._id} className="col-md-4 mb-4">
                            <div className="card h-100">
                              <img
                                src={process.env.PUBLIC_URL + '/' + product.image}
                                className="card-img-top"
                                alt={product.title}
                              />
                              <div className="card-body text-center">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">${product.price}</p>
                                <p className="card-text">Rating: {product.averageRating.toFixed(2)}</p>
                                <Link to={`/detail/${product.category}/${product._id}`} className="btn btn-primary">
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="tab-pane-3">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="mb-4">{feedbacks.length} reviews for "{product?.title}"</h4>
                    {feedbacks.map((feedback) => (
                      <div key={feedback._id} className="media mb-4">
                        <img src={process.env.PUBLIC_URL + '/' + product?.image} alt="Image" className="img-fluid mr-3 mt-1" style={{ width: '45px' }} />
                        <div className="media-body">
                          <h6>{feedback.name}<small> - <i>{new Date(feedback.Date).toLocaleDateString()}</i></small></h6>

                          <div className="text-primary mb-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <i key={index} className={`fas fa-star${index < feedback.rating ? '' : '-half-alt'}`}></i>
                            ))}
                          </div>
                          <p>{feedback.review}</p>
                        </div>
                      </div>
                    ))}

                  </div>
                  <div className="col-md-6">
                    <h4 className="mb-4">Leave a review</h4>
                    <form onSubmit={handleReviewSubmit}>
                      <small>Your email address will not be published. Required fields are marked *</small>
                      <div className="d-flex my-3">
                        <p className="mb-0 mr-2">Your Rating * :</p>
                     
                        <div className="text-primary">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className={`fas fa-star${star <= rating ? '' : '-half-alt'}`}
                              onClick={() => setRating(star)}
                            ></i>
                          ))}
                        </div>
                      </div>


                      <div className="form-group">
                        <label htmlFor="message">Your Review *</label>
                        <textarea
                          id="message"
                          cols="30"
                          rows="5"
                          className="form-control"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Your Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          readOnly 
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Your Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          readOnly // Make email readonly, as it should not be editable
                        />
                      </div>
                      <div className="form-group mb-0">
                        <input type="submit" value="Leave Your Review" className="btn btn-primary px-3" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Shop Detail End  */}


      <Footer />

      {/* Back to Top  */}
      <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>

    </>
  )
}