import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { DataState, initialState } from './data.state';
import * as DataActions from './data.actions';

const dataReducer = createReducer(
  initialState,
  on(DataActions.addDataItemFormSubmitted, (state, { dataItem }) => ({
    ...state,
    dataItems: [...state.dataItems, dataItem],
  })),
);

export function reducer(state: DataState | undefined, action: Action) {
  console.log(state);
  return dataReducer(state, action);
}
