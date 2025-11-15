import {
  type Action,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";
import { authApiSlice } from "@/entities/auth/model/api";
import { userApiSlice } from "@/entities/user/model/api";
import { eventApiSlice } from "@/entities/event/model/api";

const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [eventApiSlice.reducerPath]: eventApiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      userApiSlice.middleware,
      eventApiSlice.middleware,
    ),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
