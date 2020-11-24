/* eslint-disable default-case */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Expense from '../../models/expense.model';
import { SharedModule } from '../../../shared/shared.module';

@Injectable()
export class PoDynamicFormRegisterService {
  constructor(private http: HttpClient, private sharedModule: SharedModule) {}

  baseURL = `${this.sharedModule.serviceUri}/beneficiaries`;

  getCPF(matricula: string, operadora: string) {
    const response = this.http.get<Expense>(
      `${this.baseURL}/?subscriberId=${matricula}&healthInsurerCode=${operadora}`,
      {
        responseType: 'json',
      },
    );

    return response;
  }

  async sendForm(form) {
    const requestData = form.value;
    this.http
      .post<Expense>(
        `${this.sharedModule.serviceUri}/analyticDmedExpenses`,
        requestData,
      )
      .subscribe(
        response => console.log(response),
        error => console.log(error),
      );
  }
}
