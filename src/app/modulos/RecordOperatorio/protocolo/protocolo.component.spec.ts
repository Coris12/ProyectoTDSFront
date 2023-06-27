import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloComponent } from './protocolo.component';

describe('ProtocoloComponent', () => {
  let component: ProtocoloComponent;
  let fixture: ComponentFixture<ProtocoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
