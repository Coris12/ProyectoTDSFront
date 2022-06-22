import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, ConfirmationService, ConfirmEventType, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthControllerService } from 'src/app/api/authController.service';
import { ClienteControllerService } from 'src/app/api/clienteController.service';
import { CuerpoFacturaControllerService } from 'src/app/api/cuerpoFacturaController.service';
import { FacturaControllerService } from 'src/app/api/facturaController.service';
import { ProductoControllerService } from 'src/app/api/productoController.service';
import { Cliente } from 'src/app/model/cliente';
import { CuerpoFactura } from 'src/app/model/cuerpoFactura';
import { Factura } from 'src/app/model/factura';
import { NuevoUsuario } from 'src/app/model/nuevoUsuario';
import { Producto } from 'src/app/model/producto';
import { ProductosDto } from 'src/app/model/productosDto';
import { Usuario } from 'src/app/model/usuario';
import { FacturaService } from 'src/app/servicioManual/factura.service';

@Component({
  selector: 'app-factura-venta',
  templateUrl: './factura-venta.component.html',
  styleUrls: ['./factura-venta.component.css']
})
export class FacturaVentaComponent implements OnInit {

  @ViewChild('nombreCliente') inputName;
  @ViewChild('ingCedula') inputIngCed;

  disabled: boolean = true;
  productDialog: boolean;
  product: any;
  submitted: boolean;
  statuses: any[];
  cbiarPrecio;
  showMostrar: boolean = false;
  identificacionPer: any;
  putFechVist = new Date();
  loadTabFV: boolean = true;

  TipoProdFP: any[];
  TipoForPag: any[];

  factura: Factura;
  FacturaArr: Factura[];
  facturaObj: Factura = {
    cliente: null,
    fecha: new Date(),
    idFactura: null,
    tipoFactura: null,
  }

  clienteArr: Cliente[];
  clienteObj: Cliente = {
    estado: null,
    idCliente: null,
    observaciones: null,
    usuario: null,
  }

  detalleFactObj: CuerpoFactura = {
    cantidad: null,
    descuento: null,
    factura: {} as Factura,
    idCuerpo: null,
    iva: null,
    producto: null,
    subtotal: null,
    total: null,
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

  usuarioObjConsumidorFinal: Usuario = {
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

  usuarioObjNew: NuevoUsuario = {
    celular: "9999999999",
    ciudad: "CONSUMIDOR FINAL",
    direccion: "CONSUMIDOR FINAL",
    email: null,
    estado: 1,
    identificacion: "XXXXXXXXX",
    nombreUsuario: null,
    nombres: "CONSUMIDOR_FINAL",
    password: "CONSUMIDOR FINAL",
    profesion: null,
    roles: [],
    sexo: null
  }

  clienteConsumidorFinal: Cliente = {
    estado: 1,
    observaciones: "CONSUMIDOR FINAL",
    usuario: null,
  }


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

  productosDto: ProductosDto[] = [];

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

  SelectProductoDto: ProductosDto;
  selectedProduct: Producto;
  checked: boolean = false;

  opSB: any = null;
  opPD: any = null;
  opPCF: any = null;

  valorEntrada: 0.0;
  //productDatTabArray: any[] = [];
  productDatTabArray: ProductosDto[] = [];

  productDto: ProductosDto = {
    descripcionProducto: null,
    nombreProducto: null,
    precioProducto: null,
    cantidad: null,
    cantidades: null,
    descuento: null,
    stock: null,
    total: null,
    idProducto: null,
    porcentaje: null,
    check: false,
    iva: null,
  }

  selectedProductDTO: ProductosDto = {
    descripcionProducto: null,
    nombreProducto: null,
    precioProducto: null,
    cantidad: null,
    cantidades: null,
    descuento: null,
    stock: null,
    total: null,
  }

  dateTable = {
    descripcionProducto: null,
    idProducto: null,
    nombreProducto: null,
    precioProducto: null,
    descuento: 0.0,
    total: null,
    cantidadProd: 0.0,
    porcentaje: null,
    stock: null,
  }

  constructor(private router: Router, private messageService: MessageService,
    private serviceProduct: ProductoControllerService, private serviceCliente: ClienteControllerService,
    private servicePersona: AuthControllerService, private serviceDetallFact: CuerpoFacturaControllerService,
    private serviceFact: FacturaControllerService, private confirmationService: ConfirmationService,
    private serviceFactManual: FacturaService) { }

  ngOnInit(): void {
    //this.inputName.nativeElement.value = 'CONSUMIDOR FINAL';

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
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.nombreProducto });
  }

