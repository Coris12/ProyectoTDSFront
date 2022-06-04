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

  emple: any;
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
      this.emple = data;
      console.log(this.emple);
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

  updateEmpleado(idEmpleado: number) {
    this.empleadoController.getByIdUsingGET1(idEmpleado)
      .subscribe(emple => {
        console.log(emple.idEmpleado)
        this.empleForm.setValue({
          idEmpleado:emple.idEmpleado,
          estado:emple.estado ,
          farmacia:emple.farmacia,
          cargoEmple:emple.cargoEmple,
          usuario:emple.usuario
          
        });
      });
    this.EmpleadoDialog = true;

  }

  saveEmpleado(): void {
    console.log(this.empleForm.value)
    if (this.empleForm.value?.idEmpleado !== null) {
      this.empleadoController.updateUsingPUT1(
        this.empleForm.value,
        this.empleForm.value?.idEmpleado,
      ).subscribe(data => {
        this.messageService.add({
          severity: 'info',
          summary: 'Producto Actualizado',
          detail: data.object
        });
        this.EmpleadoDialog = false;
        this.cargarEmpleados();
      });
    } else {
      this.empleadoController.createUsingPOST2(
        this.empleForm.value,
        this.empleForm.value?.usuario.idUsuario
      ).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Sucursal creada con exito.' });

      },
        error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));

        this.EmpleadoDialog = false;

        this.empleForm.setValue({
          idEmpleado: null,
          estado: null,
          farmacia: null,
          cargoEmple: null,
          usuario: null
      })

    }
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

