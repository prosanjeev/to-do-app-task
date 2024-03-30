// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todosSlice';

const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});

export default store;
