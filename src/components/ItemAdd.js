import React, { useState } from 'react';
import Topbar from './Topbar'
import Footer from './Footer'
import axios from 'axios';
import Nav from './Nav';


const AddProductForm = () => {
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
    information: '',
    category: 'men', // Default category
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImagesChange = (e) => {
    const { name, value } = e.target;
    const imagesArray = value.split(',');
    setProductData((prevData) => ({
      ...prevData,
      [name]: imagesArray,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to add the product
      await axios.post('http://localhost:5000/api/auth/add-product', productData);
      alert('Product added successfully');

      // Reset the form fields
      setProductData({
        title: '',
        price: '',
        image: '',
        description: '',
        information: '',
        category: 'men', // Reset to default category
        images: [],
      });

    } catch (error) {
      console.error('Error adding product:', error.message);
      alert('Failed to add product. Please try again.');
    }
  }

  return (
    <>
      <Topbar />
      <Nav />
      <div className="form-container">
        <div className="form-background left-background"></div>
        <div className="form-content">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input type="text" name="title" value={productData.title} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Price:
              <input type="number" name="price" value={productData.price} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Image URL:
              <input type="text" name="image" value={productData.image} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Images (comma-separated URLs):
              <textarea
                name="images"
                value={productData.images.join(',')} 
                onChange={handleImagesChange}
                required
              />
            </label><br />
            <label>
              Description:
              <textarea name="description" value={productData.description} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Additional Information:
              <textarea name="information" value={productData.information} onChange={handleChange} required />
            </label>
            <br />

            <label>
              Category:
              <select name="category" value={productData.category} onChange={handleChange}>
                <option value="men">Men</option>
                <option value="women">Women</option>

                <option value="appliances">Appliances</option>
                <option value="shoes">Shoes</option>
                <option value="bags">Bags</option>
              </select>
            </label>
            <br />
            <button type="submit">Add Product</button>
          </form>
        </div>
        <div className="form-background right-background"></div>
      </div>
      <Footer />
    </>
  );
};

export default AddProductForm;
