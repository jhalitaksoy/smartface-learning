
export interface Airline {
    id: number;
    name: string;
    country: string;
    logo: string;
    slogan: string;
    head_quaters: string;
    website: string;
    established: string;
}

export interface PassengerList {
    _id: string;
    name: string;
    trips: number;
    airline: Airline;
    __v: number;
}

export interface Passengers {
    totalPassengers: number;
    totalPages: number;
    data: PassengerList[];
}
