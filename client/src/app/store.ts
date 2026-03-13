import { configureStore, combineReducers } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import formsReducer from "../features/forms/formsSlice";
import responsesSlice from "../features/responses/responsesSlice";
import { api } from "../services/api";

const rootReducer = combineReducers({
  forms: formsReducer,
  responses: responsesSlice,

  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
