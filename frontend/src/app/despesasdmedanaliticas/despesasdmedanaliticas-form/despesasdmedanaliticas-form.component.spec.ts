import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import despesasDmedAnaliticasFormComponent from './despesasdmedanaliticas-form.component';

describe('despesasDmedAnaliticasFormComponent', () => {
  let component: despesasDmedAnaliticasFormComponent;
  let fixture: ComponentFixture<despesasDmedAnaliticasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [despesasDmedAnaliticasFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(despesasDmedAnaliticasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
