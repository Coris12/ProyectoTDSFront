import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductoControllerService } from 'src/app/api/productoController.service';
import { Producto } from 'src/app/model/producto';
import { Proveedor } from 'src/app/model/proveedor';

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
    stockProducto: new FormControl(null, [Validators.nullValidator, Validators.required]),
   



  })

  //!! Buscar de la tabla
  @ViewChild('dt') table: Table;
  //! variables
  columnas: any[];
  productos: Producto[] = [];
  producto: Producto = {};
  idProducto: number;


  // * lazy load
  loading: boolean;
  totalRecords: number
  proveedor: Proveedor[];
  codRefe:any;

  //! abre el dialogo de producto
  productoDialog: boolean;
  categoria: any[];
  categorias: string;
  constructor(private productoController: ProductoControllerService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.categoria = [
      { label: 'Medicamentos', value: 'Medicamentos' },
      { label: 'Insumos', value: 'Insumos' },
      { label: 'Odontologia', value: 'Odontologia' }
    ];
    this.categorias = this.categoria[0];
    this.cargarProductos();
   

  }

  cargarProductos(event?: LazyLoadEvent): void {
    this.loading = true;

    setTimeout(() => {
      this.productoController.searchUsingGET().subscribe(
        
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

  saveProducto() {
    this.productoController.createUsingPOST3(
      this.productoForm.value
    ).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Producto creado .' });

    },
      error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));
  }

  //metodo de borrado logico
  borrar(idProducto: number) {
    this.productoController.deleteEmpleadoUsingPATCH1(idProducto).subscribe(
      data => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'eliminar.' });

      },

      error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));
    this.cargarProductos();
  }
  // fin del metodo


}
