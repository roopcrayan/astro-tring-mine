import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";


export const AstrologerRegister = createAsyncThunk(
    "astroAuth/register",
    async (data, thunkApi) => {
        try {
            const res = await api.post("/astro/register", data);
            console.log(res.data)
            return res.data.astro;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message);
        }
    }
)
export const AstrologerLogin = createAsyncThunk(
    "astroAuth/login",
    async (data, thunkApi) => {
        try {
            const res = await api.post("/astro/login", data);
            localStorage.setItem("token", res.data.token);
            return res.data.astro;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message);
        }
    }
)
export const AstrologerProfile = createAsyncThunk(
    "astroAuth/profile",
    async (data, thunkApi) => {
        try {
            const res = await api.get("/astro/profile", data);
            return res.data.astro;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message);
        }
    }
)

const initialState = {
    isAuthenticated: false,
    astrologer: null,
    loading: false,
    error: null,
};

const AstroAuthSlide = createSlice({
    name: "astroAuth",
    initialState,
    reducers: {
        logoutAstro: (state) => {
            localStorage.removeItem("token");
            state.astrologer = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(AstrologerRegister.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.astrologer = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(AstrologerRegister.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AstrologerRegister.pending, (state) => {
                state.isAuthenticated = false;
                state.astrologer = null;
            })
            .addCase(AstrologerLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(AstrologerLogin.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AstrologerLogin.pending, (state) => {
                state.isAuthenticated = false;
                state.astrologer = null;
            })
            .addCase(AstrologerProfile.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.astrologer = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(AstrologerProfile.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AstrologerProfile.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
                state.astrologer = null;
            });
    }
})
export const { logoutAstro } = AstroAuthSlide.actions;
export default AstroAuthSlide.reducer;