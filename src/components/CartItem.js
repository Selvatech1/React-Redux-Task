import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../features/cart/cartSlice';
import './CartItem.css';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="item-details">
                <h2>{item.title}</h2>
                <p>${item.price.toFixed(2)}</p>
                <div className="quantity-control">
                    <button 
                        type="button" 
                        className="btn btn-secondary btn-lg"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                        -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                        type="button" 
                        className="btn btn-secondary btn-lg"
                        onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                        +
                    </button>
                </div>
                <button 
                    type="button" 
                    className="remove-item"
                    onClick={() => dispatch(removeItem(item.id))}>
                    Remove
                </button>
            </div>
            <div className="item-total">
                <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartItem;
