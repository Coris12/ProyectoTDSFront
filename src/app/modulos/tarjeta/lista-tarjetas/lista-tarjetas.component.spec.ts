import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTarjetasComponent } from './lista-tarjetas.component';

describe('ListaTarjetasComponent', () => {
  let component: ListaTarjetasComponent;
  let fixture: ComponentFixture<ListaTarjetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTarjetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
