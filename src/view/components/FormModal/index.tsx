import React, { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../../UI/Modal';
import notification from '../../UI/Notifications';
import { NotificationType } from '../../UI/Notifications/types.ts';

interface IFormModalProps {
    onSubmit: (data: any) => Promise<void>;
    header: ReactNode;
    keys?: { value: string; type: 'text' | 'number' }[];
    uncheckFieldsAreEmpty?: boolean;
}
export const FormModal: React.FC<IFormModalProps> = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const [show, setIsShow] = useState(false);
    const submitHandler = async (data) => {
        if (!props.uncheckFieldsAreEmpty) {
            for (const dataKey in data) {
                if (data[dataKey].trim() === '') {
                    notification(NotificationType.ERROR, props.header, 'Some fields are empty');
                    return;
                }
            }
        }
        await props.onSubmit(data);
        reset('', {
            keepValues: false,
        });
        setIsShow(false);
    };

    return (
        <>
            <Modal
                show={show}
                header={props.header}
                body={
                    <form className={'grid h-min grid-flow-row gap-2'} onSubmit={handleSubmit(submitHandler)}>
                        {props?.keys?.map((x) => {
                            return (
                                <input
                                    className={'h-[30px] w-full rounded border pl-2 placeholder-gray'}
                                    key={x.value}
                                    {...register(x.value)}
                                    type={x.type}
                                    placeholder={x.value}
                                />
                            );
                        })}
                        <div className={'flex justify-center'}>
                            <button type={'submit'} className={'mt-2 h-[35px] w-40 rounded bg-purple'}>
                                {props.header}
                            </button>
                        </div>
                    </form>
                }
                onClose={() => setIsShow(false)}
            ></Modal>
            <button onClick={() => setIsShow(!show)} className={'mt-2 h-[35px] w-40 rounded bg-purple'}>
                {props.header}
            </button>
        </>
    );
};
