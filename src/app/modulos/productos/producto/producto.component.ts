import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductoControllerService } from 'src/app/api/productoController.service';
import { ProveedorControllerService } from 'src/app/api/proveedorController.service';
import { SucursalControllerService } from 'src/app/api/sucursalController.service';
import { Producto } from 'src/app/model/producto';
import { Proveedor } from 'src/app/model/proveedor';
import { Sucursal } from 'src/app/model/sucursal';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {


  public productoForm = new FormGroup({
    idProducto: new FormControl(null),
    categoriaProducto: new FormControl(null, [Validators.nullValidator, Validators.required]),
    codBarra: new FormControl(null, [Validators.nullValidator, Validators.required]),
    codigoRef: new FormControl(null, [Validators.nullValidator, Validators.required]),
    descripcionProducto: new FormControl(null, [Validators.nullValidator, Validators.required]),
    fechaExp: new FormControl(null, [Validators.nullValidator, Validators.required]),
    inventarioProducto: new FormControl(null, [Validators.nullValidator, Validators.required]),
    nombreProducto: new FormControl(null, [Validators.nullValidator, Validators.required]),
    precioProducto: new FormControl(null, [Validators.nullValidator, Validators.required]),
    regSanitario: new FormControl(null, [Validators.nullValidator, Validators.required]),
    stock: new FormControl(null, [Validators.nullValidator, Validators.required]),
    proveedor: new FormControl(null, [Validators.nullValidator, Validators.required]),
    costoPromedio: new FormControl(null, [Validators.nullValidator, Validators.required]),
    ultimoCosto: new FormControl(null, [Validators.nullValidator, Validators.required]),
    sucursal: new FormControl(null, [Validators.nullValidator, Validators.required]),
  })
  //variables producto
  categoria: any[];

  stock: any
  categoriaProd: any//<---- guardeles asi
  codigo: string

  //!! Buscar de la tabla
  @ViewChild('dt') table: Table;

  //! variables
  columnas: any[];
  productos: Producto[] = [];
  produc: any[];
  proveedores: Proveedor[] = [];

  sucursales: Sucursal[] = [];
  // * lazy load
  loading: boolean;
  totalRecords: number
  proveedor: Proveedor[];
  codRefe: any;


  //! abre el dialogo de producto
  productoDialog: boolean;

  constructor(
    private productoController: ProductoControllerService,
    private proveedorController: ProveedorControllerService,
    private messageService: MessageService,
    private sucursalController: SucursalControllerService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.categoria = [
      { label: 'MEDICAMENTOS', value: 'MEDICAMENTOS' },
      { label: 'INSUMOS', value: 'INSUMOS' },
      { label: 'ODONTOLOGIA', value: 'ODONTOLOGIA' },
      { label: 'EQUIPOS', value: 'EQUIPOS' }
    ];

    this.productoController.searchUsingGET2().subscribe((data: any) => {
      this.produc = data;
      console.log(this.produc);
    })

    this.cargarProductos();
    this.cargarProveedores();
    this.cargarSucursales();
  }

  generarcodigo() {
    var codigo2: any
    var letra1, letra2, letra3, letra4: string
    var i: number = 0
    console.log(this.categoriaProd);
    //  console.log(this.proveedor_select);
    for (let datos of this.categoriaProd) {
      i++
      //console.log(datos);
      if (i <= 4) {
        if (i == 1) {
          letra1 = datos
        }
        if (i == 2) {
          letra2 = datos
        }
        if (i == 3) {
          letra3 = datos
        }
        if (i == 4) {
          letra4 = datos
        }

        if (i == 4) {

          this.codigo = letra1 + letra2 + letra3 + letra4
          console.log(this.codigo);// asi seria para mas o menos hacer el codigo ya y como le mando a que me visualice

        }

      }
    }


  }

  cargarProductos(event?: LazyLoadEvent): void {
    this.loading = true;

    setTimeout(() => {
      this.productoController.searchUsingGET2().subscribe(

        data => {
          this.productos = data;
          console.log(data);
          this.totalRecords = this.productos.length;
          this.loading = false;
        },
        err => {
          console.log(err);
        }

      );
    }, 1000);
  }

  updateProducto(idProducto: number) {
    this.productoController.getByIdUsingGET9(idProducto)
      .subscribe(produc => {
        console.log(produc.idProducto)
        this.productoForm.setValue({
          idProducto: produc.idProducto,
          categoriaProducto: produc.categoriaProducto,
          codBarra: produc.codBarra,
          codigoRef: produc.codigoRef,
          descripcionProducto: produc.descripcionProducto,
          fechaExp: produc.fechaExp,
          nombreProducto: produc.nombreProducto,
          inventarioProducto: produc.inventarioProducto,
          precioProducto: produc.precioProducto,
          regSanitario: produc.regSanitario,
          stock: produc.stock,
          costoPromedio: produc.costoPromedio,
          ultimoCosto: produc.ultimoCosto,
          proveedor: produc.proveedor,
          sucursal: produc.sucursal,
        });
      });
    this.productoDialog = true;

  }

  //metodo de guardar
  saveProducto() {
    console.log(this.productoForm.value)
    if (this.productoForm.value?.idProducto !== null) {
      this.productoController.updateUsingPUT2(
        this.productoForm.value,
        this.productoForm.value?.idProducto,
      ).subscribe(data => {
        this.messageService.add({
          severity: 'info',
          summary: 'Producto Actualizado',
          detail: data.object
        });
        this.productoDialog = false;
        this.cargarProductos();
      });
    } else {
      this.productoController.createUsingPOST4(
        this.productoForm.value,
        this.productoForm.value?.proveedor.idProveedor,
        this.productoForm.value?.sucursal.idSucursal
      ).subscribe(data => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Producto creado .'
        });
      },
        error => this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: error.mensaje
        }));

      this.productoDialog = false;
      this.productoForm.setValue({
        idProducto: null,
        categoriaProducto: null,
        codBarra: null,
        codigoRef: null,
        descripcionProducto: null,
        fechaExp: null,
        nombreProducto: null,
        inventarioProducto: null,
        precioProducto: null,
        regSanitario: null,
        stock: null,
        costoPromedio: null,
        ultimoCosto: null,
        proveedor: null,
        sucursal:null
      })

    }
  }
  //fin del metodo

  //metodo de borrado logico
  borrarProducto(idProducto: number): void {

    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el producto?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.productoController.deleteProductoUsingPATCH(idProducto).subscribe(
          data => {
            this.messageService.add({
              severity: 'success',
              summary: 'Producto Eliminado',
              detail: 'eliminar.'
            });
            setTimeout(() => {
              this.cargarProductos();
            }, 1000);
          },
          error => this.messageService.add({
            severity: 'danger',
            summary: 'Error',
            detail: error.mensaje
          }));
      }
    });

  }
  // fin del metodo


  //metodo cargar proveedores
  cargarProveedores(): void {
    this.proveedorController.searchUsingGET3().subscribe(
      data => {
        this.proveedores = data;
      
        console.log("prove:"+ this.proveedores)
      },
      err => {
        console.log(err);
      }
    );
  }


  // metodo para cargar las sucursales de la
  cargarSucursales(): void {
    this.sucursalController.listaUsingGET1().subscribe(
      data => {
        this.sucursales = data;
        console.log(this.sucursales);
      },
      err => {
        console.log(err);
      }
    );
  }
}
// fin del metodo
