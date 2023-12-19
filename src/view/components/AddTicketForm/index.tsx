import React from 'react';
import { useAddTicketMutation } from '../../../core/api/ticket';
import { FormModal } from '../FormModal';
import notification from '../../UI/Notifications';
import { NotificationType } from '../../UI/Notifications/types.ts';

type TicketTypeType = 'VIP' | 'USUAL' | 'BUDGETARY' | 'CHEAP';
type TicketVenueType = 'THEATRE' | 'CINEMA' | 'MALL' | 'STADIUM';

const keys: { value: string; type: 'text' | 'number' }[] = [
    { value: 'name', type: 'text' },
    { value: 'coordinateX', type: 'number' },
    { value: 'coordinateY', type: 'number' },
    { value: 'price', type: 'number' },
    { value: 'type', type: 'text' },
    { value: 'venueName', type: 'text' },
    { value: 'venueCapacity', type: 'number' },
    { value: 'venueType', type: 'text' },
    { value: 'personId', type: 'number' },
];

interface IDataType {
    coordinateX: number;
    coordinateY: number;
    name: string;
    personId: number;
    price: number;
    type: TicketTypeType;
    venueCapacity: number;
    venueName: string;
    venueType: TicketVenueType;
}

export const AddTicketForm: React.FC = () => {
    const [addTicket] = useAddTicketMutation();
    const handleAddTicket = async (data: IDataType) => {
        await addTicket({
            name: data.name,
            type: data.type,
            personId: data.personId,
            price: data.price,
            coordinates: {
                x: data.coordinateX,
                y: data.coordinateY,
            },
            venue: {
                name: data.venueName,
                type: data.venueType,
                capacity: data.venueCapacity,
            },
        })
            .unwrap()
            .then(() => notification(NotificationType.SUCCESS, 'Add ticket', 'Success'))
            .catch((error) => {
                notification(
                    NotificationType.ERROR,
                    'Add ticket',
                    (error?.data?.message ?? error?.data[0]?.message ?? 'error').slice(0, 100),
                );
            });
    };

    return <FormModal header={'Add ticket'} keys={keys} onSubmit={handleAddTicket} />;
};
