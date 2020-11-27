import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';

import {
  PoLookupColumn,
  PoDynamicFormField,
  PoNotificationService,
} from '@po-ui/ng-components';
import Expense from '../../models/expense.model';
import { PoDynamicFormRegisterService } from './despesasdmedanaliticas-form.service';

@Component({
  selector: 'app-despesasdmedanaliticas-form',
  templateUrl: './despesasdmedanaliticas-form.component.html',
  styleUrls: ['./despesasdmedanaliticas-form.component.css'],
  providers: [PoDynamicFormRegisterService],
})
export class despesasDmedAnaliticasFormComponent implements OnInit {
  expenseId: string;

  expense: Expense;

  expenseValues: Expense = {};

  isDelete: boolean;

  title = 'Inclusão de Despesa';

  validateFields: Array<string> = ['healthInsurerCode'];

  serviceApi = `${this.sharedModule.serviceUri}/analyticDmedExpenses`;

  serviceOperator = `${this.sharedModule.serviceUri}/operatorsDiops`;

  public readonly exclusionId: Array<{ value: string; label: string }> = [
    { value: '0', label: 'Não' },
    { value: '1', label: 'Sim' },
  ];

  public readonly columns: Array<PoLookupColumn> = [
    {
      property: 'registerNumber',
      label: 'Codigo da Operadora',
      fieldLabel: true,
    },
    { property: 'operatorCnpj', label: 'Cnpj', fieldLabel: true },
    { property: 'corporateName', label: 'Razão Social', fieldLabel: true },
  ];

