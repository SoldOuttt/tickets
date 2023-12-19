import styles from './index.module.scss';

const createNotificationsList = () => {
    if (typeof window === 'undefined') {
        return new HTMLElement(); // dummy
    }

    let element = document.getElementById(styles.notificationsList);

    if (element) {
        return element as HTMLElement;
    }

    element = document.createElement('div');
    element.setAttribute('id', styles.notificationsList);
    document.body.appendChild(element);
    return element as HTMLElement;
};

export default createNotificationsList;
