import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartContent from '../components/CartContent';
import Breadcrumb from '../components/Breadcrumb';
import './Cart.css';

const Cart = () => {
    const { cartCount} = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <section className="cart">
            <Breadcrumb links={[
                
                {to: "/", label: "Home" },
                {to: "/cart", label: "Cart" }
            ]}/>
 
            <div className="cart-container">
                <div className="cart-header">
                    <div className="cart-icon-wrapper">
                        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 7h12l-1 12.2a1.8 1.8 0 0 1-1.8 1.8H8.8A1.8 1.8 0 0 1 7 19.2L6 7Z" />
                            <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
                        </svg>
                    </div>
                    <h1>Your Cart ({cartCount} items)</h1>
                </div>

                <CartContent variant='page' showSummary={true} onNavigate={navigate} />

            </div>

        </section>
    )
}

export default Cart;