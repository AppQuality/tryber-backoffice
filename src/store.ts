import { configureStore } from "@reduxjs/toolkit";
import { tryberApi } from "src/services/tryberApi";
import oldReducers from "src/redux/reducer";
import { combineReducers } from "redux";
// import bugFormReducer from "src/pages/BugForm/bugFormSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: combineReducers({
    ...oldReducers,
    // bugForm: bugFormReducer,
    [tryberApi.reducerPath]: tryberApi.reducer,
  }),
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(tryberApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
