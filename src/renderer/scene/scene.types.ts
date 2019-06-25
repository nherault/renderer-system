import {Vector2DData} from '../commons/vector-2d/vector-2d.types';
import {AnimationFrameData, AnimationState, TileDirection} from '../tiles/tiles.types';
import { ViewData } from '../commons/view/view.types';

/////////////////////////////////////////
// Layers
/////////////////////////////////////////
export interface LayerData {
    id: string;
    backgroundColor?: string;
    opacity?: number;
    visible?: boolean;
    context: CanvasRenderingContext2D;
    [propName: string]: any;
}

/////////////////////////////////////////
// Tileset
/////////////////////////////////////////
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

export enum TilesetType {
    IMAGE = 'image',
    GRID = 'grid',
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

export type ShapeData = RectangleShapeData | EllipseShapeData | PolygoneShapeData | PolylineShapeData;

/////////////////////////////////////////
// Main Scene
/////////////////////////////////////////
export interface SceneData {
    type: string;
    display: { size: Vector2DData };
    views: View[];
    tilesets?: TilesetData[];
    resources: ResourceDatas;
}

export interface RenderData {
    objects: ObjectData[];
    layerFilters?: LayerFilter[];
}

export interface ObjectData {
    id: number;
    layerId: string;
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
    [propName: string]: any;
}

export interface ObjectFilter {
    data?: any;
    type: string;
}

export interface LayerFilter {
    data?: any;
    layerId?: string;
    type: string;
    viewsId?: string[];
}

export interface View extends ViewData {
    id: string;
    offset: Vector2DData;
    layers: LayerData[];
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

export enum ResourceType {
    IMAGE = 'image',
    TILE = 'tile',
    ANIMATION = 'animation',
}

export type ResourceData = ImageResourceData | TileResourceData | AnimationResourceData;

export interface ResourceDatas {
    [id: string]: ResourceData;
}
