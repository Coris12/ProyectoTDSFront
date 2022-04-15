import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // variables menu
  items: MenuItem[];

  isLogged = false;
  isAdmin = false;
  isTribunal = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
    this.isTribunal = this.tokenService.isTribunal();

    //items del menu
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
      },
      //! opciones para el administrador
      {
        label: 'Lista Usuarios',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/lista-usuarios'],
        visible: this.isLogged && this.isAdmin
      },
      //! fin opciones para el administrador 
      
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-fw pi-user-minus',
        visible: this.isLogged,
        
        command: () => {
          this.onLogOut();
        },
      }
    ];

  }

onLogOut(): void {
  this.tokenService.logOut();
}


}
