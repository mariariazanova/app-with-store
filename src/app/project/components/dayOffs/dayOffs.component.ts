import { Component, OnInit } from '@angular/core';
import { Router }            from "@angular/router";
import { Store }             from "@ngxs/store";
import { Observable }        from "rxjs";
import { BaseData }            from "../../interfaces/base-data.interface";
import { AddData, DeleteData } from "../../../actions/app.actions";

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
  baseData$: Observable<BaseData> = this.store.select(state => state.data.dataItems);
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
    this.store.dispatch(new DeleteData(index));
  }

  submit(): void {
    this.store.dispatch(new AddData({ dayOffs: this.rows }));
  }
}
