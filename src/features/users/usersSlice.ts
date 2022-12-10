import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types";
import { toast } from "react-toastify";

const url = "http://localhost:3500/users";

type initState = {
  hasMore: boolean,
  users: User[],
  loading: boolean,
  editFormData: User,
  editModalOpen: boolean,
}

const initialState: initState = {
  hasMore: true,
  users: [],
  loading: true,
  editFormData: {},
  editModalOpen: false,
};

export const getUsers = createAsyncThunk("/users/getUsers", async (page: number) => {
  const response = await axios.get(url, { params: { _page: page, _limit: 20 } });
  return response;
});

export const getUserInfo = createAsyncThunk("/users/getUserInfo", async (id: number) => {
  const response = await axios.get(url + "/" + id);
  return response;
});

export const updateUser = createAsyncThunk("/users/updateUser", async (user: User) => {
  const response = await axios.put(url + "/" + user.id, { ...user });
  return response;
});


export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload)
      toast.success(`User #${action.payload} got deleted!`)
    },
    toggleEditModal: (state) => {
      state.editModalOpen = !state.editModalOpen
    },
  },
  extraReducers: (builder) => {
    //fetching users 
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false
      if (action.payload.data.length !== 0) {
        state.users = state.users.concat(action.payload.data)
      } else {
        state.hasMore = false
      }
    })
    builder.addCase(getUsers.rejected, (state, action) => {
      toast.error(`Fetching users failed!`)
      state.loading = false
    })

    //get user info
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.editFormData = action.payload.data
      state.editModalOpen = true
    })
    builder.addCase(getUserInfo.rejected, (state, action) => {
      toast.error(`Fetching user info failed!`)
    })

    //updating a user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.users = state.users.map(user => {
        if (user.id === action.payload.data.id) {
          return { ...action.payload.data }
        }
        return user
      })
      state.editModalOpen = false
      toast.success(`User #${action.payload.data.id} successfully updated!`)
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      toast.error(`User update failed!`)
    })
  }
});

export const { deleteUser, toggleEditModal } = usersSlice.actions;
export default usersSlice.reducer;
