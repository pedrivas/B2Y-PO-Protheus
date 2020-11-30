import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Expense from '../../models/expense.model';

import { SharedModule } from '../../../shared/shared.module';

@Injectable()
export class ExpenseListService {
  constructor(private http: HttpClient, private sharedModule: SharedModule) {}

  baseURL = `${this.sharedModule.serviceUri}/analyticDmedExpenses`;

  expenseList = [];

  getExpense(): Observable<any> {
    return this.http.get(`${this.baseURL}?page=1&pageSize=10`);
  }

  loadMoreExpense(quantity: number): Observable<any> {
    return this.http.get(`${this.baseURL}?page=1&pageSize=${quantity}`);
  }

  postExpense(form) {
    const requestData = form.value;
    requestData.inclusionType = '1';
    return this.http.post(
      `${this.sharedModule.serviceUri}/analyticDmedExpenses`,
      requestData,
    );
  }

  filterExpense(filters, quantity) {
    let queryParams = '';
    if (filters) {
      if (filters.ssnHolder) {
        queryParams += `&ssnHolder=${filters.ssnHolder}`;
      }
    }
    return this.http.get(
      `${this.baseURL}?page=1&pageSize=${quantity}${filters}`,
    );
  }
}
