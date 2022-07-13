import { Component, OnInit } from '@angular/core';
import { Router }            from "@angular/router";
import { StoreService }      from "../../services/store.service";

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
  rows: DayOffs[] = [];
  isStoreEmpty: boolean = true;

  constructor(private router: Router, private storeService: StoreService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const data  = this.storeService.store.dataItems;

    this.isStoreEmpty = !data.dayOffs.length;
    this.rows = data.dayOffs;
  }

  addData(): void {
    this.router.navigate(['/form', { indexes: this.rows.length }]);
  }

  editData({ index, type, days }: DayOffs): void {
    this.router.navigate(['/form', { index: index, type: type, days: days }]);

  }

  deleteData({ index }: DayOffs): void {
    const dayOffIndex = this.storeService.store.dataItems.dayOffs.findIndex((item) => item.index === index);
    const updatedDayOffsItems = [...this.storeService.store.dataItems.dayOffs];

    updatedDayOffsItems.splice(dayOffIndex, 1);

    this.storeService.store = {
      ...this.storeService.store,
      dataItems: { ...this.storeService.store.dataItems, dayOffs: updatedDayOffsItems },
    };
    this.loadData();
  }

  submit(): void {
    this.storeService.store = {
      ...this.storeService.store,
      dataItems: { ...this.storeService.store.dataItems, ...{ dayOffs: this.rows } }
    };
  }
}
