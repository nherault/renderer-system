export interface CanvasScaleHelperOptions {
    imageRendering?: string;
    smoothImage?: boolean;
    background?: string;
    onWindowResizeEnabled?: boolean;
}

export class CanvasScaleHelper {

    public static fullScreen(canvas: HTMLCanvasElement): void {
        if ((canvas as any).webkitRequestFullScreen) {
            (canvas as any).webkitRequestFullScreen();
        } else {
            (canvas as any).mozRequestFullScreen();
        }
    }

    private bodyEl: HTMLBodyElement;
    private displayEl: HTMLElement | HTMLCanvasElement;
    private canvasElList: HTMLCanvasElement[];

    private isInit: boolean;
    private options: {
        background: string;
        smoothImage: boolean;
        imageRendering: string;
        onWindowResizeEnabled: boolean;
    };

    private initialCanvasStyle: string[];
    private initialSmoothImageStyle: boolean[];
    private initialBodyStyle: string;
    private initialDisplayElStyle: string;
    private initialWidth: number;
    private initialHeight: number;

    constructor() {
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

    public init(displayEl: HTMLElement | HTMLCanvasElement, options?: CanvasScaleHelperOptions): CanvasScaleHelper {
        this.resetScaleDisplay();

        const bodyOf = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>;
        const body = bodyOf.item(0) !== null ? bodyOf.item(0) : document.createElement('body');
        if (body !== null) {
            this.bodyEl = body;
        }
        this.displayEl = displayEl;
        this.options = { ...this.options, ...options };

        // Get the canvasList Dynamicly
        this.canvasElList = [];
        for (const el of Array.from(displayEl.children)) {
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
        for (let i = 0; i < this.canvasElList.length; i++) {
            this.initialCanvasStyle[i] = this.canvasElList[i].style.cssText;
            const ctx = this.canvasElList[i].getContext('2d');
            if (ctx) {
                this.initialSmoothImageStyle[i] = ctx.imageSmoothingEnabled;
            }
        }
        this.initialBodyStyle = this.bodyEl.style.cssText;
        this.initialDisplayElStyle = this.displayEl.style.cssText;

        this.isInit = true;
        return this;
    }

    public fullWindow(): CanvasScaleHelper {

        if (this.isInit) {
            const ratio = Math.min(window.innerWidth / this.initialWidth, window.innerHeight / this.initialHeight);

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
            for (const canvasEl of this.canvasElList) {
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
                window.onresize = () => {
                    this.resetScaleDisplay();
                    this.fullWindow();
                };
            }
        }
        return this;
    }

    public scaleDisplay(scale: number): CanvasScaleHelper {

        if (this.isInit) {
            this.resetScaleDisplay();
            this.scaleDisplayInternal(scale);
        }
        return this;
    }

    public resetScaleDisplay(): CanvasScaleHelper {
        if (this.isInit) {
            window.onresize = null;

            this.scaleDisplayInternal(1);

            for (let i = 0; i < this.canvasElList.length; i++) {
                this.canvasElList[i].style.cssText = this.initialCanvasStyle[i];
                const ctx = this.canvasElList[i].getContext('2d');
                if (ctx) {
                    ctx.imageSmoothingEnabled = this.initialSmoothImageStyle[i];
                }
            }
            this.bodyEl.style.cssText = this.initialBodyStyle;
            this.displayEl.style.cssText = this.initialDisplayElStyle;
        }
        return this;
    }

    private scaleDisplayInternal(scale: number): CanvasScaleHelper {

        // Update Canvas
        const pixelRatio = window.devicePixelRatio || 1;
        for (const canvasEl of this.canvasElList) {

            canvasEl.width = scale * this.initialWidth * pixelRatio;
            canvasEl.height = scale * this.initialHeight * pixelRatio;

            canvasEl.style.width = `${scale * this.initialWidth}px`;
            canvasEl.style.height = `${scale * this.initialHeight}px`;
            (canvasEl.style as any)['image-rendering'] = this.options.imageRendering;

            const ctx = canvasEl.getContext('2d');
            if (ctx) {
                (ctx as any).mozImageSmoothingEnabled = this.options.smoothImage;
                ctx.imageSmoothingEnabled = this.options.smoothImage;

                ctx.scale(scale * pixelRatio, scale * pixelRatio);
            }
        }
        return this;
    }
}
