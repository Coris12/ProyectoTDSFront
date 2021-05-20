import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from '../../model/proveedor';
import { ProveedorService } from '../../service/proveedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalles-proveedor',
  templateUrl: './detalles-proveedor.component.html',
  styleUrls: ['./detalles-proveedor.component.css']
})
export class DetallesProveedorComponent implements OnInit {

  proveedor: Proveedor = null;

  constructor(
    private proveedorService: ProveedorService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.proveedorService.detail(id).subscribe(
      data => {
        this.proveedor = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.regresar();
      }
    );
  }

  regresar(): void {
    this.router.navigate(['/lista-proveedor']);
  }


}
