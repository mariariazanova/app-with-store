import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router }                       from "@angular/router";
import { DataService }         from "../../../core/state/data/data.service";
import { DataQuery }           from "../../../core/state/data/data.query";
import { AkitaNgFormsManager } from "@datorama/akita-ng-forms-manager";

export interface DayOffs {
  index: string,
  type: string,
  days: string,
  isDeleted?: boolean,
}

@Component({
  selector: 'app-day-offs',
  templateUrl: './dayOffs.component.html',
  styleUrls: ['./dayOffs.component.scss']
})
export class DayOffsComponent implements OnInit, OnDestroy {
  baseData$ = this.dataQuery.select('dataItems');
  rows: DayOffs[] = [];
  isStoreEmpty: boolean = true;

  constructor(private router: Router, private formsManager: AkitaNgFormsManager<any>, private dataService: DataService, private dataQuery: DataQuery) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }

  loadData(): void {
    this.baseData$.subscribe(data => {
      this.isStoreEmpty = !data.dayOffs.length;
      this.rows = data.dayOffs;
    });
  }

  addData(): void {
    this.router.navigate(['/form', { indexes: this.rows.length }]);
  }

  editData({ index, type, days }: DayOffs): void {
    this.router.navigate(['/form', { index: index, type: type, days: days }]);

  }

  deleteData({ index }: DayOffs): void {
    this.rows[+index].isDeleted = true;
    this.dataService.update({
      dayOffs: this.rows ,
    });
  }

  submit(): void {
    this.rows.forEach(row => row.isDeleted ? this.dataService.delete(row.index) : row);
    this.dataService.update({
          dayOffs: this.rows ,
    });
  }
}
