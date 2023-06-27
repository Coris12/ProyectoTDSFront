import { style } from '@angular/animations';
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
  isDoctor = false;
  isOdontologia=false;
  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
    this.isPaciente = this.tokenService.isPaciente();
    this.isFarmacia = this.tokenService.isFarmacia();
    this.isDoctor = this.tokenService.isDoctor();
    this.isOdontologia=this.tokenService.isOdontologia();
    //items del menu
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
      },
      {
        label: 'Ubicaciones',
        icon: 'pi pi-fw pi-users',
       
        
      },
      //! opciones para el administrador
      {
        label: 'Crear Persona',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/registroP'],
        visible: this.isLogged && this.isAdmin
      },
      {
        label: 'Lista Usuarios',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/lista-usuarios'],
        visible: this.isLogged && this.isAdmin
      },
      {
        label: 'Registro de admision',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/admision'],
        visible: this.isLogged && this.isFarmacia
      },
      {
        label: 'Ficha Anestesia',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/anestesia'],
        visible: this.isLogged && this.isAdmin
      },
      {
        label: 'Formulario',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/formulario'],
        visible: this.isLogged && this.isAdmin
      },

      {
        label: 'Consentimiento',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/consentimiento'],
        visible: this.isLogged && this.isAdmin
      },
      {
        label: 'Medicamentos',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/medicamentos'],
        visible: this.isLogged && this.isAdmin
      },

      {
        label: 'Autorización',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/autorizacion'],
        visible: this.isLogged && this.isAdmin
      },
      {
        label: 'Evolucion y Prescripciones',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/evolucion'],
        visible: this.isLogged && this.isAdmin
      },

      {
        label: 'Consentimiento Medico',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/ConsentimientoMedico'],
        visible: this.isLogged && this.isAdmin
      },

      {
        label: 'Historia Clinica',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/Historia-clinica'],
        visible: this.isLogged && this.isAdmin
      },
      
      
      {
        label: 'Protocolo PosQuirurgico',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/Protocolo'],
        visible: this.isLogged && this.isAdmin
      },
      //-! fin opciones para el administrador

      //! opciones para los empleados
      {
        label: 'Gestion de Empleados',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/lista-empleados'],
        visible: this.isLogged && this.isAdmin
      },
      //-! fin opciones para los empleados

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
          { label: 'Factura venta', icon: 'pi pi-fw pi-arrow-left', routerLink: ['/lista-facturasVenta'] },
          { label: 'Factura compras', icon: 'pi pi-fw pi-arrow-right', routerLink: ['/lista-facturasCompra'] }
        ],
        visible: this.isLogged && this.isFarmacia
      },

      //! opciones sucursal
      {
        label: 'Sucursal',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/lista-sucursales'],
        visible: this.isLogged && this.isAdmin
      },

      //! opciones para el doctor
      {
        label: 'Gestion de counter',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/pacientes'],
        visible: this.isLogged && this.isDoctor
      },

      {
        label: 'CONSULTA EXTERNA',
        icon: 'pi pi-fw pi-file-o',
        routerLink: ['/ConsultaExterna'],
        visible: this.isLogged && this.isDoctor
      },
      //! fin opciones para el doctor

      //! opciones para el paciente
      {
        label: 'Formulario tarjeta',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/formularioTarjeta'],
        visible: this.isLogged && this.isPaciente
      },

      {
        label: 'Lector Qr',
        icon: 'pi pi-fw pi-file-o',
        routerLink: ['/lectorQr'],
        visible: this.isLogged && this.isPaciente
      },
      
      
      {
        label: 'Admiistrar tarjetas',
        icon: 'pi pi-fw pi-file-o',
        routerLink: ['/listaTarjetas'],
        visible: this.isLogged && this.isPaciente
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
        label: 'Gestion de tratamientos',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/tratamientos'],
        visible: this.isLogged && this.isFarmacia
      },

      {
        label: 'Odontologia',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/Odontologia'],
       visible: this.isLogged && this.isOdontologia
       // visible: this.isLogged && this.isAdmin
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
