import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';

import {
  PoPageDynamicEditActions,
  PoPageDynamicEditField,
} from '@po-ui/ng-templates';
import {
  PoLookupColumn,
  PoDynamicModule,
  PoDynamicFormField,
  PoDynamicFormFieldChanged,
  PoDynamicFormValidation,
  PoNotificationService,
} from '@po-ui/ng-components';
import { PoDynamicFormRegisterService } from './despesasdmedanaliticas-form.service';
// import validaCPF from '../../../utils/validaCPF';

@Component({
  selector: 'app-despesasdmedanaliticas-form',
  templateUrl: './despesasdmedanaliticas-form.component.html',
  styleUrls: ['./despesasdmedanaliticas-form.component.css'],
  providers: [PoDynamicFormRegisterService],
})
export class despesasDmedAnaliticasFormComponent implements OnInit {
  expense = {};

  validateFields: Array<string> = ['titleHolderEnrollment', 'ansOperatorCode'];

  title = 'Novo';

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
    { value: '1', label: 'Guia' },
    { value: '2', label: 'Transação' },
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
      property: 'ansOperatorCode',
      label: 'Código Operadora ANS',
      key: true,
      required: true,
      // searchService: this.serviceOperator,
      columns: this.columns,
      fieldLabel: 'registerNumber',
      fieldValue: 'registerNumber',
      mask: '999999',
      gridColumns: 2,
    },
    {
      divider: 'Titular',
      property: 'titleHolderEnrollment',
      label: 'Matricula',
      required: true,
      key: false,
      gridColumns: 2,
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
      gridColumns: 8,
      pattern: '^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$',
      errorMessage: 'Insira somente letras e/ou espaços neste campo.',
    },
    {
      divider: 'Dependente',
      property: 'dependentSsn',
      label: 'CPF',
      key: true,
      gridColumns: 2,
    },
    {
      property: 'dependentEnrollment',
      label: 'Matrícula',
      key: false,
      gridColumns: 2,
    },
    {
      property: 'dependentName',
      label: 'Nome',
      key: true,
      gridColumns: 4,
    },
    {
      property: 'dependentBirthDate',
      label: 'Dt.Nasicmento',
      key: true,
      gridColumns: 2,
    },
    {
      property: 'dependenceRelationships',
      label: 'Relação de Dependência',
      key: false,
      gridColumns: 2,
    },
    {
      divider: 'Despesa',
      property: 'expenseKey',
      label: 'Chave',
      key: true,
    },
    {
      property: 'expenseAmount',
      label: 'Valor Despesa',
      key: false,
      gridColumns: 2,
    },
    {
      property: 'refundAmount',
      label: 'Valor Reembolso',
      key: false,
      gridColumns: 2,
    },
    {
      property: 'previousYearRefundAmt',
      label: 'Vlr Reemb.Ano Anterior',
      key: false,
      gridColumns: 2,
    },
    { property: 'period', label: 'Competência', key: true },
    {
      divider: 'Prestador',
      property: 'providerSsnEin',
      label: 'CPF/CNPJ Prestador',
      key: true,
    },
    { property: 'providerName', label: 'Nome Prestador', key: false },
    { property: 'inclusionTime', label: 'Hora Inclusão', key: false },
    {
      property: 'exclusionId',
      label: 'ID Exclusao',
      key: true,
      options: this.exclusionId,
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedModule: SharedModule,
    public poNotification: PoNotificationService,
    private registerService: PoDynamicFormRegisterService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.title = params.id
        ? `Editando registro ${params.id}`
        : 'Novo registro';
    });
  }

  onChangeFields(
    changedValue: PoDynamicFormFieldChanged,
  ): PoDynamicFormValidation {
    return {
      value: {
        ssnHolder: this.registerService.getCPF(
          changedValue.value.titleHolderEnrollment,
          changedValue.value.ansOperatorCode,
        ),
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
}
