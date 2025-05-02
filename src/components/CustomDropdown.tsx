import {useState} from "react";
import '../sass/customDropdown.css';
import ArrowIcon from '../img/icons/arrow.svg?react';

const CustomDropdown = ({label, option, select, onChange}: {label: string; option: string[]; select: string; onChange: (value: string) => void}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelect = (value: string) => {
        onChange(value === "Wszystkie" ? "": value);
        setIsOpen(false);
    };

    return(
        <div className="customDropdown">
            <label className="customDropdown__label">{label}</label>
            <div className="customDropdown__mainOption customDropdown__option" onClick={() => setIsOpen(previous => ! previous)}>
                {select || "Pokaż wszystkie"}
                <ArrowIcon className={`customDropdown__mainOption__icon${isOpen ? '--rotated' : ''}`} alt="arrow icon" style={{fill: '#8D8D8D'}}/>
            </div>
            {isOpen &&(
                <>
                    <div className="customDropdown__overlay" onClick={() => setIsOpen(false)}></div>
                    <ul className="customDropdown__list">
                        <li className="customDropdown__option" onClick={() => handleSelect("Wszystkie")}>Wszystkie</li>
                        {option.map((option, index) => (
                            <li className="customDropdown__option" key={index} onClick={() => handleSelect(option)}>{option}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )

}

export default CustomDropdown;