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
  PoNotificationService,
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

  formOperator = '';

  formDateFrom = '';

  formDateTo = '';

  formSsnHolder = '';

  formExpenseKey = '';

  filters = {};

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

  public readonly inclusionType: Array<{
    value: string;
    label: string;
    color?: string;
  }> = [
    { value: '1', label: 'Manual', color: 'color-02' },
    { value: '2', label: 'Automática', color: 'color-11' },
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
    { property: 'healthInsurerCode', label: 'Operadora' },
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
      property: 'inclusionType',
      label: 'Gravação',
      type: 'label',
      labels: this.inclusionType,
    },

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
    public poNotification: PoNotificationService,
  ) {}

  ngOnInit() {
    this.expenseListService.getExpense().subscribe(response => {
      this.expenseList = response.items;
      this.formatDateHour();
      this.filteredExpenseList = this.expenseList;
    });
  }

  updateExpense(row: any) {
    if (row.inclusionType === '1') {
      this.router.navigate([`/form/${row.expenseKey}`]);
    } else {
      this.poNotification.error(
        'Não é possível alterar uma gravação automática',
      );
    }
  }

  deleteExpense(row: any) {
    if (row.inclusionType === '1') {
      this.router.navigate([`/form/${row.expenseKey}/delete`]);
    } else {
      this.poNotification.error(
        'Não é possível excluir uma gravação automática',
      );
    }
  }

  inserir() {
    this.router.navigate(['/form']);
  }

  showMore() {
    this.registersQuantity += 10;
    this.getFilters();
    this.expenseListService
      .loadMoreExpense(this.filters, this.registersQuantity)
      .subscribe(response => {
        this.expenseList = response.items;
        this.formatDateHour();
        this.filteredExpenseList = this.expenseList;
      });
  }

  getFilters() {
    this.filters = {
      operator: this.formOperator,
      dateFrom: this.formDateFrom,
      dateTo: this.formDateTo,
      ssnHolder: this.formSsnHolder,
      expenseKey: this.formExpenseKey,
    };
  }

  filterExpenseList() {
    this.getFilters();
    this.expenseListService
      .filterExpense(this.filters, this.registersQuantity)
      .subscribe(response => {
        this.expenseList = response.items;
        this.formatDateHour();
        this.filteredExpenseList = this.expenseList;
      });
  }

  formatDateHour() {
    let formatedDate = '';
    let formatedHour = '';
    this.expenseList.forEach((expense, index) => {
      formatedDate = this.expenseList[index].inclusionDate;
      formatedDate = `${formatedDate.substr(6, 2)}/${formatedDate.substr(
        4,
        2,
      )}/${formatedDate.substr(0, 4)}`;
      formatedHour = this.expenseList[index].inclusionTime;
      formatedHour = `${formatedHour.substr(0, 2)}:${formatedHour.substr(
        2,
        2,
      )}:${formatedHour.substr(4, 2)}`;
      this.expenseList[index].inclusionDate = formatedDate;
      this.expenseList[index].inclusionTime = formatedHour;
    });
  }
}
