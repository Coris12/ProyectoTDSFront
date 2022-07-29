import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AuthControllerService } from 'src/app/api/authController.service';
import { TokenService } from 'src/app/service/token.service';
import { NuevoUsuario } from '../../user/models/nuevo-usuario';
import { AuthService } from '../../user/service/auth.service';
import { takeUntil } from 'rxjs/operators';
import { DatosTarjetaDto } from 'src/app/model/datosTarjetaDto';
import { FamiliaresControllerService } from 'src/app/api/familiaresController.service';
import { Usuario } from 'src/app/model/usuario';
import { Familiares } from 'src/app/model/familiares';
import { ListaFamiliaresDTO } from 'src/app/model/listaFamiliaresDTO';

@Component({
  selector: 'app-formulario-tarjeta',
  templateUrl: './formulario-tarjeta.component.html',
  styleUrls: ['./formulario-tarjeta.component.css']
})
export class FormularioTarjetaComponent implements OnInit, OnDestroy {

  private unsuscribes$ = new Subject<void>();
  ObjDatorTarj: DatosTarjetaDto = {
    canton: null,
    celular: null,
    direccion: null,
    id: null,
    idRecidencia: null,
    nacionalidad: null,
    nombres: null,
    pais: null,
    parroquia: null,
    provincia: null,
  }
  familia: Familiares = {
    tipoFamiliar: null,
    usuario: null,
    idenUsuarioFamiliar: null,
  }

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: string;
  buscarPerIdent: string;
  buscar: string;
  totalRecords: number;
  loading: boolean;
  familiares: any;

  errMsj: string;

  display; boleean;

  nuevoUsuario: NuevoUsuario;
  //! datos para el usuario
  celular: string;
  ciudad: string;
  direccion: string;
  email: string;
  estado: number;
  identificacion: string;
  nombreUsuario: string;
  nombres: string;
  password: string;
  profesion: string;
  sexo: string;


  idUsuario: string;
  parentesco: string;
  usuarioId: string;

  //listar familiares de un usuario
  listFamily: ListaFamiliaresDTO[];
  editDialog: boolean;
  submitted: boolean;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private messageService: MessageService,
    private personaService: AuthControllerService,
    private familiarService: FamiliaresControllerService,
    private confirmationService: ConfirmationService,
    private authControllerService: AuthControllerService,
  ) { }

  ngOnDestroy(): void {
    this.unsuscribes$.next();
    this.unsuscribes$.complete();
  }

  ngOnInit(): void {
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(
      this.identificacion,
      this.nombres,
      this.direccion,
      this.celular,
      this.sexo,
      this.email,
      this.ciudad,
      this.nombreUsuario,
      this.password,
    );
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        if (data.mensaje != null) {
          this.usuarioId = data.mensaje
          this.MessageSuccess("cuenta creada");
          this.guardarFamiliar();
        } else {
          this.mensajeError("error al crear")
          console.log(data.mensaje)
        }
      },
      err => {
        this.errMsj = err.error.mensaje;
      }
    );
  }

  guardarFamiliar() {
    this.familiarService.savefamiliaresUsingPOST(this.familia).subscribe((res) => {
      this.familia.idenUsuarioFamiliar = +this.usuarioId;
      this.familia.tipoFamiliar = this.parentesco;
      this.familia.usuario = this.ObjDatorTarj;
      if (res.object != null) {
        this.idUsuario = res.object;
        console.log(res.object)
        this.MessageSuccess("familiar creado");
        console.log(this.familia);
      } else {
        this.mensajeError("error al crear familiar")
      }

    })

  }
  mensajeError(msg: String) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error: ' + msg,
    });
  }

  MessageSuccess(msg: String) {
    this.messageService.add({
      severity: 'success',
      summary: 'Resultado',
      detail: 'Correcto!: ' + msg,
    });
  }

  idPerPrin: number = 0;
  buscarPersonaPorIdentificacion() {
    this.personaService.searchDateTarjetaUserUsingGET(this.buscarPerIdent).pipe(takeUntil(this.unsuscribes$)).subscribe((res) => {
      if (res.object != null) {
        this.ObjDatorTarj = res.object;
        this.cargarFamiliar(res.object.id);
        this.idPerPrin = res.object.id;
      } else {
        this.listFamily = [];
        this.mensajeError("ERROR AL BUSCAR PERSONA");
        this.ObjDatorTarj = { canton: null, celular: null, direccion: null, id: null, idRecidencia: null, nacionalidad: null, nombres: null, pais: null, provincia: null, parroquia: null }
        this.buscarUsuarioByIdentificacion(this.buscarPerIdent);
      }
    }, error => {
      this.mensajeError("ERROR AL BUSCAR!!");
    });
  }

  hideDialog() {
    this.editDialog = false;
    this.submitted = false;
  }

  showDialogEdit() {
    //this.editDialog = true;
  }

  confirmacion(listFml: ListaFamiliaresDTO) {
    this.confirmationService.confirm({
      message: 'Eliminar este Familiar de la lista?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.eliminarFamiliar(listFml.idFamiliares);
        //this.listFamily.splice(this.listFamily.indexOf(listFml), 1);
        //this.messageService.add({ severity: 'info', summary: 'Familiar quitado de la lista!!', detail: listFml.nombres });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'No se ha eliminado el familiar' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Cancelado!!' });
            break;
        }
      }
    });
  }

  cargarFamiliar(id: any) {
    this.familiarService.listfamiliaresusuarioUsingGET(id).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object != null) {
        this.listFamily = data.object;
      } else {
        this.listFamily = [];
        this.MessageSuccess("No tiene familiares");
      }
    })
  }

  eliminarFamiliar(fId) {
    this.familiarService.deletefamiliaresUsingPUT(fId).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object == "FAMILIAR ELIMINADO") {
        this.MessageSuccess("FAMILIAR ELIMINADO");
        this.cargarFamiliar(this.idPerPrin);
      } else {
        this.MessageSuccess("ERROR AL ELIMINAR FAMILIAR");
      }
    })
  }

  editarFamiliar(event, listFml: ListaFamiliaresDTO) {
    console.log(listFml);
    this.familiarService.updatefamiliaresUsingPUT(listFml).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data) {
        this.MessageSuccess("FAMILIAR EDITADO");
        this.cargarFamiliar(this.idPerPrin);
      } else {
        this.MessageSuccess("ERROR AL EDITAR FAMILIAR");
      }
    })
  }

  buscarUsuarioByIdentificacion(identificacion: string) {
    this.authControllerService.getPersonaByIdentificacionUsingGET(identificacion).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object != null) {
        this.ObjDatorTarj = data.object;
        this.mensajeError("NO SE OBTUVIERON TODOS LOS DATOS, DEBIDO A QUE NO FUERON LLENADOS!");
      } else {
        this.listFamily = [];
        this.mensajeError("NO SE ENCONTRÓ  EL USUARIO CON ESTA IDENTIFICACIÓN");
        this.ObjDatorTarj = { canton: null, celular: null, direccion: null, id: null, idRecidencia: null, nacionalidad: null, nombres: null, pais: null, provincia: null, parroquia: null }
      }
    })
  }

}
