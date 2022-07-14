import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router }                       from "@angular/router";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DataService }                                    from "../../../core/state/data/data.service";
import { DataQuery }                                      from "../../../core/state/data/data.query";
import { AkitaNgFormsManager }                            from "@datorama/akita-ng-forms-manager";
import { ClientService }                                  from "../../services/client.service";

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
export class CodesComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  baseData$ = this.dataQuery.select('dataItems');
  rows: Code[] = [];
  isStoreEmpty: boolean = true;
  dataFromBack = this.clientService.getDataFromBack();

  constructor(
    private router: Router,
    private formsManager: AkitaNgFormsManager<any>,
    private dataService: DataService,
    private dataQuery: DataQuery,
    private fb: FormBuilder,
    private clientService: ClientService
    ) { }

  ngOnInit(): void {
    this.loadData();
    this.buildForm();
    this.patchValue();
    this.storeForm();
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }

  buildForm(): void {
    console.log('build');
    console.log(this.rows);
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
      console.log(this.rows);
    })
  }

  patchValue(): void {
    this.myForm.patchValue(this.clientService.getDataFromBack());
    // this.baseData$.subscribe(data => {
    //   (<FormArray>this.myForm.get('codes')).patchValue(data.codes);
    // });
  }

  storeForm(): void {
    console.log(this.myForm);
    console.log(this.formsManager.getForm('codes'));
    this.formsManager.upsert('codes', this.myForm);
  }

  submit(): void {
    console.log(this.rows);
    // this.dataService.updateCodes((<FormArray>this.myForm.get('codes')).value);
  }
}
