import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { State } from "./core.state";
import * as DataReducer from "./data/data.reducer";

export const reducers = {
  data: DataReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
