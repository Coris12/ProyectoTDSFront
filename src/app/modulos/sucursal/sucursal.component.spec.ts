import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalComponent } from './sucursal.component';

describe('SucursalComponent', () => {
  let component: SucursalComponent;
  let fixture: ComponentFixture<SucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
