import {AnimationHandler} from '../tiles/animation-handler';
import {AnimationFrameData} from '../tiles/tiles.types';
import {LayerData, ObjectData, RectangleShapeData, ResourceData, ResourceType, SceneData, ShapeData,
    TileData, TilesetData, TilesetType, View} from './scene.types';

export class SceneHandler {

    ///////////////////////////////////////////////
    // Layer
    ///////////////////////////////////////////////
    public static getLayers(sceneData: SceneData, layerId: string): LayerData[] {
        return sceneData.views.reduce((layers: LayerData[], view: View): LayerData[] => {
            const layerResult = view.layers.find((layer: LayerData) => layer.id === layerId);
            if (layerResult) {
                layers.push(layerResult);
            }
            return layers;
        }, []);
    }

    public static setLayerOpacity(sceneData: SceneData, layerId: string, opacity: number): LayerData[] | undefined {
        const layers = SceneHandler.getLayers(sceneData, layerId);
        layers.forEach((layer: LayerData) => layer.opacity = opacity);
        return layers;
    }

    public static setLayerVisibility(sceneData: SceneData, layerId: string, visible: boolean): LayerData[] | undefined {
        const layers = SceneHandler.getLayers(sceneData, layerId);
        layers.forEach((layer: LayerData) => layer.visible = visible);
        return layers;
    }

    public static toogleLayerVisibility(sceneData: SceneData, layerId: string): LayerData[] | undefined {
        const layers = SceneHandler.getLayers(sceneData, layerId);
        layers.forEach((layer: LayerData) => layer.visible = !layer.visible);
        return layers;
    }

    ///////////////////////////////////////////////
    // Resources and Tilesets
    ///////////////////////////////////////////////
    public static getAnimationFromResourceId(sceneData: SceneData, resourceId: string): AnimationFrameData[] | undefined {
        const resource = SceneHandler.getResource(sceneData, resourceId);
        return SceneHandler.getAnimationFromResource(sceneData, resource);
    }

    public static getAnimationFromResource(sceneData: SceneData, resource: ResourceData): AnimationFrameData[] | undefined {
        const tileData = SceneHandler.getTileDataFromResource(sceneData, resource);
        return tileData ? tileData.animation : undefined;
    }

    public static getTileset(sceneData: SceneData, tileId: string): TilesetData | undefined {
        return sceneData.tilesets && sceneData.tilesets.find((tileset) => tileset.id === tileId);
    }

    public static getResource(sceneData: SceneData, resourceId: string): ResourceData {
        return sceneData.resources[resourceId];
    }

    public static getTileDataFromResource(sceneData: SceneData, resource: ResourceData): TileData | undefined {
        const tileset = SceneHandler.getTileset(sceneData, resource.tilesetId);
        return tileset && tileset.tileDatas && tileset.tileDatas[resource.tileIndex];
    }

    public static getTilesetFromGId(sceneData: SceneData, gid: number) {
        return sceneData && sceneData.tilesets && sceneData.tilesets.find((tileset: TilesetData) => {
            return tileset.firstResourceId <= gid && tileset.firstResourceId + tileset.nbTiles > gid;
        });
    }

    ///////////////////////////////////////////////
    // Collision Masks
    ///////////////////////////////////////////////
    public static getCollisionMaskFromObject(
        sceneData: SceneData, objectData: ObjectData, generateDefault = true): ShapeData[] | undefined {
        const resource = SceneHandler.getResource(sceneData, objectData.resourceId);
        if (resource.type === ResourceType.ANIMATION) {

            const frames = SceneHandler.getAnimationFromResource(sceneData, resource);
            if (frames && objectData.animation) {
                const tileIndex = AnimationHandler.getCurrentId({state: objectData.animation, frames});
                const tileset = SceneHandler.getTileset(sceneData, resource.tilesetId);

                return tileset ? SceneHandler.getCollisionMaskFromTileset(tileset, tileIndex, generateDefault) : undefined;
            }
        } else {
            return SceneHandler.getCollisionMaskFromResource(sceneData, resource, generateDefault);
        }
        return undefined;
    }

    public static getImageCollisionMaskFromTileset(tileset: TilesetData): RectangleShapeData {
        return {
            height: tileset.type === TilesetType.IMAGE ? tileset.imageHeight : tileset.tileHeight,
            rotation: 0,
            type: 'rectangle',
            visible: true,
            width: tileset.type === TilesetType.IMAGE ? tileset.imageWidth : tileset.tileWidth,
            x: 0,
            y: 0,
        };
    }

    public static getCollisionMaskFromResourceId(sceneData: SceneData, resourceId: string): ShapeData[] | undefined {
        return SceneHandler.getCollisionMaskFromResource(sceneData, SceneHandler.getResource(sceneData, resourceId));
    }

    public static getCollisionMaskFromTileset(tileset: TilesetData, tileIndex: number, generateDefault = true): ShapeData[] | undefined {

        if (tileset.tileDatas && tileset.tileDatas[tileIndex] && tileset.tileDatas[tileIndex].collisionMasks) {
            return tileset.tileDatas[tileIndex].collisionMasks;
        } else if (generateDefault) {
            return [SceneHandler.getImageCollisionMaskFromTileset(tileset)];
        }
        return undefined;
    }

    public static getCollisionMaskFromResource(
        sceneData: SceneData, resource: ResourceData, generateDefault = true): ShapeData[] | undefined {

        const tileset = SceneHandler.getTileset(sceneData, resource.tilesetId);
        if (tileset && tileset.tileDatas && tileset.tileDatas[resource.tileIndex] && tileset.tileDatas[resource.tileIndex].collisionMasks) {
            return tileset.tileDatas[resource.tileIndex].collisionMasks;
        } else if (tileset && generateDefault) {
            return [SceneHandler.getImageCollisionMaskFromTileset(tileset)];
        }
        return undefined;
    }
}
