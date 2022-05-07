import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthControllerService } from 'src/app/api/authController.service';
import { ClienteControllerService } from 'src/app/api/clienteController.service';
import { CuerpoFacturaControllerService } from 'src/app/api/cuerpoFacturaController.service';
import { FacturaControllerService } from 'src/app/api/facturaController.service';
import { ProductoControllerService } from 'src/app/api/productoController.service';
import { Cliente } from 'src/app/model/cliente';
import { CuerpoFactura } from 'src/app/model/cuerpoFactura';
import { Factura } from 'src/app/model/factura';
import { Producto } from 'src/app/model/producto';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-factura-venta',
  templateUrl: './factura-venta.component.html',
  styleUrls: ['./factura-venta.component.css']
})
export class FacturaVentaComponent implements OnInit {

  loadTabFV: boolean;
  disabled: boolean = true;
  productDialog: boolean;
  product: any;
  submitted: boolean;
  statuses: any[];
  cbiarPrecio;
  showMostrar: boolean = false;
  identificacionPer: any;
  putFechVist = new Date();

  TipoProdFP: any[];
  TipoForPag: any[];

  facturaObj: Factura = {
    cliente: {},
    cuerpoFactura: null,
    fecha: null,
    idFactura: null,
    tipoFactura: null,
  }

  clienteObj: Cliente = {
    estado: null,
    idCliente: null,
    observaciones: null,
    usuario: null,
  }

  detalleFactObj: CuerpoFactura = {
    cantidad: null,
    descuento: null,
    idCuerpo: null,
    iva: null,
    producto: null,
    subtotal: null,
    total: null
  }

  usuarioObj: Usuario = {
    celular: null,
    ciudad: null,
    direccion: null,
    email: null,
    estado: null,
    id: null,
    identificacion: null,
    nombreUsuario: null,
    nombres: null,
    password: null,
    profesion: null,
    roles: null,
    sexo: null
  };

  category: Producto = {
  };

  producto: Producto = {
    categoriaProducto: null,
    codBarra: null,
    codigoRef: null,
    descripcionProducto: null,
    estadoProducto: null,
    fechaExp: null,
    idProducto: null,
    inventarioProducto: null,
    nombreProducto: null,
    precioProducto: null,
    proveedor: null,
    regSanitario: null,
    stock: null,
    ultimoCosto: null
  };

  listProduct: Producto[];
  productos: Producto[];
  productosFact: Producto[] = [];
  prodFact: Producto[] = [];

  productosFactura: Producto = {
    categoriaProducto: null,
    codBarra: null,
    codigoRef: null,
    descripcionProducto: null,
    estadoProducto: null,
    fechaExp: null,
    idProducto: null,
    inventarioProducto: null,
    nombreProducto: null,
    precioProducto: null,
    proveedor: null,
    regSanitario: null,
    stock: null,
    ultimoCosto: null
  };

  selectedProductTP: Producto = {
    categoriaProducto: null,
    codBarra: null,
    codigoRef: null,
    descripcionProducto: null,
    estadoProducto: null,
    fechaExp: null,
    idProducto: null,
    inventarioProducto: null,
    nombreProducto: null,
    precioProducto: null,
    proveedor: null,
    regSanitario: null,
    stock: null,
    ultimoCosto: null
  }

  value4: any;
  value6: any;

  display = true;
  visibleSidebar2;

  products: Producto[];

  clear(table: Table) {
    table.clear();
  }
  selectedProduct: Producto;
  checked: boolean = false;
  selectedCity: any;
  value9: any;

  opSB: any = null;
  opPD: any = null;
  opPCF: any = null;

  // products: Producto[];
  customers: Producto[];
  constructor(private router: Router, private messageService: MessageService, private primeNGConfig: PrimeNGConfig,
    private serviceProduct: ProductoControllerService, private serviceCliente: ClienteControllerService,
    private servicePersona: AuthControllerService, private serviceDetallFact: CuerpoFacturaControllerService,
    private serviceFact: FacturaControllerService) { }

  ngOnInit(): void {
    this.TipoProdFP = [
      { name: 'VENTAS', code: 'VT' },
      { name: 'COMPRAS', code: 'CP' },
      { name: 'TODOS', code: 'TD' }
    ];

    this.TipoForPag = [
      { name: 'EFECTIVO', code: 'EF' },
      { name: 'VARIOS FP', code: 'TC' },];

  }

