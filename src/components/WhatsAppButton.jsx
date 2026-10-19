import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import siteConfig from '../siteConfig';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
    const { pathname } = useLocation();
    const { isCartOpen } = useContext(CartContext);

    const isHidden = pathname === '/checkout' || isCartOpen;

    if (isHidden) return null;

    const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
        siteConfig.whatsappMessage
    )}`;

    return (
        <a
            className="whatsapp-float"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with ${siteConfig.businessName} on WhatsApp`}
        >
            <FaWhatsapp aria-hidden="true" />
        </a>
    );
}
