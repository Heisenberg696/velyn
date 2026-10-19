import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import siteConfig from "../siteConfig";
import { formatPrice } from "../utils/currency";
import {
    buildOrderMessage,
    buildWhatsAppUrl,
    generateOrderRef,
    lineTotal,
} from "../utils/orderMessage";
import Button from "./Button";
import './Checkout.css';

const GHANA_PHONE = /^(?:0|233|\+233)\d{9}$/;

const cleanPhone = (value) => String(value || '').replace(/[\s()-]/g, '');

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const momoNumber = String(siteConfig.momoNumber || '').trim();
    const momoName = String(siteConfig.momoName || '').trim();
    const momoNetwork = String(siteConfig.momoNetwork || '').trim();
    const hasMomo = momoNumber !== '';

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        notes: "",
    });
    const [payment, setPayment] = useState(hasMomo ? "momo" : "delivery");
    const [errors, setErrors] = useState({});
    const [order, setOrder] = useState(null);
    const [cartCleared, setCartCleared] = useState(false);

    useEffect(() => {
        if (cartCleared) {
            window.scrollTo(0, 0);
        }
    }, [cartCleared]);

    const handleClearCart = () => {
        clearCart();
        setCartCleared(true);
    };

    const paymentMethod = hasMomo ? payment : "delivery";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => {
            if (!prev[name]) return prev;
            const next = { ...prev };
            delete next[name];
            return next;
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        const phone = cleanPhone(formData.phone);
        if (!phone) {
            newErrors.phone = "Phone number is required";
        } else if (!GHANA_PHONE.test(phone)) {
            newErrors.phone = "Enter a valid phone number (0XXXXXXXXX or +233XXXXXXXXX)";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Delivery location is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cart.length === 0 || !validate()) return;

        const ref = generateOrderRef();
        const phone = cleanPhone(formData.phone);
        const message = buildOrderMessage({
            ref,
            cart,
            name: formData.name.trim(),
            phone,
            address: formData.address.trim(),
            notes: formData.notes,
            paymentMethod,
        });
        const url = buildWhatsAppUrl(siteConfig.whatsapp, message);

        window.open(url, "_blank", "noopener,noreferrer");
        setOrder({ ref, url });
    };

    const isEmpty = cart.length === 0 && !order;

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <h1 className="checkout-title">Checkout</h1>
                {cart.length > 0 && (
                    <p className="checkout-total">{formatPrice(cartTotal)}</p>
                )}
            </div>

            {cartCleared ? (
                <div className="checkout-confirm">
                    <h2 className="confirm-title">Thank you for your order!</h2>
                    <p className="confirm-text">
                        Your cart is empty. The vendor will confirm your order on WhatsApp.
                    </p>

                    <div className="confirm-actions">
                        <Button
                            className="button button-gold"
                            onClick={() => navigate("/shop")}
                        >
                            Continue shopping
                        </Button>
                        <Button
                            className="button button-black"
                            onClick={() => navigate("/")}
                        >
                            Back to home
                        </Button>
                    </div>
                </div>
            ) : order ? (
                <div className="checkout-confirm">
                    <h2 className="confirm-title">Your order message is ready.</h2>
                    <p className="confirm-text">
                        Send it on WhatsApp to complete your order.
                    </p>

                    <p className="confirm-ref">
                        Order reference: <strong>{order.ref}</strong>
                    </p>

                    <div className="confirm-actions">
                        <a
                            className="button button-black confirm-link"
                            href={order.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Open WhatsApp again
                        </a>
                        <Button
                            className="button button-gold"
                            onClick={handleClearCart}
                        >
                            Clear cart
                        </Button>
                    </div>
                </div>
            ) : isEmpty ? (
                <div className="checkout-empty">
                    <p>Your cart is currently empty.</p>
                    <Button
                        className="button button-gold"
                        onClick={() => navigate("/shop")}
                    >
                        Shop
                    </Button>
                </div>
            ) : (
                <div className="checkout-content">
                    <section className="checkout-summary" aria-label="Order summary">
                        <h2 className="checkout-section-title">Order summary</h2>

                        <ul className="summary-items">
                            {cart.map((item) => (
                                <li key={item.id} className="summary-item">
                                    <img
                                        className="summary-image"
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    <div className="summary-info">
                                        <span className="summary-name">{item.name}</span>
                                        <span className="summary-meta">
                                            {formatPrice(item.price)} &times; {item.quantity}
                                        </span>
                                    </div>
                                    <span className="summary-line">
                                        {formatPrice(lineTotal(item))}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="summary-total">
                            <span>Total</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                    </section>

                    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-control">
                            <label htmlFor="checkout-name">Full name</label>
                            <input
                                id="checkout-name"
                                type="text"
                                name="name"
                                autoComplete="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                aria-invalid={Boolean(errors.name)}
                                required
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="form-control">
                            <label htmlFor="checkout-phone">Phone number</label>
                            <input
                                id="checkout-phone"
                                type="tel"
                                name="phone"
                                inputMode="tel"
                                autoComplete="tel"
                                placeholder="0XXXXXXXXX or +233XXXXXXXXX"
                                value={formData.phone}
                                onChange={handleChange}
                                aria-invalid={Boolean(errors.phone)}
                                required
                            />
                            {errors.phone && <span className="error">{errors.phone}</span>}
                        </div>

                        <div className="form-control">
                            <label htmlFor="checkout-address">Delivery location / address</label>
                            <input
                                id="checkout-address"
                                type="text"
                                name="address"
                                autoComplete="street-address"
                                placeholder="e.g. East Legon, Accra"
                                value={formData.address}
                                onChange={handleChange}
                                aria-invalid={Boolean(errors.address)}
                                required
                            />
                            {errors.address && <span className="error">{errors.address}</span>}
                        </div>

                        <div className="form-control">
                            <label htmlFor="checkout-notes">Order notes <span className="optional">(optional)</span></label>
                            <textarea
                                id="checkout-notes"
                                name="notes"
                                rows={3}
                                placeholder="Any delivery instructions?"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>

                        <fieldset className="payment-methods">
                            <legend>Payment method</legend>

                            {hasMomo && (
                                <label className="payment-option">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="momo"
                                        checked={paymentMethod === "momo"}
                                        onChange={() => setPayment("momo")}
                                    />
                                    <span className="payment-option-label">Pay with MoMo</span>
                                </label>
                            )}

                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="delivery"
                                    checked={paymentMethod === "delivery"}
                                    onChange={() => setPayment("delivery")}
                                />
                                <span className="payment-option-label">
                                    Pay on delivery / confirm with vendor
                                </span>
                            </label>
                        </fieldset>

                        {paymentMethod === "momo" && hasMomo && (
                            <div className="momo-details">
                                <dl className="momo-facts">
                                    <div>
                                        <dt>MoMo number</dt>
                                        <dd>{siteConfig.momoNumber}</dd>
                                    </div>
                                    <div>
                                        <dt>Account name</dt>
                                        <dd>{siteConfig.momoName}</dd>
                                    </div>
                                    {momoNetwork !== "" && (
                                        <div>
                                            <dt>Network</dt>
                                            <dd>{siteConfig.momoNetwork}</dd>
                                        </div>
                                    )}
                                    <div>
                                        <dt>Amount to send</dt>
                                        <dd>{formatPrice(cartTotal)}</dd>
                                    </div>
                                </dl>
                                <p className="momo-steps">
                                    Send {formatPrice(cartTotal)} to {siteConfig.momoNumber}
                                    {momoName !== "" && ` (${siteConfig.momoName})`}
                                    {momoNetwork !== "" && ` on ${siteConfig.momoNetwork}`},
                                    then send your payment screenshot with your order on WhatsApp.
                                </p>
                            </div>
                        )}

                        <p className="checkout-note">
                            Delivery charges will be confirmed by the vendor on WhatsApp.
                        </p>

                        <button type="submit" className="button button-gold checkout-submit">
                            Order via WhatsApp
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
