import {createSlice} from '@reduxjs/toolkit';

const initialSlice = {
    emil: null,
    id: null,
    pass: null;
}

const userSlice = createSlice({
    name: 'user',
    initialSlice,
    reducers: {
        setUser(state, action) {
            state.emil = action.payload.emil;
            state.pass = action.payload.psaa;
            state.id = action.payload.id;
        },

        removeUser(state) {
            state.emil = null;
            state.pass = null;
            state.id = null;
        }
    },
})

export const{setUser, removeUser} = userSlice.actions

export default userSlice.reducer