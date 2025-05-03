import {useEffect, useState} from "react";
import '../sass/washingMachines.css';

import {WashingMachine, Filters} from '../types/types';
import WashingMachineCard from "./WashingMachineCard";
import washingMachineCard from "./WashingMachineCard";
import CustomDropdown from "./CustomDropdown";
import ArrowIcon from '../img/icons/arrow.svg?react';
import Loader from "./Loader";
import {API_URL, CapacityOption, EnergyClassOption, FunctionOptions, LOAD_MORE_DEVICES, SortOptions} from "../static";


const WashingMachines = (): JSX.Element => {

    const [washingMachines, setWashingMachines] = useState<WashingMachine[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDevice, setSelectedDevice] = useState<number[]>([]);
    const [visibleDevices, setVisibleDevices] = useState<number>(6);
    const [error, setError] = useState<boolean>(false);
    const [filters, setFilters] = useState<Filters>({
        query: '',
        popularity: '',
        energyClass: '',
        capacity: 0,
        functions: '',
        sort: '',
    });

    const fetchWashingMachines = async () => {
        setError(false);
        setLoading(true);

        try {
            const response = await fetch(API_URL);
            const data: WashingMachine[] = await response.json();
            setWashingMachines(data);
        } catch (errror) {
            setError(true);
            console.log("No washing machines in samsung store :(((((")
            console.log(errror);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
            if (filters.sort === 'Cena') {
                return (
                    a.price - b.price
                );
            }
            if (filters.sort === 'Pojemność') {
                return (
                    b.capacity - a.capacity
                );
            }
            return 0;
        })

    if (loading) return (
        <main className="loaderContainer">
            <Loader/>
        </main>
    )

    if(error) return (
        <main className="errorContainer">
            <h2 className="errorContainer__title">Coś poszło nie tak :(</h2>
            <h3 className="errorContainer__text">Nie udało nam się załadować strony</h3>
            <h3 className="errorContainer__text">To run 'server' change directory to <b>src</b> and run this command: <b>"json-server --watch washingMachines.json --port 8080</b></h3>
            <button className="errorContainer__button" onClick={fetchWashingMachines}>Spróbuj ponownie</button>
        </main>
    )


    return (
        <main className="washingMachines">
            <section className="washingMachines__layout">
                <div className="washingMachines__searchWrapper">
                    <input className="washingMachines__searchWrapper__input" type="text" placeholder="Szukaj..." value={filters.query} onChange={e => setFilters(previous => ({...previous, query: e.target.value}))}/>
                </div>
                <div className="washingMachines__filters">
                    <CustomDropdown label="Sortuj po:" option={Object.values(SortOptions)} select={filters.sort} onChange={(value => {
                        setFilters(previous => ({...previous, sort: value}) )
                    })}/>
                    <CustomDropdown label="Funkcje:"
                                    option={Object.values(FunctionOptions)}
                                    select={filters.functions} onChange={(value) => {
                        setFilters((previous) => ({...previous, functions: value}))
                    }}/>
                    <CustomDropdown label="Klasa energetyczna:"
                                    option={Object.values(EnergyClassOption)}
                                    select={filters.energyClass} onChange={(value) => {
                        setFilters((previous) => ({...previous, energyClass: value}))
                    }}/>
                    <CustomDropdown label="Pojemność:"
                                    option={Object.values(CapacityOption)}
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
                        <button className="washingMachines__showMoreButtonWrapper__button" onClick={() => setVisibleDevices(previous => previous + LOAD_MORE_DEVICES)}>Pokaż więcej <ArrowIcon style={{fill: '#007AFF'}}/></button>
                    </div>
                )}
            </section>

        </main>
    );
};

export default WashingMachines;