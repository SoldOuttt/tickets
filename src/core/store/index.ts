import { configureStore } from '@reduxjs/toolkit';
import { ticketApi } from '../api/ticket';

export const store = configureStore({
    reducer: {
        [ticketApi.reducerPath]: ticketApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ticketApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
