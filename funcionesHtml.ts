namespace AB {
    var listaVehiculos: Array<Vehiculo> = new Array<Vehiculo>();
    function CalcularId() {
        var id: number = 1;
        if (listaVehiculos.length != 0) {
            id = listaVehiculos.reduce((idActual, idMayor) => idActual > idMayor ? idMayor = idActual : idMayor).getId() + 1;
            // var lastRegisterIndex : number = listaVehiculos.length-1;
            // var lastRegister : Vehiculo = listaVehiculos[lastRegisterIndex];
            // id = lastRegister.getId() + 1;
        }
        return id;
    }

    window.onload = function () {
        document.getElementById("btnAlta")?.addEventListener("click", AB.PopUp);
        document.getElementById("btnAgregar")?.addEventListener("click", AB.Guardar);
        document.getElementById("btnCerrar")?.addEventListener("click", AB.CloseUp);
        document.getElementById("tipo")?.addEventListener("change", AB.MostrarAtributosPropios);
        document.getElementById("filtro")?.addEventListener("change", AB.SwapTables);
        document.getElementById("btnProm")?.addEventListener("click", AB.CalcularPromedio);
    }

    export function PopUp() {
        (<HTMLInputElement>document.getElementById("contenedorAlta")).hidden = false;
    }

    export function CloseUp() {
        (<HTMLInputElement>document.getElementById("contenedorAlta")).hidden = true;
    }

    export function MostrarAtributosPropios() {
        var tipo = (<HTMLInputElement>document.getElementById("tipo")).value;
        if (tipo == "Auto") {
            (<HTMLInputElement>document.getElementById("divCamioneta")).hidden = true;
            (<HTMLInputElement>document.getElementById("divAuto")).hidden = false;
        }
        else if (tipo == "Camioneta") {
            (<HTMLInputElement>document.getElementById("divCamioneta")).hidden = false;
            (<HTMLInputElement>document.getElementById("divAuto")).hidden = true;
        }

    }

    export function Guardar() {

        var marca: string = (<HTMLInputElement>document.getElementById("txtMarca")).value;
        var modelo: string = (<HTMLInputElement>document.getElementById("txtModelo")).value;
        var precioStr: string = (<HTMLInputElement>document.getElementById("txtPrecio")).value;
        var tipo: string = (<HTMLInputElement>document.getElementById("tipo")).value;
        var cantPuertStr: string = (<HTMLInputElement>document.getElementById("txtCantPuertas")).value;
        var esCuatroXcuatro: boolean = (<HTMLInputElement>document.getElementById("4x4ChkBox")).checked;
        var precioNum: number = parseInt(precioStr);
        var cantPuertNum: number = parseInt(cantPuertStr);


        var p = new Promise((resolve, reject) => {
            if (precioNum.toString() != "NaN") {
                if (tipo == "Auto") {
                    if (cantPuertNum.toString() != "NaN") {
                        resolve(new Auto(CalcularId(), marca, modelo, precioNum, cantPuertNum))
                    }
                    else {
                        reject("Cantidad de puertas debe ser valor numerico")
                    }
                }
                else if (tipo == "Camioneta") {
                    resolve(new Camioneta(CalcularId(), marca, modelo, precioNum, esCuatroXcuatro))
                }
            }
            else {
                reject("Precio debe ser valor numerico")
            }
        });

        p.then((Vehiculo) => {
            listaVehiculos.push(<Vehiculo>Vehiculo);
            var tablaVehiculos = (<HTMLTableElement>document.getElementById("tablaVehiculos"));
            ConstruirFila(tablaVehiculos, (<Vehiculo>Vehiculo).getId(), (<Vehiculo>Vehiculo).getMarca(),
                (<Vehiculo>Vehiculo).getModelo(), (<Vehiculo>Vehiculo).getPrecio(), cantPuertNum, esCuatroXcuatro);
        }).catch((error) => {
            alert("No se pudo completar registro: " + error)
        })
    }

    export function BuscarVehiculo() {
        var tipoABuscar = (<HTMLInputElement>document.getElementById("filtro")).value;
        return new Promise((resolve, reject) => {
            var coincidencias = listaVehiculos.filter(vehiculo => vehiculo.constructor.name == tipoABuscar);
            resolve(coincidencias);
        });
    }

    export function SwapTables() {
        var tablaVehiculos = (<HTMLTableElement>document.getElementById("tablaVehiculos"));
        var tablaFiltrados = (<HTMLTableElement>document.getElementById("tablaFiltrados"));
        if ((<HTMLInputElement>document.getElementById("filtro")).value != "") {
            tablaVehiculos.hidden = true;
            tablaFiltrados.innerHTML = "";
            BuscarVehiculo().then((listaFiltrada) => {
                (<Array<Vehiculo>>listaFiltrada).forEach(Vehiculo => {
                    var cantPuertas: number = 0;
                    var esCuatroXcuatro: boolean = false;
                    if (Vehiculo instanceof Auto) {
                        cantPuertas = (<Auto>Vehiculo).getCantidadPuertas();
                    }
                    if (Vehiculo instanceof Camioneta) {
                        esCuatroXcuatro = (<Camioneta>Vehiculo).getCuatroXcuatro();
                    }
                    ConstruirFila(tablaFiltrados, (<Vehiculo>Vehiculo).getId(), (<Vehiculo>Vehiculo).getMarca(),
                        (<Vehiculo>Vehiculo).getModelo(), (<Vehiculo>Vehiculo).getPrecio(), cantPuertas, esCuatroXcuatro);
                });
            });
            tablaFiltrados.hidden = false;
        }
        else {
            tablaVehiculos.hidden = false;
            tablaFiltrados.hidden = true;
        }
    }

    export function CalcularPromedio() {
        BuscarVehiculo().then((listaCoincidencias) => {
            var list = <Array<Vehiculo>>listaCoincidencias;
            var valorTotal: number = 0;
            if (list.length > 0) {
                valorTotal = list.reduce(((total, veh) => total += veh.getPrecio()), 0);
                (<HTMLInputElement>document.getElementById("promedio")).value = (valorTotal / list.length).toString();
            }
            else {
                valorTotal = listaVehiculos.reduce(((total, veh) => total += veh.getPrecio()), 0);
                (<HTMLInputElement>document.getElementById("promedio")).value = (valorTotal / list.length).toString();
            }
            (<HTMLInputElement>document.getElementById("promedio")).value = (valorTotal / listaVehiculos.length).toString();
        });
    }

    export function ConstruirFila(tabla: HTMLTableElement, id: number, marca: string,
        modelo: string, precio: number, cantPuert: number, esCuatroXcuatro: boolean): void {
        var tr = document.createElement("tr");

        var td = document.createElement("td");
        td.appendChild(document.createTextNode(id.toString()));
        tr.appendChild(td);

        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(marca));
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(modelo));
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.appendChild(document.createTextNode(precio.toString()));
        tr.appendChild(td4);

        var td5 = document.createElement("td");
        td5.appendChild(document.createTextNode(cantPuert.toString()));
        tr.appendChild(td5);

        var td6 = document.createElement("td");
        td6.appendChild(document.createTextNode(esCuatroXcuatro.valueOf().toString()));
        tr.appendChild(td6);

        var td7 = document.createElement("td");
        var btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener('click', AB.Eliminar);
        td7.appendChild(btnEliminar);
        tr.appendChild(td7);

        tabla.appendChild(tr);
    }

    export function Eliminar(tr: any) {
        var trToDelete = tr.target.parentNode.parentNode;
        var idToDelete = trToDelete.childNodes[0].innerHTML
        var listaId = listaVehiculos.filter(Vehiculo => Vehiculo.getId() == idToDelete);
        if (listaId.length > 0) {
            listaVehiculos.splice(idToDelete, 1);
            var tablaVehiculos = (<HTMLTableElement>document.getElementById("tablaVehiculos"));

            tablaVehiculos.childNodes.forEach(element => {
                if (element.nodeName == "TR") {
                    if (element.childNodes[2].textContent == idToDelete) {
                        element.remove();
                        return;
                    }
                }
                trToDelete.remove();
            });
        }
    }
}