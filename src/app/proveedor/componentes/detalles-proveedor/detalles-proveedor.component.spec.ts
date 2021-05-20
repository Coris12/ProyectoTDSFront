import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesProveedorComponent } from './detalles-proveedor.component';

describe('DetallesProveedorComponent', () => {
  let component: DetallesProveedorComponent;
  let fixture: ComponentFixture<DetallesProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
