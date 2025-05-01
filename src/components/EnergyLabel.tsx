import '../sass/energyLabel.css';
import LabelBackground from '../img/icons/energyIcon.svg?react';

const EnergyLabel = ({energySymbol, useColorOption = false}: {energySymbol: string; useColorOption: boolean}): JSX.Element => {

    const energyClass: string = useColorOption ? `energyLabel__energyColor--${energySymbol.toUpperCase()}` : 'energyLabel__energyColor--default';

    return(
        <div className="energyLabel">
            <LabelBackground className={energyClass} />
            <div className="energyLabel__wrapper">
                <p className="energyLabel__wrapper--text">{energySymbol}</p>
            </div>
        </div>
    );
}

export default EnergyLabel;