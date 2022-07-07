import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './data.state';

export const selectData = createFeatureSelector<DataState>('data');

export const selectDataItems = createSelector(
  selectData,
  (state: DataState) => state.dataItems
);
