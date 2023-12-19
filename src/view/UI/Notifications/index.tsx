import React from 'react';
import { createRoot } from 'react-dom/client';
import { NotificationType } from './types';
import createNotificationsList from './NotificationsList';
import NotificationMessage from './NotificationMessage';
import styles from './NotificationMessage/index.module.scss';

const notification = (
    type: NotificationType = NotificationType.DEFAULT,
    title: React.ReactNode,
    body: React.ReactNode,
    duration = 3000,
    onClick?: () => void,
    onClose?: () => void,
) => {
    const showingAnimationDuration = 300;
    const outerContainer = document.createElement('div');
    const root = createRoot(createNotificationsList().appendChild(outerContainer));

    outerContainer.classList.add(styles.outerContainer, styles.slideIn);

    setTimeout(() => {
        outerContainer.classList.remove(styles.slideIn);
        root.render(
            <NotificationMessage
                title={title}
                body={body}
                type={type}
                duration={duration}
                onClick={onClick || onClose}
                onClose={onClose}
                messageContainer={outerContainer}
            />,
        );
    }, showingAnimationDuration);
};

export default notification;
