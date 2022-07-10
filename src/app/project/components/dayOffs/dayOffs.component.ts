import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import {
  addDataItemFormSubmitted,
  deleteDataItemFormSubmitted,
  selectDataItems
} from "../../../core/state/data";

export interface DayOffs {
  index: string,
  type: string,
  days: string,
}

@Component({
  selector: 'app-day-offs',
  templateUrl: './dayOffs.component.html',
  styleUrls: ['./dayOffs.component.scss']
})
export class DayOffsComponent implements OnInit {
  baseData$ = this.store.select(selectDataItems);
  rows: DayOffs[] = [];
  isStoreEmpty: boolean = true;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.baseData$.subscribe(data => {
      this.isStoreEmpty = !data.dayOffs.length;
      this.rows = data.dayOffs;
    })
  }

  addData(): void {
    this.router.navigate(['/form', { indexes: this.rows.length }]);
  }

  editData({ index, type, days }: DayOffs): void {
    this.router.navigate(['/form', { index: index, type: type, days: days }]);

  }

  deleteData({ index }: DayOffs): void {
    this.store.dispatch(
      deleteDataItemFormSubmitted({
        dataItemIndex: index,
      })
    );
  }

  submit(): void {
    this.store.dispatch(
      addDataItemFormSubmitted({
        dataItem: { dayOffs: this.rows },
      })
    );
  }
}
