import React from 'react';
import { useDeletePersonMutation } from '../../../core/api/ticket';
import notification from '../../UI/Notifications';
import { NotificationType } from '../../UI/Notifications/types.ts';
import { FormModal } from '../FormModal';

const keys: { value: string; type: 'text' | 'number' }[] = [{ value: 'id', type: 'number' }];

interface IDataType {
    id: number;
}

export const DeletePersonForm: React.FC = () => {
    const [deletePerson] = useDeletePersonMutation();
    const handleDeletePerson = async (data: IDataType) => {
        await deletePerson(data.id)
            .unwrap()
            .then(() => notification(NotificationType.SUCCESS, 'Delete Person', 'Success'))
            .catch((error) => {
                notification(NotificationType.ERROR, 'Delete person', (error?.data?.message ?? 'error').slice(0, 100));
            });
    };

    return <FormModal header={'Delete Person'} keys={keys} onSubmit={handleDeletePerson} />;
};
