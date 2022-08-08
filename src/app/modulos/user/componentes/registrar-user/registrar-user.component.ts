import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { ResidenciaControllerService } from 'src/app/api/residenciaController.service';
import { DatosTarjetaDto } from 'src/app/model/datosTarjetaDto';
import { ResidenciaDto } from 'src/app/model/residenciaDto';

import { TokenService } from 'src/app/service/token.service';
import { NuevoUsuario } from '../../models/nuevo-usuario';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-registrar-user',
  templateUrl: './registrar-user.component.html',
  styleUrls: ['./registrar-user.component.css']
})
export class RegistrarUserComponent implements OnInit {

  nuevoUsuario: NuevoUsuario;


  Reside: ResidenciaDto = {
    barrio: null,
    canton: null,
    idRecidencia: null,
    idUsuario: null,
    nacionalidad: null,
    pais: null,
    parroquia: null,
    provincia: null,
    zona: null,
  }



  usuarioId: number;
  provincia: string;
  idUs: string;

  //datos de persona
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

  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private messageService: MessageService,
    private residenciaService: ResidenciaControllerService,
  ) { }

  ngOnInit() {
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
        this.guardarRecidencia();
       console.log(this.usuarioId);
       
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
  guardarRecidencia() {
    this.Reside.idUsuario = this.usuarioId
    //this.ObjDatorTarj.provincia = this.provincia
    this.residenciaService.guardarResidenciaUsingPOST(this.Reside).subscribe(
      res => {
        if (res.object != null) {
          this.idUs = res.object;
          console.log(this.idUs)
          this.MessageSuccess("guardado");
          console.log(this.Reside);
        } else {
          this.mensajeError("error al guardar")
          console.log("error" + this.errMsj)
          console.log(res.object);
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

}
