import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AccidenteControllerService } from './api/accidenteController.service';
import { AdmisionControllerService } from './api/admisionController.service';
import { AntecFamiliaresControllerService } from './api/antecFamiliaresController.service';
import { AntecPersonalesControllerService } from './api/antecPersonalesController.service';
import { AuthControllerService } from './api/authController.service';
import { AutorizacionControllerService } from './api/autorizacionController.service';
import { BasicErrorControllerService } from './api/basicErrorController.service';
import { ClienteControllerService } from './api/clienteController.service';
import { ConsentimientoControllerService } from './api/consentimientoController.service';
import { ConsultaExternaControllerService } from './api/consultaExternaController.service';
import { CuerpoFacturaControllerService } from './api/cuerpoFacturaController.service';
import { DiagnosticoControllerService } from './api/diagnosticoController.service';
import { DiagnosticoOControllerService } from './api/diagnosticoOController.service';
import { DiagnsticoAiControllerService } from './api/diagnsticoAiController.service';
import { EmpleadoControllerService } from './api/empleadoController.service';
import { EnfermadAnteControllerService } from './api/enfermadAnteController.service';
import { EquiposControllerService } from './api/equiposController.service';
import { EvolucionControllerService } from './api/evolucionController.service';
import { ExamFisicoRegionalControllerService } from './api/examFisicoRegionalController.service';
import { ExamenEstoControllerService } from './api/examenEstoController.service';
import { FacturaControllerService } from './api/facturaController.service';
import { FamiliaresControllerService } from './api/familiaresController.service';
import { FaramaciaControllerService } from './api/faramaciaController.service';
import { FormularioControllerService } from './api/formularioController.service';
import { HistoriaControllerService } from './api/historiaController.service';
import { IndiceControlllerService } from './api/indiceControlller.service';
import { IndicesFamilControllerService } from './api/indicesFamilController.service';
import { InformacionTratamientoControllerService } from './api/informacionTratamientoController.service';
import { IngresoDiaControllerService } from './api/ingresoDiaController.service';
import { LlegadaAdServiceService } from './api/llegadaAdService.service';
import { MedicamentosControllerService } from './api/medicamentosController.service';
import { MedicoConsentimientoControllerService } from './api/medicoConsentimientoController.service';
import { OdontologiaControllerService } from './api/odontologiaController.service';
import { OrganosControllerService } from './api/organosController.service';
import { PlanTratamientoControllerService } from './api/planTratamientoController.service';
import { PlanesControllerService } from './api/planesController.service';
import { ProductoControllerService } from './api/productoController.service';
import { ProtocoloControllerService } from './api/protocoloController.service';
import { ProveedorControllerService } from './api/proveedorController.service';
import { ResidenciaControllerService } from './api/residenciaController.service';
import { RevOrganoSistemControllerService } from './api/revOrganoSistemController.service';
import { SaludControllerService } from './api/saludController.service';
import { SigVitAntropometriaControllerService } from './api/sigVitAntropometriaController.service';
import { SignosEControllerService } from './api/signosEController.service';
import { SolicitudEControllerService } from './api/solicitudEController.service';
import { SucursalControllerService } from './api/sucursalController.service';
import { TarjetaControllerService } from './api/tarjetaController.service';
import { TarjetaEspecialidadControllerService } from './api/tarjetaEspecialidadController.service';
import { TipoQuiControllerService } from './api/tipoQuiController.service';
import { TrataMControllerService } from './api/trataMController.service';
import { TratamientoControllerService } from './api/tratamientoController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AccidenteControllerService,
    AdmisionControllerService,
    AntecFamiliaresControllerService,
    AntecPersonalesControllerService,
    AuthControllerService,
    AutorizacionControllerService,
    BasicErrorControllerService,
    ClienteControllerService,
    ConsentimientoControllerService,
    ConsultaExternaControllerService,
    CuerpoFacturaControllerService,
    DiagnosticoControllerService,
    DiagnosticoOControllerService,
    DiagnsticoAiControllerService,
    EmpleadoControllerService,
    EnfermadAnteControllerService,
    EquiposControllerService,
    EvolucionControllerService,
    ExamFisicoRegionalControllerService,
    ExamenEstoControllerService,
    FacturaControllerService,
    FamiliaresControllerService,
    FaramaciaControllerService,
    FormularioControllerService,
    HistoriaControllerService,
    IndiceControlllerService,
    IndicesFamilControllerService,
    InformacionTratamientoControllerService,
    IngresoDiaControllerService,
    LlegadaAdServiceService,
    MedicamentosControllerService,
    MedicoConsentimientoControllerService,
    OdontologiaControllerService,
    OrganosControllerService,
    PlanTratamientoControllerService,
    PlanesControllerService,
    ProductoControllerService,
    ProtocoloControllerService,
    ProveedorControllerService,
    ResidenciaControllerService,
    RevOrganoSistemControllerService,
    SaludControllerService,
    SigVitAntropometriaControllerService,
    SignosEControllerService,
    SolicitudEControllerService,
    SucursalControllerService,
    TarjetaControllerService,
    TarjetaEspecialidadControllerService,
    TipoQuiControllerService,
    TrataMControllerService,
    TratamientoControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