  onRowSelect2(event) {
    this.dateTable.cantidadProd = event.data.cantidad;
    this.dateTable.idProducto = event.data.idProducto;
    this.dateTable.nombreProducto = event.data.nombreProducto;
    this.dateTable.precioProducto = event.data.precioProducto;
    this.dateTable.stock = event.data.stock;
    this.dateTable.porcentaje = event.data.porcentaje;
    this.dateTable.descuento = event.data.descuento;
    this.messageService.add({ severity: 'info', summary: 'Product Selected' });
  }

  onRowSelectFProduct(event) {
    this.producto = this.selectedProductTP;
    this.calcularIva();
  }

  onRowSelectFProduct2(event) {
    this.productDto = this.selectedProductDTO;
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

  CheckedAlgunos(event) {
    const array = this.productDatTabArray.filter(re => re.check === true);
    console.log(array);
    this.CalcularTotalTabFactu(event); //se envía el evento pero no se usa
  }

  checkTodo(event) {
    this.productDatTabArray.forEach(element =>
      element.check = event);
  }

  confirmacion(product: ProductosDto) {
    this.confirmationService.confirm({
      message: 'Quitar este producto de la lista?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productDatTabArray.splice(this.productDatTabArray.indexOf(product), 1);
        this.messageService.add({ severity: 'info', summary: 'Producto quitado de la lista!!', detail: product.nombreProducto });
        this.CalcularTotalTabFactu(event);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'No se ha quitado el producto' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Cancelado!!' });
            break;
        }
      }
    });
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

  ingPorcentaje(event) {
    console.log("You entered: ", event.target.value);
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  CalcularTotalTabFactu(event) {
    for (var i = 0; i < this.productDatTabArray.length; i++) {
      if (this.productDatTabArray[i].cantidad != null) {
        if (+this.productDatTabArray[i].cantidad <= +this.productDatTabArray[i].stock) {
          let total = this.productDatTabArray[i].cantidad * this.productDatTabArray[i].precioProducto;
          if (this.productDatTabArray[i].porcentaje != null) {
            total = total - (total * +this.productDatTabArray[i].porcentaje) / 100;
          } else if (this.productDatTabArray[i].descuento != null) {
            total = total - +this.productDatTabArray[i].descuento;
          } else if (this.productDatTabArray[i].check === true) {
            //calcular iva ecuador
            let iva = total * 0.12;
            this.productDatTabArray[i].iva = iva;
            total = total + iva;
          }if (this.productDatTabArray[i].check === false) {
            //quitar iva
            let iva = 0
            this.productDatTabArray[i].iva = iva;
            total = total + iva;
          }
          this.productDatTabArray[i].total = this.round(total);
          this.valorAPgar();
        } else {
          if (+this.productDatTabArray[i].stock >= 0) {
            this.productDatTabArray[i].cantidad = +this.productDatTabArray[i].stock;
            let total = this.productDatTabArray[i].cantidad * this.productDatTabArray[i].precioProducto;
            this.productDatTabArray[i].total = this.round(total);
            this.valorAPgar();
            this.mensajesError("La cantidad ingresada supera el stock del producto");
          } else {
            this.mensajesError("El producto no tiene stock");
          }
        }
      }
    }
  }

  totalProductos: number;
  valorPagar: number;
  valorAPgar() {
    this.totalProductos = 0;
    this.valorPagar = 0;
    for (var i = 0; i < this.productDatTabArray.length; i++) {
      if (this.productDatTabArray[i].cantidad != null) {
        this.totalProductos = +this.totalProductos + +this.productDatTabArray[i].cantidad;
        this.valorPagar = +this.valorPagar + +this.productDatTabArray[i].total;
      } else {
        this.mensajesError("No se puede calcular el total de productos, porque no se ingresaron todas la cantidades");
      }
    }
    this.valorPagar = this.round(this.valorPagar);
  }

  round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }

