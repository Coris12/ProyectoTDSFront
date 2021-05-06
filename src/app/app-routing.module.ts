import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { InicioComponent } from './inicio/inicio/inicio.component';


import { LoginComponent } from './user/componentes/login/login.component';
import { RegistrarUserComponent } from './user/componentes/registrar-user/registrar-user.component';
import { ProdGuardService } from './guards/prod-guard.service';
import { ControlComponent } from './producto/componentes/control/control.component';
import { DetallesComponent } from './producto/componentes/detalles/detalles.component';
import { RegistrarComponent } from './producto/componentes/registrar/registrar.component';
import { EditarComponent } from './producto/componentes/editar/editar.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistrarUserComponent, canActivate: [LoginGuard] },
  { path: 'lista', component: ControlComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'detalle/:id', component: DetallesComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'nuevo', component: RegistrarComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
  { path: 'editar/:id', component: EditarComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
