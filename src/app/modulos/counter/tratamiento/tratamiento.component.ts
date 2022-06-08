import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TratamientoControllerService } from 'src/app/api/tratamientoController.service';
import { EmpleadoControllerService } from '../../../api/empleadoController.service';
import { ClienteControllerService } from '../../../api/clienteController.service';
import { Cliente } from '../../../model/cliente';
import { Empleado } from '../../../model/empleado';
import { AuthControllerService } from 'src/app/api/authController.service';

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


  empleado: Empleado []=[];
  cliente: Cliente[] =[];

  public tratamientoForm = new FormGroup({
    idTratamiento: new FormControl(null),
    nombre: new FormControl(null, [Validators.nullValidator, Validators.required]),
    cantidad: new FormControl(null, [Validators.nullValidator, Validators.required]),
    categoria: new FormControl(null, [Validators.nullValidator, Validators.required]),
    cliente: new FormControl(null, [Validators.nullValidator, Validators.required]),
    codigo: new FormControl(null, [Validators.nullValidator, Validators.required]),
    descripcion: new FormControl(null, [Validators.nullValidator, Validators.required]),
    empleado: new FormControl(null, [Validators.nullValidator, Validators.required]),
    estado: new FormControl(null, [Validators.nullValidator, Validators.required]),
    subTotal: new FormControl(null, [Validators.nullValidator, Validators.required]),
    total: new FormControl(null, [Validators.nullValidator, Validators.required]),
    valorUnitario: new FormControl(null, [Validators.nullValidator, Validators.required]),
  })

  constructor(
    private tratamientoController: TratamientoControllerService,
    private messageService: MessageService,
    private empleadoController: EmpleadoControllerService,
    private usuarioController: AuthControllerService
  ) { }

  ngOnInit(): void {
    this.cargarEmpleado();
    
    this.cargarCliente();
  }

  cargarTratamientos() {

  }

  cargarCliente() {
    this.usuarioController.searchUsingGET().subscribe(
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
    this.tratamientoController.createUsingPOST5(
      this.tratamientoForm.value,
      this.tratamientoForm.value?.empleado.idEmpleado,
      this.tratamientoForm.value?.cliente.idCliente,
    ).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Tratamiento creado .' });
    },
      error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));

    this.dialogo = false;

  }

}
