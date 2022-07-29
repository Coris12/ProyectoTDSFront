import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisionComponent } from './admision.component';

describe('AdmisionComponent', () => {
  let component: AdmisionComponent;
  let fixture: ComponentFixture<AdmisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
