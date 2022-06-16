import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import productReducer from "./products";
import orderReducer from "./orders";
import cartReducer from "./cart";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist"

const rootReducer = combineReducers({
  session,
  orders: orderReducer,
  products: productReducer,
  cart: cartReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(persistedReducer, preloadedState, enhancer);
};

export default configureStore;
