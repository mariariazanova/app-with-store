import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from "./project/form/form.component";
import { DataComponent } from "./project/data/data.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FormComponent,
  },
  {
    path: 'data',
    pathMatch: 'full',
    component: DataComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
