import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../service/proveedor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Proveedor } from '../../model/proveedor';

@Component({
  selector: 'app-registrar-proveedor',
  templateUrl: './registrar-proveedor.component.html',
  styleUrls: ['./registrar-proveedor.component.css']
})
export class RegistrarProveedorComponent implements OnInit {


  nombreP = '';
  
  idP: number;

 
  
  constructor(

    private proveedorService: ProveedorService,
    private toastr: ToastrService,
    private router: Router
  ) { 
   
    
  }

  ngOnInit() {
  
  }


  onCreate(): void {
    const producto = new Proveedor(this.nombreP);
    this.proveedorService.save(producto).subscribe(
      data => {
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista-proveedor']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}

