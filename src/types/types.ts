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

export type WashingMachine = {
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
    imageAltText: string;
}

export type Filters = {
    query: string;
    energyClass: string;
    functions: string;
    // capacity: number;
    sort: string;
}