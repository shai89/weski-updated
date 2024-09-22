export type HotelSearchRequest = {
    site: number;
    startDate: string;
    endDate: string;
    groupSizeRange: [number, number];
};

export type HotelSearch = {
    site: number;
    startDate: string;
    endDate: string;
    groupSize: number;
}

export type HotelSearchResult = {
    id?:number;
    completed: boolean;
    site: number;
    startDate: string;
    endDate: string;
    groupSizeRange: [number, number];
    hotels: Hotel[];
};

export type Hotel = {
    id?:number;
    description?:string;
    code: string;
    name: string;
    images: HotelImage[];
    location: HotelLocation;
    rating: number;
    beds: number;
    priceBeforeTax: string;
    priceAfterTax: string;
};

export type HotelImage = {
    url: string;
    cover: boolean;
};

export type HotelLocation = {
    lat: string;
    long: string;
    nearBy: HotelNearBy[];
};

export type HotelNearBy = {
    name: string;
    distance: string;
};