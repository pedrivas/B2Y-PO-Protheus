import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtheusLibCoreModule } from 'protheus-lib-core';

import { SharedModule } from 'src/shared/shared.module';
import { environment } from '../../environments/environment';

import { despesasDmedAnaliticasRoutingModule } from './despesasdmedanaliticas-routing.module';
import { despesasDmedAnaliticasListComponent } from './despesasdmedanaliticas-list/despesasdmedanaliticas-list.component';
import { despesasDmedAnaliticasFormComponent } from './despesasdmedanaliticas-form/despesasdmedanaliticas-form.component';

let importProtheus = [];
if (environment.production) {
  importProtheus = [ProtheusLibCoreModule];
}

@NgModule({
  declarations: [
    despesasDmedAnaliticasListComponent,
    despesasDmedAnaliticasFormComponent,
  ],
  imports: [
    CommonModule,
    despesasDmedAnaliticasRoutingModule,
    SharedModule,
    ...importProtheus,
  ],
})
export class despesasDmedAnaliticasModule {}
