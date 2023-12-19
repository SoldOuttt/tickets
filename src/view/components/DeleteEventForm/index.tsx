import React from 'react';
import { useDeleteEventMutation } from '../../../core/api/ticket';
import notification from '../../UI/Notifications';
import { NotificationType } from '../../UI/Notifications/types.ts';
import { FormModal } from '../FormModal';

const keys: { value: string; type: 'text' | 'number' }[] = [{ value: 'id', type: 'number' }];

interface IDataType {
    id: number;
}

export const DeleteEventForm: React.FC = () => {
    const [deleteEvent] = useDeleteEventMutation();
    const handleDeleteEvent = async (data: IDataType) => {
        await deleteEvent(data.id)
            .unwrap()
            .then(() => notification(NotificationType.SUCCESS, 'Delete event', 'Success'))
            .catch((error) => {
                notification(NotificationType.ERROR, 'Delete event', (error?.data?.message ?? 'error').slice(0, 100));
            });
    };

    return <FormModal header={'Delete event'} keys={keys} onSubmit={handleDeleteEvent} />;
};
