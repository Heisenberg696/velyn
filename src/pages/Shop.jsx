
import FilterSideBar from '../components/FilterSideBar';
import { useState, useMemo, useContext } from 'react';
import './Shop.css';
import perfumes, { PRICE_MIN, PRICE_MAX } from '../perfumes';
import Button from '../components/Button';
import Breadcrumb from '../components/Breadcrumb';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';


export default function Shop() {
    const {addToCart} = useContext(CartContext)
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({
        price: [PRICE_MIN, PRICE_MAX],
    });
    const [sortBy, setSortBy] = useState('default');

    const filteredPerfumes = useMemo(() => {
        const inRange = perfumes.filter((perfume) =>
            perfume.price >= filters.price[0] && perfume.price <= filters.price[1]
        );

        if (sortBy === 'low-to-high') {
            return [...inRange].sort((a, b) => a.price - b.price);
        }

        if (sortBy === 'high-to-low') {
            return [...inRange].sort((a, b) => b.price - a.price);
        }

        if (sortBy === 'name') {
            return [...inRange].sort((a, b) => a.name.localeCompare(b.name));
        }

        return inRange;
    }, [filters, sortBy]);

    const handleApplyFilters = () => {
        setFilters({ ...filters });
    };

    const handleSorting = (e) => {
        setSortBy(e.target.value);
    }

    const isFilterActive = () =>
        filters.price[0] !== PRICE_MIN || filters.price[1] !== PRICE_MAX;

    const handleClear = () => {
        setFilters({ price: [PRICE_MIN, PRICE_MAX] });
    };


    const links = [
        { to: "/", label: "Home" },
        { to: "/shop", label: "Shop" },
    ];

    return (
        <section className="shop">
            <div className="shop-header">
                <Breadcrumb links={links}/>
                <h1 className="shop-title">Shop</h1>
            </div>

            <div className="shop-controls">
                <button className="filter-button" onClick={() => setShowFilter(true)}>
                    <i className="fa-solid fa-sliders"></i><span className="filter-text">Filter Products</span>
                </button>
                <select className='sort-select' onChange={handleSorting} value={sortBy} aria-label="Sort products">
                    <option value="default">Default sorting</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                </select>
            </div>

            {isFilterActive() &&
            <div className='clear-filter-wrapper'>
                <Button className="button button-black button-clear" onClick={handleClear}>Clear All</Button>
            </div>}

            <FilterSideBar
            isOpen={showFilter}
            onClose={() => setShowFilter(false)}
            filters={filters}
            setFilters={setFilters}
            onApply={handleApplyFilters}
            onClear={handleClear}
            />


            <div className="product-grid">
                {filteredPerfumes.length > 0 ? (
                    filteredPerfumes.map((perfume) => (
                        <ProductCard
                        key={perfume.id}
                        perfume={perfume}
                        onAddToCart={addToCart}/>
                    ))
                ) : (
                    <p className="no-products">No products found</p>
                )}
            </div>
        </section>
    )

};
