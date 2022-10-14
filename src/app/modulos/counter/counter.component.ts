import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthControllerService } from 'src/app/api/authController.service';
import { FacturaControllerService } from 'src/app/api/facturaController.service';
import { TratamientoControllerService } from 'src/app/api/tratamientoController.service';
import { Tratamiento } from 'src/app/model/tratamiento';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {


  public usuarioForm = new FormGroup({
    id: new FormControl(null),
    celular: new FormControl(null, [Validators.nullValidator, Validators.required]),
    ciudad: new FormControl(null, [Validators.nullValidator, Validators.required]),
    direccion: new FormControl(null, [Validators.nullValidator, Validators.required]),
    email: new FormControl(null, [Validators.nullValidator, Validators.required]),
    identificacion: new FormControl(null, [Validators.nullValidator, Validators.required]),
    nombres: new FormControl(null, [Validators.nullValidator, Validators.required]),
    sexo: new FormControl(null, [Validators.nullValidator, Validators.required]),
    subTotal: new FormControl(null),
    descuento: new FormControl(null),
    total: new FormControl(null),
  })



  constructor(private authController: AuthControllerService, private serviceTto: TratamientoControllerService,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  totalRecords: number
  counterDialog: boolean;
  idUsuario: number;
  dialogTratamiento: boolean;


  usuarios: Usuario[] = [];
  loading: boolean;

  usuario: any[];
  ngOnInit(): void {
    this.cargarUsuarios();


    this.authController.searchUsingGET().subscribe((data: any) => {
      this.usuario = data;
      //console.log(this.usuario);
    })

    this.usuarioForm.get('subTotal').disable();
    this.usuarioForm.get('total').disable();
  }

  clear(table: Table) {
    table.clear();
  }

  cargarUsuarios(event?: LazyLoadEvent): void {
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

  buscarCliente(identificacion: string) {
    this.authController.getPersonaByIdentificacionUsingGET(identificacion)
      .subscribe(usuario => {

        this.usuarioForm.patchValue({
          id: usuario.object.id,
          celular: usuario.object.celular,
          ciudad: usuario.object.ciudad,
          direccion: usuario.object.direccion,
          email: usuario.object.email,
          identificacion: usuario.object.identificacion,
          nombres: usuario.object.nombres,
          sexo: usuario.object.sexo,
        });
      });
    this.counterDialog = true;
  }

  save() {

  }
  facturar(id?: number) {
    this.counterDialog = true;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  TtoDatTabArray: Tratamiento[] = [];
  SelectTtoDto: Tratamiento;
  tratamientos: Tratamiento[];
  disabled: boolean = true;

  seleccionadoTto: Tratamiento = {
    cantidad: null,
    categoria: null,
    codigo: null,
    descripcion: null,
    //cliente: null,
    // codigo: null,
    // descripcion: null,
    //empleado: null,
    estado: null,
    idTratamiento: null,
    nombre: null,
    subtotal: null,
    total: null,
    valorUnitario: null,
  }

  tratamiento: Tratamiento = {
    cantidad: null,
    categoria: null,
    codigo: null,
    descripcion: null,
    //cliente: null,
    // codigo: null,
    // descripcion: null,
    //empleado: null,
    estado: null,
    idTratamiento: null,
    nombre: null,
    subtotal: null,
    total: null,
    valorUnitario: null,
  };

  onRowSelectFProduct(event) {
    this.tratamiento = this.seleccionadoTto;
    //this.calcularIva();
  }

  selectTtoMessage(trat: Tratamiento) {
    this.messageService.add({ severity: 'info', summary: 'Tratamiento Seleccionado', detail: trat.nombre });
  }

  mensajesError(msg: String) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error: ' + msg,
    });
  }

  mensajeExito(msg: String) {
    this.messageService.add({
      severity: 'success',
      summary: 'Resultado',
      detail: 'Correcto!: ' + msg,
    });
  }

  openNewDialog() {
    this.dialogTratamiento = true;
  }

  hideDialog() {
    this.dialogTratamiento = false;
  }

  round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }

  confirmacion(tto: Tratamiento) {
    this.confirmationService.confirm({
      message: 'Quitar este tratamiento de la lista?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.TtoDatTabArray.splice(this.TtoDatTabArray.indexOf(tto), 1);
        this.messageService.add({ severity: 'info', summary: 'Tratamiento quitado de la lista!!', detail: tto.nombre });
        this.usuarioForm.patchValue({ descuento: 0 });
        this.calcularSubtotal();
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'No se ha quitado el producto' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Cancelado!!' });
            break;
        }
      }
    });
  }
  cargarTratamiento() {

  }

  listarTratamientos(event?: LazyLoadEvent): void {
    //this.loadTabFV = true;
    setTimeout(() => {
      this.serviceTto.listUsingGET15().subscribe(
        data => {
          if (data) {
            this.tratamientos = data;
            //this.loadTabFV = false;
            console.log(this.tratamientos);

          } else {
            this.mensajesError('Error al listar los productos');
          }
        },
        err => {
          console.log(err);
          this.mensajesError('Error al listar los productos');
        });
    }, 1000);
  }

  //pasar los datos de una tabla a otra
  tratamientosSeleccionados() {
    if (this.seleccionadoTto != null && this.seleccionadoTto.idTratamiento != null) {
      let tto = this.seleccionadoTto;
      this.TtoDatTabArray.push(tto);
      this.selectTtoMessage(tto);
      this.hideDialog();
      this.calcularSubtotal();
    } else {
      this.mensajesError('Seleccione un tratamiento');
    }
  }

  subTotal: number;
  calcularSubtotal() {
    this.subTotal = 0;
    for (let i = 0; i < this.TtoDatTabArray.length; i++) {
      this.subTotal = +this.subTotal + +this.TtoDatTabArray[i].valorUnitario;
    }
    this.subTotal = this.round(this.subTotal);
    this.usuarioForm.patchValue({ subTotal: this.subTotal });
    this.usuarioForm.patchValue({ total: this.subTotal });
  }

  totalDes: number;
  calcularTotalDesc(event) {
    if (+event.target.value > this.subTotal) {
      this.mensajesError('El descuento no puede ser mayor al subtotal');
      this.usuarioForm.patchValue({ descuento: 0 });
    } else {
      this.totalDes = +this.subTotal - +event.target.value;
      this.totalDes = this.round(this.totalDes);
      this.usuarioForm.patchValue({ total: this.totalDes });
    }
  }
}
