import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoConsentimientoComponent } from './medico-consentimiento.component';

describe('MedicoConsentimientoComponent', () => {
  let component: MedicoConsentimientoComponent;
  let fixture: ComponentFixture<MedicoConsentimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoConsentimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoConsentimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
