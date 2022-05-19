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
  isPaciente = false;
  isFarmacia = false;
  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
    this.isPaciente = this.tokenService.isPaciente();
    this.isFarmacia = this.tokenService.isFarmacia();
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
      //-! fin opciones para el administrador

      //! opciones para el paciente
      {
        label: 'Testpaciente',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/lista-usuarios'],
        visible: this.isLogged && this.isPaciente
      },

      //! opciones productos
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/lista-productos'],
        visible: this.isLogged && this.isFarmacia
      },

      //! fin opciones para el producto
      {
        label: 'Facturas',
        icon: 'pi pi-fw pi-book',
        items: [
          {label: 'Factura venta', icon: 'pi pi-fw pi-arrow-left', routerLink: ['/lista-facturasVenta']},
          {label: 'Factura compras', icon: 'pi pi-fw pi-arrow-right', routerLink: ['/lista-facturasCompra']}
      ],
        visible: this.isLogged && this.isAdmin
      },

      //! opciones sucursal
      {
        label: 'Sucursal',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/lista-sucursales'],
        visible: this.isLogged && this.isAdmin
      },

      //! fin opciones para el paciente

      //! opciones para el proveedor
      {
        label: 'Gestion de proveedores',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/proveedores'],
        visible: this.isLogged && this.isAdmin
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-fw pi-user-minus',
        visible: this.isLogged,

        command: () => {
          this.onLogOut();
        },
      },


    ];

  }

  onLogOut(): void {
    this.tokenService.logOut();
  }


}
