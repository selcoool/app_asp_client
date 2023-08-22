import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from "axios"

// const URL='https://brian-server.cyclic.app'
const URL='http://localhost:5000'
export const createPost = createAsyncThunk(
    "createPost",
    async (object, {getState, rejectWithValue }) => {
      // console.log(getState());
      try {
        const { data } = await axios.post(
          `${URL}/posts`,object
        );
        console.log('fc create:', data)
        return data;
      } catch (error) {
        rejectWithValue(error);
      }
    }
  );


  
  export const getPost = createAsyncThunk(
    "getPost",
    async (object, {getState,rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${URL}/posts`
        );
        console.log('fc getposts:', data)
        return data;
      } catch (error) {
        rejectWithValue(error);
      }
    }
  );

  export const deletePost = createAsyncThunk(
    "deletePost",
    async (object_id, {getState,rejectWithValue }) => {
      try {
        const { data } = await axios.delete(
          `${URL}/posts/delete/${object_id}`
          // `http://localhost:5000/posts/delete/${object_id}`,
        );
        console.log('fc delete:', data)
        return data;
      } catch (error) {
        rejectWithValue(error);
      }
    }
  );


  export const updatePost = createAsyncThunk(
    "updatePost",
    async (object, {getState,rejectWithValue }) => {
      try {
        const { data } = await axios.put(
          `${URL}/posts/update/${object._id}`,object
          // `http://localhost:5000/posts/update/${object._id}`,object
        );

        console.log('fc update:',data)
        return data;
      } catch (error) {
        rejectWithValue(error);
      }
    }
  );


const postSlice = createSlice({
  name: 'counter',
  initialState:{
    isLoading:false,
    isSuccess:false,
    posts:[]
  },
  reducers: {
    increment: (state) => {
   
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createPost.pending, (state, action) => {
       state.isLoading=true
       state.isSuccess=false
    })
    .addCase(createPost.fulfilled, (state, action) => {
      state.posts.push(action.payload)
    })
    .addCase(createPost.rejected, (state, action) => {
        state.isLoading=false
        state.isSuccess=false
    })

    .addCase(getPost.pending, (state, action) => {
      state.isLoading=true
      state.isSuccess=false
     })
   .addCase(getPost.fulfilled, (state, action) => {
     state.posts=action.payload
     state.isLoading=false
    state.isSuccess=true
   })
   .addCase(getPost.rejected, (state, action) => {
       state.isLoading=false
       state.isSuccess=false
    })

    .addCase(deletePost.pending, (state, action) => {
      state.isLoading=true
       state.isSuccess=false
    }).addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading=false
      state.isSuccess=false
        state.posts = state.posts.filter((data2)=>{
          return data2._id !==action.payload._id
        })
      
    }).addCase(deletePost.rejected, (state, action) => {
      state.isLoading=false
       state.isSuccess=false
    })


    .addCase(updatePost.pending, (state, action) => {
      state.isLoading=true
       state.isSuccess=false
    })
    .addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading=false
      state.isSuccess=false
        state.posts = state.posts.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele)

        // console.log(action)
    }).addCase(updatePost.rejected, (state, action) => {
      state.isLoading=false
       state.isSuccess=false
    })


    
  },

})

// Action creators are generated for each case reducer function
export const { increment} = postSlice.actions

export default postSlice.reducer