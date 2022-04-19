import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUserComponent } from './registrar-user.component';

describe('RegistrarUserComponent', () => {
  let component: RegistrarUserComponent;
  let fixture: ComponentFixture<RegistrarUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
