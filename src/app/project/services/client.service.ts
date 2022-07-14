import { Injectable }   from "@angular/core";
import { BaseData }                   from "../interfaces/base-data.interface";
import { dataFromBack, initialState } from "../../core/state/data";

@Injectable()
export class ClientService {
  getDataFromBack(): BaseData {
    return dataFromBack; //initialState.dataItems;
  }
}
