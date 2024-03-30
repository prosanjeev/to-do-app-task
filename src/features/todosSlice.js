// redux/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(),
                text: action.payload,
                completed: false,
            });
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        toggleTaskCompletion: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        updateTask: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload.id);
            if (task) {
                task.text = action.payload.text;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
    },
});

export const { addTask, deleteTask, toggleTaskCompletion, updateTask } = todoSlice.actions;

export default todoSlice.reducer;
