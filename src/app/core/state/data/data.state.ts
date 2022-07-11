import { BaseData } from "../../../project/interfaces/base-data.interface";

export interface DataState {
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
