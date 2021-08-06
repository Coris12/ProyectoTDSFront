import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { InicioComponent } from './inicio/inicio/inicio.component';


import { LoginComponent } from './user/componentes/login/login.component';
import { RegistrarUserComponent } from './user/componentes/registrar-user/registrar-user.component';
import { ProdGuardService } from './guards/prod-guard.service';

import { DetallesProveedorComponent } from './proveedor/componentes/detalles-proveedor/detalles-proveedor.component';
import { ControlProveedorComponent } from './proveedor/componentes/control-proveedor/control-proveedor.component';
import { EditarProveedorComponent } from './proveedor/componentes/editar-proveedor/editar-proveedor.component';
import { RegistrarProveedorComponent } from './proveedor/componentes/registrar-proveedor/registrar-proveedor.component';
import { RegistrarProductoComponent } from './producto/componentes/registrar-producto/registrar-producto.component';
import { DetallesProductoComponent } from './producto/componentes/detalles-producto/detalles-producto.component';
import { ControlProductoComponent } from './producto/componentes/control-producto/control-producto.component';
import { EditarProductoComponent } from './producto/componentes/editar-producto/editar-producto.component';
import { ControlUserComponent } from './user/componentes/control-user/control-user.component';



const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistrarUserComponent, canActivate: [LoginGuard] },
  { path: 'lista-proveedor', component: ControlProveedorComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'lista', component: ControlProductoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'detalle/:id', component: DetallesProductoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'detallePro/:id', component: DetallesProveedorComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'nuevo-pro', component: RegistrarProductoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
  { path: 'nuevo-provee', component: RegistrarProveedorComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
  { path: 'editar/:id', component: EditarProductoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
  { path: 'editarPro/:id', component: EditarProveedorComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
  { path: 'entregar', component: ControlUserComponent, canActivate: [ProdGuardService], data: { expectedRol: ['tribunal'] } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
