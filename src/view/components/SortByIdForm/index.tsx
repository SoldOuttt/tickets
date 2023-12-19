import React from 'react';
import { FormModal } from '../FormModal';

const keys: { value: string; type: 'text' | 'number' }[] = [{ value: 'id', type: 'number' }];

interface IDataType {
    id: number;
}

interface ISortByIdFormProps {
    submitHandler: (id: number | undefined) => void;
}

export const SortByIdForm: React.FC<ISortByIdFormProps> = (props) => {
    const handleSortTicket = async (data: IDataType) => {
        props.submitHandler(data.id);
    };

    return <FormModal header={'Find by id'} keys={keys} onSubmit={handleSortTicket} uncheckFieldsAreEmpty={true} />;
};
