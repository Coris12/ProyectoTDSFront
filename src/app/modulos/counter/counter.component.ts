import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthControllerService } from 'src/app/api/authController.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {


  public usuarioForm = new FormGroup({
    id: new FormControl(null),
    celular: new FormControl(null, [Validators.nullValidator, Validators.required]),
    ciudad: new FormControl(null, [Validators.nullValidator, Validators.required]),
    direccion: new FormControl(null, [Validators.nullValidator, Validators.required]),
    email: new FormControl(null, [Validators.nullValidator, Validators.required]),
    identificacion: new FormControl(null, [Validators.nullValidator, Validators.required]),
    nombres: new FormControl(null, [Validators.nullValidator, Validators.required]),
    sexo: new FormControl(null, [Validators.nullValidator, Validators.required]),
    })

  constructor(private authController: AuthControllerService) { }

  totalRecords: number
  counterDialog: boolean;
  idUsuario: number;


  usuarios: Usuario[] = [];
  loading: boolean;

  usuario :any[];
  ngOnInit(): void {
    this.cargarUsuarios();


    this.authController.searchUsingGET().subscribe((data: any) => {
      this.usuario = data;
      console.log(this.usuario);
    })
  }

  clear(table: Table) {
    table.clear();
  }

  cargarUsuarios(event?: LazyLoadEvent): void {
    this.loading = true;

    setTimeout(() => {
      this.authController.searchUsingGET().subscribe(
        data => {
          this.usuarios = data;
          this.totalRecords = this.usuarios.length;
          this.loading = false;
        },
        err => {
          console.log(err);
        }

      );
    }, 1000);

  }

  buscarCliente(identificacion:string) {
    this.authController.getPersonaByIdentificacionUsingGET(identificacion)
    .subscribe( usuario => {
      
      this.usuarioForm.setValue({
        id: usuario.object.id,
        celular: usuario.object.celular,
        ciudad: usuario.object.ciudad,
        direccion: usuario.object.direccion,
        email: usuario.object.email,
        identificacion: usuario.object.identificacion,
        nombres: usuario.object.nombres,
        sexo: usuario.object.sexo,
      });
    });
    this.counterDialog = true;
  }

  save(){

  }
  facturar(id?: number) {
    this.counterDialog = true;
  }


}
