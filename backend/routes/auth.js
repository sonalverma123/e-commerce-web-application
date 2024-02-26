const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const Item = require('../models/Item');
const Feedback = require('../models/Feedback');
const router = express.Router();

// Validation middleware to ensure required fields are provided
const validateRegistration = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  body('address').optional(),
  body('mobileNumber').optional(),
];

router.post('/register', validateRegistration, async (req, res) => {
  try {

    // Destructure fields from request body
    const { name, email, password, confirmPassword, address, mobileNumber } = req.body;

    // Log the incoming request data
    console.log('Registration Request:', req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {

      return res.status(400).json({ message: 'User already exists. Please choose a different email' });
    }
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {

      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, address, mobileNumber });
    await user.save();

    res.status(201).json({ message: 'Registration successful' });

  } catch (error) {
    // Handle errors
    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });

  }
});

// Validation middleware to ensure required fields are provided
const validateProduct = [
  body('title').notEmpty().withMessage('Title is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('image').notEmpty().withMessage('Image URL is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['men', 'women', 'children']).withMessage('Invalid category'),
];

router.post('/add-product', validateProduct, async (req, res) => {
  try {
    // Destructure fields from request body
    const { title, price, image, description, information, category, images } = req.body;

    // Check if the product already exists
    const existingProduct = await Item.findOne({ title });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    // Create a new product instance with the request body
    const newProduct = new Item({
      title,
      price,
      image,
      description,
      information,
      category,
      images: images || [], // Initialize images as an empty array
    });


    // Clean up the images array by removing empty strings and trimming each URL
    newProduct.images = images.filter((imageUrl) => imageUrl.trim() !== '');
    // Save the product to the database
    await newProduct.save();


    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter password').isEmpty(),

], async (req, res) => {
  const { email, password } = req.body;
  try {

    let user = await User.findOne({ email });
    // If user not found or password does not match
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Create a JWT token for authentication
    const token = jwt.sign({ userId: user._id, email: user.email }, '12345!@#', { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// API endpoint to add a product
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  console.log('Token:', token);
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, '12345!@#');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

router.get('/men/:category/:id', async (req, res) => {
  try {
    const { category, id } = req.params;
    // Fetch the product details from the database based on category and id
    const product = await Item.findOne({ category, _id: id });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to fetch women's category products
router.get('/women', async (req, res) => {
  try {

    const womenProducts = await Item.find({ category: 'women' });

    res.json(womenProducts);
  } catch (error) {
    console.error('Error fetching women category products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch men's category products
router.get('/men', async (req, res) => {
  try {
   
    const menProducts = await Item.find({ category: 'men' });

    res.json(menProducts);
  } catch (error) {
    console.error('Error fetching men category products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch shoes's category products
router.get('/shoes', async (req, res) => {
  try {
   
    const shoesProducts = await Item.find({ category: 'shoes' });

    res.json(shoesProducts);
  } catch (error) {
    console.error('Error fetching shoes category products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch bag's category products
router.get('/bags', async (req, res) => {
  try {
    // Query the database to retrieve women's category products
    const bagsCategory = await Item.find({ category: 'bags' });

    res.json(bagsCategory);
  } catch (error) {
    console.error('Error fetching bags category products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch appliance's category products
router.get('/appliances', async (req, res) => {
  try {
    // Query the database to retrieve women's category products
    const appliancesCategory = await Item.find({ category: 'appliances' });

    res.json(appliancesCategory);
  } catch (error) {
    console.error('Error fetching appliances category products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/products', verifyToken, async (req, res) => {
  try {
    const { itemId, title, quantity, price, image } = req.body;
    const userId = req.user.userId;


    console.log('Product Request:', req.body);

    const newProduct = {
      itemId,
      title,
      quantity,
      price,
      image,
    };

    console.log('quantity', quantity);
    // Finding the user's cart
    const userCart = await Product.findOne({ userId });

    if (userCart) {
      // Check if the product with the same itemId already exists
      const existingProductIndex = userCart.items.findIndex(item => item.itemId.toString() === itemId);

      if (existingProductIndex !== -1) {
        // If the product already exists, update the quantity
        userCart.items[existingProductIndex].quantity += quantity;
      } else {
        // If the product doesn't exist, push the new product
        userCart.items.push(newProduct);
      }

      // Save the updated cart
      await userCart.save();
    } else {
      // If the user doesn't have a cart yet, create one
      const newUserCart = new Product({
        userId,
        items: [newProduct],
      });

      await newUserCart.save();
    }

    res.status(201).json({ message: 'Product added successfully to the cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/products/:productId', verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = req.user.userId;
    const productId = req.params.productId;

    // Find the user's cart
    const userCart = await Product.findOne({ userId });

    if (userCart) {
      // Check if the product with the given productId exists
      const existingProduct = userCart.items.find(item => item.itemId.toString() === productId);

      if (existingProduct) {
        // If the product exists, update the quantity
        existingProduct.quantity = quantity;
        // Save the updated cart
        await userCart.save();
        return res.status(200).json({ message: 'Quantity updated successfully in the cart' });
      }
    }

    // If the product or cart doesn't exist, return an error
    return res.status(404).json({ message: 'Product or cart not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Endpoint to place an order
router.post('/place', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the user's cart
    const userCart = await Product.findOne({ userId });

    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. Add items to the cart before placing an order.' });
    }

    // Extract billing details and payment method from the request
    const { billingData, paymentMethod, paypalId, upiId } = req.body;

    // Create a new order
    const newOrder = new Order({
      userId,
      items: userCart.items,
      billingData,
      paymentMethod,
      paypalId,
      upiId,
    });

    // Save the order to the database
    await newOrder.save();

    // Clear the user's cart after placing the order
    await Product.deleteOne({ userId });

    res.status(201).json({ message: 'Order placed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/products', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const products = await Product.find({ userId: userId });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint to delete a product by ID
router.delete('/products/:id', verifyToken, async (req, res) => {

  const productId = req.params.id;
  try {
    // Check if the product exists
    const product = await Product.findOne({ "items._id": productId, userId: req.user.userId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Delete the product from the items array
    await Product.updateOne(
      { userId: req.user.userId },
      { $pull: { items: { _id: productId } } }
    );

    res.status(200).json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// API endpoint to submit feedback
router.post('/submitFeedback', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { itemId, rating, review, name, email } = req.body;

    console.log('Data received:', req.body);
    console.log('User ID:', userId);

    console.log('item ID', itemId);

    // Check if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      console.error('Invalid itemId:', itemId);
      return res.status(400).json({ error: 'Invalid itemId' });
    }

   
    const validProductId = new mongoose.Types.ObjectId(itemId);

    const newFeedback = new Feedback({
      userId,
      item: validProductId,
      rating,
      review,
      name,
      email,
    });

    await newFeedback.save();

    const feedbacks = await Feedback.find({ item: itemId });
    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    const averageRating = feedbacks.length > 0 ? totalRating / feedbacks.length : 0;

    await Item.findByIdAndUpdate(itemId, { $set: { averageRating } });

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/feedbacks/:itemId', verifyToken, async (req, res) => {
  try {
    const itemId = req.params.itemId;


    // Fetch feedbacks for the specified product
    const feedbacks = await Feedback.find({ item: itemId }).sort({ createdAt: -1 });

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Retrieve all orders for a user
router.get('/orders', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/orders/:id', verifyToken, async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.userId;

  try {
    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if the order belongs to the authenticated user
    if (order.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/profile', verifyToken, async (req, res) => {
  try {

    const userId = req.user.userId;
    const { name, email, address, mobileNumber } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, address, mobileNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getProfile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user profile data based on userId
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, email, address, mobileNumber } = userProfile;

    res.status(200).json({ name, email, address, mobileNumber });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/compareProducts/:category/:id', verifyToken, async (req, res) => {
  try {
    const { category, id } = req.params;

    // Fetch the current product details
    const currentProduct = await Item.findOne({ category, _id: id });

    if (!currentProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const topRatedProducts = await Item.find({
      category,
      _id: { $ne: id },
      averageRating: { $gt: 0 }, // Exclude products with 0 ratings
    })
      .sort({ averageRating: -1 })
      .limit(1);  // Limit to only one product with the highest rating


    const comparisonProducts = [currentProduct, ...topRatedProducts];

    res.status(200).json({ comparisonProducts });
  
  } catch (error) {
    console.error('Error fetching comparison products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