  ivaSinIva(): string {
    var texto: string;
    var valorFinal: number;
    if (this.checked) {
      this.valorFinalIVA();
      return texto = 'Con IVA';
    } else {
      this.valorFinalIVA();
      return texto = 'Sin IVA';
    }
  }

  valorFinalIva: any;
  valorFinalIVA() {
    this.valorFinalIva = 0;
    if (this.checked) {
      this.valorFinalIva = this.calcularIva();
    } else {
      this.valorFinalIva = this.producto.precioProducto;
    }
  }

  precioIva: any;
  calcularIva() {
    this.precioIva = 0;
    this.precioIva = this.producto.precioProducto * 1.12;
    return this.precioIva;
  }

  valSubBaj: any;
  valorSubBajar(sb: number) {
    if (sb == 1) {
      if (this.valorDolPorc == 1) {
        this.valSubBaj = this.subirPrecios(sb);
      } else {
        this.valSubBaj = this.subirPrecios(0) + this.producto.precioProducto;
      }
    } else {
      if (this.valorDolPorc == 1) {
        this.valSubBaj = this.BajarPrecios(1);
      } else {
        this.valSubBaj = this.producto.precioProducto - this.BajarPrecios(0);
      }
    }
    return this.valSubBaj;
  }



  subirPrecios(dp: number) {
    var dolPor: number;
    if (dp == 1) {
      dolPor = dolPor = this.producto.precioProducto + this.cbiarPrecio;
    } else {
      dolPor = dolPor = (this.producto.precioProducto * this.cbiarPrecio) / 100;
    }
    return dolPor;
  }

  valorDolPorc: any;
  porcentajeDol(val: number) {

    if (val == 1) {
      return this.valorDolPorc = val;
    } else {
      return this.valorDolPorc = val;
    }
  }

  BajarPrecios(dp: number) {
    var dolPor: number;
    if (dp == 1) {
      dolPor = dolPor = this.producto.precioProducto - this.cbiarPrecio;
    } else {
      dolPor = dolPor = (this.producto.precioProducto * this.cbiarPrecio) / 100;
    }
    return dolPor;
  }

  preCtUlt: number;
  preCosUlt(pcu: number) {
    if (pcu == 1) {
      this.preCtUlt = this.valSubBaj + this.valorFinalIva;
    } else {
      this.preCtUlt = this.valSubBaj + this.valorFinalIva;
    }
    return this.preCtUlt;
  }


  onRowSelect(event) {
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
  }

  onRowSelectFProduct(event) {
    this.producto = this.selectedProductTP;
    this.calcularIva();
  }

