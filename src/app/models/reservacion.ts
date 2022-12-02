import { Cliente } from "./cliente";

export class Reservacion {
    cliente: Cliente;
    fecha: string;
    total: number;
    id?: string;
}
