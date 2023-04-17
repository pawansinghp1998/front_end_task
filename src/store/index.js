import {
  initialState as ProductInitialState,
  productDetails,
} from "./Products";
import reduxSaga from "redux-saga";
import { applyMiddleware, combineReducers, createStore } from "redux";

import { rootSaga } from "./sagas";

export const initialState = {
    productDetails: ProductInitialState,
  },
  sagaMiddleware = reduxSaga(),
  rootReducer = combineReducers({ productDetails }),
  store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
