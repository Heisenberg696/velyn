import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FaBars, FaTimes } from "react-icons/fa";
import siteConfig from "../siteConfig";
import "./Navbar.css";
import '../App.css';

function CartIcon() {
    return (
        <svg className="cart-svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 7h12l-1 12.2a1.8 1.8 0 0 1-1.8 1.8H8.8A1.8 1.8 0 0 1 7 19.2L6 7Z" />
            <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
        </svg>
    );
}

export default function Navbar() {
    const { cartCount, toggleCart } = useContext(CartContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const onKeyDown = (event) => {
            if (event.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [menuOpen]);

    const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

    return (
    <nav className={`navbar${scrolled ? " is-scrolled" : ""}`}>
        <div className="navbar-inner">
            <Link to="/" className="logo" aria-label={`${siteConfig.businessName} home`}>
                <img src="/images/logo.jpeg" alt={`${siteConfig.businessName} logo`} />
            </Link>

            <ul className="nav-links">
                <li>
                    <NavLink to="/" end className={linkClass}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/shop" className={linkClass}>Shop</NavLink>
                </li>
            </ul>

            <div className="nav-actions">
                <button
                    onClick={toggleCart}
                    className="cart-btn"
                    aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
                >
                    <CartIcon />
                    <span className="cart-count">{cartCount}</span>
                </button>

                <button
                    className="hamburger"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </div>

        <div id="mobile-menu" className={`mobile-menu${menuOpen ? " open" : ""}`}>
            <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/shop" className={linkClass} onClick={() => setMenuOpen(false)}>Shop</NavLink>
        </div>
    </nav>
    )
}
