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
//filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';


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
    RouterModule,
    Ng2SearchPipeModule,
    FileUploadModule,
    // *primeng
    SelectButtonModule,
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
  providers: [interceptorProvider,MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
