import { SceneData } from '../renderer/scene/scene.types';
import { TilesPicture } from '../renderer/tiles/tiles-picture';
import { ImageLoader } from './image-loader';

export function loadJSON(
    url: string,
    onLoaded: (result: { url: string, result: any }) => void,
    onError?: (request: XMLHttpRequest) => void) {
    const request = new XMLHttpRequest();
    request.overrideMimeType('application/json');
    request.onreadystatechange = () => {
        // if DONE and SUCCESS
        if (request.readyState === 4) {
            if (request.status === 200) {
                onLoaded({url, result: JSON.parse(request.responseText)});
            } else if (onError) {
                onError(request);
            }
        }
    };
    request.open('GET', url, true);
    request.send();
}

export class SceneResourceLoader {
    private imageLoader: ImageLoader;
    private resources: {[key: string]: TilesPicture};

    constructor() {
        this.imageLoader = new ImageLoader();
        this.resources = {};
    }

    public load(sceneData: SceneData, callback: () => void) {
        const tilesets = sceneData.tilesets;
        if (sceneData.resources && tilesets) {
            const tilesetIdUrls = tilesets.reduce((acc: any, element) => {
                acc[element.id] = element.image;
                return acc;
            }, {});
            const imageUrls = tilesets.map((element) => element.image);
            this.imageLoader.preload((images) => {
                Object.keys(sceneData.resources).forEach((resourceKey) => {
                    const tilesetId = sceneData.resources[resourceKey].tilesetId;
                    const imageSource = images.find((image) => image.src.includes(tilesetIdUrls[tilesetId]));
                    const tileset = tilesets.find((currTileset) => currTileset.id === tilesetId);
                    if (tileset) {
                        this.resources[resourceKey] =
                        new TilesPicture(imageSource, tileset.nbTiles, tileset.tileDirection, tileset.tileWidth, tileset.tileHeight);
                    }
                });
                callback();
            }, ...imageUrls);
        } else {
            callback();
        }
    }

    public getResource(resourceId: string): any {
        return this.resources[resourceId];
    }
}
