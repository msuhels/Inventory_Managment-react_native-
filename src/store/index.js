import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { userData, dashboardData } from "./reducers/reducer"

const rootRaducer=combineReducers({ 
    userData,
    dashboardData
 });
const persistConfig = {
    key: 'Inventory',
    storage,
    timeout: undefined,
    whitelist: ["user"]
};

const persistedReducer = persistReducer(persistConfig, rootRaducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);



