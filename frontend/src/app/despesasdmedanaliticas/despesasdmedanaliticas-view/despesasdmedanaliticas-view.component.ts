import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { PoPageDynamicDetailActions, PoPageDynamicEditField } from '@po-ui/ng-templates';

@Component({
  selector: 'app-despesasdmedanaliticas-view',
  templateUrl: './despesasdmedanaliticas-view.component.html',
  styleUrls: ['./despesasdmedanaliticas-view.component.css']
})
export class despesasDmedAnaliticasViewComponent implements OnInit {

  title = 'Visualizando';
  serviceApi = this.sharedModule.serviceUri + '/analyticDmedExpenses';

  readonly actions: PoPageDynamicDetailActions = {
    back: '/',
    edit: 'despesasdmedanaliticas/edit/:id',
    remove: '/'
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
    { value: '#CENTPDES()', label: '#CENTPDES()' },
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
    { property: 'titleHolderEnrollment', label: 'Matricula Titular', disabled: true , key: true },
    { property: 'holderName', label: 'Nome Titular', disabled: true , key: false },
    { property: 'dependentEnrollment', label: 'Matrícula Dependente', disabled: true , key: true },
    { property: 'dependentName', label: 'Nome Dependente', disabled: true , key: false },
    { property: 'dependenceRelationships', label: 'Relação de Dependência', disabled: true , key: false },
    { property: 'providerSsnEin', label: 'CPF/CNPJ Prestador', disabled: true , key: false },
    { property: 'providerName', label: 'Nome Prestador', disabled: true , key: false },
    { property: 'status', label: 'Status', disabled: true , key: false, options: this.status  },
    { property: 'exclusionId', label: 'ID Exclusao', disabled: true , key: false, options: this.exclusionId  },
    { property: 'ansOperatorCode', label: 'Código Operadora ANS', disabled: true , key: true },
    { property: 'ssnHolder', label: 'CPF Titular', disabled: true , key: true },
    { property: 'dependentSsn', label: 'CPF Dependente', disabled: true , key: true },
    { property: 'dependentBirthDate', label: 'Dt.Nasicmento Dependente', disabled: true , key: false },
    { property: 'expenseKey', label: 'Chave Despesa', disabled: true , key: true },
    { property: 'expenseAmount', label: 'Valor Despesa', disabled: true , key: false },
    { property: 'refundAmount', label: 'Valor Reembolso', disabled: true , key: false },
    { property: 'previousYearRefundAmt', label: 'Vlr Reemb.Ano Anterior', disabled: true , key: false },
    { property: 'expenseType', label: 'Tipo da Despesa', disabled: true , key: false, options: this.expenseType  },
    { property: 'period', label: 'Competência', disabled: true , key: true },
    { property: 'recordingType', label: 'Tipo Gravação', disabled: true , key: false, options: this.recordingType  },
    { property: 'processed', label: 'Processado', disabled: true , key: false, options: this.processed  },
    { property: 'robotProcStartTime', label: 'Hora Início proces robo', disabled: true , key: false },
    { property: 'inclusionDate', label: 'Data Inclusão', disabled: true , key: false },
    { property: 'robotId', label: 'ID Robo', disabled: true , key: false },
    { property: 'inclusionTime', label: 'Hora Inclusão', disabled: true , key: false },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedModule: SharedModule
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.title = params.id ? `Vizualizando registro ${params.id}` : 'Visualizando';
    });
  }

}
