import { Component, OnInit }      from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService }            from "../../../core/state/data/data.service";
import { DataQuery }              from "../../../core/state/data/data.query";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  myForm!: FormGroup;
  value = this.route.snapshot.params;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private dataQuery: DataQuery) { }

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
      this.dataService.editDayOffs(this.myForm.value);
    } else {
      this.dataService.updateDayOffs(this.myForm.value);
    }

    this.router.navigate(['/dayOffs']);
  }
}
