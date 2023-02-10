import { legacy_createStore as createStore } from "redux";
import ReducerRoot from "./Redux/Reducer/ReducerRoot";

const store = createStore(ReducerRoot);

export default store;
