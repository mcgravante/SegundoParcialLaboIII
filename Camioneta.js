var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AB;
(function (AB) {
    var Camioneta = /** @class */ (function (_super) {
        __extends(Camioneta, _super);
        function Camioneta(id, marca, modelo, precio, cuatroXcuatro) {
            var _this = _super.call(this, id, marca, modelo, precio) || this;
            _this.cuatroXcuatro = cuatroXcuatro;
            return _this;
        }
        Camioneta.prototype.getCuatroXcuatro = function () {
            return this.cuatroXcuatro;
        };
        Camioneta.prototype.setCuatroXcuatro = function (cuatroXcuatro) {
            this.cuatroXcuatro = cuatroXcuatro;
        };
        return Camioneta;
    }(AB.Vehiculo));
    AB.Camioneta = Camioneta;
})(AB || (AB = {}));
