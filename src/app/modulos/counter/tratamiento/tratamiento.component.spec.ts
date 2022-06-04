import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoComponent } from './tratamiento.component';

describe('TratamientoComponent', () => {
  let component: TratamientoComponent;
  let fixture: ComponentFixture<TratamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
