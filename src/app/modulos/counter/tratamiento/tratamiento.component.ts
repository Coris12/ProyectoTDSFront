import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { TratamientoControllerService } from 'src/app/api/tratamientoController.service';
import { EmpleadoControllerService } from '../../../api/empleadoController.service';
import { ClienteControllerService } from '../../../api/clienteController.service';
import { Cliente } from '../../../model/cliente';
import { Empleado } from '../../../model/empleado';
import { AuthControllerService } from 'src/app/api/authController.service';
import { Tratamiento } from 'src/app/model/tratamiento';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {

  dialogo: boolean;
  loading: boolean;

  tratamientos: any;

  totalRecords: number


  empleado: Empleado[] = [];
  cliente: Cliente[] = [];
  tratamiento: Tratamiento[] = [];

  public tratamientoForm = new FormGroup({
    idTratamiento: new FormControl(null),
    nombre: new FormControl(null, [Validators.nullValidator, Validators.required]),
    cantidad: new FormControl(null, [Validators.nullValidator, Validators.required]),
    categoria: new FormControl(null, [Validators.nullValidator, Validators.required]),
    codigo: new FormControl(null, [Validators.nullValidator, Validators.required]),
    descripcion: new FormControl(null, [Validators.nullValidator, Validators.required]),
    estado: new FormControl(null, [Validators.nullValidator, Validators.required]),
    subtotal: new FormControl(null, [Validators.nullValidator, Validators.required]),
    total: new FormControl(null, [Validators.nullValidator, Validators.required]),
    valorUnitario: new FormControl(null, [Validators.nullValidator, Validators.required]),
  })

  constructor(
    private tratamientoController: TratamientoControllerService,
    private messageService: MessageService,
    private empleadoController: EmpleadoControllerService,
    private clienteCntroller: ClienteControllerService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

    this.cargarTratamientos();
  }




  updateTratamiento(idTratamiento: number) {
    //console.log(idProveedor);

    this.tratamientoController.getByIdUsingGET6(idTratamiento)
      .subscribe(trata => {
        //console.log(prove.id_proveedor, prove.id_proveedor)
        this.tratamientoForm.setValue({
          idTratamiento: trata.idTratamiento,
          nombre: trata.nombre,
          cantidad: trata.cantidad,
          categoria: trata.categoria,
          codigo: trata.codigo,
          descripcion: trata.descripcion,
          estado: trata.estado,
          subtotal: trata.subtotal,
          total: trata.total,
          valorUnitario: trata.valorUnitario
        });
      });
    this.dialogo = true;
  }

  cargarTratamientos(event?: LazyLoadEvent): void {
    this.loading = true;

    setTimeout(() => {
      this.tratamientoController.searchUsingGET5().subscribe(

        data => {
          this.tratamiento = data;
          console.log(data);
          this.totalRecords = this.tratamiento.length;
          this.loading = false;
        },
        err => {
          console.log(err);
        }

      );
    }, 1000);
  }

  cargarCliente() {
    this.clienteCntroller.listUsingGET().subscribe(
      data => {
        console.log(data)
        this.cliente = data;
      },
      err => {
        console.log(err);
      }
    );
  }


  cargarEmpleado() {
    this.empleadoController.searchUsingGET1().subscribe(
      data => {
        console.log(data)
        this.empleado = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  saveTratamiento() {
    console.log(this.tratamientoForm.value)
    if (this.tratamientoForm.value?.idTratamiento !== null) {
      this.tratamientoController.updateUsingPUT6(
        this.tratamientoForm.value,
        this.tratamientoForm.value?.idTratamiento,
      ).subscribe(data => {
        this.messageService.add({
          severity: 'info',
          summary: 'Tratamiento Actualizado',
          detail: data.object
        });
        this.dialogo=false;
        this.cargarTratamientos
      })
    } else {
      this.tratamientoController.createUsingPOST6(
        this.tratamientoForm.value,
      ).subscribe(data => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Tratamiento creado .'
        });
      },
        error => this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: error.mensaje
        })
      );

      this.dialogo = false;
      this.tratamientoForm.setValue({
        idTratamiento: null,
        nombre: null,
        cantidad: null,
        categoria:null,
        codigo: null,
        descripcion: null,
        estado: null,
        subtotal: null,
        total: null,
        valorUnitario: null
      })
    }
  }


  borrarTratamiento(idTratamiento): void {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el Tratamiento ?',
      accept: () => {
        this.tratamientoController.deleteTratamientoUsingPATCH1(idTratamiento).subscribe(
          data => {
            this.messageService.add({
              severity: 'success',
              summary: 'Tratamiento Eliminado',
              detail: 'Eliminar.'
            });
            setTimeout(() => {
              this.cargarTratamientos();
            }, 1000);
          },
          error =>
            this.messageService.add({
              severity: 'Danger',
              summary: 'Error',
              detail: error.mensaje
            })
        );
      }
    })
  }

}
