import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from '../../model/proveedor';
import { ProveedorService } from '../../service/proveedor.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit {

  proveedor: Proveedor = null;

  constructor(
    private proveedorService: ProveedorService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
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
        this.router.navigate(['/']);
      }
    );
    this.primengConfig.ripple = true;
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.proveedorService.update(id, this.proveedor).subscribe(
      data => {
        
        this.toastr.success('Proveedor Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista-proveedor']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
  
}

