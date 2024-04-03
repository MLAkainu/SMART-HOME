import { createSlice } from "@reduxjs/toolkit"

export const IoTSlice = createSlice({
    name: "IoT",
    initialState: {
        temperature: [],
        humidity: [],
        light: [],
        isFetching: false,
        error: false
    },
    reducers: {
        updatelightStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updatelightSuccess: (state, action) => {
            state.light = action.payload.light;
            state.isFetching = false;
        },
        updatelightFailed: (state) => {
            state.isFetching = false;
            state.error = true;
            state.light = [];
        },
        updatetemperhumidStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updatetemperhumidSuccess: (state, action) => {
            state.temperature = action.payload.temp;
            state.humidity = action.payload.humid;
            state.isFetching = false;
        },
        updatetemperhumidFailed: (state) => {
            state.isFetching = false;
            state.error = true;
            state.humidity = [];
            state.temperature = [];
        }
    }
})
export const { updatelightStart, updatelightSuccess, updatelightFailed,
    updatetemperhumidStart, updatetemperhumidSuccess, updatetemperhumidFailed
} = IoTSlice.actions
export default IoTSlice.reducer