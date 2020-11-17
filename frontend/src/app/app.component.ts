import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
	// { label: 'Home', action: this.onClick.bind(this) },
  //   { label: 'Responsaveis', link: 'responsaveis'},
  //   { label: 'Diops Operadoras', link: 'diopsoperadoras'},
    { label: 'Despesas Dmed Analiticas', link: 'despesasdmedanaliticas'},

  ];

  close() {
    alert('Clicked in menu item');
  }

  // close() {
  //   this.configService.callAppClose();
  // }


}
