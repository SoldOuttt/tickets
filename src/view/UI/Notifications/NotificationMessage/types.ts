import React from 'react';
import { NotificationType } from '../types';

export interface INotificationProps {
    title: React.ReactNode;
    body: React.ReactNode;
    duration?: number;
    type?: NotificationType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (e: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClose?: (e: any) => void;
    messageContainer: HTMLElement;
}
