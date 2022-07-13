import { Injectable } from "@angular/core";
import { BaseData }   from "../interfaces/base-data.interface";

export interface State {
  data: DataState;
}

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
    dayOffs: [],
    codes: [
      {
        code: 'code 1',
        description: 'description 1',
        category: 'ignore',
        rank: '1',
      },
      {
        code: 'code 2',
        description: 'description 2',
        category: 'ignore',
        rank: '2',
      }
    ],
  },
};

export const dataFromBack: BaseData = {
  systemName: 'f74544bf-188f-46fd-b109-179511c774fb',
  name: 'business rule 1',
  description: 'business rule 1 description',
  executionPriority: '1',
  sourceDataBase: 'data base 1',
  sourceSchema: 'schema 1',
  sourceTable: 'table 1',
  dayOffs: [
    {
      index: '0',
      type: 'weekend',
      days: '10.07.2022',
    },
    {
      index: '1',
      type: 'holiday',
      days: '03.07.2022',
    }
  ],
  codes: [
    {
      code: 'code 1',
      description: 'description 1',
      category: 'business',
      rank: '1',
    },
    {
      code: 'code 2',
      description: 'description 2',
      category: 'personal',
      rank: '2',
    }
  ],
};

@Injectable()
export class StoreService {
  store!: DataState;

  constructor() {
    this.store = initialState;
    this.receiveDataFromBack();
  }

  receiveDataFromBack(): void {
    this.store = {
      ...this.store,
      dataItems: { ...this.store.dataItems, ...dataFromBack }
    };
  }
}
