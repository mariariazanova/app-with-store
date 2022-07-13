import { QueryEntity } from "@datorama/akita";
import { Injectable }  from "@angular/core";
import { DataState, DataStore }   from "./data.store";

@Injectable({ providedIn: 'root' })
export class DataQuery extends QueryEntity<DataState> {

  constructor(protected override store: DataStore) {
    super(store);
  }
}
