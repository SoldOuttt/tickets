import React from 'react';
import { useGetUniquePricesMutation } from '../../../core/api/ticket';
import notification from '../../UI/Notifications';
import { NotificationType } from '../../UI/Notifications/types.ts';
import { FormModal } from '../FormModal';

export const GetUniquePricesForm: React.FC = () => {
    const [getVenueAmount] = useGetUniquePricesMutation();
    const handleGetUniquePrices = async () => {
        await getVenueAmount()
            .unwrap()
            .then((res) => notification(NotificationType.SUCCESS, 'Get unique prices', res.toString()))
            .catch((error) => {
                notification(NotificationType.ERROR, 'Get unique prices', error?.data?.message ?? 'error');
            });
    };

    return <FormModal header={'Get unique prices'} onSubmit={handleGetUniquePrices} />;
};
