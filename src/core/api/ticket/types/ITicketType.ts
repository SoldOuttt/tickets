type TicketTypeType = 'VIP' | 'USUAL' | 'BUDGETARY' | 'CHEAP';
type TicketVenueType = 'THEATRE' | 'CINEMA' | 'MALL' | 'STADIUM';

export interface ICoordinates {
    x: number;
    y: number;
}
export interface ITicketVenueReqType {
    name: string;
    capacity: number;
    type: TicketVenueType;
}
export interface ITicketType {
    id?: number;
    name?: string;
    coordinates?: ICoordinates;
    price: number;
    type: TicketTypeType;
    venue: ITicketVenueReqType;
    personId: number | null;
}

export interface IEvent {
    event: {
        id: number;
    };
}

export interface ISortTicketsType {
    id: number | undefined;
    page: number | undefined;
    page_size: number | undefined;
    sort: string | undefined;
    filter: string | undefined;
}
