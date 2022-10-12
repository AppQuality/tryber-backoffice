import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { tryberApi } from "src/services/tryberApi";
import oldReducers from "src/redux/reducer";
import { combineReducers } from "redux";
import jotformReducer from "src/pages/Jotform/jotformSlice";
import campaignPreselectionReducer from "src/pages/campaigns/preselectionForm/preselectionSlice";
import campaignPreselectionListReducer from "src/pages/campaigns/preselectionFormList/preselectionListSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

const rootReducer = combineReducers({
  ...oldReducers,
  jotform: jotformReducer,
  campaignPreselection: campaignPreselectionReducer,
  campaignPreselectionList: campaignPreselectionListReducer,
  [tryberApi.reducerPath]: tryberApi.reducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(tryberApi.middleware),
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
