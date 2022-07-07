import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectDataItems } from "../../core/state/data";
import { map, Observable, tap } from "rxjs";

export interface BaseData {
  name: string,
  surname: string,
  email: string,
  phone: string,
}

export interface Data {
  name: string,
  surname: string,
  phone: string,
}

const baseData = [
  {
    name: 'Maria',
    surname: 'Riazanova',
    email: 'mr@itransition.com',
    phone: '+123 456 789',
  },
  {
    name: 'Vladimir',
    surname: 'Griboedov',
    email: 'vg@itransition.com',
    phone: '+789 123 456',
  }
];

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  baseData$ = this.store.select(selectDataItems);
  rows!: Data[];
  rows$!: Observable<Data[]>;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // this.rows = baseData.map(data => this.mapData(data));
    // this.rows$ = this.baseData$.pipe(map(data => {
    //   console.log(data);
    //   this.mapData(data);
    // }));
    this.rows$ = this.baseData$.pipe(tap(baseData => {
      console.log(baseData);
      baseData.map(data => this.mapData(data));
      // this.mapData(data);
    }));
  }

  mapData({ name, surname, email, phone }: BaseData): Data {
    return {
      name, surname, phone
    }
  }

  btnClick(): void {
    this.router.navigate(['']);
  }
}
