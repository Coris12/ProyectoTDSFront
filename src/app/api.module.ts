import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AntecFamiliaresControllerService } from './api/antecFamiliaresController.service';
import { AntecPersonalesControllerService } from './api/antecPersonalesController.service';
import { AuthControllerService } from './api/authController.service';
import { BasicErrorControllerService } from './api/basicErrorController.service';
import { ClienteControllerService } from './api/clienteController.service';
import { ConsentimientoControllerService } from './api/consentimientoController.service';
import { ConsultaExternaControllerService } from './api/consultaExternaController.service';
import { CuerpoFacturaControllerService } from './api/cuerpoFacturaController.service';
import { DiagnosticoControllerService } from './api/diagnosticoController.service';
import { EmpleadoControllerService } from './api/empleadoController.service';
import { EvolucionControllerService } from './api/evolucionController.service';
import { ExamFisicoRegionalControllerService } from './api/examFisicoRegionalController.service';
import { FacturaControllerService } from './api/facturaController.service';
import { FamiliaresControllerService } from './api/familiaresController.service';
import { FaramaciaControllerService } from './api/faramaciaController.service';
import { FormularioControllerService } from './api/formularioController.service';
import { InformacionTratamientoControllerService } from './api/informacionTratamientoController.service';
import { MedicamentosControllerService } from './api/medicamentosController.service';
import { MedicoConsentimientoControllerService } from './api/medicoConsentimientoController.service';
import { PlanTratamientoControllerService } from './api/planTratamientoController.service';
import { ProductoControllerService } from './api/productoController.service';
import { ProveedorControllerService } from './api/proveedorController.service';
import { ResidenciaControllerService } from './api/residenciaController.service';
import { RevOrganoSistemControllerService } from './api/revOrganoSistemController.service';
import { SigVitAntropometriaControllerService } from './api/sigVitAntropometriaController.service';
import { SucursalControllerService } from './api/sucursalController.service';
import { TarjetaControllerService } from './api/tarjetaController.service';
import { TarjetaEspecialidadControllerService } from './api/tarjetaEspecialidadController.service';
import { TratamientoControllerService } from './api/tratamientoController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AntecFamiliaresControllerService,
    AntecPersonalesControllerService,
    AuthControllerService,
    BasicErrorControllerService,
    ClienteControllerService,
    ConsentimientoControllerService,
    ConsultaExternaControllerService,
    CuerpoFacturaControllerService,
    DiagnosticoControllerService,
    EmpleadoControllerService,
    EvolucionControllerService,
    ExamFisicoRegionalControllerService,
    FacturaControllerService,
    FamiliaresControllerService,
    FaramaciaControllerService,
    FormularioControllerService,
    InformacionTratamientoControllerService,
    MedicamentosControllerService,
    MedicoConsentimientoControllerService,
    PlanTratamientoControllerService,
    ProductoControllerService,
    ProveedorControllerService,
    ResidenciaControllerService,
    RevOrganoSistemControllerService,
    SigVitAntropometriaControllerService,
    SucursalControllerService,
    TarjetaControllerService,
    TarjetaEspecialidadControllerService,
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
