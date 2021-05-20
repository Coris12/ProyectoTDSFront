import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlProveedorComponent } from './control-proveedor.component';

describe('ControlProveedorComponent', () => {
  let component: ControlProveedorComponent;
  let fixture: ComponentFixture<ControlProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
