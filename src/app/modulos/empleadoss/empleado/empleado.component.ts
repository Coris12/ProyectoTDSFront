import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { AuthControllerService } from 'src/app/api/authController.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
 EmpleadoDialog: boolean;
 loading: boolean;

 empleados:any;
 usuarios: Usuario[] = [];

  totalRecords: number

  constructor( private  authController: AuthControllerService) { }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  
  cargarEmpleados(event?: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      this.authController.searchUsingGET().subscribe(
        data => {
          this.usuarios = data;
          this.totalRecords = this.usuarios.length;
          this.loading = false;
        },
        err => {
          console.log(err);
        }

      );
    }, 1000);


  }
}
