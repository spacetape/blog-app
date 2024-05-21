import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers"; // Import your root reducer
import App from "./App"; // Assuming App is your root component

const store = createStore(rootReducer); // Create your Redux store with the root reducer

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
