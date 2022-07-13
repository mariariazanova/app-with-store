import { Component, OnInit }                              from '@angular/core';
import { Router }                                         from "@angular/router";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { StoreService }                                   from "../../services/store.service";

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
  rows: Code[] = [];
  isStoreEmpty: boolean = true;

  constructor(private router: Router, private fb: FormBuilder, private storeService: StoreService) { }

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
    const data  = this.storeService.store.dataItems;

    this.isStoreEmpty = !data.codes.length;
    this.rows = data.codes;
  }

  patchValue(): void {
    const data  = this.storeService.store.dataItems;

    (<FormArray>this.myForm.get('codes')).patchValue(data.codes);
  }

  submit(): void {
    const updatedCodesItems: Code[] = JSON.parse(JSON.stringify(this.storeService.store.dataItems.codes));

    updatedCodesItems.map((code, index) => {
      Object.assign(code, (<FormArray>this.myForm.get('codes')).value[index]);
    })

    this.storeService.store = {
      ...this.storeService.store,
      dataItems: { ...this.storeService.store.dataItems, codes: updatedCodesItems },
    };
  }

  saveToBack(): void {
    console.log(this.storeService.store.dataItems);
  }
}