  selectProduct(product: Producto) {
    this.messageService.add({ severity: 'info', summary: 'Producto Seleccionado', detail: product.nombreProducto });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  showCampos() {
    this.showMostrar = true;
  }

  saveProduct() {
    this.productDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  irProductosList() {
    this.router.navigate(['/Product-List']);
  }

  mensajesError(msg: String) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error: ' + msg,
    });
  }

  mensajeSatisfactorio(msg: String) {
    console.log(msg);
    this.messageService.add({
      severity: 'success',
      summary: 'Resultado',
      detail: 'Correcto!: ' + msg,
    });
  }

  listarProductos2(event?: LazyLoadEvent): void {
    this.loadTabFV = true;
    setTimeout(() => {
      this.serviceProduct.listUsingGET1().subscribe(
        data => {
          if (data) {
            this.productos = data;
            this.loadTabFV = false;
          } else {
            this.mensajesError('Error al listar los productos');
          }
        },
        err => {
          console.log(err);
          this.mensajesError('Error al listar los productos');
        });
    }, 1000);
  }


  //pasa los datos de una tabla a otra
  cargarProductosFacturacion() {
    if (this.selectedProductTP != null && this.selectedProductTP.idProducto != null) {
      let prod = this.selectedProductTP;
      this.productosFact.push(prod);
      this.selectProduct(prod);//Muestra el mensaje de confirmación
      this.hideDialog(); //cierra el dialogo
    } else {
      this.mensajesError('Seleccione un producto');
    }
  }

  dateTable = {
    descripcionProducto: null,
    idProducto: null,
    nombreProducto: null,
    precioProducto: null,
    descuento: null,
    total: null,
    cantidadProd: null
  }

  AsignarValores() {
    this.dateTable.descripcionProducto = this.selectedProductTP.descripcionProducto;
    this.dateTable.precioProducto = this.selectedProductTP.precioProducto;
    this.dateTable.cantidadProd = this.dateTable.cantidadProd;
    console.log(this.dateTable);
  }

  buscarPersonaIdentificacion() {
    console.log(this.identificacionPer);
    this.servicePersona.getPersonaByIdentificacionUsingGET(this.identificacionPer).subscribe(data => {
      if (data.object == null) {
        this.mensajesError('No existe el cliente');
      } else {
        this.usuarioObj = data.object;
        this.buscarClienteById(this.usuarioObj.id);
        console.log('idb'+this.usuarioObj.id);

        this.showCampos();
      }
    },err => {
        console.log(err);
        this.mensajesError('Error al Buscar');
      });
  }

  idcli;
  buscarClienteById(idCliente) {
    console.log(idCliente);
    this.serviceCliente.buscarPorIdClienteUsingGET(idCliente).subscribe(data => {
      if (data.object != null) {
        this.clienteObj = data.object;
        console.log(this.clienteObj);
      } else {
        console.log("No existe el cliente");
      }
    }),err => {
      console.log(err);
      this.mensajesError('Error al Buscar');
    };
  }

  guardarFactura() {
    console.log('idcliente'+this.clienteObj.idCliente);
    console.log("idPruegba"+this.clienteObj.idCliente);

    this.facturaObj.fecha = new Date();
    this.facturaObj.cliente =  this.clienteObj
    this.facturaObj.cliente.idCliente =  this.clienteObj.idCliente
    this.serviceFact.saveFacturaUsingPOST(this.facturaObj).subscribe(data => {
      console.log(this.facturaObj);
      console.log("idPruegba2"+this.clienteObj.idCliente);
      if (data.object != null) {
        this.mensajeSatisfactorio('Factura guardada correctamente');
      } else {
        this.mensajesError('Error al guardar la factura');
      }
    }), (err) => {
      console.log(err);
      this.mensajesError('Error al guardar la factura');
    }
  }

  generarDetalleFactura() {
    let calPrecio: number;
    for (let index = 0; index < this.productosFact.length; index++) {
      this.detalleFactObj.cantidad = 1;//falta
      this.detalleFactObj.descuento = 0;//falta
      this.detalleFactObj.iva = 1.2; //falta
      this.detalleFactObj.producto = this.productosFact[index];
      // this.detalleFactObj.factura.idFactura = 1;
      const element = this.productosFact[index];
      calPrecio = element.precioProducto + calPrecio;
      console.log(calPrecio);
      console.log(this.detalleFactObj);

      this.serviceDetallFact.guardarCuerpoFacturaUsingPOST(this.detalleFactObj).subscribe(data => {
        if (data.object != null) {
          this.mensajeSatisfactorio('Detalle factura guardado correctamente');
        } else {
          this.mensajesError('Error al guardar el detalle factura');
        }
      });
    }
    this.detalleFactObj.subtotal = calPrecio;
  }



  //pasar datos de una tabla a otra tabla
  limpiarcampos() {
    this.producto = { categoriaProducto: null, codBarra: null, codigoRef: null, descripcionProducto: null, estadoProducto: null, fechaExp: null, idProducto: null, inventarioProducto: null, nombreProducto: null, precioProducto: null, proveedor: null, regSanitario: null, stock: null, };
    this.selectedProductTP = { categoriaProducto: null, codBarra: null, codigoRef: null, descripcionProducto: null, estadoProducto: null, fechaExp: null, idProducto: null, inventarioProducto: null, nombreProducto: null, precioProducto: null, proveedor: null, regSanitario: null, stock: null };
    this.products = null;
    this.opSB = null;
    this.opPD = null;
    this.opPCF = null;
    this.valorFinalIva = null;
    this.precioIva = null;
    this.valSubBaj = null;
    this.valorDolPorc = null;
    this.preCtUlt = null;
  }
}
