import classNames from 'classnames';
import { IModalProps } from './types';
import styles from './index.module.scss';
import Icon from '../Icon';
import { ICON } from '../Icon/IconType';

const cx = classNames.bind(styles);

const Modal = (props: IModalProps) => {
    if (!props.show) {
        return null;
    }

    return (
        <div className={cx(props.backgroundClassName, styles.background)} onClick={props.onClose}>
            <div className={cx(props.modalClassName, styles.container)} onClick={(e) => e.stopPropagation()}>
                <h2 className={cx(styles.header)}>{props.header}</h2>
                <div className={styles['close-button']} onClick={props.onClose}>
                    <Icon icon={ICON.CLOSE_SMALL} width={24} />
                </div>
                <div className={styles.body}>{props.body}</div>
            </div>
        </div>
    );
};

export default Modal;
