import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { tryberApiSlice } from "src/services/tryberApi/apiTags";
import oldReducers from "src/redux/reducer";
import { combineReducers } from "redux";
import campaignPreselectionReducer from "src/pages/campaigns/preselectionForm/preselectionSlice";
import campaignPreselectionListReducer from "src/pages/campaigns/preselectionFormList/preselectionListSlice";
import selectionReducer from "src/pages/campaigns/selection/selectionSlice";
import uxDashboardReducer from "src/pages/UxDashboard/uxDashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

const rootReducer = combineReducers({
  ...oldReducers,
  campaignPreselection: campaignPreselectionReducer,
  campaignPreselectionList: campaignPreselectionListReducer,
  selection: selectionReducer,
  uxDashboard: uxDashboardReducer,
  [tryberApiSlice.reducerPath]: tryberApiSlice.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tryberApiSlice.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
