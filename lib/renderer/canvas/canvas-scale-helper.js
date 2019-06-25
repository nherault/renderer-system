"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var CanvasScaleHelper = /** @class */ (function () {
    function CanvasScaleHelper() {
        this.isInit = false;
        this.options = {
            background: 'black',
            imageRendering: 'auto',
            onWindowResizeEnabled: true,
            smoothImage: true,
        };
        this.bodyEl = document.createElement('body');
        this.displayEl = document.createElement('canvas');
        this.canvasElList = [];
        this.initialCanvasStyle = [];
        this.initialSmoothImageStyle = [];
        this.initialBodyStyle = '';
        this.initialDisplayElStyle = '';
        this.initialWidth = 0;
        this.initialHeight = 0;
    }
    CanvasScaleHelper.fullScreen = function (canvas) {
        if (canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen();
        }
        else {
            canvas.mozRequestFullScreen();
        }
    };
    CanvasScaleHelper.prototype.init = function (displayEl, options) {
        this.resetScaleDisplay();
        var bodyOf = document.getElementsByTagName('body');
        var body = bodyOf.item(0) !== null ? bodyOf.item(0) : document.createElement('body');
        if (body !== null) {
            this.bodyEl = body;
        }
        this.displayEl = displayEl;
        this.options = __assign({}, this.options, options);
        // Get the canvasList Dynamicly
        this.canvasElList = [];
        for (var _i = 0, _a = Array.from(displayEl.children); _i < _a.length; _i++) {
            var el = _a[_i];
            if (el instanceof HTMLCanvasElement) {
                this.canvasElList.push(el);
            }
        }
        if (this.canvasElList.length > 0) {
            this.initialWidth = this.canvasElList[0].width;
            this.initialHeight = this.canvasElList[0].height;
        }
        // Save styles
        this.initialCanvasStyle = new Array(this.canvasElList.length);
        this.initialSmoothImageStyle = new Array(this.canvasElList.length);
        for (var i = 0; i < this.canvasElList.length; i++) {
            this.initialCanvasStyle[i] = this.canvasElList[i].style.cssText;
            var ctx = this.canvasElList[i].getContext('2d');
            if (ctx) {
                this.initialSmoothImageStyle[i] = ctx.imageSmoothingEnabled;
            }
        }
        this.initialBodyStyle = this.bodyEl.style.cssText;
        this.initialDisplayElStyle = this.displayEl.style.cssText;
        this.isInit = true;
        return this;
    };
    CanvasScaleHelper.prototype.fullWindow = function () {
        var _this = this;
        if (this.isInit) {
            var ratio = Math.min(window.innerWidth / this.initialWidth, window.innerHeight / this.initialHeight);
            this.scaleDisplay(ratio);
            // Update Container Style
            this.displayEl.style.position = 'absolute';
            this.displayEl.style.zIndex = '100';
            this.displayEl.style.width = 'auto';
            this.displayEl.style.height = 'auto';
            this.displayEl.style.top = '0';
            this.displayEl.style.left = '0';
            this.displayEl.style.bottom = '0';
            this.displayEl.style.right = '0';
            this.displayEl.style.background = this.options.background;
            // Update Canvas Style
            for (var _i = 0, _a = this.canvasElList; _i < _a.length; _i++) {
                var canvasEl = _a[_i];
                canvasEl.style.position = 'absolute';
                canvasEl.style.top = '0';
                canvasEl.style.left = '0';
                canvasEl.style.bottom = '0';
                canvasEl.style.right = '0';
                canvasEl.style.textAlign = 'center';
                canvasEl.style.margin = 'auto';
            }
            // Update Body
            this.bodyEl.style.overflow = 'hidden';
            if (this.options.onWindowResizeEnabled) {
                window.onresize = function () {
                    _this.resetScaleDisplay();
                    _this.fullWindow();
                };
            }
        }
        return this;
    };
    CanvasScaleHelper.prototype.scaleDisplay = function (scale) {
        if (this.isInit) {
            this.resetScaleDisplay();
            this.scaleDisplayInternal(scale);
        }
        return this;
    };
    CanvasScaleHelper.prototype.resetScaleDisplay = function () {
        if (this.isInit) {
            window.onresize = null;
            this.scaleDisplayInternal(1);
            for (var i = 0; i < this.canvasElList.length; i++) {
                this.canvasElList[i].style.cssText = this.initialCanvasStyle[i];
                var ctx = this.canvasElList[i].getContext('2d');
                if (ctx) {
                    ctx.imageSmoothingEnabled = this.initialSmoothImageStyle[i];
                }
            }
            this.bodyEl.style.cssText = this.initialBodyStyle;
            this.displayEl.style.cssText = this.initialDisplayElStyle;
        }
        return this;
    };
    CanvasScaleHelper.prototype.scaleDisplayInternal = function (scale) {
        // Update Canvas
        var pixelRatio = window.devicePixelRatio || 1;
        for (var _i = 0, _a = this.canvasElList; _i < _a.length; _i++) {
            var canvasEl = _a[_i];
            canvasEl.width = scale * this.initialWidth * pixelRatio;
            canvasEl.height = scale * this.initialHeight * pixelRatio;
            canvasEl.style.width = scale * this.initialWidth + "px";
            canvasEl.style.height = scale * this.initialHeight + "px";
            canvasEl.style['image-rendering'] = this.options.imageRendering;
            var ctx = canvasEl.getContext('2d');
            if (ctx) {
                ctx.mozImageSmoothingEnabled = this.options.smoothImage;
                ctx.imageSmoothingEnabled = this.options.smoothImage;
                ctx.scale(scale * pixelRatio, scale * pixelRatio);
            }
        }
        return this;
    };
    return CanvasScaleHelper;
}());
exports.CanvasScaleHelper = CanvasScaleHelper;
//# sourceMappingURL=../../../src/src/renderer/canvas/canvas-scale-helper.js.map