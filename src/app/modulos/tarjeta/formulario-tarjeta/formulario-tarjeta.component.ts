import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
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
import { FamiliaresAllDTO } from 'src/app/model/familiaresAllDTO';


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
    idenUsuarioFamiliar: null,
    tipoFamiliar: null,
    usuario: null,
  }

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: string;
  buscarPerIdent: string;
  buscar: string;
  totalRecords: number;
  loading: boolean;
  familiares: Familiares[]=[];

  errMsj: string;

  display; boleean;

  nuevoUsuario: NuevoUsuario;
  nuevoFamiliares: Familiares;


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

  //datos para el familiar

  usuarioId: string

  idUsuario: any
  parentesco: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private messageService: MessageService,
    private personaService: AuthControllerService
    , private familiarService: FamiliaresControllerService
  ) {

  }
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
          console.log(data.mensaje)
          this.guardarFamiliar();
        } else {
          this.mensajeError("error al crear")
          console.log(data.mensaje)
        }

      },
      err => {
        this.errMsj = err.error.mensaje;
        this.mensajeError("error" + this.usuarioId);
      }
    );

  }
  guardarFamiliar() {
    this.familiarService.savefamiliaresUsingPOST(this.familia).subscribe((res) => {
      this.familia.idenUsuarioFamiliar = this.usuarioId;
      this.familia.tipoFamiliar = this.parentesco;
      this.familia.usuario = this.ObjDatorTarj;
      if (res.object != null) {
        this.idUsuario = res.object;
        console.log(res.object)
        this.MessageSuccess("familiar creado");
        console.log(this.familia);
      } else {
        this.mensajeError("error al crear familiar")

        console.log(this.familia);
      }

    })

  }
  /*cargarFamiliar(id:number) {
    this.familiarService.listfamiliaresUsingGET(id).subscribe(data => {
      this.familiares = data;
      console.log(data)
      this.totalRecords = this.familiares.length;
    },
      err => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: err });
      }
    );
  }*/

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

  buscarPersonaPorIdentificacion() {
    var id: any
    this.personaService.searchDateTarjetaUserUsingGET(this.buscarPerIdent).pipe(takeUntil(this.unsuscribes$)).subscribe((res) => {
      if (res.object != null) {
        this.ObjDatorTarj = res.object;
        this.idUsuario = localStorage.getItem('ObjDatorTarj' + console.log(this.ObjDatorTarj.id));
      } else {
        this.mensajeError("ERROR AL BUSCAR!");
        this.ObjDatorTarj = { canton: null, celular: null, direccion: null, id: null, idRecidencia: null, nacionalidad: null, nombres: null, pais: null, provincia: null, parroquia: null }
      }
    }, error => {
      this.mensajeError("ERROR AL BUSCAR!!");
    });

  }
}
