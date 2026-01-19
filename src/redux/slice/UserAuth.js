import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";


export const userLogin = createAsyncThunk(
    "user/login",
    async (data, thunkApi) => {
        try {
            const res = await api.post("/user/login", data);
            localStorage.setItem("token", res.data.token);
            return res.data.token;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

export const userRegister = createAsyncThunk(
    "user/register",
    async (data, thunkApi) => {
        try {
            const res = await api.post("/user/register", data);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);
export const userUpdate = createAsyncThunk(
    "user/updateuser",
    async (data, thunkApi) => {
        try {
            const res = await api.post("/user/update", data);
            console.log(res.data)
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);
export const userProfile = createAsyncThunk(
    "user/profile",
    async (data, thunkApi) => {
        try {
            const res = await api.get("/user/profile");
            console.log(res.data.user)
            return res.data.user;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);


const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};

const UserAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // REGISTER
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // PROFILE

            .addCase(userProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // update user
            .addCase(userUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userUpdate.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(userUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = UserAuthSlice.actions;
export default UserAuthSlice.reducer;
