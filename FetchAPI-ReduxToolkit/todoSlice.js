import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action 
export const fetchTodo = createAsyncThunk("fetchTodo", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = response.json();
  // console.log(data)
  return data;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      // console.log(action.payload)
    });

    builder.addCase(fetchTodo.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchTodo.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  }
});

export const todoReducer = todoSlice.reducer;
