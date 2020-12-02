import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Expense from '../../models/expense.model';

import { SharedModule } from '../../../shared/shared.module';

@Injectable()
export class ExpenseListService {
  constructor(private http: HttpClient, private sharedModule: SharedModule) {}

  baseURL = `${this.sharedModule.serviceUri}/analyticDmedExpenses`;

  filters = '';

  expenseList = [];

  getExpense(): Observable<any> {
    return this.http.get(`${this.baseURL}?page=1&pageSize=10`);
  }

  loadMoreExpense(filters, quantity: number): Observable<any> {
    this.setFilters(filters);
    return this.http.get(
      `${this.baseURL}?page=1&pageSize=${quantity}${this.filters}`,
    );
  }

  postExpense(form) {
    const requestData = form.value;
    requestData.inclusionType = '1';
    return this.http.post(
      `${this.sharedModule.serviceUri}/analyticDmedExpenses`,
      requestData,
    );
  }

  setFilters(filters) {
    this.filters = '';
    if (filters) {
      if (filters.ssnHolder) {
        this.filters += `&ssnHolder=${filters.ssnHolder}`;
      }
      if (filters.expenseKey) {
        this.filters += `&expenseKey=${filters.expenseKey}`;
      }
      if (filters.operator) {
        this.filters += `&healthInsurerCode=${filters.operator}`;
      }
    }
  }

  filterExpense(filters, quantity): Observable<any> {
    this.setFilters(filters);
    return this.http.get(
      `${this.baseURL}?page=1&pageSize=${quantity}${this.filters}`,
    );
  }
}
