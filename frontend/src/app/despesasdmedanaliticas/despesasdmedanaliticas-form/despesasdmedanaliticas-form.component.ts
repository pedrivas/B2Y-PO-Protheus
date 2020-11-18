import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';

import {
  PoPageDynamicEditActions,
  PoPageDynamicEditField,
} from '@po-ui/ng-templates';

@Component({
  selector: 'app-despesasdmedanaliticas-form',
  templateUrl: './despesasdmedanaliticas-form.component.html',
  styleUrls: ['./despesasdmedanaliticas-form.component.css'],
})
class despesasDmedAnaliticasFormComponent implements OnInit {
  title = 'Novo';

  serviceApi = `${this.sharedModule.serviceUri}/analyticDmedExpenses`;

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

  public readonly fields: Array<PoPageDynamicEditField> = [
    {
      property: 'healthInsurerCode',
      label: 'Código Operadora ANS',
      key: true,
      gridColumns: 2,
    },
    {
      property: 'ssnHolder',
      label: 'CPF Titular',
      key: true,
      mask: '999.999.999-99',
      minLength: 14,
      maxLength: 14,
      gridColumns: 2,
    },
    {
      property: 'titleHolderEnrollment',
      label: 'Matricula Titular',
      key: false,
    },
    {
      property: 'holderName',
      label: 'Nome Titular',
      key: false,
      pattern: '^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$',
    },
    { property: 'dependentSsn', label: 'CPF Dependente', key: true },
    {
      property: 'dependentEnrollment',
      label: 'Matrícula Dependente',
      key: false,
    },
    { property: 'dependentName', label: 'Nome Dependente', key: true },
    {
      property: 'dependentBirthDate',
      label: 'Dt.Nasicmento Dependente',
      key: true,
    },
    {
      property: 'dependenceRelationships',
      label: 'Relação de Dependência',
      key: false,
    },
    { property: 'expenseKey', label: 'Chave Despesa', key: true },
    { property: 'expenseAmount', label: 'Valor Despesa', key: false },
    { property: 'refundAmount', label: 'Valor Reembolso', key: false },
    {
      property: 'previousYearRefundAmt',
      label: 'Vlr Reemb.Ano Anterior',
      key: false,
    },
    { property: 'period', label: 'Competência', key: true },
    { property: 'providerSsnEin', label: 'CPF/CNPJ Prestador', key: true },
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
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.title = params.id
        ? `Editando registro ${params.id}`
        : 'Novo registro';
    });
  }
}

export default despesasDmedAnaliticasFormComponent;
