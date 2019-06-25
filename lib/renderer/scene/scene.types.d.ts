import { Vector2DData } from '../commons/vector-2d/vector-2d.types';
import { View } from '../commons/view/view.types';
import { AnimationFrameData, AnimationState, TileDirection } from '../tiles/tiles.types';
export interface LayerDataCommon {
    id: string;
    type: string;
    opacity: number;
    visible: boolean;
    x: number;
    y: number;
    render?: string;
}
export interface ImageLayerData extends LayerDataCommon {
    image: string;
    type: LayerType.IMAGE_LAYER;
}
export interface GridLayerData extends LayerDataCommon {
    type: LayerType.GRID_LAYER;
    data: number[];
    height: number;
    width: number;
}
export interface ObjectLayerData extends LayerDataCommon {
    objects: ObjectData[];
    type: LayerType.OBJECT_LAYER;
}
export interface CustomLayerData extends LayerDataCommon {
    type: LayerType.CUSTOM_LAYER;
}
export interface ObjectData {
    id: number;
    resourceId: string;
    visible: boolean;
    rotation: number;
    horizontalFlip: boolean;
    verticalFlip: boolean;
    size: Vector2DData;
    position: Vector2DData;
    opacity?: number;
    name?: string;
    type?: string;
    animation?: AnimationState;
}
export declare enum LayerType {
    IMAGE_LAYER = "image_layer",
    GRID_LAYER = "grid_layer",
    OBJECT_LAYER = "object_layer",
    CUSTOM_LAYER = "custom_layer"
}
export declare type LayerData = ImageLayerData | GridLayerData | ObjectLayerData | CustomLayerData;
export interface TilesetData {
    id: string;
    firstResourceId: number;
    image: string;
    imageHeight: number;
    imageWidth: number;
    tileDirection: TileDirection;
    nbTiles: number;
    tileHeight: number;
    tileWidth: number;
    type: TilesetType;
    tileDatas?: TileDatas;
}
export declare enum TilesetType {
    IMAGE = "image",
    GRID = "grid"
}
export interface TileDatas {
    [id: string]: TileData;
}
export interface TileData {
    name: string;
    objects?: ShapeData[];
    animation?: AnimationFrameData[];
    collisionMasks?: ShapeData[];
}
export interface ShapeDataCommon {
    height: number;
    width: number;
    x: number;
    y: number;
    visible: boolean;
    rotation: number;
    name?: string;
    type?: string;
}
export interface RectangleShapeData extends ShapeDataCommon {
    type: 'rectangle';
}
export interface EllipseShapeData extends ShapeDataCommon {
    type: 'ellipse';
}
export interface PolygoneShapeData extends ShapeDataCommon {
    type: 'polygone';
    polygone: Vector2DData[];
}
export interface PolylineShapeData extends ShapeDataCommon {
    type: 'polyline';
    polygone: Vector2DData[];
}
export declare type ShapeData = RectangleShapeData | EllipseShapeData | PolygoneShapeData | PolylineShapeData;
export interface SceneData {
    objectIdCount: number;
    backgroundColor?: string;
    view: View;
    layers: LayerData[];
    tilesets?: TilesetData[];
    resources: ResourceDatas;
    tileHeight: number;
    tileWidth: number;
}
export interface ResourceDataCommon {
    id: string;
    tilesetId: string;
    tileIndex: number;
    type: ResourceType;
}
export interface ImageResourceData extends ResourceDataCommon {
    type: ResourceType.IMAGE;
}
export interface TileResourceData extends ResourceDataCommon {
    type: ResourceType.TILE;
}
export interface AnimationResourceData extends ResourceDataCommon {
    type: ResourceType.ANIMATION;
}
export declare enum ResourceType {
    IMAGE = "image",
    TILE = "tile",
    ANIMATION = "animation"
}
export declare type ResourceData = ImageResourceData | TileResourceData | AnimationResourceData;
export interface ResourceDatas {
    [id: string]: ResourceData;
}
