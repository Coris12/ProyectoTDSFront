import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
 EmpleadoDialog: boolean;
 loading: boolean;

 empleados:any;

  totalRecords: number

  constructor() { }

  ngOnInit(): void {
  }

  
  cargarEmpleados() {

  }
}
