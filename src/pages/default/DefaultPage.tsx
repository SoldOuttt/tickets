import * as React from 'react';
import { useState } from 'react';
import * as classNames from 'classnames';
import styles from './index.module.scss';
import { Ticket } from '../../view/components/Ticket';
import { useGetTicketsQuery } from '../../core/api/ticket';
import { AddTicketForm } from '../../view/components/AddTicketForm';
import { DeleteTicketForm } from '../../view/components/DeleteTicketForm';
import { UpdateTicketForm } from '../../view/components/UpdateTicketForm';
import { SortByIdForm } from '../../view/components/SortByIdForm';
import { ISortTicketsType } from '../../core/api/ticket/types/ITicketType.ts';
import { Pagination } from '../../view/components/Pagination';
import { GetVenueAmountForm } from '../../view/components/GetVenueAmountForm';
import { GetUniquePricesForm } from '../../view/components/GetUnuquePricesForm';
import { DeleteTicketByVenueForm } from '../../view/components/DeleteTicketByVenueForm';
import { DeleteEventForm } from '../../view/components/DeleteEventForm';
import { DeletePersonForm } from '../../view/components/DeletePersonForm';
import notification from '../../view/UI/Notifications';
import { NotificationType } from '../../view/UI/Notifications/types.ts';

const cx = classNames.bind(styles);

export const DefaultPage: React.FC = () => {
    const [filterParams, setFilterParams] = useState<ISortTicketsType>({
        id: undefined,
        page: undefined,
        page_size: undefined,
        sort: undefined,
        filter: undefined,
    });
    const { data, isError, isLoading, error } = useGetTicketsQuery(filterParams);

    if (isLoading) {
        return null;
    }

    if (isError) {
        notification(NotificationType.ERROR, 'Data loading', (error?.data?.message ?? 'error').slice(0, 100));
    }
    return (
        <div className={cx(styles.wrapper)}>
            <div className={'mb-5 flex flex-row flex-wrap gap-8'}>
                <AddTicketForm />
                <DeleteTicketForm />
                <UpdateTicketForm />
                <DeleteTicketByVenueForm />
                <GetVenueAmountForm />
                <GetUniquePricesForm />
            </div>
            <div className={'flex flex-row flex-wrap gap-8'}>
                <DeleteEventForm />
                <DeletePersonForm />
            </div>
            <div className={'mt-10 flex flex-row flex-wrap gap-8'}>
                <SortByIdForm
                    submitHandler={(id) =>
                        setFilterParams({
                            page: undefined,
                            page_size: undefined,
                            sort: undefined,
                            filter: undefined,
                            id,
                        })
                    }
                />
                <Pagination
                    submitHandler={(page, pageSize, sort, filter) =>
                        setFilterParams({ page, page_size: pageSize, sort, filter, id: undefined })
                    }
                />
            </div>
            <div className={cx(styles.ticketsContainer)}>
                {!(isError || !data) ? (
                    data?.map((ticket) => {
                        return (
                            <Ticket
                                key={ticket.id}
                                id={ticket.id}
                                event={ticket.event}
                                name={ticket.name}
                                coordinates={ticket.coordinates}
                                price={ticket.price}
                                type={ticket.type}
                                venue={ticket.venue}
                                personId={ticket.personId}
                            />
                        );
                    })
                ) : (
                    <div className={'text-2xl'}>no data</div>
                )}
            </div>
        </div>
    );
};
