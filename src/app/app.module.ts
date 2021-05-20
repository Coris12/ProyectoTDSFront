import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer/footer/footer.component';
import { LoginComponent } from './user/componentes/login/login.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { HeaderComponent } from './header/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RegistrarUserComponent } from './user/componentes/registrar-user/registrar-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DetallesProveedorComponent } from './proveedor/componentes/detalles-proveedor/detalles-proveedor.component';
import { ControlProveedorComponent } from './proveedor/componentes/control-proveedor/control-proveedor.component';
import { EditarProveedorComponent } from './proveedor/componentes/editar-proveedor/editar-proveedor.component';
import { RegistrarProveedorComponent } from './proveedor/componentes/registrar-proveedor/registrar-proveedor.component';
import { RegistrarProductoComponent } from './producto/componentes/registrar-producto/registrar-producto.component';
import { DetallesProductoComponent } from './producto/componentes/detalles-producto/detalles-producto.component';
import { ControlProductoComponent } from './producto/componentes/control-producto/control-producto.component';
import { EditarProductoComponent } from './producto/componentes/editar-producto/editar-producto.component';
import { EditarUserComponent } from './user/componentes/editar-user/editar-user.component';
import { ControlUserComponent } from './user/componentes/control-user/control-user.component';
import { DetalleUserComponent } from './user/componentes/detalle-user/detalle-user.component';


//*servicios primeng
import {ConfirmationService, MessageService} from 'primeng/api';

// * modulos ngprime
import { FileUploadModule } from 'primeng/fileupload';
import {CardModule} from 'primeng/card';
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
import {PickListModule} from 'primeng/picklist';
import {AccordionModule} from 'primeng/accordion';
import {MenubarModule} from 'primeng/menubar';
import {SkeletonModule} from 'primeng/skeleton';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
//filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { interceptorProvider } from './producto/service/prod-interceptor.service';






@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistrarUserComponent,
    DetallesProveedorComponent,
    ControlProveedorComponent,
    EditarProveedorComponent,
    RegistrarProveedorComponent,
    RegistrarProductoComponent,
    DetallesProductoComponent,
    ControlProductoComponent,
    EditarProductoComponent,
    EditarUserComponent,
    ControlUserComponent,
    DetalleUserComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    Ng2SearchPipeModule,
    FileUploadModule,
    // *primeng
    SelectButtonModule,
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
  providers: [interceptorProvider, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
