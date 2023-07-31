import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    name: null,
    id: null,
    pass: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.name = action.payload.name
            state.pass = action.payload.pass
            state.id = action.payload.id
        },

        removeUser(state) {
            state.name = null
            state.pass = null
            state.id = null
        }
    },
})

export const{setUser, removeUser} = userSlice.actions


export default userSlice.reducer