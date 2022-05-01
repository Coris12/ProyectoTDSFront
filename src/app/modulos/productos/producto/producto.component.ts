import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductoControllerService } from 'src/app/api/productoController.service';
import { ProveedorControllerService } from 'src/app/api/proveedorController.service';
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
    stock_producto: new FormControl(null, [Validators.nullValidator, Validators.required]),
    proveedornombre: new FormControl(null, [Validators.nullValidator, Validators.required]),
  })
//variables producto
 
  categoriaProd: any//<---- guardeles asi
  codigo: string

  //!! Buscar de la tabla
  @ViewChild('dt') table: Table;

  //! variables
  columnas: any[];
  productos: Producto[] = [];
  produc: any[];
  
  listaproveedores: any[] = []

  // * lazy load
  loading: boolean;
  totalRecords: number
  proveedor: Proveedor[];
  codRefe: any;
  proveedor_select: any

  //! abre el dialogo de producto
  productoDialog: boolean;
  categoria: any[];
  categorias: string;
  constructor(private productoController: ProductoControllerService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.categoria = [
      { label: 'MEDICAMENTOS', value: 'MEDICAMENTOS' },
      { label: 'INSUMOS', value: 'INSUMOS' },
      { label: 'ODONTOLOGIA', value: 'ODONTOLOGIA' }
    ];

    this.productoController.searchUsingGET().subscribe((data: any) => {
      this.produc = data;
      for (let datos of data) {
        this.listaproveedores.push(datos.proveedor)
      }
      console.log(this.produc);
      console.log(this.listaproveedores);


    })

    this.cargarProductos();
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
   
    // aqui iria     proveedor service.listar(  )   for (let datos of data)              if(datos.nombre_provee == productoform(traer solo proveedor nombre nose como sera de sacar del form))    y le guatdas el id
    this.productoController.createUsingPOST3(
     
      this.productoForm.value
    ).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Producto creado .' });

    },
      error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));
  }

  //metodo de borrado logico
  borrar(idProducto: number) {
    this.productoController.deleteProductoUsingPATCH(idProducto).subscribe(
      data => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'eliminar.' });

      },

      error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));
    this.cargarProductos();
  }
  // fin del metodo


//metodo etitar
editar(producto:Producto){
  this.productoController.updateUsingPUT1(producto,producto.idProducto).subscribe(
    data=>{
    this.productos=data;
    
  })
}




}
