import {useEffect, useState} from "react";
import '../sass/washingMachines.css';

import { WashingMachine, Filters} from '../types/types';
import WashingMachineCard from "./WashingMachineCard";
import washingMachineCard from "./WashingMachineCard";


const WashingMachines = (): JSX.Element => {

    const [washingMachines, setWashingMachines] = useState<WashingMachine[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDevice, setSelectedDevice] = useState<number[]>([]);
    const [filters, setFilters] =  useState<Filters>({
        query: '',
        popularity: '',
        energyClass: '',
        // capacity: 0,
        functions: '',
        sort: '',
    });


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

    const filteredMachines = washingMachines.filter(device => {

        const fitQuery = device.name.toLowerCase().includes(filters.query.toLowerCase()) || device.modelCode.toLowerCase().includes(filters.query.toLowerCase()) || !filters.query
        const fitsEnergy = device.energyClass === filters.energyClass || !filters.energyClass;
        // const fitsCapacity = device.maxCapacity === 0 || device.maxCapacity === filters.capacity;
        const fitFunctions = device.functions.includes(filters.functions) || !filters.functions;

        return(
            // fitQuery && fitFunctions && fitsEnergy && fitsCapacity
        fitQuery && fitFunctions && fitsEnergy
    );
    })
        .sort((a, b) => {
            if(filters.sort === 'price') {
                return(
                    a.price - b.price
                );
            }
            if(filters.sort === 'capacity') {
                return(
                    a.capacity - b.capacity
                );
            }
            return 0;
        })

    if(loading) return(
        <div>
           ŁADOWANIE PRALECZEK MILORDZIE
        </div>
    )

    console.log(washingMachines)
    console.log(filteredMachines)

    return(
        <main className="washingMachines">
            <div>
                <select value={filters.sort} onChange={e => {setFilters(previous => ({...previous, sort: e.target.value}))}}>
                    <option value="">Sortuj po:</option>
                    <option value="price">Cena</option>
                    {/*<option value="capacity">Pojemnność</option>*/}
                </select>
            </div>
            <h2>{washingMachines.length}</h2>
            <div className="washingMachines__container">
                {filteredMachines.map((device) => (
                    <WashingMachineCard device={device} key={device.id} isSelected={selectedDevice.includes(device.id)} handleTogglle={() => toggleSelected(device.id)}/>
                ))}
            </div>

        </main>
    );
};

export default WashingMachines;