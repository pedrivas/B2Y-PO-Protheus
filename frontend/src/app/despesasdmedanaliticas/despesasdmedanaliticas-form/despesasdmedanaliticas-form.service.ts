/* eslint-disable default-case */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SharedModule } from '../../../shared/shared.module';

@Injectable()
export class PoDynamicFormRegisterService {
  constructor(private http: HttpClient, private sharedModule: SharedModule) {}

  baseURL = `${this.sharedModule.serviceUri}/beneficiaries`;

  // getCPF(matricula: string, operadora: string): Observable<any> {
  //   return this.http.get(
  //     `${this.baseURL}/?subscriberId=${matricula}&healthInsurerCode=${operadora}`,
  //   );
  // }

  getCPF(matricula: string, operadora: string): Observable<any> {
    const response = this.http
      .get(
        `${this.baseURL}/?subscriberId=${matricula}&healthInsurerCode=${operadora}`,
        {
          responseType: 'json',
        },
      )
      .pipe();
    return response;
  }

  getUserDocument(value) {
    const cpfField = { property: 'cpf', visible: true };
    const cnpjField = { property: 'cnpj', visible: true };
    const document = value.isJuridicPerson ? cnpjField : cpfField;

    return {
      fields: [document],
    };
  }
}
