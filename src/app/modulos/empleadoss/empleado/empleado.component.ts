import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { AuthControllerService } from 'src/app/api/authController.service';
import { EmpleadoControllerService } from 'src/app/api/empleadoController.service';
import { Empleado } from 'src/app/model/empleado';
import { Farmacia } from 'src/app/model/farmacia';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  public empleForm = new FormGroup({
    idEmpleado: new FormControl(null),
    estado: new FormControl(null),
    farmacia: new FormControl(null, [Validators.nullValidator, Validators.required]),
    cargoEmple: new FormControl(null, [Validators.nullValidator, Validators.required]),
    usuario: new FormControl(null, [Validators.nullValidator, Validators.required])
  });

  EmpleadoDialog: boolean;
  loading: boolean;

  empleado: any;
  usuarios: Usuario[] = [];
  empleados: Empleado[] = [];
  farmacia: Farmacia[] = [];


  totalRecords: number
  constructor(private authController: AuthControllerService,
    private empleadoController: EmpleadoControllerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarUsuarios();

    this.empleadoController.searchUsingGET1().subscribe((data: any) => {
      this.empleado = data;
      console.log(this.empleado);
    })
  }


  cargarEmpleados(event?: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.empleadoController.searchUsingGET1().subscribe(
        data => {
          this.empleados = data;
          this.totalRecords = this.empleados.length;
          this.loading = false;
        },
        err => {
          console.log(err);
        }

      );
    }, 1000);
  }

  saveEmpleado() {
    this.empleadoController.createUsingPOST2(
      this.empleForm.value,
      this.empleForm.value?.usuario.idUsuario,
    ).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Proveedor creado con exito.' });
      setTimeout(() => {
        this.cargarEmpleados();
      }, 1000);
      this.EmpleadoDialog = false;

    },
      error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));
  }

  cargarUsuarios(): void {
    this.authController.listaUsingGET().subscribe(
      data => {
        this.usuarios = data;
      },
      err => {
        console.log(err);
      }
    );

  }

  borrarEmple(idEmpleado: number): void {
    console.log(idEmpleado)
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar al Empleado?',
      accept: () => {
       
        this.empleadoController.deleteEmpleadoUsingPATCH(idEmpleado).subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: 'Empleado Eliminado', detail: 'eliminar.' });
            setTimeout(() => {
              this.cargarEmpleados();
            }, 1000);
          },
          error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));
      }
    });

  }
}

