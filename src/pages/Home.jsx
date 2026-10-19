
import Hero from '../components/Hero';
import SectionWrapper from '../components/SectionWrapper';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard.jsx';
import perfumes from '../perfumes.js';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';


export default function Home() {
    const {addToCart} = useContext(CartContext)

    return (
        <>
            <Hero />

            <SectionWrapper>
                <SectionTitle subtitle="the Velyn collection" title="Our Perfumes" />
                <div className="product-grid">
                {perfumes.map((perfume) => (
                    <ProductCard
                    perfume={perfume}
                    key={perfume.id}
                    onAddToCart={addToCart}
                    />
                ))}
                </div>
            </SectionWrapper>
        </>

    )
}
