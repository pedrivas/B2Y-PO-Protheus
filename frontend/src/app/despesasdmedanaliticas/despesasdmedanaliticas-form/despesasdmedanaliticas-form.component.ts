import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';

import { PoPageDynamicEditActions, PoPageDynamicEditField } from '@po-ui/ng-templates';

@Component({
  selector: 'app-despesasdmedanaliticas-form',
  templateUrl: './despesasdmedanaliticas-form.component.html',
  styleUrls: ['./despesasdmedanaliticas-form.component.css']
})
export class despesasDmedAnaliticasFormComponent implements OnInit {
  title = 'Novo';
  serviceApi = this.sharedModule.serviceUri + '/analyticDmedExpenses';
  readonly actions: PoPageDynamicEditActions = {
    //cancel: '/despesasdmedanaliticas',
    cancel: '/',
    //save: '/despesasdmedanaliticas/edit/:id',
    save: '/edit/:id',
    saveNew: '/despesasdmedanaliticas/new'
  };

  public readonly status: Array<{value: string, label: string}> = [
    { value: '1', label: 'Valid Pdte' },
    { value: '2', label: 'Válido' },
    { value: '3', label: 'Criticado' },
    { value: '4', label: 'Processado' },
  ];

  public readonly exclusionId: Array<{value: string, label: string}> = [
    { value: '0', label: 'Não' },
    { value: '1', label: 'Guia' },
    { value: '2', label: 'Transação' },
  ];

  public readonly expenseType: Array<{value: string, label: string}> = [
    { value: '#CENTPDES()', label: 'Transação' },
  ];

  public readonly recordingType: Array<{value: string, label: string}> = [
    { value: '1', label: 'Manual' },
    { value: '2', label: 'Automático' },
  ];

  public readonly processed: Array<{value: string, label: string}> = [
    { value: '0', label: 'Não' },
    { value: '1', label: 'Sim' },
  ];



  public readonly fields: Array<PoPageDynamicEditField> = [
    { property: 'titleHolderEnrollment', label: 'Matricula Titular' , key: true },
    { property: 'holderName', label: 'Nome Titular' , key: false },
    { property: 'dependentEnrollment', label: 'Matrícula Dependente' , key: true },
    { property: 'dependentName', label: 'Nome Dependente' , key: false },
    { property: 'dependenceRelationships', label: 'Relação de Dependência' , key: false },
    { property: 'providerSsnEin', label: 'CPF/CNPJ Prestador' , key: false },
    { property: 'providerName', label: 'Nome Prestador' , key: false },
    { property: 'status', label: 'Status' , key: false, options: this.status  },
    { property: 'exclusionId', label: 'ID Exclusao' , key: false, options: this.exclusionId  },
    { property: 'ansOperatorCode', label: 'Código Operadora ANS' , key: true },
    { property: 'ssnHolder', label: 'CPF Titular' , key: true },
    { property: 'dependentSsn', label: 'CPF Dependente' , key: true },
    { property: 'dependentBirthDate', label: 'Dt.Nasicmento Dependente' , key: false },
    { property: 'expenseKey', label: 'Chave Despesa' , key: true },
    { property: 'expenseAmount', label: 'Valor Despesa' , key: false },
    { property: 'refundAmount', label: 'Valor Reembolso' , key: false },
    { property: 'previousYearRefundAmt', label: 'Vlr Reemb.Ano Anterior' , key: false },
    { property: 'expenseType', label: 'Tipo da Despesa' , key: false, options: this.expenseType  },
    { property: 'period', label: 'Competência' , key: true },
    { property: 'recordingType', label: 'Tipo Gravação' , key: false, options: this.recordingType  },
    { property: 'processed', label: 'Processado' , key: false, options: this.processed  },
    { property: 'robotProcStartTime', label: 'Hora Início proces robo' , key: false },
    { property: 'inclusionDate', label: 'Data Inclusão' , key: false },
    { property: 'robotId', label: 'ID Robo' , key: false },
    { property: 'inclusionTime', label: 'Hora Inclusão' , key: false },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedModule: SharedModule
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.title = params.id ? `Editando registro ${params.id}` : 'Novo registro';
    });
  }

}
