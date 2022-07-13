import { Component, OnInit }      from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService }           from "../../services/store.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  myForm!: FormGroup;
  value = this.route.snapshot.params;

  constructor(private router: Router, private route: ActivatedRoute, private storeService: StoreService) { }

  ngOnInit(): void {
    this.buildForm();
    this.patchValue();
  }

  buildForm(): void {
    this.myForm = new FormGroup({
      index: new FormControl(),
      type: new FormControl(),
      days: new FormControl(),
    });
  }

  patchValue(): void {
    if (this.value['type']) {
      this.myForm.patchValue(this.value);
    } else {
      this.myForm.patchValue({ index: this.value['indexes'] });
    }
  }

  submit(): void {
    if (Object.keys(this.value).includes('index')) {
      const dayOffIndex = this.storeService.store.dataItems.dayOffs.findIndex((item) => item.index === this.myForm.value.index);
      const updatedDayOffsItems = [...this.storeService.store.dataItems.dayOffs];

      updatedDayOffsItems[dayOffIndex] = this.myForm.value;

      this.storeService.store = {
        ...this.storeService.store,
        dataItems: { ...this.storeService.store.dataItems, dayOffs: updatedDayOffsItems },
      };
    } else {
      this.storeService.store = {
        ...this.storeService.store,
        dataItems: { ...this.storeService.store.dataItems, dayOffs: [ ...this.storeService.store.dataItems.dayOffs, this.myForm.value ] }
      };
    }

    this.router.navigate(['/dayOffs']);
  }
}
