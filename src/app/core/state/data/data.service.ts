import { Injectable } from "@angular/core";
import { DataStore }  from "./data.store";
import { BaseData }   from "../../../project/interfaces/base-data.interface";
import { DayOffs }    from "../../../project/components/dayOffs/dayOffs.component";
import { Code }       from "../../../project/components/codes/codes.component";

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private dataStore: DataStore) {
  }

  add(dataItem: BaseData): void {
    this.dataStore.add(dataItem);
  }

  update(dataItem: Partial<BaseData>): void {
    this.dataStore.update(state =>
      ({ ...state,
        dataItems: { ...state.dataItems, ...dataItem },
      })
    );
  }

  updateDayOffs(dataItem: Partial<BaseData>): void {
    this.dataStore.update(state =>
      ({ ...state,
        dataItems: { ...state.dataItems, dayOffs: [ ...state.dataItems.dayOffs, dataItem ] },
      })
    );
  }

  editDayOffs(dataItem: DayOffs): void {
    this.dataStore.update(state => {
      const dayOffIndex = state.dataItems.dayOffs.findIndex((item) => item.index === dataItem.index);
      const updatedDayOffsItems = [...state.dataItems.dayOffs];

      updatedDayOffsItems[dayOffIndex] = dataItem;

      return {
        ...state,
        dataItems: { ...state.dataItems, dayOffs: updatedDayOffsItems },
      };
    });
  }

  delete(dataItemIndex: string): void {
    this.dataStore.update(state => {
      const dayOffIndex = state.dataItems.dayOffs.findIndex((item) => item.index === dataItemIndex);
      const updatedDayOffsItems = [...state.dataItems.dayOffs];

      updatedDayOffsItems.splice(dayOffIndex, 1);

      return {
        ...state,
        dataItems: { ...state.dataItems, dayOffs: updatedDayOffsItems },
      };
    });
  }

  updateCodes(dataItem: Code[]): void {
    this.dataStore.update(state => {
      const updatedCodesItems: Code[] = JSON.parse(JSON.stringify(state.dataItems.codes));

      updatedCodesItems.map((code, index) => {
        Object.assign(code, dataItem[index]);
      })

      return {
        ...state, dataItems: {...state.dataItems, codes: updatedCodesItems},
      };
    });
  }
}
