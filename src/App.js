import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart, addItem } from './features/cart/cartSlice';
import CartItem from './components/CartItem';
import './App.css';

const App = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data.items);
                dispatch(setCart(data.items));
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [dispatch]);

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };

    return (
        <div className="cart-container">
            <h1>React Redux Task</h1>
            <div className="cart-items">
                {cart.items.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
            <div className="cart-summary">
                <p>Total Quantity: {cart.totalQuantity}</p>
                <p>Total Amount: ${cart.totalAmount.toFixed(2)}</p>
            </div>
            <div className="products">
                <h2>Products</h2>
                {products.map(product => (
                    <div key={product.id} className="product">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price.toFixed(2)}</p>
                        <button type="button" className="btn btn-secondary btn-lg" onClick={() => handleAddItem(product)}>
                            Add New
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
