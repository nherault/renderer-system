import { CanvasFactory } from './canvas-factory';
var CanvasLayerManager = /** @class */ (function () {
    function CanvasLayerManager(width, height) {
        this.width = width;
        this.height = height;
        this.layers = new Map();
        this.contextLayers = new Map();
    }
    CanvasLayerManager.prototype.addLayer = function (id, zIndex) {
        var canvas = CanvasFactory.createCanvas(this.width, this.height);
        canvas.id = id;
        canvas.style.position = 'absolute';
        canvas.style.zIndex = zIndex.toString();
        this.layers.set(id, canvas);
        var context = canvas.getContext('2d');
        if (context) {
            this.contextLayers.set(id, context);
        }
        return canvas;
    };
    CanvasLayerManager.prototype.initLayers = function () {
        var _this = this;
        var layerIds = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            layerIds[_i] = arguments[_i];
        }
        var zIndex = 1;
        layerIds.forEach(function (id) {
            _this.addLayer(id, zIndex);
            zIndex++;
        });
        return this;
    };
    CanvasLayerManager.prototype.redrawLayers = function (width, height) {
        var _this = this;
        this.width = width;
        this.height = height;
        // Save the ids and zIndex.
        var idzIndexMap = new Map();
        this.layers.forEach(function (canvas, key) {
            var zIndex = canvas.style.zIndex !== null ? canvas.style.zIndex : '1';
            idzIndexMap.set(key, zIndex);
        });
        this.resetLayers();
        // Redraw the layers
        idzIndexMap.forEach(function (zIndex, id) { return _this.addLayer(id, zIndex); });
        return this;
    };
    CanvasLayerManager.prototype.resetLayers = function () {
        this.layers.clear();
        this.contextLayers.clear();
        return this;
    };
    CanvasLayerManager.prototype.removeLayer = function (id) {
        this.layers.delete(id);
        this.contextLayers.delete(id);
        return this;
    };
    CanvasLayerManager.prototype.initLayersToDisplay = function (displayElement) {
        // Empty the displayElement
        while (displayElement.lastChild) {
            displayElement.removeChild(displayElement.lastChild);
        }
        displayElement.textContent = '';
        // Update the size of the element
        displayElement.style.width = this.width + "px";
        displayElement.style.height = this.height + "px";
        // Add all the layers to the element
        this.layers.forEach(function (canvas) {
            displayElement.appendChild(canvas);
        });
        return this;
    };
    CanvasLayerManager.prototype.getCanvas = function (id) {
        return this.layers.get(id);
    };
    CanvasLayerManager.prototype.getCanvasContext = function (id) {
        return this.contextLayers.get(id);
    };
    CanvasLayerManager.prototype.getWidth = function () {
        return this.width;
    };
    CanvasLayerManager.prototype.getHeight = function () {
        return this.height;
    };
    return CanvasLayerManager;
}());
export { CanvasLayerManager };
//# sourceMappingURL=../../../src/src/renderer/canvas/canvas-layer-manager.js.map