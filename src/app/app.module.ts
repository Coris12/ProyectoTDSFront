import { RegistrarUserComponent } from './modulos/user/componentes/registrar-user/registrar-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './modulos/componentes/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './modulos/componentes/footer/footer.component';
import { HeaderComponent } from './modulos/componentes/header/header.component';


//*servicios primeng
import { ConfirmationService, MessageService } from 'primeng/api';

// * modulos ngprime
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table'; // ? notificaciones
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PickListModule } from 'primeng/picklist';
import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/menubar';
import { SkeletonModule } from 'primeng/skeleton';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import {GMapModule} from 'primeng/gmap';
//filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthControllerService } from './api/authController.service';
import { LoginComponent } from './modulos/user/componentes/login/login.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios/usuarios.component';
import { UbicacionesComponent } from './modulos/componentes/ubicaciones/ubicaciones.component';
import { ClienteControllerService } from './api/clienteController.service';
import { CuerpoFacturaControllerService } from './api/cuerpoFacturaController.service';
import { EmpleadoControllerService } from './api/empleadoController.service';
import { FacturaControllerService } from './api/facturaController.service';
import { FaramaciaControllerService } from './api/faramaciaController.service';
import { ProductoControllerService } from './api/productoController.service';
import { SucursalControllerService } from './api/sucursalController.service';
import { SucursalComponent } from './modulos/sucursal/sucursal.component';
import { interceptorProvider } from './interceptor/prod-interceptor.service';






@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistrarUserComponent,
    UsuariosComponent,
    UbicacionesComponent,
    SucursalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    Ng2SearchPipeModule,
    FileUploadModule,
    // *primeng
    SelectButtonModule,
    CarouselModule,
    GMapModule,
    ButtonModule,
    CardModule,
    ToastModule,
    FormsModule,
    ProgressBarModule,
    CalendarModule,
    TableModule,
    DialogModule,
    TooltipModule,
    InputNumberModule,
    InputTextModule,
    RippleModule,
    ToolbarModule,
    DropdownModule,
    PaginatorModule,
    RadioButtonModule,
    ChartModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    PickListModule,
    AccordionModule,
    MenubarModule,
    SkeletonModule,
    PasswordModule,
    DividerModule
    // ! primeng


  ],
  providers: [
    interceptorProvider,
    MessageService,
    ConfirmationService,
    AuthControllerService,
    ClienteControllerService,
    CuerpoFacturaControllerService,
    EmpleadoControllerService,
    FacturaControllerService,
    FaramaciaControllerService,
    ProductoControllerService,
    SucursalControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
