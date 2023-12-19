import { createBrowserRouter } from 'react-router-dom';
import { DefaultPage } from '../pages/default/DefaultPage.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultPage />,
    },
]);
