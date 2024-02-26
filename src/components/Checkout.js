import React, { useState } from 'react'
import Topbar from './Topbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Nav from './Nav';

export default function Checkout({ cartData }) {

  const validatePhoneNumber = (phoneNumber) => {

    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const countries = ['USA', 'Canada', 'India', 'Australia', 'UK'];

  const citiesByCountry = {
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco'],
    Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    India: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    UK: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Edinburgh'],
  };

  const statesByCity = {

    'New York': ['NY1', 'NY2', 'NY3'],
    'Los Angeles': ['LA1', 'LA2', 'LA3'],
    'Chicago': ['IL1', 'IL2', 'IL3'],
    'Houston': ['TX1', 'TX2', 'TX3'],
    'San Francisco': ['CA1', 'CA2', 'CA3'],
    'Toronto': ['ON1', 'ON2', 'ON3'],
    'Vancouver': ['BC1', 'BC2', 'BC3'],
    'Montreal': ['QC1', 'QC2', 'QC3'],
    'Calgary': ['AB1', 'AB2', 'AB3'],
    'Ottawa': ['ON4', 'ON5', 'ON6'],
    'Delhi': ['DL1', 'DL2', 'DL3'],
    'Mumbai': ['MH1', 'MH2', 'MH3'],
    'Bangalore': ['KA1', 'KA2', 'KA3'],
    'Chennai': ['TN1', 'TN2', 'TN3'],
    'Kolkata': ['WB1', 'WB2', 'WB3'],
    'Sydney': ['NSW1', 'NSW2', 'NSW3'],
    'Melbourne': ['VIC1', 'VIC2', 'VIC3'],
    'Brisbane': ['QLD1', 'QLD2', 'QLD3'],
    'Perth': ['WA1', 'WA2', 'WA3'],
    'Adelaide': ['SA1', 'SA2', 'SA3'],
    'London': ['ENG1', 'ENG2', 'ENG3'],
    'Manchester': ['ENG4', 'ENG5', 'ENG6'],
    'Birmingham': ['ENG7', 'ENG8', 'ENG9'],
    'Glasgow': ['SCO1', 'SCO2', 'SCO3'],
    'Edinburgh': ['SCO4', 'SCO5', 'SCO6'],
  };


  console.log('cart data', cartData);
  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [paypalId, setPaypalId] = useState('');
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();

  let subtotal = 0;

  cartData?.forEach(ca => {

    ca?.items?.forEach(car => {
      subtotal += (car?.price || 0) * (car?.quantity || 0);
    })
  })

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePayment = async () => {
    try {

      if (!validatePhoneNumber(billingData.mobileNumber)) {
        alert('Invalid phone number format. Please enter exactly 10 digits.');
        return;
      }

      if (!billingData.firstName || !billingData.lastName || !billingData.email || !billingData.mobileNumber || !billingData.addressLine1 || !billingData.country || !billingData.city || !billingData.state || !billingData.zipCode) {
        alert('All fields are required.');
        return;
      }


      if (paymentMethod === 'paypal' && (!paypalId || !/^[a-zA-Z]+@[a-zA-Z]+$/.test(paypalId))) {
        alert('Please enter a valid PayPal ID. Example: user@example.com');
        return;
      }

      if (paymentMethod === 'upi' && (!upiId || !/^[a-zA-Z]+@[a-zA-Z]+$/.test(upiId))) {
        alert('Please enter a valid UPI ID. Example: user@bank');
        return;
      }
      if ((paymentMethod === 'paypal' && !paypalId) || (paymentMethod === 'upi' && !upiId)) {
        alert('Please enter a valid payment ID.');
        return;
      }

      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(
          'http://localhost:5000/api/auth/place',
          { billingData, paymentMethod, paypalId, upiId, items: cartData },
          {
            headers: { Authorization: token },
          }
        );
      }

      alert('Congratulations! Your order has been placed.');
      setBillingData({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        addressLine1: '',
        addressLine2: '',
        country: '',
        city: '',
        state: '',
        zipCode: '',
      })

    } catch (error) {
      console.error('Error storing billing data:', error.response.data);
      alert('Error placing the order. Please try again.');
    }
  };

  return (
    <>
      <Topbar />
      <Nav />

      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div className="mb-4">
              <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
              <form>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={billingData.firstName}
                      onChange={handleBillingChange}
                      rquired
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={billingData.lastName}
                      onChange={handleBillingChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={billingData.email}
                      onChange={handleBillingChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={billingData.mobileNumber}
                      onChange={handleBillingChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="addressLine1">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressLine1"
                    name="addressLine1"
                    value={billingData.addressLine1}
                    onChange={handleBillingChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="addressLine2">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressLine2"
                    name="addressLine2"
                    value={billingData.addressLine2}
                    onChange={handleBillingChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    className="form-control"
                    id="country"
                    name="country"
                    value={billingData.country}
                    onChange={handleBillingChange}
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="city">City</label>
                  <select
                    className="form-control"
                    id="city"
                    name="city"
                    value={billingData.city}
                    onChange={handleBillingChange}
                    required
                  >
                    <option value="">Select City</option>
                    {citiesByCountry[billingData.country]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="state">State</label>
                  <select
                    className="form-control"
                    id="state"
                    name="state"
                    value={billingData.state}
                    onChange={handleBillingChange}
                    required
                  >
                    <option value="">Select State</option>
                    {statesByCity[billingData.city]?.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    name="zipCode"
                    value={billingData.zipCode}
                    onChange={handleBillingChange}
                    required
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-secondary mb-5">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Order Total</h4>
              </div>
              <div className="card-body">
                <h5 className="font-weight-medium mb-3">Products</h5>
                {cartData?.map((product) => (
                  product?.items?.map((item) => (
                    <div className="d-flex justify-content-between" key={item.itemId}>
                      <p>{item.title}</p>
                      <p>${item.price * item.quantity}</p>
                    </div>
                  ))
                ))}
                <hr className="mt-0" />
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
              </div>
            </div>

            <div className="card border-secondary mb-5">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Payment</h4>
              </div>
              <div className="card-body">
                {/* PayPal */}
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => handlePaymentMethodChange('paypal')}
                    />
                    <label className="custom-control-label" htmlFor="paypal">
                      Paypal
                    </label>
                  </div>
                  {paymentMethod === 'paypal' && (
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter your PayPal ID"
                      value={paypalId}
                      onChange={(e) => setPaypalId(e.target.value)}
                    />
                  )}
                </div>

                {/* UPI */}
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => handlePaymentMethodChange('upi')}
                    />
                    <label className="custom-control-label" htmlFor="upi">
                      UPI
                    </label>
                  </div>
                  {paymentMethod === 'upi' && (
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter your UPI ID"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  )}
                </div>
              </div>

            </div>
            <div className="card-footer border-secondary bg-transparent">
              <button
                className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3"
                onClick={() => handlePayment(paymentMethod)}
              >
                Place Order
              </button>
              <button
                className="btn btn-lg btn-block btn-success font-weight-bold my-3 py-3"
                onClick={() => navigate('/profile')}
              >
                Go to Orders
              </button>
            </div>
          </div>
        </div>
      </div>


      <Footer />


      {/* Back to Top  */}
      <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>
    </>
  )
}
