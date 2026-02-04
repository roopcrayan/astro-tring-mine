import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";
import { success } from "zod";


export const userLogin = createAsyncThunk(
    "user/login",
    async (data, thunkApi) => {
        try {
            const res = await api.post("/user/login", data);
            if (res?.data?.user?.role_id === 2) {
                return thunkApi.rejectWithValue(
                    "Astrologer cannot login from here"
                );
            } else {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role_id", res?.data?.user?.role_id)



                // localStorage.setItem("token", res.data.token);
                return res.data.token;
            }
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
export const userLogout = createAsyncThunk(
    "user/logout",
    async (data, thunkApi) => {
        try {
            const res = await api.post("/user/logout", data);
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
            return res.data.user;
        } catch (error) {

            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);


const tokenFromStorage = localStorage.getItem("token");

const initialState = {
    user: null,
    token: tokenFromStorage,
    loading: false,
    isLoggedIn: !!tokenFromStorage,
    error: null,
};
const UserAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("token");
        },
    },

    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isLoggedIn = false;

            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isLoggedIn = false;
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
            .addCase(userLogout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogout.fulfilled, (state, action) => {
                state.token = null;
                state.user = null;
                state.isLoggedIn = false;
                state.loading = false;
                state.error = null;
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })
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
                state.user = null;
            });
    },
});

export const { logout, clearError } = UserAuthSlice.actions;
export default UserAuthSlice.reducer;
