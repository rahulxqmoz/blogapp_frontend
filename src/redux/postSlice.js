import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axiosConfig";

// Thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (userId = null, { getState, rejectWithValue }) => {
    const { auth: { accessToken } } = getState();

    // Construct the endpoint with the optional userId query parameter
    const endpoint = userId ? `/post/api/posts/?user=${userId}` : "/post/api/posts/";

    try {
      const response = await api.get(endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch posts.");
    }
  }
);

 // Thunk for creating a post
export const createPost = createAsyncThunk(
    "posts/createPost",
    async (formData, { getState, rejectWithValue }) => {
      const {
        auth: { accessToken },
      } = getState();
      try {
        const response = await api.post("/post/api/posts/", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to create post.");
      }
    }
  );

  // Thunk for deleting a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await api.delete(`/post/api/posts/${postId}/`);
      return postId; // Return the ID of the deleted post
    } catch (err) {
      return rejectWithValue("Failed to delete the post.");
    }
  }
);

// Thunk for editing a post
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/post/api/posts/${id}/`, data);
      return response.data; // Return the updated post
    } catch (err) {
      return rejectWithValue("Failed to edit the post.");
    }
  }
);
  
  
  // Other thunks for edit and delete can be implemented similarly
  
  const postSlice = createSlice({
    name: "posts",
    initialState: {
      allPosts: [], // For posts fetched without user filter
      userPosts: [], // For posts fetched for a specific user
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.loading = false;
          // Check if userId was passed; update appropriate state
          if (action.meta.arg) {
            state.userPosts = action.payload; // User-specific posts
          } else {
            state.allPosts = action.payload; // All posts
          }
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(createPost.pending, (state) => { state.loading = true; })
        .addCase(createPost.fulfilled, (state, action) => {
          state.loading = false;
          state.userPosts.push(action.payload);
        })
        .addCase(createPost.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(deletePost.fulfilled, (state, action) => {
          state.posts = state.userPosts.filter((post) => post.id !== action.payload);
        })
        .addCase(editPost.fulfilled, (state, action) => {
          const index = state.userPosts.findIndex((post) => post.id === action.payload.id);
          if (index !== -1) {
            state.userPosts[index] = action.payload;
          }
        });
    },
  });
  
  export default postSlice.reducer;
  