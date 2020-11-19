import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
@NgModule({
  imports: [CommonModule, FormsModule, PoModule, PoTemplatesModule],
  exports: [CommonModule, FormsModule, PoModule, PoTemplatesModule],
})
export class SharedModule {
  serviceUri = 'http://localhost:4444/api/healthcare/v1';
}
