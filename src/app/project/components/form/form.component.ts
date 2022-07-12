import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AddDataFromFormDialog, EditData } from "../../../actions/app.actions";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  myForm!: FormGroup;
  value = this.route.snapshot.params;

  constructor(private router: Router, private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildForm();
    this.patchValue();
  }

  buildForm(): void {
    this.myForm = new FormGroup({
      "index": new FormControl(),
      "type": new FormControl(),
      "days": new FormControl(),
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
      this.store.dispatch(new EditData(this.myForm.value));
    } else {
      this.store.dispatch(new AddDataFromFormDialog(this.myForm.value));
    }

    this.router.navigate(['/dayOffs']);
  }
}
