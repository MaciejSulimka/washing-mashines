import {WashingMachine} from "../types/types";
import '../sass/washingMachineCard.css';
import EnergyLabel from "./EnergyLabel";


const WashingMachineCard = ({device}: {device: WashingMachine}): JSX.Element => {

    const splitPrice = (price: number) => {
       const [amount, rest] = price.toFixed(2).split('.');
       return {
           amount,
           rest
       }
    }
    const {amount, rest} = splitPrice(device.price);

    return(
        <div className="washingMachineCard">
            <img className="washingMachineCard__image" src={device.image} alt={device.imageAltText}/>
            <div className="washingMachineCard__details">
                <h3 className="washingMachineCard__details--name">{device.modelCode}, {device.name}, {device.maxCapacity} kg, {device.color}</h3>
                <div className="washingMachineCard__specification">
                    <p className="washingMachineCard__specification--capacity">Pojemność (kg): <strong>{device.capacity}</strong></p>
                    <p className="washingMachineCard__specification--dimensions">Wymiary (GxSxW): <strong>{device.dimensions.depth} x {device.dimensions.width} x {device.dimensions.height}</strong></p>
                    <p className="washingMachineCard__specification--functions">Funkcje: <strong>{device.functions.join(', ')}</strong></p>
                </div>
                <div className="washingMachineCard__energyClass">
                    <p className="washingMachineCard__energyClass--text">Klasa energetyczna</p>
                    <EnergyLabel energySymbol={device.energyClass} useColorOption={true} />
                </div>
                <div className="washingMachineCard__payment">
                    <p className="washingMachineCard__payment--data">Cena obowiązuje: {device.promotion.startDate} - {device.promotion.endDate}</p>
                    <h4 className="washingMachineCard__payment--price">{amount}</h4>
                    <h4 className="washingMachineCard__payment--price">{rest}</h4>
                    <p className="washingMachineCard__payment--installment">{device.monthlyInstallment} x {device.numberOfInstallments} rat</p>
                </div>
            </div>
            <button className="washingMachineCard__button">Wybierz</button>
        </div>
    )

}

export default WashingMachineCard;