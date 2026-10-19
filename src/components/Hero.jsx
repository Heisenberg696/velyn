
import "./Hero.css";
import '../App.css';
import { useNavigate } from "react-router-dom";
import Button from "./Button";


export default function Hero() {

    const navigate = useNavigate();
    return (
        <section className="hero">
            <div className="hero-overlay">
                <p className="hero-eyebrow">The Velyn Collection</p>
                <h1>Find Your <span className="break-desktop">Signature Scent</span></h1>
                <p className="hero-subtitle">Timeless luxury perfumes, crafted to be worn every day and remembered always.</p>
                <Button
                className="button button-gold"
                onClick={() => navigate('/shop')}
                > Shop Now </Button>
            </div>
        </section>
    )

}
