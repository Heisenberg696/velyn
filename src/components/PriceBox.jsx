
import './PriceBox.css';

export default function PriceBox({ value, placeholder, min, max }) {

    return (
        <div className="price-box">
            <span>GH₵</span>
            <input 
                type="number"
                placeholder={placeholder}
                value={value}
                min={min}
                max={max}
                className="price-input"
                inputMode="numeric"
                pattern="[0-9]*"
                readOnly/>
        </div>
    )
}