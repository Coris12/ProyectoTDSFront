import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';

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
}
