import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
}

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action){
      console.log("Setting posts:", action.payload);
      state.posts = action.payload;
    },
    addPost(state, action){
      console.log("Adding post:", action.payload);
      state.posts.push(action.payload);
    },
    updatePost(state, action){
      console.log("Updating post:", action.payload);
      const index = state.posts.findIndex(post => post.$id === action.payload.$id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    removePost(state, action){
      console.log("Removing post:", action.payload);
      state.posts = state.posts.filter(post => post.$id !== action.payload);
    },
    clearPosts(state){
      state.posts = [];
    }
  }
});

export const { setPosts, addPost, updatePost, removePost, clearPosts } = postSlice.actions;

export default postSlice.reducer;