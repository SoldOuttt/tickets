import * as classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';

type TicketTypeType = 'VIP' | 'USUAL' | 'BUDGETARY' | 'CHEAP';
type TicketVenueType = 'THEATRE' | 'CINEMA' | 'MALL' | 'STADIUM';

interface ICoordinates {
    x: number;
    y: number;
}

interface ITicketVenueReqType {
    name: string;
    capacity: number;
    type: TicketVenueType;
}

export interface ITicketProps {
    id: number;
    name: string;
    coordinates: ICoordinates;
    price: number;
    type: TicketTypeType;
    venue: ITicketVenueReqType;
    personId: number | null;
    event: {
        id: number;
    };
}

const cx = classNames.bind(styles);

export const Ticket: React.FC<ITicketProps> = (props) => {
    return (
        <div className={cx(styles.ticketContainer)}>
            <div>
                id: <span className={cx(styles.importantInfo)}>{props.id}</span>
            </div>
            <div>
                name: <span className={cx(styles.importantInfo)}>{props.name}</span>
            </div>
            <div>
                personId: <span className={cx(styles.importantInfo)}>{props.personId || 'unknown'}</span>
            </div>
            <div>
                eventId: <span className={cx(styles.importantInfo)}>{props?.event?.id || 'unknown'}</span>
            </div>
            <div className={'flex flex-row gap-2'}>
                <div>coordinates:</div>
                <div className={'flex flex-col'}>
                    <div>
                        x - <span className={cx(styles.importantInfo)}>{props?.coordinates?.x}</span>
                    </div>
                    <div>
                        y - <span className={cx(styles.importantInfo)}>{props?.coordinates?.y}</span>
                    </div>
                </div>
            </div>
            <div>
                price: <span className={cx(styles.importantInfo)}>{props.price}</span>
            </div>
            <div>
                type: <span className={cx(styles.importantInfo)}>{props.type}</span>
            </div>
            <div className={'flex flex-row gap-2'}>
                <div>venue:</div>
                <div className={'flex flex-col'}>
                    <div>
                        type - <span className={cx(styles.importantInfo)}>{props.venue?.type || 'unknown'}</span>
                    </div>
                    <div>
                        name - <span className={cx(styles.importantInfo)}>{props.venue?.name || 'unknown'}</span>
                    </div>
                    <div>
                        capacity -{' '}
                        <span className={cx(styles.importantInfo)}>{props.venue?.capacity || 'unknown'}</span>
                    </div>
                </div>
            </div>
            <div className={cx(styles.icon)}>&#9769;</div>
        </div>
    );
};
