import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlProductoComponent } from './control-producto.component';

describe('ControlProductoComponent', () => {
  let component: ControlProductoComponent;
  let fixture: ComponentFixture<ControlProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
