import { BaseData, Data } from "../../../project/data/data.component";

export interface DataState {
  dataItems: BaseData[];
}

export const initialState: DataState = {
  dataItems: [],
};