  public readonly fields: Array<PoDynamicFormField> = [
    {
      property: 'healthInsurerCode',
      label: 'Código Operadora ANS',
      key: true,
      required: true,
      searchService: this.serviceOperator,
      columns: this.columns,
      fieldLabel: 'registerNumber',
      fieldValue: 'registerNumber',
      mask: '999999',
      minLength: 6,
      maxLength: 6,
      gridColumns: 2,
      disabled: false,
    },
    {
      property: 'exclusionId',
      label: 'ID Exclusao',
      key: true,
      required: true,
      options: this.exclusionId,
      visible: true,
      disabled: true,
    },
    {
      divider: 'Titular',
      property: 'titleHolderEnrollment',
      label: 'Matricula',
      required: true,
      key: false,
      gridColumns: 3,
      maxLength: 22,
    },
    {
      property: 'ssnHolder',
      label: 'CPF',
      key: true,
      required: true,
      mask: '999.999.999-99',
      minLength: 14,
      maxLength: 14,
      gridColumns: 2,
    },
    {
      property: 'holderName',
      label: 'Nome',
      key: false,
      gridColumns: 7,
      pattern: '^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$',
      maxLength: 70,
      errorMessage: 'Insira somente letras e/ou espaços neste campo.',
    },
    {
      divider: 'Dependente',
      property: 'dependentSsn',
      label: 'CPF',
      key: true,
      mask: '999.999.999-99',
      minLength: 14,
      maxLength: 14,
      gridColumns: 2,
    },
    {
      property: 'dependentEnrollment',
      label: 'Matrícula',
      key: false,
      gridColumns: 2,
      maxLength: 22,
    },
    {
      property: 'dependentName',
      label: 'Nome',
      key: true,
      gridColumns: 4,
      maxLength: 70,
    },
    {
      property: 'dependentBirthDate',
      label: 'Dt.Nasicmento',
      key: true,
      gridColumns: 2,
      type: 'date',
    },
    {
      property: 'dependenceRelationships',
      label: 'Relação de Dependência',
      key: false,
      gridColumns: 2,
      maxLength: 2,
      minLength: 2,
    },
    {
      divider: 'Despesa',
      property: 'expenseKey',
      label: 'Chave',
      required: true,
      key: true,
      gridColumns: 4,
      maxLength: 40,
      minLength: 40,
    },
    {
      property: 'expenseAmount',
      label: 'Valor Despesa',
      key: false,
      gridColumns: 2,
      type: 'currency',
      maxLength: 7,
    },
    {
      property: 'refundAmount',
      label: 'Valor Reembolso',
      key: false,
      gridColumns: 2,
      type: 'currency',
      maxLength: 7,
    },
    {
      property: 'previousYearRefundAmt',
      label: 'Vlr Reemb.Ano Anterior',
      key: false,
      gridColumns: 2,
      type: 'currency',
      maxLength: 7,
    },
    {
      property: 'period',
      label: 'Competência',
      key: true,
      required: true,
      gridColumns: 2,
      maxLength: 6,
      minLength: 6,
    },
    {
      divider: 'Prestador',
      property: 'providerSsnEin',
      label: 'CPF/CNPJ Prestador',
      key: true,
      maxLength: 14,
      minLength: 21,
    },
    {
      property: 'providerName',
      label: 'Nome Prestador',
      key: false,
      maxLength: 70,
    },
    {
      property: 'inclusionType',
      label: 'Tipo de Inclusão',
      key: true,
      maxLength: 1,
      visible: false,
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router,
    private sharedModule: SharedModule,
    public poNotification: PoNotificationService,
    private registerService: PoDynamicFormRegisterService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(parameters => {
      this.expenseId = parameters.get('id');
    });
    this.activatedRoute.url.subscribe(url => {
      if (url[2].path === 'delete') {
        this.isDelete = true;
      }
    });
    if (this.expenseId && !this.isDelete) {
      this.title = 'Alteração de Despesa';
      this.setFormValue();
      this.fields[0].disabled = true;
      this.fields[1].disabled = true;
      this.fields[3].disabled = true;
      this.fields[6].disabled = true;
      this.fields[8].disabled = true;
      this.fields[7].disabled = true;
      this.fields[15].disabled = true;
      this.fields[10].disabled = true;
      this.fields[14].disabled = true;
    } else if (this.expenseId && this.isDelete) {
      this.title = 'Exclusão de Despesa';
      this.setFormValue();
      this.expenseValues.exclusionId = '1';
      // eslint-disable-next-line no-plusplus
      for (let nFields = 0; nFields < this.fields.length; nFields++) {
        this.fields[nFields].disabled = true;
      }
    }
  }

  handleNewExpense(form) {
    this.registerService.postExpense(form).subscribe(
      () => {
        if (this.expenseId && !this.isDelete) {
          this.poNotification.success('Despesa atualizada com Sucesso');
        } else if (this.expenseId && this.isDelete) {
          this.poNotification.success('Despesa excluída com Sucesso');
        } else {
          this.poNotification.success('Despesa inserida com Sucesso');
        }
        this.router.navigate(['/']);
      },
      err => this.poNotification.error(err),
    );
  }

  private setFormValue(): void {
    this.registerService
      .getExpense(this.expenseId)
      .subscribe((expense: Expense) => {
        this.expenseValues.providerName = expense.providerName;
        this.expenseValues.inclusionTime = expense.inclusionTime;
        this.expenseValues.refundAmount = expense.refundAmount;
        if (this.isDelete) {
          this.expenseValues.exclusionId = '1';
        } else {
          this.expenseValues.exclusionId = '0';
        }
        this.expenseValues.providerSsnEin = expense.providerSsnEin;
        this.expenseValues.dependenceRelationships =
          expense.dependenceRelationships;
        this.expenseValues.dependentBirthDate = expense.dependentBirthDate;
        this.expenseValues.expenseAmount = expense.expenseAmount;
        this.expenseValues.healthInsurerCode = expense.healthInsurerCode;
        this.expenseValues.ssnHolder = expense.ssnHolder;
        this.expenseValues.processed = expense.processed;
        this.expenseValues.previousYearRefundAmt =
          expense.previousYearRefundAmt;
        this.expenseValues.titleHolderEnrollment =
          expense.titleHolderEnrollment;
        this.expenseValues.holderName = expense.holderName;
        this.expenseValues.dependentSsn = expense.dependentSsn;
        this.expenseValues.dependentName = expense.dependentName;
        this.expenseValues.roboId = expense.roboId;
        this.expenseValues.dependentEnrollment = expense.dependentEnrollment;
        this.expenseValues.period = expense.period;
        this.expenseValues.expenseKey = expense.expenseKey;
      });
  }
}
