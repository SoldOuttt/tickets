import React, { ReactNode } from 'react';

export interface IModalProps {
    body: ReactNode;
    onClose?: (e?: React.MouseEvent<HTMLDivElement>) => void;
    backgroundClassName?: string;
    modalClassName?: string;
    show?: boolean;
    header: string | ReactNode;
}
