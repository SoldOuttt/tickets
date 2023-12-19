import React from 'react';
import { useDeleteByVenueMutation } from '../../../core/api/ticket';
import notification from '../../UI/Notifications';
import { NotificationType } from '../../UI/Notifications/types.ts';
import { FormModal } from '../FormModal';

type TicketVenueType = 'THEATRE' | 'CINEMA' | 'MALL' | 'STADIUM';

const keys: { value: string; type: 'text' | 'number' }[] = [
    { value: 'venueName', type: 'text' },
    { value: 'venueCapacity', type: 'number' },
    { value: 'venueType', type: 'text' },
];

interface IDataType {
    venueCapacity: number;
    venueName: string;
    venueType: TicketVenueType;
}

export const DeleteTicketByVenueForm: React.FC = () => {
    const [deleteByVenue] = useDeleteByVenueMutation();
    const handleDeleteByVenue = async (data: IDataType) => {
        await deleteByVenue({
            name: data.venueName,
            type: data.venueType,
            capacity: data.venueCapacity,
        })
            .unwrap()
            .then(() => notification(NotificationType.SUCCESS, 'Delete By Venue', 'Success'))
            .catch((error) => {
                notification(NotificationType.ERROR, 'Delete By Venue', (error?.data?.message ?? 'error').slice(0, 100));
            });
    };

    return <FormModal header={'Delete By Venue'} keys={keys} onSubmit={handleDeleteByVenue} />;
};
