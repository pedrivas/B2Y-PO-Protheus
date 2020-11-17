import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },

    //{ path: 'despesasdmedanaliticas',
    { path: '',
    loadChildren: () => import('./despesasdmedanaliticas/despesasdmedanaliticas.module').then(m => m.despesasDmedAnaliticasModule )
    },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
