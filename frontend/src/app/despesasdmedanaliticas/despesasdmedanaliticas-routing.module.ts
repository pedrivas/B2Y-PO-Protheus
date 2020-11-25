import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { despesasDmedAnaliticasListComponent } from './despesasdmedanaliticas-list/despesasdmedanaliticas-list.component';
import { despesasDmedAnaliticasFormComponent } from './despesasdmedanaliticas-form/despesasdmedanaliticas-form.component';

const routes: Routes = [
  { path: '', component: despesasDmedAnaliticasListComponent },
  { path: 'form/:id', component: despesasDmedAnaliticasFormComponent },
  { path: 'form', component: despesasDmedAnaliticasFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class despesasDmedAnaliticasRoutingModule {}
