import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/currency';


export default function ProductCard({perfume, onAddToCart}) {
    const navigate = useNavigate();
    return (
        <div className="product-card" key={perfume.id}>
            <button
            className="cart-button"
            aria-label={`Add ${perfume.name} to cart`}
            onClick={(e) => {
                e.stopPropagation();
                onAddToCart(perfume, 1);
            }}
            >
            <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 7h12l-1 12.2a1.8 1.8 0 0 1-1.8 1.8H8.8A1.8 1.8 0 0 1 7 19.2L6 7Z" />
                <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
            </svg>
            </button>
            <div className="product-info" onClick={() => navigate(`/product/${perfume.slug}`)}>
                <img className="product-image" src={perfume.image} alt={perfume.name} loading="lazy" />

                <div className="product-meta">
                    <h3 className="product-name">{perfume.name}</h3>

                    <div className="price">
                        <span className="new-price">{formatPrice(perfume.price)}</span>
                    </div>

                    {perfume.stock > 0 && <span className="product-stock">In stock</span>}
                </div>
            </div>


        </div>
    )
}
