import {CanvasFactory} from './canvas-factory';

export class CanvasLayerManager {

  private width: number;
  private height: number;
  private layers: Map<string, HTMLCanvasElement>;
  private contextLayers: Map<string, CanvasRenderingContext2D>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.layers = new Map<string, HTMLCanvasElement>();
    this.contextLayers = new Map<string, CanvasRenderingContext2D>();
  }

  public addLayer(id: string, zIndex: number | string): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = CanvasFactory.createCanvas(this.width, this.height);
    canvas.id = id;
    canvas.style.position = 'absolute';
    canvas.style.zIndex = zIndex.toString();
    this.layers.set(id, canvas);
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context) {
      this.contextLayers.set(id, context);
    }
    return canvas;
  }

  public initLayers(...layerIds: string[]): CanvasLayerManager {

    let zIndex: number = 1;

    layerIds.forEach((id: string) => {
      this.addLayer(id, zIndex);
      zIndex++;
    });
    return this;
  }

  public redrawLayers(width: number, height: number): CanvasLayerManager {

    this.width = width;
    this.height = height;

    // Save the ids and zIndex.
    const idzIndexMap = new Map<string, string>();
    this.layers.forEach((canvas: HTMLCanvasElement, key: string) => {
      const zIndex: string = canvas.style.zIndex !== null ? canvas.style.zIndex : '1';
      idzIndexMap.set(key, zIndex);
    });

    this.resetLayers();

    // Redraw the layers
    idzIndexMap.forEach((zIndex, id) => this.addLayer(id, zIndex));

    return this;
  }

  public resetLayers(): CanvasLayerManager {
    this.layers.clear();
    this.contextLayers.clear();
    return this;
  }

  public removeLayer(id: string): CanvasLayerManager {
    this.layers.delete(id);
    this.contextLayers.delete(id);
    return this;
  }

  public initLayersToDisplay(displayElement: HTMLElement): CanvasLayerManager {

    // Empty the displayElement
    while (displayElement.lastChild) {
      displayElement.removeChild(displayElement.lastChild);
    }
    displayElement.textContent = '';

    // Update the size of the element
    displayElement.style.width = `${this.width}px`;
    displayElement.style.height = `${this.height}px`;

    // Add all the layers to the element
    this.layers.forEach((canvas) => {
      displayElement.appendChild(canvas);
    });
    return this;
  }

  public getCanvas(id: string): HTMLCanvasElement | undefined {
    return this.layers.get(id);
  }

  public getCanvasContext(id: string): CanvasRenderingContext2D | undefined {
    return this.contextLayers.get(id);
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }
}
