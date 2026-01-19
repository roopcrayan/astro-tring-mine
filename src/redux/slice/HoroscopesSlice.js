import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";


export const getHoroscope = createAsyncThunk(
    "horoscope/get",
    async (data, thunkApi) => {
        try {
            const res = await api.get("/horoscopes");
            console.log(res.data.data)
            return res.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to fetch horoscope"
            );
        }
    }
);



const initialState = {
    horoscope: null,
    loading: false,
    error: null,
};


const horoscopeSlice = createSlice({
    name: "horoscope",
    initialState,

    extraReducers: (builder) => {
        builder
            // GET HOROSCOPE
            .addCase(getHoroscope.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHoroscope.fulfilled, (state, action) => {
                state.loading = false;
                state.horoscope = action.payload;
            })
            .addCase(getHoroscope.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default horoscopeSlice.reducer;
