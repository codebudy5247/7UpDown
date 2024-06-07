import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["authState"],
};

const rootReducer = combineReducers({
  authState: authReducer,
});

export { rootPersistConfig, rootReducer };
