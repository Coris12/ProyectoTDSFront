import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AuthControllerService } from './api/authController.service';
import { BasicErrorControllerService } from './api/basicErrorController.service';
import { ClienteControllerService } from './api/clienteController.service';
import { CuerpoFacturaControllerService } from './api/cuerpoFacturaController.service';
import { EmpleadoControllerService } from './api/empleadoController.service';
import { FacturaControllerService } from './api/facturaController.service';
import { ProductoControllerService } from './api/productoController.service';
import { ProveedorControllerService } from './api/proveedorController.service';
import { SucursalControllerService } from './api/sucursalController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AuthControllerService,
    BasicErrorControllerService,
    ClienteControllerService,
    CuerpoFacturaControllerService,
    EmpleadoControllerService,
    FacturaControllerService,
    ProductoControllerService,
    ProveedorControllerService,
    SucursalControllerService ]
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