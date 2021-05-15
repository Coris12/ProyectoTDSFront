import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  nombreUsuario: string;
  isLogged = false;
  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.nombreUsuario = this.tokenService.getUserName();
    this.isLogged = this.tokenService.isLogged();
  }
 
  onLogOut():void{
    this.tokenService.logOut();
  }
}
