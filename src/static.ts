

export const API_URL = 'http://localhost:8080/washingMachines';
export const LOAD_MORE_DEVICES = 6;

export enum SortOptions {
    Price = 'Cena',
    Capacity = "Pojemność"
}

export enum FunctionOptions {
    AddWash = 'Drzwi AddWash',
    AIControlPanel = "Panel AI Control",
    StrangeEngine = 'Silnik Inwererowy',
    ElectricDisplay = 'Wyświetlacz elektroniczny',
    // XD I CANT name turbo spin is perfect
    TurboSpin3000 = "Turbo Wir 3000",
    TurboSpin3500 = "Turbo Wir 3500",
}

export enum EnergyClassOption {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
}

export enum CapacityOption {
    Weight7kg = '7kg',
    Weight8kg = '8kg',
    Weight9kg = '9kg',
    Weight105kg = '10,5kg',
}
