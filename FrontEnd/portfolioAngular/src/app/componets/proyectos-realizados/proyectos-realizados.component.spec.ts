import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosRealizadosComponent } from './proyectos-realizados.component';

describe('ProyectosRealizadosComponent', () => {
  let component: ProyectosRealizadosComponent;
  let fixture: ComponentFixture<ProyectosRealizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosRealizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
