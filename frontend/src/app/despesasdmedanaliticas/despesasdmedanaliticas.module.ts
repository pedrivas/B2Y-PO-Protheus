import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { despesasDmedAnaliticasRoutingModule } from './despesasdmedanaliticas-routing.module';
import { despesasDmedAnaliticasListComponent } from './despesasdmedanaliticas-list/despesasdmedanaliticas-list.component';
import { despesasDmedAnaliticasViewComponent } from './despesasdmedanaliticas-view/despesasdmedanaliticas-view.component';
import { despesasDmedAnaliticasFormComponent } from './despesasdmedanaliticas-form/despesasdmedanaliticas-form.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    despesasDmedAnaliticasListComponent,
    despesasDmedAnaliticasViewComponent,
    despesasDmedAnaliticasFormComponent
  ],
  imports: [
    CommonModule,
    despesasDmedAnaliticasRoutingModule,
    SharedModule
  ]
})
export class despesasDmedAnaliticasModule { }
