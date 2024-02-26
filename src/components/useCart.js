import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/products', {
            headers: { Authorization: token },
          });

          setCart(response.data.products);
          console.log('cart fetched', response.data.products)
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateCart = async () => {

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/products', {
          headers: { Authorization: token },
        });

        setCart(response.data.products);

        let newSubtotal = 0;
        response.data.products?.forEach((ca) => {
          ca?.items?.forEach((car) => {
            newSubtotal += (car?.price || 0) * (car?.quantity || 0);
          });
        });
        setSubtotal(newSubtotal);

        console.log('Cart updated successfully.');
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
  };


  const addToCart = async (product) => {
    if (!product || !product.itemId) {
      console.error('Invalid product:', product);
      return;
    }

    const existingProductIndex = cart.findIndex((item) => item.itemId === product.itemId);

    if (existingProductIndex !== -1) {
      // If the product already exists in the cart, update the quantity
      const updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + (parseInt(product.quantity, 10) || 1) } : item
      );
      setCart(updatedCart);

      console.log('quantity', product.quantity);
      console.log('Product already exists in cart. Updated cart:', updatedCart);
    } else {
      // If the product doesn't exist in the cart, add it
      const updatedCart = [...cart, { ...product, quantity: parseInt(product.quantity, 10) || 1 }];
      setCart(updatedCart);
      console.log('Product added to cart. Updated cart:', updatedCart);

      const token = localStorage.getItem('token');
      if (token) {
        try {
          console.log('Adding product to the server:', {
            itemId: product.itemId,
            title: product.title,
            quantity: product.quantity || 1,
            price: product.price,
            image: product.image,
          });

          await axios.post('http://localhost:5000/api/auth/products', {
            itemId: product.itemId,
            title: product.title,
            quantity: product.quantity || 1,
            price: product.price,
            image: product.image,
          }, {
            headers: { Authorization: token },
          });

          console.log('Product added to the server successfully.');
        } catch (error) {
          console.error('Error saving product to the database:', error);
        }
      }
    }
    updateCart();
  };


  useEffect(() => {
    console.log('Cart after adding:', cart);
  }, [cart]);

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Make the API call to delete the product
        await axios.delete(`http://localhost:5000/api/auth/products/${productId}`, {
          headers: { Authorization: token },
        });

        setCart((prevCart) => prevCart.filter((item) => item.itemId !== productId));

        console.log('Product removed successfully from the database');
      } catch (error) {
        console.error('Error removing product from the database:', error.response);
      }
    }
    updateCart();
  };

  const updateQuantity = async (productId, newQuantity) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Make the API call to update the quantity
        await axios.put(`http://localhost:5000/api/auth/products/${productId}`, {
          quantity: newQuantity,
        }, {
          headers: { Authorization: token },
        });

        // Fetch the updated cart after the quantity update
        const response = await axios.get('http://localhost:5000/api/auth/products', {
          headers: { Authorization: token },
        });
        setCart(response.data.products);

        // Calculate subtotal based on the updated cart
        let newSubtotal = 0;
        response.data.products?.forEach((ca) => {
          ca?.items?.forEach((car) => {
            newSubtotal += (car?.price || 0) * (car?.quantity || 0);
          });
        });
        setSubtotal(newSubtotal);

        console.log('Quantity and subtotal updated successfully in the database');
      } catch (error) {
        console.error('Error updating quantity in the database:', error.response);
      }
    }
  };

  useEffect(() => {
    console.log('Cart after removing:', cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, loading, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
