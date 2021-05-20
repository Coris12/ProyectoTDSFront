import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProveedorComponent } from './editar-proveedor.component';

describe('EditarProveedorComponent', () => {
  let component: EditarProveedorComponent;
  let fixture: ComponentFixture<EditarProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
