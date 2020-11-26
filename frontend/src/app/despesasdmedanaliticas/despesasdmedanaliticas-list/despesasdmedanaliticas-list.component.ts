/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { Router } from '@angular/router';
import {
  PoPageDynamicTableActions,
  PoPageDynamicEditField,
  PoPageDynamicTableCustomAction,
} from '@po-ui/ng-templates';
import { PoTableAction } from '@po-ui/ng-components';

interface EditFieldProps extends PoPageDynamicEditField {
  labels?: Array<{ value: string; label: string; color?: string }>;
}

@Component({
  selector: 'app-despesasdmedanaliticas-list',
  templateUrl: './despesasdmedanaliticas-list.component.html',
  styleUrls: ['./despesasdmedanaliticas-list.component.css'],
})
export class despesasDmedAnaliticasListComponent {
  title = 'DMED - Despesas Detalhadas';

  serviceApi = `${this.sharedModule.serviceUri}/analyticDmedExpenses`;

  readonly actions: PoPageDynamicTableActions = {
    new: '/form',
  };

  readonly customActions: Array<PoPageDynamicTableCustomAction> = [
    { label: 'Alterar', action: this.updateExpense.bind(this) },
    { label: 'Excluir', action: this.deleteExpense.bind(this) },
  ];

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

  public readonly recordingType: Array<{ value: string; label: string }> = [
    { value: '1', label: 'Manual' },
    { value: '2', label: 'Automático' },
  ];

  public readonly processed: Array<{
    value: string;
    label: string;
    color?: string;
  }> = [
    { value: '0', label: 'Não', color: 'color-07' },
    { value: '1', label: 'Sim', color: 'color-10' },
  ];

  public readonly fields: Array<EditFieldProps> = [
    { property: 'healthInsurerCode', label: 'Código Operadora ANS', key: true },
    { property: 'ssnHolder', label: 'CPF Titular', key: true },
    {
      property: 'titleHolderEnrollment',
      label: 'Matricula Titular',
      key: false,
    },
    { property: 'holderName', label: 'Nome Titular', key: false },
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
    {
      property: 'processed',
      label: 'Processado',
      key: false,
      type: 'label',
      labels: this.processed,
    },
    {
      property: 'robotProcStartTime',
      label: 'Hora Início proces robo',
      key: false,
      visible: false,
    },
    { property: 'inclusionDate', label: 'Data Inclusão', key: false },
    { property: 'robotId', label: 'ID Robo', key: false, visible: false },
    {
      property: 'inclusionTime',
      label: 'Hora Inclusão',
      key: false,
      visible: true,
    },
    {
      property: 'exclusionId',
      label: 'ID Exclusao',
      key: true,
      options: this.exclusionId,
      visible: false,
    },
  ];

  constructor(private sharedModule: SharedModule, private router: Router) {}

  updateExpense(row: any) {
    this.router.navigate([`/form/${row.expenseKey}`]);
  }

  deleteExpense(row: any) {
    this.router.navigate([`/form/${row.expenseKey}/delete`]);
  }
}
