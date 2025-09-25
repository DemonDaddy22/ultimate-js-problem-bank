import { createSlice } from '@reduxjs/toolkit';

type PostsState = {
  isEnd: boolean;
  posts: Posts;
  error: string | null;
};

const initialState: PostsState = {
  isEnd: false,
  posts: [],
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    },
    updateIsEnd: state => {
      return {
        ...state,
        isEnd: true,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const { setPosts, updateIsEnd, setError } = postsSlice.actions;

export default postsSlice.reducer;
