import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from "./project/components/form/form.component";
import { GeneralComponent } from "./project/components/general/general.component";
import { SourceComponent } from "./project/components/source/source.component";
import { DayOffsComponent } from "./project/components/dayOffs/dayOffs.component";
import { CodesComponent } from "./project/components/codes/codes.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GeneralComponent,
  },
  {
    path: 'source',
    pathMatch: 'full',
    component: SourceComponent,
  },
  {
    path: 'dayOffs',
    pathMatch: 'full',
    component: DayOffsComponent,
  },
  {
    path: 'form',
    pathMatch: 'full',
    component: FormComponent,
  },
  {
    path: 'codes',
    pathMatch: 'full',
    component: CodesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
