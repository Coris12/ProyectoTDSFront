import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer/footer/footer.component';
import { LoginComponent } from './user/componentes/login/login.component';
import { DetalleComponent } from './user/componentes/detalle/detalle.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { HeaderComponent } from './header/header/header.component';
import { RegistrarComponent } from './producto/componentes/registrar/registrar.component';
import { EditarComponent } from './producto/componentes/editar/editar.component';
import { DetallesComponent } from './producto/componentes/detalles/detalles.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RegistrarUserComponent } from './user/componentes/registrar-user/registrar-user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterLink } from '@angular/router';
import { ControlComponent } from './producto/componentes/control/control.component';
import { interceptorProvider } from './producto/componentes/service/prod-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    DetalleComponent,
    ControlComponent,
    RegistrarComponent,
    EditarComponent,
    DetallesComponent,
    LoginComponent,
    RegistrarUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