  darVuelto: number = 0;
  recibeDinero: any;
  darCambio(event) {
    let convertido = event.target.value;
    console.log("convertido: " + convertido);

    this.recibeDinero = Number(convertido);
    console.log("1: " + this.recibeDinero);

    if (this.recibeDinero != null) {
      if (+this.recibeDinero >= +this.valorPagar) {
        this.darVuelto = this.recibeDinero - this.valorPagar;
      } else {
        console.log("dinero recibido" + this.recibeDinero);

        this.mensajesError("El dinero recibido no puede ser menor al total a pagar");
      }
    } else {
      this.mensajesError("Debe ingresar una cantidad");
    }
  }

  calcularValorTotal() {
    this.valorPagar = 0;
    for (var i = 0; i < this.productDatTabArray.length; i++) {
      if (this.productDatTabArray[i].cantidad != null) {
        this.valorPagar = this.valorPagar + this.productDatTabArray[i].total;
      }
    }
  }

  mensajesError(msg: String) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error: ' + msg,
    });
  }

  mensajeSatisfactorio(msg: String) {
    this.messageService.add({
      severity: 'success',
      summary: 'Resultado',
      detail: 'Correcto!: ' + msg,
    });
  }

  listarProductos2(event?: LazyLoadEvent): void {
    setTimeout(() => {
      this.serviceProduct.listUsingGET2().subscribe(
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

  //pasar datos de la tabla a la tabla de factura
  cargarProductosFacturacion() {
    if (this.selectedProductTP != null && this.selectedProductTP.idProducto != null) {
      let prod = this.selectedProductTP;
      this.productDatTabArray.push(prod);
      this.selectProduct(prod);//Muestra el mensaje de confirmación
      this.hideDialog(); //cierra el dialogo
    } else {
      this.mensajesError('Seleccione un producto');
    }
  }

  buscarPersonaIdentificacion() {
    this.servicePersona.getPersonaByIdentificacionUsingGET(this.identificacionPer).subscribe(data => {
      if (data.object == null) {
        this.mensajesError('No existe el cliente');
        this.limpiarCamposCliente();
        this.showMostrar = false;
      } else {
        this.usuarioObj = data.object;
        this.buscarClienteByIdPersona(this.usuarioObj.id);
        this.showCampos();
      }
    }, err => {
      console.log(err);
      this.mensajesError('Error al Buscar');
    });
  }

  buscarClienteByIdPersona(id: number) {
    this.serviceCliente.buscarPorIdPersonaClienteUsingGET(id).subscribe(data => {
      if (data.length > 0) {
        this.clienteArr = data;
        for (var i = 0; i < this.clienteArr.length; i++) {
          this.clienteObj = this.clienteArr[i];
        }
      } else {
        this.mensajesError('No existe el cliente');
        this.limpiarCamposCliente();
        this.showMostrar = false;
      }
    },
      err => {
        console.log(err);
        this.mensajesError('Error al buscar el cliente');
      });
  }

  updateObserClient() {
    this.serviceCliente.updateClienteObservacionUsingPUT(this.clienteObj.observaciones, this.clienteObj.idCliente).subscribe(data => {
      if (data.status == 1) {
        this.mensajeSatisfactorio('Observaciones actualizadas');
      } else {
        this.mensajesError('Error al actualizar el cliente');
      }
    },
      err => {
        console.log(err);
        this.mensajesError('Error al actualizar la observacion: ' + err);
      });
  }

  limpiarCamposCliente() {
    this.usuarioObj = { celular: null, ciudad: null, direccion: null, email: null, estado: null, id: null, identificacion: null, nombreUsuario: null, nombres: null, password: null, profesion: null, roles: null, sexo: null };
    this.inputName.nativeElement.value = ' ';
  }

  buscarClienteById(idCliente) {
    this.serviceCliente.buscarPorIdClienteUsingGET(idCliente).subscribe(data => {
      if (data.object != null) {
        this.clienteObj = data.object;
      } else {
        console.log("No existe el cliente");
      }
    }), err => {
      console.log(err);
      this.mensajesError('Error al Buscar');
    };
  }

  generarNomAleatorio(num) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let concatenar = this.numeroAleatorioDecimales(1, 10);
    console.log(result + concatenar);

    return result + concatenar;
  }

  numeroAleatorioDecimales(min, max) {
    var num = Math.random() * (max - min);
    return num + min;
  }


  idFact: number = 0;
  guardarFactura() {
    this.facturaObj.fecha = new Date();
    if (this.inputName.nativeElement.value != "") {
      for (let i = 0; i < this.clienteArr.length; i++) {
        this.facturaObj.cliente = this.clienteArr[i];
      }
      this.crearFactura();
    } else {
      this.serviceCliente.createUsingPOST(this.clienteConsumidorFinal).subscribe(data => {
        if (data != "") {
          Object.values(data);
          for (let i = 0; i < Object.values(data).length; i++) {
            let idC = Object.values(data)[i];
            this.clienteConsumidorFinal.idCliente = +idC
          }
          this.facturaObj.cliente = this.clienteConsumidorFinal;
          this.crearFactura();
        } else {
          this.mensajesError('Error al guardar el cliente como consumidor final');
        }
      });
    }
  }

  crearFactura() {
    if (this.facturaObj != null && this.facturaObj.cliente != null) {
      this.serviceFact.saveFacturaUsingPOST(this.facturaObj).subscribe(date => {
        if (date.status == 1) {
          this.mensajeSatisfactorio('Factura Guardada');
          this.idFact = +date.object;
          this.generarDetalleFactura();
        }
      }), (err) => {
        console.log(err);
        this.mensajesError('Error al guardar la factura');
        return
      }
    }
  }

  generarDetalleFactura() {
    let precioTotal: number = 0.0;
    let cantProdTotal: number = 0;
    for (let index = 0; index < this.productDatTabArray.length; index++) {
      this.detalleFactObj.cantidad = this.productDatTabArray[index].cantidad;
      this.detalleFactObj.descuento = 0;
      if (this.productDatTabArray[index].descuento != null) {
        this.detalleFactObj.descuento = this.productDatTabArray[index].descuento;
      } else if (this.productDatTabArray[index].porcentaje != null) {
        this.detalleFactObj.descuento = (this.productDatTabArray[index].total * this.productDatTabArray[index].porcentaje) / 100;
      }
      this.detalleFactObj.iva = this.productDatTabArray[index].iva;
      this.detalleFactObj.producto = this.productDatTabArray[index];
      this.detalleFactObj.subtotal = this.productDatTabArray[index].precioProducto * this.productDatTabArray[index].cantidad;
      this.detalleFactObj.total = this.productDatTabArray[index].total;
      this.detalleFactObj.factura.idFactura = this.idFact;
      const element = this.productDatTabArray[index];
      cantProdTotal = cantProdTotal + this.productDatTabArray[index].cantidad;
      precioTotal = element.precioProducto + precioTotal;

      let restProd = +this.productDatTabArray[index].stock - +this.productDatTabArray[index].cantidad;
      if (restProd == 0) {
        this.productDatTabArray[index].stock = '0';
      } else {
        this.productDatTabArray[index].stock = restProd.toString();
      }
      if (restProd < 0) {
        this.mensajesError('No se puede vender mas productos de los que hay en stock');
        return;
      } else {
        this.serviceDetallFact.guardarCuerpoFact2UsingPOST(this.detalleFactObj).subscribe(data => {
          if (data != null) {
            this.serviceProduct.actualizarStockUsingPUT(this.productDatTabArray[index], this.productDatTabArray[index].idProducto).subscribe(data => {
              if (data.status == 1) {
                this.mensajeSatisfactorio('Stock actualizado correctamente');
              } else {
                this.mensajesError('Error al actualizar el stock');
              }
            });
            this.mensajeSatisfactorio('Detalle factura guardado correctamente');

          } else {
            this.mensajesError('Error al guardar el detalle factura');
          }
        });
      }
    }
    this.GenerarPdfFactUseConsFinal();
    //this.detalleFactObj.subtotal = precioTotal; //falta
    //this.limpiarcampos();
  }

  descargarPdf(pdfSrc: any) {
    let pdf: any = pdfSrc;
    let numAlea = this.createId();
    var blob = new Blob([pdf], { type: 'application/pdf' });
    var url = window.URL.createObjectURL(blob);
    //Extraer fecha y hora
    let fech = this.facturaObj.fecha;
    let fecha = fech.getDate() + "/" + (fech.getMonth() + 1) + "/" + fech.getFullYear();
    let hora = fech.getHours() + ":" + fech.getMinutes() + ":" + fech.getSeconds();
    //Descarga el pdf automáticamente
    var link = document.createElement('a');
    link.href = url;
    link.download = 'FacturaFarmacia-'+this.idFact+'-'+fecha+'-h'+hora+'-'+numAlea+'.pdf';
    link.click();
    window.open(url);
  }

  GenerarPdfFactUseConsFinal() {
    this.serviceFactManual.generarPdfFacturaUsuario(this.idFact).subscribe((data) => {
      if (data) {
        this.descargarPdf(data);
        this.limpiarcampos();
      } else {
        this.mensajesError('Error al mostrar el pdf');
      }
    }, (err) => {
      console.log(err);
      this.mensajesError('Error al mostrar el pdf');
    });
  }

  // CalFactGeneral(){
  //   this.facturaObj.subtotal = 0.0;
  //   this.facturaObj.iva = 0.0;
  //   this.facturaObj.total = 0.0;
  //   this.facturaObj.descuento = 0.0;
  //   for (let index = 0; index < this.productDatTabArray.length; index++) {
  //     this.facturaObj.subtotal = this.facturaObj.subtotal + this.productDatTabArray[index].total;
  //     this.facturaObj.iva = this.facturaObj.iva + this.productDatTabArray[index].iva;
  //     this.facturaObj.total = this.facturaObj.total + this.productDatTabArray[index].total;
  //     this.facturaObj.descuento = this.facturaObj.descuento + this.productDatTabArray[index].descuento;
  //   }
  // }

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

    this.disabled = true;
    this.statuses = [];
    this.showMostrar = false;
    this.identificacionPer = null;
    this.TipoProdFP = [];
    this.TipoForPag = [];
    this.totalProductos = 0;
    this.valorPagar = 0;

    this.facturaObj = { cliente: null, fecha: new Date(), idFactura: null, tipoFactura: null }

    this.clienteArr = [];
    this.clienteObj = { estado: null, idCliente: null, observaciones: null, usuario: null }

    this.detalleFactObj = { cantidad: null, descuento: null, factura: {} as Factura, idCuerpo: null, iva: null, producto: null, subtotal: null, total: null }

    this.usuarioObj = { celular: null, ciudad: null, direccion: null, email: null, estado: null, id: null, identificacion: null, nombreUsuario: null, nombres: null, password: null, profesion: null, roles: null, sexo: null };

    this.listProduct = [];
    this.productos = [];
    this.productosFact = [];
    this.prodFact = [];

    this.productosDto = [];

    this.productosFactura = { categoriaProducto: null, codBarra: null, codigoRef: null, descripcionProducto: null, estadoProducto: null, fechaExp: null, idProducto: null, inventarioProducto: null, nombreProducto: null, precioProducto: null, proveedor: null, regSanitario: null, stock: null, ultimoCosto: null };

    this.products = [];

    this.SelectProductoDto = null;
    this.selectedProduct = null;
    this.checked = false;

    this.valorEntrada = 0.0;
    //this.productDatTabArray = [];
    this.productDatTabArray.splice(0, this.productDatTabArray.length);

    this.productDto = { descripcionProducto: null, nombreProducto: null, precioProducto: null, cantidad: null, cantidades: null, descuento: null, stock: null, total: null, idProducto: null }

    this.selectedProductDTO = { descripcionProducto: null, nombreProducto: null, precioProducto: null, cantidad: null, cantidades: null, descuento: null, stock: null, total: null }

    this.dateTable = { descripcionProducto: null, idProducto: null, nombreProducto: null, precioProducto: null, descuento: 0.0, total: null, cantidadProd: 0.0, porcentaje: null, stock: null }

  }
}
