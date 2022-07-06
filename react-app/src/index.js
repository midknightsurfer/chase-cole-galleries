import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import CategoryContext from "./context/CategoryContext";
import configureStore from "./store";
import App from "./App";

import "./index.css";

const store = configureStore();
let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<App />} persistor={persistor}>
        <CategoryContext>
          <App />
        </CategoryContext>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
