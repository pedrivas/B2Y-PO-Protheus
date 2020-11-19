import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./despesasdmedanaliticas/despesasdmedanaliticas.module').then(
        m => m.despesasDmedAnaliticasModule,
      ),
  },
  // {
  //   path: '/new',
  //   component: despesasDmedFormComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
