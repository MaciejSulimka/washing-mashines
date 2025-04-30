import {useEffect, useState} from "react";

type Dimensions = {
    depth: number;
    width: number;
    height: number;
}

// for now string, maybe change later
type Promotion = {
   startDate: string;
   endDate: string;
}

type WashingMachine = {
    id: number;
    modelCode: string;
    name: string;
    capacity: number;
    maxCapacity: number;
    color: string;
    functions: string[];
    energyClass: string;
    price: number;
    monthlyInstallment: number;
    numberOfInstallments: number;
    promotion: Promotion;
    dimensions: Dimensions;
    image: string;
}

export function WashingMachines() {
    const [washingMachines, setWashingMachines] = useState<WashingMachine[]>([])
    const [loading, setLoading] = useState<boolean>(true);

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

    if(loading) return(
        <div>
           ŁADOWANIE PRALECZEK MILORDZIE
        </div>
    )

    return(
        <main>
            {washingMachines.map((device) => (
                <div>
                    <h2>{device.name}</h2>
                    <br/>
                    <br/>
                    <br/>
                    <p>{device.functions}</p>
                </div>
            ))}

        </main>
    );
};