
import './SectionWrapper.css';

const SectionWrapper = ({ children, containerClassName = "", variant}) => {
    return (
        <section className={`section-wrapper ${variant || ''}`}>
            <div className={`section-container ${containerClassName}`}>
                {children}
            </div>
        </section>
    );
}

export default SectionWrapper;