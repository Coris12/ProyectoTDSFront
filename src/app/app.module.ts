import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer/footer/footer.component';
import { LoginComponent } from './user/componentes/login/login.component';
import { RegistarComponent } from './user/componentes/registar/registar.component';
import { DetalleComponent } from './user/componentes/detalle/detalle.component';
import { ControlComponent } from './user/componentes/control/control.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { HeaderComponent } from './header/header/header.component';
import { RegistrarComponent } from './producto/componentes/registrar/registrar.component';
import { EditarComponent } from './producto/componentes/editar/editar.component';
import { DetallesComponent } from './producto/componentes/detalles/detalles.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistarComponent,
    DetalleComponent,
    ControlComponent,
    RegistrarComponent,
    EditarComponent,
    DetallesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
