import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthControllerService } from 'src/app/api/authController.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  //!! Buscar de la tabla
  @ViewChild('dt') table: Table;
  //! variables
  columnas: any[];
  usuarios: Usuario[] = [];
  loading: boolean; // * lazy load
  totalRecords: number

  // editar roles
  nuevoRol: string;
  idUsuario: number;
  dialogo: boolean;
  roles: string[];
  constructor(private authController: AuthControllerService, private messageService: MessageService) { }

  ngOnInit(): void {

    // * cargando lazy load
    this.loading = true;

    //carga de roles
    this.roles = ['ROLE_ADMIN', 'ROLE_PACIENTE', 'ROLE_LABORATORIO', 'ROLE_DOCTOR', 'ROLE_FARMACIA', 'ROLE_CONTABILIDAD','ROLE_ODONTOLOGIA'];
    this.cargarUsuarios();
  }
  clear(table: Table) {
    table.clear();
  }

  cargarUsuarios(event?: LazyLoadEvent): void {
    this.loading = true;

    setTimeout(() => {
      this.authController.listaUsingGET().subscribe(
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

  save() {
    this.authController.putArrendatarioUsingPOST(this.idUsuario, this.nuevoRol).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Rol actualizado.' });
      
      this.cargarUsuarios();
      this.dialogo = false;
    })
  }

  editarRoles(usuario: Usuario) {
    this.nuevoRol = usuario.roles[0].rolNombre;
    this.idUsuario = usuario.id;
    this.dialogo = true;
  }

}

