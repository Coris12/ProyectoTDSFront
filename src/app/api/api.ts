export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './basicErrorController.service';
import { BasicErrorControllerService } from './basicErrorController.service';
export * from './productoController.service';
import { ProductoControllerService } from './productoController.service';
export const APIS = [AuthControllerService, BasicErrorControllerService, ProductoControllerService];
