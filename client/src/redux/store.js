// import { createStore, applyMiddleware, compose } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";

// import rootReducer from "./reducers/index";

// import { composeWithDevTools } from "redux-devtools-extension";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ latency: 0 })
//   : compose;

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
// // const store = createStore(
// //   rootReducer,
// //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
// //     window.__REDUX_DEVTOOLS_EXTENSION__({
// //       latency: 0,
// //     })
// // );
// const DataProvider = ({ children }) => {
//   return <Provider store={store}>{children}</Provider>;
// };

// export default DataProvider;
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import rootReducer from "./reducers/index";

import { composeWithDevTools } from "@redux-devtools/extension";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

let persistor = persistStore(store);

const DataProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default DataProvider;
