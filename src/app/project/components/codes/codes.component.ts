import { Component, OnInit }                              from '@angular/core';
import { Router }                                         from "@angular/router";
import { Store }                                          from "@ngrx/store";
import {
  DataState, editCodeItemSubmitted, selectDataItems
}                                                         from "../../../core/state/data";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { take }                                           from "rxjs";
import { BaseData }                                       from "../../interfaces/base-data.interface";

export interface Code {
  code: string,
  description: string,
  category: string,
  rank: string,
}

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})
export class CodesComponent implements OnInit {
  myForm!: FormGroup;
  baseData$ = this.store.select(selectDataItems);
  rows: Code[] = [];
  isStoreEmpty: boolean = true;

  constructor(private router: Router, private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadData();
    this.buildForm();
    this.patchValue();
  }

  buildForm(): void {
    this.myForm = this.fb.group({
      codes: this.fb.array(this.rows.map(() => this.createRow())),
    });
  }

  createRow(): FormGroup {
    return this.fb.group({
      category: new FormControl(),
      rank: new FormControl(),
    });
  }

  getControl(renderIdx: number, path: string): FormControl {
    return <FormControl>(<FormArray>this.myForm.get('codes')).controls[renderIdx].get(path);
  }

  loadData(): void {
    this.baseData$.subscribe(data => {
      this.isStoreEmpty = !data.codes.length;
      this.rows = data.codes;
    })
  }

  patchValue(): void {
    this.baseData$.subscribe(data => {
      (<FormArray>this.myForm.get('codes')).patchValue(data.codes);
    });
  }

  submit(): void {
    this.store.dispatch(
      editCodeItemSubmitted({
        dataItem: (<FormArray>this.myForm.get('codes')).value,
      })
    );
  }

  saveToBack(): void {
    this.baseData$.subscribe(
      s => console.log(s)
    );
  }
}
