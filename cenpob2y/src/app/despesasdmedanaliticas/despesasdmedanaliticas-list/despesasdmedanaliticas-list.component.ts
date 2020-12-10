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

  filterDateFrom = '';

  filterDateTo = '';

  hasNext: boolean;

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

  public readonly exclusionId: Array<{
    value: string;
    label: string;
    color?: string;
  }> = [
    { value: '0', label: 'Inclusão', color: 'color-01' },
    { value: '1', label: 'Exclusão', color: 'color-07' },
  ];

  public readonly dependenceRelationships: Array<{
    value: string;
    label: string;
  }> = [
    { value: '03', label: 'Cônjuge/companheiro' },
    { value: '04', label: 'Filho/filha' },
    { value: '06', label: 'Enteado/enteada' },
    { value: '08', label: 'Pai/mãe' },
    { value: '10', label: 'Agregado/outros' },
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
      visible: false,
    },

    { property: 'ssnHolder', label: 'CPF Titular' },
    {
      property: 'titleHolderEnrollment',
      label: 'Matricula Titular',
      visible: false,
    },
    { property: 'holderName', label: 'Nome Titular' },
    { property: 'dependentSsn', label: 'CPF Dependente' },
    {
      property: 'dependentEnrollment',
      label: 'Matrícula Dependente',
      visible: false,
    },
    { property: 'dependentName', label: 'Nome Dependente' },
    {
      property: 'dependentBirthDate',
      label: 'Dt.Nasicmento Dependente',
      visible: false,
    },
    {
      property: 'dependenceRelationships',
      label: 'Relação de Dependência',
      type: 'label',
      labels: this.dependenceRelationships,
      visible: false,
    },
    { property: 'expenseKey', label: 'Chave Despesa' },
    { property: 'expenseAmount', label: 'Valor Despesa' },
    { property: 'refundAmount', label: 'Valor Reembolso' },
    {
      property: 'previousYearRefundAmt',
      label: 'Vlr Reemb.Ano Anterior',
    },
    { property: 'period', label: 'Competência', visible: false },

    { property: 'providerSsnEin', label: 'CPF/CNPJ Prestador', visible: false },
    { property: 'providerName', label: 'Nome Prestador', visible: false },
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
      this.hasNext = !response.hasNext;
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
        this.hasNext = !response.hasNext;
      });
  }

  getFilters() {
    this.formatFilterDate();
    this.filters = {
      operator: this.formOperator,
      dateFrom: this.filterDateFrom,
      dateTo: this.filterDateTo,
      ssnHolder: this.formSsnHolder,
      expenseKey: this.formExpenseKey,
    };
  }

  filterExpenseList() {
    this.getFilters();
    this.registersQuantity = 10;
    this.expenseListService
      .filterExpense(this.filters, this.registersQuantity)
      .subscribe(response => {
        this.expenseList = response.items;
        this.hasNext = !response.hasNext;
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

  formatFilterDate() {
    this.filterDateFrom = '';
    this.filterDateTo = '';
    if (this.formDateFrom) {
      this.filterDateFrom =
        this.formDateFrom.substr(0, 4) +
        this.formDateFrom.substr(5, 2) +
        this.formDateFrom.substr(8, 2);
    }
    if (this.formDateTo) {
      this.filterDateTo =
        this.formDateTo.substr(0, 4) +
        this.formDateTo.substr(5, 2) +
        this.formDateTo.substr(8, 2);
    }
  }
}
