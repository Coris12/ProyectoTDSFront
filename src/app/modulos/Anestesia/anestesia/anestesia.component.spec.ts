import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnestesiaComponent } from './anestesia.component';

describe('AnestesiaComponent', () => {
  let component: AnestesiaComponent;
  let fixture: ComponentFixture<AnestesiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnestesiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnestesiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
