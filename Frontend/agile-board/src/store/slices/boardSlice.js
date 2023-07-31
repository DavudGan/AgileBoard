import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    allBoard:[{idBoard: '11-11', name: 'Davud', text: "AS"}],
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard(state, action) {
            state.allBoard = [...state.allBoard, action.payload.allBoard]
        },

        removeBoard(state) {
            state.allBoard = []
        }
    },
})

export const{setBoard, removeBoard} = boardSlice.actions


export default boardSlice.reducer