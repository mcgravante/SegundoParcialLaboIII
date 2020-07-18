namespace AB
{
    export class Auto extends Vehiculo
    {
        private cantidadPuertas:number;

        constructor(id:number, marca:string,modelo : string,precio : number, cantidadPuertas:number)
        {
            super(id,marca,modelo,precio );//llamo al constructor de la clase padre
            this.cantidadPuertas=cantidadPuertas;//inicializo atributos propios
        }

        public getCantidadPuertas():number
        {
            return this.cantidadPuertas;
        }

        public setCantidadPuertas(cantidadPuertas:number):void
        {
            this.cantidadPuertas=cantidadPuertas;
        }
    }
}