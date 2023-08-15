import { userApi } from './api/user/user.api';
// third-party
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// project import

// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import p2pTestSlice from './reducers/p2p-test';
import chat from './reducers/chat';
import calendar from './reducers/calendar';
import menu from './reducers/menu';
import snackbar from './reducers/snackbar';
import productReducer from './reducers/product';
import cartReducer from './reducers/cart';
import kanban from './reducers/kanban';
import invoice from './reducers/invoice';
import { dealsApi } from './api/deals/deals.api';
import { massPayoutsApi } from './api/mass-payouts/mass-payouts.api';
import { payoutsApi } from './api/payouts/payouts.api';
import { statsApi } from './api/stats/stats.api';
import { p2pApi } from './api/p2p/p2p.api';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //
const reducers = combineReducers({
  chat,
  calendar,
  menu,
  snackbar,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'mantis-ts-'
    },
    cartReducer
  ),
  product: productReducer,
  kanban,
  invoice,
  p2pTestSlice,
  [dealsApi.reducerPath]: dealsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [massPayoutsApi.reducerPath]: massPayoutsApi.reducer,
  [payoutsApi.reducerPath]: payoutsApi.reducer,
  [statsApi.reducerPath]: statsApi.reducer,
  [p2pApi.reducerPath]: p2pApi.reducer
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
      .concat(dealsApi.middleware)
      .concat(userApi.middleware)
      .concat(massPayoutsApi.middleware)
      .concat(payoutsApi.middleware)
      .concat(statsApi.middleware)
      .concat(p2pApi.middleware)
});

export type RootState = ReturnType<typeof reducers>;

export type AppDispatch = typeof store.dispatch;

const persister = persistStore(store);

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, dispatch, persister, useSelector, useDispatch };
