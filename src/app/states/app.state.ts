import { BaseData }                                                           from "../project/interfaces/base-data.interface";
import { State, Action, StateContext, Selector }                              from "@ngxs/store";
import { AddData, AddDataFromFormDialog, DeleteData, EditCodeData, EditData } from "../actions/app.actions";
import {
  Code
}                                                                             from "../project/components/codes/codes.component";

export class DataStateModel {
  dataItems!: BaseData;
}

export const initialState: DataStateModel = {
  dataItems: {
    systemName: null,
    name: null,
    description: null,
    executionPriority: null,
    sourceDataBase: null,
    sourceSchema: null,
    sourceTable: null,
    dayOffs: [
      {
        index: '0',
        type: '3',
        days: 'rer',
      }
    ],
    codes: [
      {
        code: 'code1',
        description: 'description1',
        category: '2',
        rank: '1',
      },
      {
        code: 'code2',
        description: 'description2',
        category: '3',
        rank: '2',
      }
    ],
  },
};


@State<DataStateModel>({
  name: 'data',
  defaults: {
    dataItems: initialState.dataItems
  }
})
export class DataState {
  @Selector()
  static getData(state: DataStateModel) {
    return state.dataItems;
  }

  @Action(AddData)
  add({getState, patchState }: StateContext<DataStateModel>, { payload }: AddData) {
    const state = getState();
    patchState({
      dataItems: { ...state.dataItems, ...payload }
    });
  }

  @Action(AddDataFromFormDialog)
  addFromForm({getState, patchState }: StateContext<DataStateModel>, { payload }: AddDataFromFormDialog) {
    const state = getState();

    patchState({
      dataItems: { ...state.dataItems, dayOffs: [ ...state.dataItems.dayOffs, payload ] }
    });
  }

  @Action(EditData)
  edit({getState, patchState }: StateContext<DataStateModel>, { payload }: EditData) {
    const state = getState();
    const itemIndex = state.dataItems.dayOffs.findIndex((item) => item.index === payload.index);
    const updatedDayOffsItems = [...state.dataItems.dayOffs];
    updatedDayOffsItems[itemIndex] = payload;

    patchState({
      dataItems: { ...state.dataItems, dayOffs: updatedDayOffsItems}
    });
  }

  @Action(EditCodeData)
  editCode({getState, patchState }: StateContext<DataStateModel>, { payload }: EditCodeData) {
    const state = getState();

    const updatedCodesItems: Code[] = JSON.parse(JSON.stringify(state.dataItems.codes));
    updatedCodesItems.map((code, index) => {
      Object.assign(code, payload[index]);
    });

    patchState({
      dataItems: { ...state.dataItems, codes: updatedCodesItems }
    });
  }

  @Action(DeleteData)
  delete({getState, patchState }: StateContext<DataStateModel>, { index }: DeleteData) {
    const state = getState();
    const itemIndex = state.dataItems.dayOffs.findIndex((item) => item.index === index);
    const updatedDayOffsItems = [...state.dataItems.dayOffs];
    updatedDayOffsItems.splice(itemIndex, 1);

    patchState({
      dataItems: {...state.dataItems, dayOffs: updatedDayOffsItems}
    });
  }
}
