import {useEffect, useState} from "react";
import '../sass/washingMachines.css';

import { WashingMachine } from '../types/types';
import WashingMachineCard from "./WashingMachineCard";


const WashingMachines = (): JSX.Element => {

    const [washingMachines, setWashingMachines] = useState<WashingMachine[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDevice, setSelectedDevice] = useState<number[]>([])

    useEffect(() => {
        const fetchWashingMachines = async () => {
            try {
                const response = await fetch('http://localhost:8080/washingMachines');
                const data: WashingMachine[] = await response.json();
                setWashingMachines(data);
                console.log(washingMachines)
            } catch (errror) {
                console.log("No washing machines in samsung store :(((((")
                console.log(errror);
            } finally {
                setLoading(false);
            }
        };
       fetchWashingMachines();
    },[])

    const toggleSelected = (id: number) => {
        setSelectedDevice((previouslySelected) => {
            const isSelected = previouslySelected.includes(id);

            if(isSelected) {
                return previouslySelected.filter((selectedId) => selectedId !== id);
            } else {
                return [...previouslySelected, id]
            }
        })
    }

    if(loading) return(
        <div>
           ŁADOWANIE PRALECZEK MILORDZIE
        </div>
    )

    return(
        <main className="washingMachines">
            <div className="washingMachines__container">

                {washingMachines.map((device) => (
                    <WashingMachineCard device={device} key={device.id} isSelected={selectedDevice.includes(device.id)} handleTogglle={() => toggleSelected(device.id)}/>
                ))}
            </div>

        </main>
    );
};

export default WashingMachines;