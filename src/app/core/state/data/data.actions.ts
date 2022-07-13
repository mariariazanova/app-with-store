import { createAction, props } from '@ngrx/store';
import { BaseData } from "../../../project/interfaces/base-data.interface";
import { DayOffs } from "../../../project/components/dayOffs/dayOffs.component";
import { Code } from "../../../project/components/codes/codes.component";

export const loadData = createAction(
  "[App] Load Data"
);

export const loadDataSuccess = createAction(
  "[Data List] Load Data Success",
  props<{ dataItem: BaseData }>()
);

export const addDataItemFormSubmitted = createAction(
  "[Add Data] Add Data Item Form Submitted",
  props<{ dataItem: Partial<BaseData> }>()
);

export const addDataItemFormDialogSubmitted = createAction(
  "[Add Day Offs] Add Data Item Form Dialog Submitted",
  props<{ dataItem: DayOffs }>()
);

export const editDataItemFormDialogSubmitted = createAction(
  "[Edit Day Offs] Edit Data Item Form Dialog Submitted",
  props<{ dataItem: DayOffs }>()
);

export const deleteDataItemFormSubmitted = createAction(
  "[Delete Day Offs] Delete Data Item Form Submitted",
  props<{ dataItemIndex: string }>()
);

export const editCodeItemSubmitted = createAction(
  "[Edit Code] Edit Code Submitted",
  props<{ dataItem: Code[] }>()
);
