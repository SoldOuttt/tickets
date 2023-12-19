import React from 'react';
import { useUpdateTicketFormMutation } from '../../../core/api/ticket';
import { NotificationType } from '../../UI/Notifications/types.ts';
import notification from '../../UI/Notifications';
import { FormModal } from '../FormModal';

type TicketTypeType = 'VIP' | 'USUAL' | 'BUDGETARY' | 'CHEAP';
type TicketVenueType = 'THEATRE' | 'CINEMA' | 'MALL' | 'STADIUM';

const keys: { value: string; type: 'text' | 'number' }[] = [
    { value: 'id', type: 'number' },
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
    id: number;
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

export const UpdateTicketForm: React.FC = () => {
    const [updateTicket] = useUpdateTicketFormMutation();
    const handleUpdateTicket = async (data: IDataType) => {
        if (!data.id) {
            notification(NotificationType.ERROR, 'Update ticket', `Id can't be empty`);
            return;
        }
        await updateTicket({
            id: data.id,
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
            .then(() => notification(NotificationType.SUCCESS, 'Update ticket', 'Success'))
            .catch((error) => {
                notification(
                    NotificationType.ERROR,
                    'Update ticket',
                    (error?.data?.message ?? error?.data[0]?.message ?? 'error').slice(0, 100),
                );
            });
    };

    return (
        <FormModal header={'Update ticket'} keys={keys} onSubmit={handleUpdateTicket} uncheckFieldsAreEmpty={true} />
    );
};
