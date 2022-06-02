import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {

  dialogo: boolean;
  loading: boolean;

  tratamientos:any;

  totalRecords: number

  public tratamientoForm = new FormGroup({})

  constructor() { }

  ngOnInit(): void {
  }

  cargarTratamientos() {

  }

  saveTratamiento(){

  }

}
