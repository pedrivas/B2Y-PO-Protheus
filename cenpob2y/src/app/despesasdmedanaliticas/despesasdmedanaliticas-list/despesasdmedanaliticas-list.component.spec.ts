import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { despesasDmedAnaliticasListComponent } from './despesasdmedanaliticas-list.component';

describe('despesasDmedAnaliticasListComponent', () => {
  let component: despesasDmedAnaliticasListComponent;
  let fixture: ComponentFixture<despesasDmedAnaliticasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ despesasDmedAnaliticasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(despesasDmedAnaliticasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
