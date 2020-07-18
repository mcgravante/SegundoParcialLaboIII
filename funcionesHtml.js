var AB;
(function (AB) {
    var listaVehiculos = new Array();
    function CalcularId() {
        var id = 1;
        if (listaVehiculos.length != 0) {
            id = listaVehiculos.reduce(function (idActual, idMayor) { return idActual > idMayor ? idMayor = idActual : idMayor; }).getId() + 1;
            // var lastRegisterIndex : number = listaVehiculos.length-1;
            // var lastRegister : Vehiculo = listaVehiculos[lastRegisterIndex];
            // id = lastRegister.getId() + 1;
        }
        return id;
    }
    window.onload = function () {
        var _a, _b, _c, _d, _e, _f;
        (_a = document.getElementById("btnAlta")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", AB.PopUp);
        (_b = document.getElementById("btnAgregar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", AB.Guardar);
        (_c = document.getElementById("btnCerrar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", AB.CloseUp);
        (_d = document.getElementById("tipo")) === null || _d === void 0 ? void 0 : _d.addEventListener("change", AB.MostrarAtributosPropios);
        (_e = document.getElementById("filtro")) === null || _e === void 0 ? void 0 : _e.addEventListener("change", AB.SwapTables);
        (_f = document.getElementById("btnProm")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", AB.CalcularPromedio);
    };
    function PopUp() {
        document.getElementById("contenedorAlta").hidden = false;
    }
    AB.PopUp = PopUp;
    function CloseUp() {
        document.getElementById("contenedorAlta").hidden = true;
    }
    AB.CloseUp = CloseUp;
    function MostrarAtributosPropios() {
        var tipo = document.getElementById("tipo").value;
        if (tipo == "Auto") {
            document.getElementById("divCamioneta").hidden = true;
            document.getElementById("divAuto").hidden = false;
        }
        else if (tipo == "Camioneta") {
            document.getElementById("divCamioneta").hidden = false;
            document.getElementById("divAuto").hidden = true;
        }
    }
    AB.MostrarAtributosPropios = MostrarAtributosPropios;
    function Guardar() {
        var marca = document.getElementById("txtMarca").value;
        var modelo = document.getElementById("txtModelo").value;
        var precioStr = document.getElementById("txtPrecio").value;
        var tipo = document.getElementById("tipo").value;
        var cantPuertStr = document.getElementById("txtCantPuertas").value;
        var esCuatroXcuatro = document.getElementById("4x4ChkBox").checked;
        var precioNum = parseInt(precioStr);
        var cantPuertNum = parseInt(cantPuertStr);
        var p = new Promise(function (resolve, reject) {
            if (precioNum.toString() != "NaN") {
                if (tipo == "Auto") {
                    if (cantPuertNum.toString() != "NaN") {
                        resolve(new AB.Auto(CalcularId(), marca, modelo, precioNum, cantPuertNum));
                    }
                    else {
                        reject("Cantidad de puertas debe ser valor numerico");
                    }
                }
                else if (tipo == "Camioneta") {
                    resolve(new AB.Camioneta(CalcularId(), marca, modelo, precioNum, esCuatroXcuatro));
                }
            }
            else {
                reject("Precio debe ser valor numerico");
            }
        });
        p.then(function (Vehiculo) {
            listaVehiculos.push(Vehiculo);
            var tablaVehiculos = document.getElementById("tablaVehiculos");
            ConstruirFila(tablaVehiculos, Vehiculo.getId(), Vehiculo.getMarca(), Vehiculo.getModelo(), Vehiculo.getPrecio(), cantPuertNum, esCuatroXcuatro);
        })["catch"](function (error) {
            alert("No se pudo completar registro: " + error);
        });
    }
    AB.Guardar = Guardar;
    function BuscarVehiculo() {
        var tipoABuscar = document.getElementById("filtro").value;
        return new Promise(function (resolve, reject) {
            var coincidencias = listaVehiculos.filter(function (vehiculo) { return vehiculo.constructor.name == tipoABuscar; });
            resolve(coincidencias);
        });
    }
    AB.BuscarVehiculo = BuscarVehiculo;
    function SwapTables() {
        var tablaVehiculos = document.getElementById("tablaVehiculos");
        var tablaFiltrados = document.getElementById("tablaFiltrados");
        if (document.getElementById("filtro").value != "") {
            tablaVehiculos.hidden = true;
            tablaFiltrados.innerHTML = "";
            BuscarVehiculo().then(function (listaFiltrada) {
                listaFiltrada.forEach(function (Vehiculo) {
                    var cantPuertas = 0;
                    var esCuatroXcuatro = false;
                    if (Vehiculo instanceof AB.Auto) {
                        cantPuertas = Vehiculo.getCantidadPuertas();
                    }
                    if (Vehiculo instanceof AB.Camioneta) {
                        esCuatroXcuatro = Vehiculo.getCuatroXcuatro();
                    }
                    ConstruirFila(tablaFiltrados, Vehiculo.getId(), Vehiculo.getMarca(), Vehiculo.getModelo(), Vehiculo.getPrecio(), cantPuertas, esCuatroXcuatro);
                });
            });
            tablaFiltrados.hidden = false;
        }
        else {
            tablaVehiculos.hidden = false;
            tablaFiltrados.hidden = true;
        }
    }
    AB.SwapTables = SwapTables;
    function CalcularPromedio() {
        BuscarVehiculo().then(function (listaCoincidencias) {
            var list = listaCoincidencias;
            var valorTotal = 0;
            if (list.length > 0) {
                valorTotal = list.reduce((function (total, veh) { return total += veh.getPrecio(); }), 0);
                document.getElementById("promedio").value = (valorTotal / list.length).toString();
            }
            else {
                valorTotal = listaVehiculos.reduce((function (total, veh) { return total += veh.getPrecio(); }), 0);
                document.getElementById("promedio").value = (valorTotal / list.length).toString();
            }
            document.getElementById("promedio").value = (valorTotal / listaVehiculos.length).toString();
        });
    }
    AB.CalcularPromedio = CalcularPromedio;
    function ConstruirFila(tabla, id, marca, modelo, precio, cantPuert, esCuatroXcuatro) {
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
    AB.ConstruirFila = ConstruirFila;
    function Eliminar(tr) {
        var trToDelete = tr.target.parentNode.parentNode;
        var idToDelete = trToDelete.childNodes[0].innerHTML;
        var listaId = listaVehiculos.filter(function (Vehiculo) { return Vehiculo.getId() == idToDelete; });
        if (listaId.length > 0) {
            listaVehiculos.splice(idToDelete, 1);
            var tablaVehiculos = document.getElementById("tablaVehiculos");
            tablaVehiculos.childNodes.forEach(function (element) {
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
    AB.Eliminar = Eliminar;
})(AB || (AB = {}));
