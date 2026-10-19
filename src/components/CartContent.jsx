import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { formatPrice } from '../utils/currency';
import './CartContent.css';

const CartContent = ({variant, showSummary}) => {
    const { cart, cartTotal, removeFromCart, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div className={`cart-product-container ${variant}`}>
            <div className="cart-products"> 
                <div className= {`cart-layout`}>
                    <div className="cart-item-heading">
                        <h3>Products</h3>
                    </div>
                    {cart.length === 0 ? (
                        <div className="cart-empty">
                            <p className> Your cart is currently empty.</p>
                            <Button className='button button-black' onClick={() => {
                                navigate('/shop');
                            }}>
                                Return to Shop
                            </Button>
          
                        </div>

                    ): (
                        cart.map((item) => (
                            <div key={item.id} className={`cart-item`}>
                                <button className="icon-btn" onClick={() => removeFromCart(item.id)}>
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                                <div className={`item-image-wrapper`}>
                                    <img src={item.image} alt={item.name} className={`cart-item-img`} />
                                </div>
                                <div className={`cart-wrapper`}>
                                    <div className={`cart-item-details`}>
                                        <h3>{item.name}</h3>

                                        <div className={`cart-quantity-wrapper`}>
                                            <h4>Quantity</h4>
                                            <div className={`quantity-selector`}>
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease quantity of ${item.name}`}>-</button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                    disabled={item.quantity >= (item.stock ?? 20)}
                                                >+</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`cart-price`}>
                                        <div>
                                            <span className="cart-new-price">{formatPrice(item.price)}</span>
                                        </div>

                                        <button className="icon-btn delete-icon" onClick={() => removeFromCart(item.id)}>
                                            <i className="fa-regular fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                        ))
                    )}
                </div>

            {showSummary &&
                <div className="cart-summary">
                    <h3>Cart Summary</h3>

                    <div className="summary-row">
                        <span>SubTotal</span>
                        <span className='cart-summary-value' >{formatPrice(cartTotal)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Shipping</span>
                        <span className='cart-summary-value'>FREE</span>
                    </div>

                    <div className="summary-row">
                        <span>Total</span>
                        <span className='cart-summary-value'>{formatPrice(cartTotal)}</span>
                    </div>

                    <Button className='button button-gold width' onClick={() => {
                        navigate('/checkout');
                    }}>
                        Checkout    
                    </Button>
                </div>
            }
            </div>
        </div>
    )
}

export default CartContent;
