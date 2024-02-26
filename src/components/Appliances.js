import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Topbar from './Topbar'
import Footer from './Footer'
import ProductCard from './ProductCard';
import Nav from './Nav';
export default function Appliances() {
  const [searchQuery, setSearchQuery] = useState('');

  const [sortBy, setSortBy] = useState('latest');
  const [appliances, setAppliances] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  useEffect(() => {

    const fetchAppliancesProducts = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5000/api/auth/appliances', {
          headers: { Authorization: token },
        });
        console.log('Appliances Products:', response.data);


        setAppliances(response.data);
      } catch (error) {
        console.error('Error fetching Appliances category products:', error.message);
      }
    };


    fetchAppliancesProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSortChange = (selectedSort) => {
    setSortBy(selectedSort);
  };

  const sortProducts = (products) => {
    if (sortBy === 'latest') {
      return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'bestRating') {
      return products.sort((a, b) => b.averageRating - a.averageRating);
    }
    return products;
  };

  const filteredAndSortedProducts = sortProducts(
    appliances.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      <Topbar />
      <Nav />
      {/* <!-- Page Header Start --> */}
      <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '300px' }}>
          <h1 className="font-weight-semi-bold text-uppercase mb-3">Our Shop</h1>
          <div className="d-inline-flex">
          <p className="m-0"><Link to="/navbar">Home</Link></p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shop</p>
          </div>
        </div>
      </div>
      {/* <!-- Page Header End --> */}


      {/* <!-- Shop Start --> */}
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          {/* <!-- Shop Sidebar Start --> */}
          <div className="col-lg-3 col-md-12">
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <form action="" className="w-75">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control border-primary"
                        placeholder="Search for Products"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bg-transparent text-primary border-primary ">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </form>
                  <div className="dropdown ml-4">
                    <button
                      className="btn border dropdown-toggle bg-primary text-white"
                      type="button"
                      id="triggerId"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                      <a
                        className={`dropdown-item ${sortBy === 'latest' ? 'active' : ''}`}
                        href="#"
                        onClick={() => handleSortChange('latest')}
                      >
                        Latest
                      </a>
                      <a
                        className={`dropdown-item ${sortBy === 'bestRating' ? 'active' : ''}`}
                        href="#"
                        onClick={() => handleSortChange('bestRating')}
                      >
                        Best Rating
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Products Start --> */}

              <div className="row pb-3">
                {paginatedProducts.map((product) => (
                  <div key={product._id} >
                    <ProductCard product={product} />
                  </div>
                ))}

              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="col-12 pb-1">
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center mb-3">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a
                          className="page-link"
                          href="#"
                          aria-label="Previous"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          <span aria-hidden="true">&laquo;</span>
                          <span className="sr-only">Previous</span>
                        </a>
                      </li>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                          <a
                            className="page-link"
                            href="#"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <a
                          className="page-link"
                          href="#"
                          aria-label="Next"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          <span aria-hidden="true">&raquo;</span>
                          <span className="sr-only">Next</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*  Products End  */}
      <Footer />
    </>
  )
}

