import { Vector2DData } from '../commons/vector-2d/vector-2d.types';
import { AnimationFrameData } from '../tiles/tiles.types';
import { GridLayerData, LayerData, ObjectData, ObjectLayerData, RectangleShapeData, ResourceData, SceneData, ShapeData, TileData, TilesetData } from './scene.types';
export declare class SceneHandler {
    static getFirstObjectByProperty(sceneData: SceneData, propertyName: string, propertyValue: any): ObjectData | undefined;
    static getObjectLayers(sceneData: SceneData): ObjectLayerData[];
    static getObjectsByProperty(sceneData: SceneData, propertyName: string, propertyValue: any): ObjectData[];
    static getObjectHasProperty(sceneData: SceneData, propertyName: string): ObjectData[];
    static getObjectsByType(sceneData: SceneData, objectType: string): ObjectData[];
    static getObjectsByLayer(sceneData: SceneData, layerId: string): ObjectData[];
    static updateObjectAnimation(sceneData: SceneData, delta: number, layer: ObjectLayerData): void;
    static getLayer(sceneData: SceneData, layerId: string): LayerData | undefined;
    static setLayerOpacity(sceneData: SceneData, layerId: string, opacity: number): LayerData | undefined;
    static setLayerVisibility(sceneData: SceneData, layerId: string, visible: boolean): LayerData | undefined;
    static toogleLayerVisibility(sceneData: SceneData, layerId: string): LayerData | undefined;
    static updateTileOnGridLayer(sceneData: SceneData, layerId: string, x: number, y: number, resourceId: string): GridLayerData;
    static addObjectToLayerFromResourceId(sceneData: SceneData, layerId: string, position: Vector2DData, resourceId: string): ObjectData;
    static removeObjectFromLayer(sceneData: SceneData, layerId: string, objectIndex: number): ObjectData[];
    static removeObject(sceneData: SceneData, layerId: string, objectId: number): ObjectData[];
    static getAnimationFromResourceId(sceneData: SceneData, resourceId: string): AnimationFrameData[] | undefined;
    static getAnimationFromResource(sceneData: SceneData, resource: ResourceData): AnimationFrameData[] | undefined;
    static getTileset(sceneData: SceneData, tileId: string): TilesetData | undefined;
    static getResource(sceneData: SceneData, resourceId: string): ResourceData;
    static getTileDataFromResource(sceneData: SceneData, resource: ResourceData): TileData | undefined;
    static getTilesetFromGId(sceneData: SceneData, gid: number): TilesetData | undefined;
    static getCollisionMaskFromObject(sceneData: SceneData, objectData: ObjectData, generateDefault?: boolean): ShapeData[] | undefined;
    static getImageCollisionMaskFromTileset(tileset: TilesetData): RectangleShapeData;
    static getCollisionMaskFromResourceId(sceneData: SceneData, resourceId: string): ShapeData[] | undefined;
    static getCollisionMaskFromTileset(tileset: TilesetData, tileIndex: number, generateDefault?: boolean): ShapeData[] | undefined;
    static getCollisionMaskFromResource(sceneData: SceneData, resource: ResourceData, generateDefault?: boolean): ShapeData[] | undefined;
}
