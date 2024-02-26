import React, { useState, useEffect } from 'react'
import { useCart } from './useCart';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer'
import Topbar from './Topbar'
export default function Cart({ setCartData }) {
  const { cart, removeFromCart, updateQuantity, updateCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate subtotal based on cart items

    let newSubtotal = 0;
    cart?.forEach(ca => {

      ca?.items?.forEach(car => {
        newSubtotal += (car?.price || 0) * (car?.quantity || 0);
      })
    })
    setSubtotal(newSubtotal);
    console.log('subtotal', subtotal);
    setCartData(cart);
    console.log('Cart in Cart.js after calculating subtotal:', cart);
  }, [cart, setCartData]);


  // Update cart after placing an order
  useEffect(() => {
    updateCart();
  }, [updateCart]);

  return (
    <>
      <Topbar />

      {/*  Cart Start  */}
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-bordered text-center mb-0">
              <thead className="bg-secondary text-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Increase or Decrease Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {cart?.map((product) => (
                  product?.items?.map((item) => (
                    <tr key={item.itemId}>
                      <td className="align-middle"> <div className="d-flex align-items-center">
                        <img src={item.image} alt="" style={{ width: '50px' }} />
                        <div className="ml-3">
                          <p className="mb-0">{item.title}</p>

                        </div>
                      </div></td>
                      <td className="align-middle">${item.price}</td>
                      <td className="align-middle">{item.quantity}</td>
                      <td className="align-middle">
                        <div className="input-group quantity mx-auto" style={{ width: '100px' }}>
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-minus"
                              onClick={() => {
                                const newQuantity = Math.max(item.quantity - 1, 1);
                                updateQuantity(item.itemId, newQuantity);
                              }}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm bg-secondary text-center"
                            value={item.quantity}
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-plus"
                              onClick={() => {
                                const newQuantity = item.quantity + 1;
                                updateQuantity(item.itemId, newQuantity);
                              }}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">${item.price * item.quantity}</td>
                      <td className="align-middle"><button className="btn btn-sm btn-primary" onClick={() => {
                        console.log('Item:', item);
                        console.log('Product ID to remove:', item._id);
                        removeFromCart(item._id);
                      }}><i className="fa fa-times"></i></button></td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <button
              className="btn btn-block"
              style={{ backgroundColor: '#28a745', color: '#fff', fontWeight: 'bold', marginTop: '15px', padding: '15px' }}
              onClick={() => navigate('/profile')}
            >
              Go to Orders
            </button>
            <div className="card border-secondary mb-5 " style={{ marginTop: '15px' }}>
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">Subtotal</h6>
                  <h6 className="font-weight-medium">${subtotal}</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">$10</h6>
                </div>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="font-weight-bold">Total</h5>
                  <h5 className="font-weight-bold">${subtotal + 10}</h5>
                </div>
                <Link to="/checkout" className="btn btn-block btn-primary my-3 py-3">
                  Proceed To Checkout
                </Link>

                <button
                  className="btn btn-block"
                  style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', marginTop: '15px', padding: '15px' }}
                  onClick={() => navigate('/navbar')}
                >
                  Continue Shopping
                </button>


              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cart End */}
      <Footer />



      {/*  Back to Top */}
      <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>
    </>
  )
}







