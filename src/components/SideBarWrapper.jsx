import '../App.css'

export default function SideBarWrapper({isOpen, onClose, position, className, headerContent, variant, children}) {
    return (
        <>
            <div 
                className={`sidebarOverlay ${isOpen ? 'visible' : ''}`} 
                onClick={onClose}
            ></div>

            <div className={`sidebarWrapper ${isOpen ? 'open' : ''} ${position} ${variant}`}>
                <div className={className}>
                    {variant === "cart" && <div className="spacer" />} 
                    <h2>{headerContent}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {children}
            </div>
        </>
    )
}