export class NuevoUsuario {
    identificacion?: string;
    nombres?: string;
    direccion?: string;
    celular?: string;
    sexo?:string;
    email?:string;
    ciudad?:string;
    nombreUsuario?: string;
    password?: string;
    constructor(identificacion:string, nombres: string, direccion:string, celular: string, sexo:string, email:string, ciudad:string, nombreUsuario:string, password:string) {
        this.identificacion = identificacion;
        this.nombres = nombres;
        this.direccion = direccion;
        this.celular = celular;
        this.sexo =sexo;
        this.email = email;
        this.ciudad = ciudad;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }
}
