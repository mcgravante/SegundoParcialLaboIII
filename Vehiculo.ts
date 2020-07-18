namespace AB {
    export class Vehiculo {
        private id: number;
        private marca: string;
        private modelo: string;
        private precio: number;

        constructor(id: number, marca: string, modelo: string, precio: number) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;

        }

        public getMarca(): string {
            return this.marca;
        }

        public setMarca(marca: string): void {
            this.marca = marca;
        }

        public getModelo(): string {
            return this.modelo;
        }

        public setModelo(modelo: string): void {
            this.modelo = modelo;
        }

        public getPrecio(): number {
            return this.precio;
        }

        public setPrecio(precio: number): void {
            this.precio = precio;
        }

        public getId(): number {
            return this.id;
        }

        public setId(id: number): void {
            this.id = id;
        }
    }
}