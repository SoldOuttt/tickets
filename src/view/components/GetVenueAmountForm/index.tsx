import React from 'react';
import { useGetVenueAmountMutation } from '../../../core/api/ticket';
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

export const GetVenueAmountForm: React.FC = () => {
    const [getVenueAmount] = useGetVenueAmountMutation();
    const handleGetVenueAmount = async (data: IDataType) => {
        await getVenueAmount({
            name: data.venueName,
            type: data.venueType,
            capacity: data.venueCapacity,
        })
            .unwrap()
            .then((res) => notification(NotificationType.SUCCESS, 'Get venue amount', res.toString()))
            .catch((error) => {
                notification(NotificationType.ERROR, 'Get venue amount', error?.data?.message ?? 'error');
            });
    };

    return <FormModal header={'Get venue amount'} keys={keys} onSubmit={handleGetVenueAmount} />;
};
