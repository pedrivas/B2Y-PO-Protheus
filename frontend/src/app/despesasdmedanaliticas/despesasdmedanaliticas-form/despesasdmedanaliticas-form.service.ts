import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Expense from '../../models/expense.model';
import { SharedModule } from '../../../shared/shared.module';

@Injectable()
export class PoDynamicFormRegisterService {
  constructor(private http: HttpClient, private sharedModule: SharedModule) {}

  baseURL = `${this.sharedModule.serviceUri}/analyticDmedExpenses`;

  getExpense(expenseKey: string) {
    return this.http.get<Expense>(`${this.baseURL}/${expenseKey}`);
  }

  postExpense(form) {
    const requestData = form.value;
    requestData.inclusionType = '1';
    return this.http.post(
      `${this.sharedModule.serviceUri}/analyticDmedExpenses`,
      requestData,
    );
  }
}
