export interface Floor {
    id: number;
    name: string;
}

export interface Section {
    id: number;
    name: string;
    floorId: number;
}

export interface Product {
    identifier: string;
    quantity: number;
    sectionId: number;
    floorId: number;
    id?: number
}

export interface ProductSearchParams {
    identifier?: string;
    quantity?: number;
    sectionId?: number;
    floorId?: number;
}
