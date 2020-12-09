import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ProtheusLibCoreModule } from 'protheus-lib-core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    HttpClientModule,
    ProtheusLibCoreModule,
  ],
  providers: [SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
