import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  countries: [],
  Country: {},
//   sortedCountries: []
}

export const reducerSlice = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    setCountries: (state, action) => ({
      ...state,
      countries: action.payload
    }),
    setCountry: (state, action) => ({
      ...state,
      country: action.payload
    }),
    setList: (state, action) => ({
      ...state,
      countries: action.payload
    })
  },
})

export const { setCountries, setCountry, setList } = reducerSlice.actions
export default reducerSlice.reducer