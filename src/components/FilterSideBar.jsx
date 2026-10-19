import './FilterSideBar.css';
import SideBarWrapper from './SideBarWrapper';
import Button from './Button';
import Slider from '@mui/material/Slider';
import PriceBox from './PriceBox';
import { PRICE_MIN, PRICE_MAX } from '../perfumes';


export default function FilterSideBar({ isOpen, onClose, filters, setFilters, onApply, onClear }) {

    const handleView = () => {
        onApply();
        onClose();
    };

    const handlePriceChange = (event, newValue) => {
        if (Array.isArray(newValue)) {
            setFilters((prev) => ({ ...prev, price: newValue }));
        }
    };

    return (
        <>
            <SideBarWrapper
            isOpen={isOpen}
            onClose={onClose}
            position="left"
            className="filterSiderbarHeader"
            headerContent='Filter'
            >

                <div className="filterSiderContent">
                    <div className="filterSection">
                        <h3>By Price</h3>
                        <Slider
                            value={filters.price}
                            onChange={handlePriceChange}
                            valueLabelDisplay="off"
                            min={PRICE_MIN}
                            max={PRICE_MAX}
                            step={10}
                            sx={{
                                color: '#1C1C1C',
                                '& .MuiSlider-thumb': {
                                width: 17,
                                height: 17,
                                },
                            }}
                        />

                        <div className="price-input-group">
                            <PriceBox
                                value={filters.price[0]}
                                placeholder={String(PRICE_MIN)}
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                            />
                            <span className="to-text">to</span>

                            <PriceBox
                                value={filters.price[1]}
                                placeholder={String(PRICE_MAX)}
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                            />

                        </div>

                    </div>

                    <div className="filterButtons">
                        <Button className="button button-gold width" onClick={onClear}> Clear All </Button>
                        <Button className="button button-black width" onClick={handleView}> View </Button>
                    </div>
                </div>
            </SideBarWrapper>
        </>
    )
}
