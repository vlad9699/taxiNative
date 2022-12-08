import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  origin: null,
  destination: null,
  travelTimeInfo: null,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, {payload}) => {
      state.origin = payload;
    },
    setDestination: (state, {payload}) => {
      state.destination = payload;
    },
    setTravelTimeInfo: (state, {payload}) => {
      state.travelTimeInfo = payload;
    },
  },
});

export const {setOrigin, setDestination, setTravelTimeInfo} = navSlice.actions;


export default navSlice.reducer