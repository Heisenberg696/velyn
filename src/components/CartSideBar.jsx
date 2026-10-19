import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import SideBarWrapper from './SideBarWrapper';
import '../App.css';
import Button from './Button';
import { formatPrice } from '../utils/currency';



const CartSideBar = ({children}) => {
    const { cart, cartCount, cartTotal, isCartOpen, closeCart } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <>
            {cart.length === 0 ? (
                <SideBarWrapper 
                    isOpen={isCartOpen} 
                    onClose={closeCart} 
                    position="right" 
                    variant='cart'
                    className="cartsidebarHeader" 
                    headerContent= {`Your Cart (${cartCount} items)`}
                >
                
                <div className="emptyCartSidebar">     
                    <p className='emp'>Your cart is currently empty.</p>
                    <Button className='button button-black width ' onClick={() => {
                        closeCart();
                        navigate('/shop');
                    }}>
                        Return to Shop
                    </Button>  
                </div>

                </SideBarWrapper>   
            ) : (   
                <SideBarWrapper 
                    isOpen={isCartOpen} 
                    onClose={closeCart} 
                    position="right" 
                    variant='cart'
                    className="cartsidebarHeader" 
                    headerContent= {`Your Cart (${cartCount} items)`}
                >
                
                <div className="sidebarContent">
                    {children} 
                </div>
    

                <div className="sidebarSummary">
                    <div className="summary-row">             
                        <span>SubTotal</span>
                        <span className='cart-summary-value' >{formatPrice(cartTotal)}</span>
                    </div>

                    <Button className='button button-black width' onClick={() => {
                        closeCart();
                        navigate('/checkout');
                    }}>
                        Checkout    
                    </Button>

                    <Button className='button button-gold width' onClick={() => {
                        closeCart();
                        navigate('/cart');
                    }}>
                        view cart   
                    </Button>
                </div>

                </SideBarWrapper>   
            )}
        </>
    )
}

export default CartSideBar;