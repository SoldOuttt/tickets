import React from 'react';
import { FormModal } from '../FormModal';

const keys: { value: string; type: 'text' | 'number' }[] = [
    { value: 'page', type: 'number' },
    { value: 'page_size', type: 'number' },
    { value: 'sort', type: 'text' },
    { value: 'filter', type: 'text' },
];

interface IDataType {
    page: number;
    page_size: number;
    sort: string;
    filter: string;
}

interface ISortByIdFormProps {
    submitHandler: (
        page: number | undefined,
        page_size: number | undefined,
        sort: string | undefined,
        filter: string | undefined,
    ) => void;
}

export const Pagination: React.FC<ISortByIdFormProps> = (props) => {
    const handleSortTicket = async (data: IDataType) => {
        props.submitHandler(data.page, data.page_size, data.sort, data.filter);
    };

    return <FormModal header={'Filter by'} keys={keys} onSubmit={handleSortTicket} uncheckFieldsAreEmpty={true} />;
};
