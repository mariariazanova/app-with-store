import { Component, OnInit } from '@angular/core';
import { Router }            from "@angular/router";
import { DataService }       from "../../../core/state/data/data.service";
import { DataQuery }         from "../../../core/state/data/data.query";

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
  baseData$ = this.dataQuery.select('dataItems');
  rows: DayOffs[] = [];
  isStoreEmpty: boolean = true;

  constructor(private router: Router, private dataService: DataService, private dataQuery: DataQuery) { }

  ngOnInit(): void {
    this.loadData();
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
    this.dataService.delete(index);
  }

  submit(): void {
    this.dataService.update({
          dayOffs: this.rows ,
    });
  }
}
