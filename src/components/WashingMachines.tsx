import {useEffect, useState} from "react";
import '../sass/washingMachines.css';

import {WashingMachine, Filters} from '../types/types';
import WashingMachineCard from "./WashingMachineCard";
import washingMachineCard from "./WashingMachineCard";
import CustomDropdown from "./CustomDropdown";
import ArrowIcon from '../img/icons/arrow.svg?react';
import Loader from "./Loader";


const WashingMachines = (): JSX.Element => {

    const [washingMachines, setWashingMachines] = useState<WashingMachine[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDevice, setSelectedDevice] = useState<number[]>([]);
    const [visibleDevices, setVisibleDevices] = useState<number>(6);
    const [filters, setFilters] = useState<Filters>({
        query: '',
        popularity: '',
        energyClass: '',
        capacity: 0,
        functions: '',
        sort: '',
    });


    useEffect(() => {
        const fetchWashingMachines = async () => {
            try {
                const response = await fetch('http://localhost:8080/washingMachines');
                const data: WashingMachine[] = await response.json();
                setWashingMachines(data);
            } catch (errror) {
                console.log("No washing machines in samsung store :(((((")
                console.log(errror);
            } finally {
                setLoading(false);
            }
        };
        fetchWashingMachines();
    }, [])

    const toggleSelected = (id: number) => {
        setSelectedDevice((previouslySelected) => {
            const isSelected = previouslySelected.includes(id);

            if (isSelected) {
                return previouslySelected.filter((selectedId) => selectedId !== id);
            } else {
                return [...previouslySelected, id]
            }
        })
    }

    const filteredMachines = washingMachines.filter(device => {

        const fitQuery = device.name.toLowerCase().includes(filters.query.toLowerCase()) || device.modelCode.toLowerCase().includes(filters.query.toLowerCase()) || !filters.query
        const fitsEnergy = device.energyClass === filters.energyClass || !filters.energyClass;
        const fitsCapacity = filters.capacity === 0 || device.maxCapacity === filters.capacity;
        const fitFunctions = device.functions.includes(filters.functions) || !filters.functions;

        return (
            fitQuery && fitFunctions && fitsEnergy && fitsCapacity
        );
    })
        .sort((a, b) => {
            if (filters.sort === 'price') {
                return (
                    a.price - b.price
                );
            }
            if (filters.sort === 'capacity') {
                return (
                    b.capacity - a.capacity
                );
            }
            return 0;
        })

    if (loading) return (
        <main>
            <Loader/>
        </main>
    )


    return (
        <main className="washingMachines">
            <section className="washingMachines__layout">
                <div className="washingMachines__searchWrapper">
                    <input className="washingMachines__searchWrapper__input" type="text" placeholder="Szukaj..." value={filters.query} onChange={e => setFilters(previous => ({...previous, query: e.target.value}))}/>
                </div>
                <div className="washingMachines__filters">
                    <CustomDropdown label="Sortuj po:" option={["price", "capacity"]} select={filters.sort} onChange={(value => {
                        setFilters(previous => ({...previous, sort: value}) )
                    })}/>
                    <CustomDropdown label="Funkcje:"
                                    option={["Drzwi AddWash", "Panel AI Control", "Silnik inwererowy", "Wyświetlacz elektroniczny", "Turbo Wir 3000", "Turbo Wir 3500"]}
                                    select={filters.functions} onChange={(value) => {
                        setFilters((previous) => ({...previous, functions: value}))
                    }}/>
                    <CustomDropdown label="Klasa energetyczna:"
                                    option={["A", "B", "C", "D", "E", "F" ]}
                                    select={filters.energyClass} onChange={(value) => {
                        setFilters((previous) => ({...previous, energyClass: value}))
                    }}/>
                    <CustomDropdown label="Pojemność:"
                                    option={["7kg", "8kg", "9kg", "10,5kg"]}
                                    select={filters.capacity === 0 ? "" : `${filters.capacity.toString().replace('.', ",")}kg`} onChange={(value) => {
                        //STUPID AS HELL I WOULD TURN BACK TIME AND MAKE CAPACITY AS STRING
                        const numericName = value.replace("kg", '').replace(",",".");
                        const numeric = numericName ? parseFloat(numericName) : 0;
                        setFilters((previous) => ({...previous, capacity: numeric}));
                    }}
                    />

                </div>
                <h2 className="washingMachines__numberOfDevices">Liczba wyników: {filteredMachines.length}</h2>
                <div className="washingMachines__cardContainer">
                    {filteredMachines.slice(0, visibleDevices).map((device) => (
                        <WashingMachineCard device={device} key={device.id} isSelected={selectedDevice.includes(device.id)}
                                            handleTogglle={() => toggleSelected(device.id)}/>
                    ))}
                </div>
                {visibleDevices < filteredMachines.length && (
                    <div className="washingMachines__showMoreButtonWrapper">
                        <button className="washingMachines__showMoreButtonWrapper__button" onClick={() => setVisibleDevices(previous => previous + 6)}>Pokaż więcej <ArrowIcon style={{fill: '#007AFF'}}/></button>
                    </div>
                )}
            </section>

        </main>
    );
};

export default WashingMachines;