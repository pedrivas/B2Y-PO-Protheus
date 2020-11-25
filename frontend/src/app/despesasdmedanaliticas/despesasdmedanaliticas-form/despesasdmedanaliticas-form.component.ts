import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';

import {
  PoPageDynamicEditActions,
  PoPageDynamicEditField,
} from '@po-ui/ng-templates';
import {
  PoLookupColumn,
  PoDynamicFormFieldChanged,
  PoDynamicFormValidation,
  PoNotificationService,
} from '@po-ui/ng-components';
import Expense from '../../models/expense.model';
import { PoDynamicFormRegisterService } from './despesasdmedanaliticas-form.service';
// import validaCPF from '../../../utils/validaCPF';

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

  title = 'Inclusão de Despesa';

  validateFields: Array<string> = [
    'titleHolderEnrollment',
    'healthInsurerCode',
  ];

  serviceApi = `${this.sharedModule.serviceUri}/analyticDmedExpenses`;

  serviceOperator = `${this.sharedModule.serviceUri}/operatorsDiops`;

  readonly actions: PoPageDynamicEditActions = {
    // cancel: '/despesasdmedanaliticas',
    cancel: '/',
    // save: '/despesasdmedanaliticas/edit/:id',
    save: '/edit/:id',
    saveNew: '/despesasdmedanaliticas/new',
  };

  public readonly status: Array<{ value: string; label: string }> = [
    { value: '1', label: 'Valid Pdte' },
    { value: '2', label: 'Válido' },
    { value: '3', label: 'Criticado' },
    { value: '4', label: 'Processado' },
  ];

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

  public readonly fields: Array<PoPageDynamicEditField> = [
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
    },
    {
      property: 'exclusionId',
      label: 'ID Exclusao',
      key: true,
      required: true,
      options: this.exclusionId,
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
    if (this.expenseId) {
      this.title = 'Alteração de Despesa';
      this.setFormValue();
    }
  }

  onChangeFields(
    changedValue: PoDynamicFormFieldChanged,
  ): PoDynamicFormValidation {
    return {
      value: {
        ssnHolder: this.registerService.getCPF(
          changedValue.value.titleHolderEnrollment,
          changedValue.value.healthInsurerCode,
        ),
        // .subscribe(
        //   // eslint-disable-next-line no-return-assign
        //   data =>
        //     (this.expense = {
        //       ssnHolder: (data as any).ssnHolder,
        //       expenseKey: (data as any).expenseKey,
        //     }),
        // ),
      },

      // fields: [
      //   {
      //     property: 'city',
      //     gridColumns: 6,
      //     options: this.registerService.getCPF(changedValue.value.state),
      //     disabled: false,
      //   },
      // ],
    };
  }

  handleNewExpense(form) {
    this.registerService.postNewExpense(form).subscribe(
      () => {
        this.poNotification.success('Despesa inserida com Sucesso');
        this.router.navigate(['/']);
      },
      err => this.poNotification.error(err),
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line class-methods-use-this
  handleUpdateExpense() {
    alert('update');
  }

  private setFormValue(): void {
    this.registerService
      .getExpense(this.expenseId)
      .subscribe((expense: Expense) => {
        this.expenseValues.providerName = expense.providerName;
        this.expenseValues.inclusionTime = expense.inclusionTime;
        this.expenseValues.refundAmount = expense.refundAmount;
        this.expenseValues.exclusionId = expense.exclusionId;
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
