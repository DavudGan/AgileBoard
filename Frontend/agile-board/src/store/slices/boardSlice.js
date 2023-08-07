import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    allBoard:[],
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard(state, action) {
            state.allBoard = [...state.allBoard, action.payload.allBoard]
        },

        removeBoard(state, action) {
            state.allBoard = state.allBoard.filter((item) => item.id !== action.payload.idBoards) 
        },

        clearBoard(state) {
            state.allBoard = [] 
        }
    },
})

export const{setBoard, removeBoard, clearBoard} = boardSlice.actions


export default boardSlice.reducer