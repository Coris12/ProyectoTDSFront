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
  identificacion?: string;
  nombres?: string;
  direccion?: string;
  celular?: string;
  sexo?:string;
  email?:string;
  ciudad?:string;
  nombreUsuario?: string;
  password?: string;

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
      this.nombres ,
      this.direccion, 
      this.celular, 
      this.sexo ,
      this.ciudad,
      this.nombreUsuario,
      this.email ,
      this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
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
  }}
