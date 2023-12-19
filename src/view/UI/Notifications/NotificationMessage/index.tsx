import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';
import { INotificationProps } from './types';
import Icons from './icons';
import { NotificationType } from '../types';

const NotificationMessage = (props: INotificationProps) => {
    const [state, setState] = React.useState<{ show: boolean; isClosing: boolean }>({ show: true, isClosing: false });
    const { title, body, duration, type, onClick, onClose, messageContainer } = props;
    const closingAnimationDuration = 300;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const close = () => {
        setState({ show: true, isClosing: true });
        messageContainer.classList.add(styles.slideOut);
        setTimeout(() => {
            setState({ show: false, isClosing: false });
            messageContainer.remove();
        }, closingAnimationDuration);
    };

    useEffect(() => {
        setTimeout(() => {
            close();
        }, duration);
    }, [close, duration, messageContainer]);

    let icon: JSX.Element;
    let cls = '';

    switch (type) {
        case NotificationType.SUCCESS:
            icon = <Icons.success />;
            cls = styles.success;
            break;
        case NotificationType.WARNING:
            icon = <Icons.warning />;
            cls = styles.warning;
            break;
        case NotificationType.ERROR:
            icon = <Icons.error />;
            cls = styles.error;
            break;
        default:
            icon = <Icons.info />;
            cls = styles.default;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onCloseHandler = (e: any) => {
        if (e.target.className !== styles.closeBtn && e.target.className.baseVal !== styles.closeIcon) {
            return;
        }
        if (onClose) {
            onClose(e);
        }
        close();
    };

    const closeBtnIcon = <Icons.close />;
    const closeBtn = (
        <span className={styles.closeBtn} onClick={onCloseHandler}>
            {closeBtnIcon}
        </span>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onClickHandler = (e: any) => {
        if (e.target.className === styles.closeBtn || e.target.className.baseVal === styles.closeIcon) {
            return;
        }
        if (onClick) {
            onClick(e);
            close();
        }
    };

    return state.show ? (
        <div
            className={cn(
                styles.container,
                cls,
                { [styles.slideIn]: !state.isClosing },
                { [styles.slideOut]: state.isClosing },
            )}
            onClick={onClickHandler}
        >
            {closeBtn}
            <div className={styles.title}>
                {icon}
                <span className={styles.titleText}>{title}</span>
            </div>
            <div className={styles.body}>{body}</div>
        </div>
    ) : (
        <></>
    );
};

export default NotificationMessage;
