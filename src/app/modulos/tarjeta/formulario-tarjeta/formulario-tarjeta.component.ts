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

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: string;
  buscarPerIdent: string;

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
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private messageService: MessageService,
    private personaService: AuthControllerService
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
        this.messageService.add({
          severity: 'Cuenta creada',
          summary: 'La se ha creado con exito:',
          detail: data.message,
          life: 3000,
        });
        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.messageService.add({
          severity: 'error',
          summary: 'La cuenta no ha podido ser creada:',
          detail: this.errMsj,
          life: 3000,
        });
      }
    );
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


  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  buscarPersonaPorIdentificacion() {
    this.personaService.searchDateTarjetaUserUsingGET(this.buscarPerIdent).pipe(takeUntil(this.unsuscribes$)).subscribe((res) => {
      if (res.object != null) {
        this.ObjDatorTarj = res.object;
      } else {
        this.mensajeError("ERROR AL BUSCAR!");
        this.ObjDatorTarj = { canton: null, celular: null, direccion: null, id: null, idRecidencia: null, nacionalidad: null, nombres: null, pais: null, provincia: null, parroquia: null }
      }
    }, error => {
      this.mensajeError("ERROR AL BUSCAR!!");
    });
  }



}
