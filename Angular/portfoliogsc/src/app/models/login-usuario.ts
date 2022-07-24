export class LoginUsuario {
    nombreUsuario: string;
    password: string;

    constructor(numbreUsuario: string, password: string) {
        this.nombreUsuario = numbreUsuario;
        this.password = password;
    }
}
