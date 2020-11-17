import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { despesasDmedAnaliticasViewComponent } from './despesasDmedAnaliticas-view.component';

describe('despesasDmedAnaliticasViewComponent', () => {
  let component: despesasDmedAnaliticasViewComponent;
  let fixture: ComponentFixture<despesasDmedAnaliticasViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ despesasDmedAnaliticasViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(despesasDmedAnaliticasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
