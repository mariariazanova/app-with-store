import { Action, createReducer, on } from '@ngrx/store';
import { DataState, initialState } from './data.state';
import * as DataActions from './data.actions';
import { Code } from "../../../project/components/codes/codes.component";

const dataReducer = createReducer(
  initialState,
  on(DataActions.loadDataSuccess, (state, { dataItem }) => ({
      ...state,
      dataItems: { ...state.dataItems, ...dataItem }
  })),

  on(DataActions.addDataItemFormSubmitted, (state, { dataItem }) => ({
    ...state,
    dataItems: { ...state.dataItems, ...dataItem }
  })),

  on(DataActions.addDataItemFormDialogSubmitted, (state, { dataItem }) => ({
    ...state,
    dataItems: { ...state.dataItems, dayOffs: [ ...state.dataItems.dayOffs, dataItem ] }
  })),

  on(DataActions.editDataItemFormDialogSubmitted, (state, { dataItem }) => {
    const dayOffIndex = state.dataItems.dayOffs.findIndex((item) => item.index === dataItem.index);
    const updatedDayOffsItems = [...state.dataItems.dayOffs];

    updatedDayOffsItems[dayOffIndex] = dataItem;

    return {
      ...state,
      dataItems: { ...state.dataItems, dayOffs: updatedDayOffsItems },
    };
  }),

  on(DataActions.deleteDataItemFormSubmitted, (state, { dataItemIndex }) => {
    const dayOffIndex = state.dataItems.dayOffs.findIndex((item) => item.index === dataItemIndex);
    const updatedDayOffsItems = [...state.dataItems.dayOffs];

    updatedDayOffsItems.splice(dayOffIndex, 1);

    return {
      ...state,
      dataItems: { ...state.dataItems, dayOffs: updatedDayOffsItems },
    };
  }),

  on(DataActions.editCodeItemSubmitted, (state, { dataItem }) => {
    const updatedCodesItems: Code[] = JSON.parse(JSON.stringify(state.dataItems.codes));

    updatedCodesItems.map((code, index) => {
      Object.assign(code, dataItem[index]);
    })

    return {
      ...state,
      dataItems: { ...state.dataItems, codes: updatedCodesItems },
    };
  }),
);

export function reducer(state: DataState | undefined, action: Action) {
  // console.log(dataReducer(state, action));
  return dataReducer(state, action);
}
