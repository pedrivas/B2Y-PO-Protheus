import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

import { ProAppConfigService } from 'protheus-lib-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private configService: ProAppConfigService) {}

  ngOnInit(): void {
    this.configService.loadAppConfig();
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Despesas Dmed Analiticas', link: 'despesasdmedanaliticas' },
  ];

  close() {
    this.configService.callAppClose();
  }
}
