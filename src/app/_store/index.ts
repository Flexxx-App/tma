import {
  type Action,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";
import { authApiSlice } from "@/entities/auth/model/api";
import { userApiSlice } from "@/entities/user/model/api";
import { eventApiSlice } from "@/entities/event/model/api";
import { orderApiSlice } from "@/entities/order/model/api";
import { photoApiSlice } from "@/entities/photo/model/api";
import { googlePlacesApiSlice } from "@/entities/googleMap/model/api";
import { scannerApiSlice } from "@/entities/scanner/model/api";
import { guestApiSlice } from "@/entities/guest/model/api";

const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [eventApiSlice.reducerPath]: eventApiSlice.reducer,
  [orderApiSlice.reducerPath]: orderApiSlice.reducer,
  [photoApiSlice.reducerPath]: photoApiSlice.reducer,
  [googlePlacesApiSlice.reducerPath]: googlePlacesApiSlice.reducer,
  [scannerApiSlice.reducerPath]: scannerApiSlice.reducer,
  [guestApiSlice.reducerPath]: guestApiSlice.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApiSlice.middleware,
        userApiSlice.middleware,
        eventApiSlice.middleware,
        orderApiSlice.middleware,
        photoApiSlice.middleware,
        googlePlacesApiSlice.middleware,
        scannerApiSlice.middleware,
        guestApiSlice.middleware,
      ),
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
