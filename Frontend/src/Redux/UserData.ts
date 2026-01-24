import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  username: string;
  email: string;
}

const initialState: CounterState = {
  email: "",
  username: ""
}

export const counterSlice = createSlice({
  name: 'LoginUser',
  initialState,
  reducers: {
    pushData: (state, action: PayloadAction<CounterState>) => {
        state.email = action.payload.email,
        state.username = action.payload.username
    },

    deleteData: (state) => {
        state.email = "",
        state.username = ""
    }
  },
})

// Action creators are generated for each case reducer function
export const { deleteData,pushData } = counterSlice.actions

export default counterSlice.reducer