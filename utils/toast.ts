import {toast} from 'react-toastify';

export const notifyError = (message: string) => toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    theme: 'dark'
});

export const notifySuccess = (message: string) => toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    theme: 'dark'
});

export const notifyInfo = (message: string) => toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
    theme: 'dark'
})
