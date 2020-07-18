namespace AB
{
    export class Camioneta extends Vehiculo
    {
        private cuatroXcuatro:boolean;

        constructor(id:number, marca:string,modelo : string,precio : number, cuatroXcuatro:boolean)
        {
            super(id,marca,modelo,precio );
            this.cuatroXcuatro=cuatroXcuatro;
        }

        public getCuatroXcuatro():boolean
        {
            return this.cuatroXcuatro;
        }

        public setCuatroXcuatro(cuatroXcuatro:boolean):void
        {
            this.cuatroXcuatro=cuatroXcuatro;
        }
    }
}