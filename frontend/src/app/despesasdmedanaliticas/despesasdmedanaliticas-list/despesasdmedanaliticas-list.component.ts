/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { Router } from '@angular/router';
import { PoPageDynamicEditField } from '@po-ui/ng-templates';
import {
  PoTableAction,
  PoTableColumn,
  PoPageAction,
} from '@po-ui/ng-components';
import Expense from '../../models/expense.model';
import { ExpenseListService } from './despesasdmedanaliticas-list.service';

interface EditFieldProps extends PoPageDynamicEditField {
  labels?: Array<{ value: string; label: string; color?: string }>;
}

@Component({
  selector: 'app-despesasdmedanaliticas-list',
  templateUrl: './despesasdmedanaliticas-list.component.html',
  styleUrls: ['./despesasdmedanaliticas-list.component.css'],
  providers: [ExpenseListService],
})
export class despesasDmedAnaliticasListComponent {
  title = 'DMED - Despesas Detalhadas';

  registersQuantity = 10;

  formValues = [];

  formDate = '';

  formSsnHolder = '';

  formExpenseKey = '';

  inputCPF = '';

  inicialDate = '';

  finalDate = '';

  range: string;

  serviceApi = `${this.sharedModule.serviceUri}/analyticDmedExpenses`;

  expenseList: Array<Expense> = [];

  filteredExpenseList: Array<Expense> = [];

  tableActions: Array<PoTableAction> = [
    {
      action: this.updateExpense.bind(this),
      icon: 'po-icon-edit',
      label: 'Alterar',
    },
    {
      action: this.deleteExpense.bind(this),
      icon: 'po-icon-delete',
      label: 'Excluir',
    },
  ];

  pageActions: Array<PoPageAction> = [
    {
      action: this.inserir.bind(this),
      icon: 'po-icon-plus',
      label: 'Inserir',
    },
  ];

  public readonly exclusionId: Array<{
    value: string;
    label: string;
    color?: string;
  }> = [
    { value: '0', label: 'Inclusão', color: 'color-01' },
    { value: '1', label: 'Exclusão', color: 'color-07' },
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

  public readonly columns: Array<PoTableColumn> = [
    { property: 'healthInsurerCode', label: 'Código Operadora ANS' },
    {
      property: 'exclusionId',
      label: 'Tipo Operação',
      type: 'label',
      labels: this.exclusionId,
      visible: true,
    },
    {
      property: 'processed',
      label: 'Processado',
      type: 'label',
      labels: this.processed,
    },
    {
      property: 'inclusionDate',
      label: 'Data Inclusão',
    },
    {
      property: 'inclusionTime',
      label: 'Hora Inclusão',
      visible: true,
    },

    { property: 'expenseKey', label: 'Chave Despesa' },
    { property: 'expenseAmount', label: 'Valor Despesa' },
    { property: 'refundAmount', label: 'Valor Reembolso' },
    {
      property: 'previousYearRefundAmt',
      label: 'Vlr Reemb.Ano Anterior',
    },
    { property: 'period', label: 'Competência' },
    { property: 'ssnHolder', label: 'CPF Titular' },
    {
      property: 'titleHolderEnrollment',
      label: 'Matricula Titular',
    },
    { property: 'holderName', label: 'Nome Titular' },
    { property: 'dependentSsn', label: 'CPF Dependente' },
    {
      property: 'dependentEnrollment',
      label: 'Matrícula Dependente',
    },
    { property: 'dependentName', label: 'Nome Dependente' },
    {
      property: 'dependentBirthDate',
      label: 'Dt.Nasicmento Dependente',
    },
    {
      property: 'dependenceRelationships',
      label: 'Relação de Dependência',
    },

    { property: 'providerSsnEin', label: 'CPF/CNPJ Prestador' },
    { property: 'providerName', label: 'Nome Prestador' },

    {
      property: 'robotProcStartTime',
      label: 'Hora Início proces robo',
      visible: false,
    },
    { property: 'robotId', label: 'ID Robo', visible: false },
  ];

  constructor(
    private sharedModule: SharedModule,
    private router: Router,
    private expenseListService: ExpenseListService,
  ) {}

  ngOnInit() {
    this.expenseListService.getExpense().subscribe(response => {
      this.expenseList = response.items;
      this.filteredExpenseList = this.expenseList;
    });
  }

  updateExpense(row: any) {
    this.router.navigate([`/form/${row.expenseKey}`]);
  }

  deleteExpense(row: any) {
    this.router.navigate([`/form/${row.expenseKey}/delete`]);
  }

  inserir() {
    this.router.navigate(['/form']);
  }

  showMore() {
    this.registersQuantity += 10;
    this.expenseListService
      .loadMoreExpense(this.registersQuantity)
      .subscribe(response => {
        this.expenseList = response.items;
      });
  }

  filterExpenseList() {
    const filters = {
      dateFrom: this.formDate.start,
      dateTo: this.formDate.end,
      ssnHolder: this.formSsnHolder,
      expenseKey: this.formExpenseKey,
    };
    this.expenseListService.filterExpense(filters, this.registersQuantity);
  }
}
