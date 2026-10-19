import { Link } from 'react-router-dom';
import {
    FaInstagram,
    FaTiktok,
    FaSnapchatGhost,
    FaFacebookF,
    FaWhatsapp,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import siteConfig from '../siteConfig';
import './Footer.css';

const socialIcons = [
    { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
    { key: 'tiktok', label: 'TikTok', Icon: FaTiktok },
    { key: 'snapchat', label: 'Snapchat', Icon: FaSnapchatGhost },
    { key: 'facebook', label: 'Facebook', Icon: FaFacebookF },
];

const hasValue = (value) => typeof value === 'string' && value.trim() !== '';

export default function Footer() {
    const {
        businessName,
        tagline,
        phone,
        whatsapp,
        email,
        location,
        instagram,
        tiktok,
        snapchat,
        facebook,
    } = siteConfig;

    const socials = socialIcons.filter(({ key }) => hasValue(siteConfig[key]));
    const socialValues = { instagram, tiktok, snapchat, facebook };

    const quickLinks = [
        { to: '/', label: 'Home' },
        { to: '/shop', label: 'Shop' },
        { to: '/cart', label: 'Cart' },
    ];

    const whatsappNumber = whatsapp.replace(/[^\d]/g, '');

    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo-link" aria-label={`${businessName} home`}>
                        <img className="footer-logo-image" src="/images/logo.jpeg" alt={`${businessName} logo`} />
                    </Link>

                    {hasValue(tagline) && <p className="footer-tagline">{tagline}</p>}

                    {socials.length > 0 && (
                        <div className="footer-socials">
                            {socials.map((social) => (
                                <a
                                    key={social.key}
                                    href={socialValues[social.key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${businessName} on ${social.label}`}
                                >
                                    <social.Icon aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div className="footer-right">
                    <div className="footer-link-section">
                        <h4 className="footer-heading">Quick links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="footer-link">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {(hasValue(phone) || hasValue(whatsapp) || hasValue(email) || hasValue(location)) && (
                        <div className="footer-contact">
                            <h4 className="footer-heading">Contact us</h4>

                            <div className="contact-item">
                                {hasValue(phone) && (
                                    <span>
                                        <FaPhoneAlt className="footer-icon" aria-hidden="true" />
                                        <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                                    </span>
                                )}

                                {hasValue(whatsapp) && (
                                    <span>
                                        <FaWhatsapp className="footer-icon" aria-hidden="true" />
                                        <a
                                            href={`https://wa.me/${whatsappNumber}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Chat on WhatsApp
                                        </a>
                                    </span>
                                )}

                                {hasValue(email) && (
                                    <span>
                                        <FaEnvelope className="footer-icon" aria-hidden="true" />
                                        <a href={`mailto:${email}`}>{email}</a>
                                    </span>
                                )}

                                {hasValue(location) && (
                                    <span>
                                        <FaMapMarkerAlt className="footer-icon" aria-hidden="true" />
                                        {location}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} {businessName}. All rights reserved.</p>
            </div>
        </div>
    );
}
