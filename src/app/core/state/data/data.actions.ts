import { createAction, props } from '@ngrx/store';
import { BaseData } from '../../../project/data/data.component';

export const appLoaded = createAction("[App] App Loaded");

export const addDataItemFormSubmitted = createAction(
  "[Add Data] Add Data Item Form Submitted",
  props<{ dataItem: BaseData }>()
);
