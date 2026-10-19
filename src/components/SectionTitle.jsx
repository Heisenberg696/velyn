
import './SectionTitle.css';


const SectionTitle = ({ subtitle, title }) => {
    return (
        <div className="section-title">
            <h2 className="section-subtitle">{subtitle}</h2>
            <p className="section-heading">{title}</p>
        </div>
    );
}

export default SectionTitle;