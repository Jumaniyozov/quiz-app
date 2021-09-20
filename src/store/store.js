import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers/index";
import {
  composeWithDevTools,
} from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

const middleware = [reduxThunk,];

const loadState = () => {
  try { // It's also possible to use other local storage if it doesn't support localStorage
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(err);
  }
};

export const store = createStore(
  reducers,
  loadState(),
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => saveState(store.getState()));