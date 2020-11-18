import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { despesasDmedAnaliticasListComponent } from './despesasdmedanaliticas-list/despesasdmedanaliticas-list.component';
import { despesasDmedAnaliticasViewComponent } from './despesasdmedanaliticas-view/despesasdmedanaliticas-view.component';
import despesasDmedAnaliticasFormComponent from './despesasdmedanaliticas-form/despesasdmedanaliticas-form.component';

const routes: Routes = [
  { path: '', component: despesasDmedAnaliticasListComponent },
  { path: 'view/:id', component: despesasDmedAnaliticasViewComponent },
  { path: 'edit/:id', component: despesasDmedAnaliticasFormComponent },
  { path: 'new', component: despesasDmedAnaliticasFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class despesasDmedAnaliticasRoutingModule {}
