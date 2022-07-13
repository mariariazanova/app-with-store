import { BaseData }                                     from "../../../project/interfaces/base-data.interface";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Injectable }                                   from "@angular/core";

export interface DataState extends EntityState<BaseData>{
  dataItems: BaseData;
}

export const initialState: DataState = {
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

export function createInitialState(): DataState {
  return {
    dataItems: initialState.dataItems,
  };
}

@StoreConfig({ name: "data" })
@Injectable({ providedIn: "root" })
export class DataStore extends EntityStore<DataState> {
  constructor() {
    super(createInitialState());
  }
}
