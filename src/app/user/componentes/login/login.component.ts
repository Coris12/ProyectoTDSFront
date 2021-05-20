import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { LoginUsuario } from '../../models/login-usuario';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  isLogged = false;
  errMsj: string;
  isLoginFail = false;
  roles: string[] = [];
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.messageService.add({severity:'success', summary: 'User', detail: 'Usewr user', life: 3000});
        this.router.navigate(['/']);
      },
      err => {
        this.errMsj = err.error.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al ingresar, credenciales incorrectas.',
          life: 3000,
        });
      }
    );
  }


}
