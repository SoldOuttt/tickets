import React from 'react';
import { useDeleteTicketMutation } from '../../../core/api/ticket';
import { NotificationType } from '../../UI/Notifications/types.ts';
import notification from '../../UI/Notifications';
import { FormModal } from '../FormModal';

const keys: { value: string; type: 'text' | 'number' }[] = [{ value: 'id', type: 'number' }];

interface IDataType {
    id: number;
}

export const DeleteTicketForm: React.FC = () => {
    const [deleteTicket] = useDeleteTicketMutation();
    const handleDeleteTicket = async (data: IDataType) => {
        await deleteTicket(data.id)
            .unwrap()
            .then(() => notification(NotificationType.SUCCESS, 'Delete Ticket', 'Success'))
            .catch((error) =>
                notification(NotificationType.ERROR, 'Delete ticket', (error?.data?.message ?? 'error').slice(0, 100)),
            );
    };

    return <FormModal header={'Delete Ticket'} keys={keys} onSubmit={handleDeleteTicket} />;
};
