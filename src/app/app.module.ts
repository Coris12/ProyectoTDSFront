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
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

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
import {InputMaskModule} from 'primeng/inputmask';
import { SidebarModule } from 'primeng/sidebar';
import {CheckboxModule} from 'primeng/checkbox';
import { FieldsetModule, } from 'primeng/fieldset';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {EditorModule} from 'primeng/editor';
import {KeyFilterModule} from 'primeng/keyfilter';

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
import { ProductoComponent } from './modulos/productos/producto/producto.component';
import { ProveedorComponent } from './modulos/proveedor/proveedor.component';
import { ProveedorControllerService } from './api/proveedorController.service';
import { FacturaVentaComponent } from './modulos/Facturas/factura-venta/factura-venta.component';
import { FacturaCompraComponent } from './modulos/Facturas/factura-compra/factura-compra.component';
import { FacturaProductoComponent } from './modulos/Facturas/factura-producto/factura-producto.component';
import { CounterComponent } from './modulos/counter/counter.component';
import { EmpleadoComponent } from './modulos/empleadoss/empleado/empleado.component';
import { TratamientoControllerService } from './api/tratamientoController.service';
import { TratamientoComponent } from './modulos/counter/tratamiento/tratamiento.component';
import { DatosComponent } from './modulos/formulario/datos/datos.component';
import { MedicamentosComponent } from './modulos/AdmMedicamentos/medicamentos/medicamentos.component';
import { EvolucionComponent } from './modulos/EvolucionPre/evolucion/evolucion.component';
import { AutorizacionComponent } from './modulos/AutoExoRe/autorizacion/autorizacion.component';
import { ConsentimientoComponent } from './modulos/Consentimiento/consentimiento/consentimiento.component';
import { AdmisionComponent } from './modulos/RegistroAdm/admision/admision.component';





import { ConsultaExternaAnamnesisComponent } from './modulos/consulta-externa-anamnesis/consulta-externa-anamnesis.component';
import { ConsultaExternaControllerService } from './api/consultaExternaController.service';
import { AntecPersonalesControllerService } from './api/antecPersonalesController.service';
import { AntecFamiliaresControllerService } from './api/antecFamiliaresController.service';
import { RevOrganoSistemControllerService } from './api/revOrganoSistemController.service';
import { SigVitAntropometriaControllerService } from './api/sigVitAntropometriaController.service';
import { ExamFisicoRegionalControllerService } from './api/examFisicoRegionalController.service';
import { DiagnosticoControllerService } from './api/diagnosticoController.service';
import { PlanTratamientoControllerService } from './api/planTratamientoController.service';
import { MessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { LectorComponent } from './modulos/tarjeta/lector/lector.component';
import { ListaTarjetasComponent } from './modulos/tarjeta/lista-tarjetas/lista-tarjetas.component';
import { FormularioTarjetaComponent } from './modulos/tarjeta/formulario-tarjeta/formulario-tarjeta.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FamiliaresControllerService } from './api/familiaresController.service';

import { TarjetaControllerService } from './api/tarjetaController.service';
import { TarjetaEspecialidadControllerService } from './api/tarjetaEspecialidadController.service';
import { ResidenciaControllerService } from './api/residenciaController.service';
import { ConsentimientoControllerService } from './api/consentimientoController.service';
import { InformacionTratamientoControllerService } from './api/informacionTratamientoController.service';
import { MedicamentosControllerService } from './api/medicamentosController.service';
import { EvolucionControllerService } from './api/evolucionController.service';
import { MedicoConsentimientoComponent } from './modulos/Consentimiento/medico-consentimiento/medico-consentimiento.component';
import { ErrorComponent } from './modulos/user/componentes/error/error.component';
import { ProtocoloComponent } from './modulos/RecordOperatorio/protocolo/protocolo.component';
import { MedicoConsentimientoControllerService } from './api/medicoConsentimientoController.service';
import { ProtocoloControllerService } from './api/protocoloController.service';
import { EquiposControllerService } from './api/equiposController.service';
import { TipoQuiControllerService } from './api/tipoQuiController.service';
import { HistoriaComponent } from './modulos/HistoriaClinica/historia/historia.component';
import { HistoriaControllerService } from './api/historiaController.service';
import { PersonaControllerService } from './api/personaController.service';
import { OrganosControllerService } from './api/organosController.service';
import { AutorizacionControllerService } from './api/autorizacionController.service';
import { FormularioControllerService } from './api/formularioController.service';
import { OdontologiaComponent } from './modulos/Odontologia/odontologia/odontologia.component';
import { OdontologiaControllerService } from './api/odontologiaController.service';
import { IndiceControlllerService } from './api/indiceControlller.service';
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
    ProductoComponent,
    ProveedorComponent,
    FacturaVentaComponent,
    FacturaCompraComponent,
    FacturaProductoComponent,
    CounterComponent,
    EmpleadoComponent,
    TratamientoComponent,
    DatosComponent,
    MedicamentosComponent,
    MedicoConsentimientoComponent,
    EvolucionComponent,
    AutorizacionComponent,
    ConsentimientoComponent,
    AdmisionComponent,
    ConsultaExternaAnamnesisComponent,
    LectorComponent,
    ListaTarjetasComponent,
    FormularioTarjetaComponent,
    MedicoConsentimientoComponent,
    ErrorComponent,
    ProtocoloComponent,
    HistoriaComponent,
    OdontologiaComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxScannerQrcodeModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    Ng2SearchPipeModule,
    FileUploadModule,
    // *primeng
    InputMaskModule,
    ScrollPanelModule,
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
    DividerModule,
    SidebarModule,
    CheckboxModule,
    FieldsetModule,
    AutoCompleteModule,
    EditorModule,
    MessagesModule,
    MessageModule,
    KeyFilterModule,
    NgxQRCodeModule
    // ! primeng


  ],
  providers: [
    interceptorProvider,
    MessageService,
    ConfirmationService,
    AuthControllerService,
    AutorizacionControllerService,
    ClienteControllerService,
    CuerpoFacturaControllerService,
    EmpleadoControllerService,
    FacturaControllerService,
    FaramaciaControllerService,
    ProductoControllerService,
    SucursalControllerService,
    ProveedorControllerService,
    TratamientoControllerService,
    ConsultaExternaControllerService,
    AntecPersonalesControllerService,
    AntecFamiliaresControllerService,
    RevOrganoSistemControllerService,
    SigVitAntropometriaControllerService,
    ExamFisicoRegionalControllerService,
    DiagnosticoControllerService,
    PlanTratamientoControllerService,
    MedicamentosControllerService,
    MedicoConsentimientoControllerService,
    TarjetaControllerService,
    FamiliaresControllerService,
    TarjetaEspecialidadControllerService,
    ResidenciaControllerService,
    ConsentimientoControllerService,
    HistoriaControllerService,
    EvolucionControllerService,
    InformacionTratamientoControllerService,
    ProtocoloControllerService,
    EquiposControllerService,
    TipoQuiControllerService,
    PersonaControllerService,
    OrganosControllerService,
    FormularioControllerService,
    OrganosControllerService,
    OdontologiaControllerService,
    IndiceControlllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
