import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: boolean
}

const initialState: CounterState = {
  value: false,
}

export const counterSlice = createSlice({
  name: 'LoginUser',
  initialState,
  reducers: {
    positive: (state) => {
        state.value = true
    },

    negative: (state) => {
        state.value = false
    },

    alternative: (state) => {
        state.value = !state.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { alternative, negative, positive } = counterSlice.actions

export default counterSlice.reducer