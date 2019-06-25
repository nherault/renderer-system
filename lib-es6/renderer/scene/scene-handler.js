import { AnimationFactory } from '../tiles/animation-factory';
import { AnimationHandler } from '../tiles/animation-handler';
import { LayerType, ResourceType, TilesetType } from './scene.types';
var SceneHandler = /** @class */ (function () {
    function SceneHandler() {
    }
    ///////////////////////////////////////////////
    // Objects
    ///////////////////////////////////////////////
    SceneHandler.getFirstObjectByProperty = function (sceneData, propertyName, propertyValue) {
        var objectLayers = sceneData.layers.filter(function (layer) { return layer.type === LayerType.OBJECT_LAYER; });
        for (var _i = 0, objectLayers_1 = objectLayers; _i < objectLayers_1.length; _i++) {
            var objectLayerData = objectLayers_1[_i];
            var result = objectLayerData.objects
                .find(function (object) { return object && object[propertyName] === propertyValue; });
            if (result) {
                return result;
            }
        }
        return undefined;
    };
    SceneHandler.getObjectLayers = function (sceneData) {
        return sceneData.layers
            .filter(function (layer) { return layer.type === LayerType.OBJECT_LAYER; });
    };
    SceneHandler.getObjectsByProperty = function (sceneData, propertyName, propertyValue) {
        return SceneHandler.getObjectLayers(sceneData)
            .reduce(function (objects, currentLayer) {
            return objects.concat(currentLayer.objects
                .filter(function (objectData) { return objectData && objectData[propertyName] === propertyValue; }));
        }, []);
    };
    SceneHandler.getObjectHasProperty = function (sceneData, propertyName) {
        return SceneHandler.getObjectLayers(sceneData)
            .reduce(function (objects, currentLayer) {
            return objects.concat(currentLayer.objects
                .filter(function (objectData) { return objectData && objectData[propertyName] !== undefined; }));
        }, []);
    };
    SceneHandler.getObjectsByType = function (sceneData, objectType) {
        return SceneHandler.getObjectLayers(sceneData)
            .filter(function (layer) { return layer.type === LayerType.OBJECT_LAYER; })
            .reduce(function (objects, currentLayer) {
            return objects.concat(currentLayer.objects.filter(function (objectData) { return objectData && objectData.type === objectType; }));
        }, []);
    };
    SceneHandler.getObjectsByLayer = function (sceneData, layerId) {
        return SceneHandler.getLayer(sceneData, layerId).objects;
    };
    SceneHandler.updateObjectAnimation = function (sceneData, delta, layer) {
        layer.objects.forEach(function (currentObject) {
            if (currentObject && currentObject.animation) {
                var frames_1 = SceneHandler.getAnimationFromResource(sceneData, SceneHandler.getResource(sceneData, currentObject.resourceId));
                if (frames_1) {
                    AnimationHandler.updateAnimation({ state: currentObject.animation, frames: frames_1 }, delta);
                }
            }
        });
    };
    ///////////////////////////////////////////////
    // Layer
    ///////////////////////////////////////////////
    SceneHandler.getLayer = function (sceneData, layerId) {
        return sceneData.layers.find(function (layer) { return layer.id === layerId; });
    };
    SceneHandler.setLayerOpacity = function (sceneData, layerId, opacity) {
        var layer = SceneHandler.getLayer(sceneData, layerId);
        if (layer) {
            layer.opacity = opacity;
        }
        return layer;
    };
    SceneHandler.setLayerVisibility = function (sceneData, layerId, visible) {
        var layer = SceneHandler.getLayer(sceneData, layerId);
        if (layer) {
            layer.visible = visible;
        }
        return layer;
    };
    SceneHandler.toogleLayerVisibility = function (sceneData, layerId) {
        var layer = SceneHandler.getLayer(sceneData, layerId);
        if (layer) {
            layer.visible = !layer.visible;
        }
        return layer;
    };
    SceneHandler.updateTileOnGridLayer = function (sceneData, layerId, x, y, resourceId) {
        var gridLayer = SceneHandler.getLayer(sceneData, layerId);
        var resource = SceneHandler.getResource(sceneData, resourceId);
        var tileset = SceneHandler.getTileset(sceneData, resource.tilesetId);
        if (tileset) {
            gridLayer.data[y * gridLayer.width + x] = tileset.firstResourceId + resource.tileIndex;
        }
        return gridLayer;
    };
    SceneHandler.addObjectToLayerFromResourceId = function (sceneData, layerId, position, resourceId) {
        var objectLayer = SceneHandler.getLayer(sceneData, layerId);
        var resource = SceneHandler.getResource(sceneData, resourceId);
        var tileset = SceneHandler.getTileset(sceneData, resource.tilesetId);
        var objectData = {
            horizontalFlip: false,
            id: sceneData.objectIdCount++,
            position: position,
            resourceId: resourceId,
            rotation: 0,
            size: {
                x: 0,
                y: 0,
            },
            verticalFlip: false,
            visible: true,
        };
        if (tileset) {
            if (resource.type === ResourceType.IMAGE) {
                objectData.size = {
                    x: tileset.imageWidth,
                    y: tileset.imageHeight,
                };
            }
            else if (resource.type === ResourceType.TILE) {
                objectData.size = {
                    x: tileset.tileWidth,
                    y: tileset.tileHeight,
                };
            }
            else if (resource.type === ResourceType.ANIMATION) {
                objectData.size = {
                    x: tileset.tileWidth,
                    y: tileset.tileHeight,
                };
                var animationFrameData = SceneHandler.getAnimationFromResourceId(sceneData, resource.id);
                if (animationFrameData) {
                    objectData.animation = AnimationFactory.createAnimationState(animationFrameData, { isLoop: true });
                }
            }
        }
        objectLayer.objects.push(objectData);
        return objectData;
    };
    SceneHandler.removeObjectFromLayer = function (sceneData, layerId, objectIndex) {
        return SceneHandler.getLayer(sceneData, layerId).objects.splice(objectIndex, 1);
    };
    SceneHandler.removeObject = function (sceneData, layerId, objectId) {
        var objectIndex = SceneHandler.getLayer(sceneData, layerId)
            .objects.findIndex(function (currentObject) { return objectId === currentObject.id; });
        return SceneHandler.removeObjectFromLayer(sceneData, layerId, objectIndex);
    };
    ///////////////////////////////////////////////
    // Resources and Tilesets
    ///////////////////////////////////////////////
    SceneHandler.getAnimationFromResourceId = function (sceneData, resourceId) {
        var resource = SceneHandler.getResource(sceneData, resourceId);
        return SceneHandler.getAnimationFromResource(sceneData, resource);
    };
    SceneHandler.getAnimationFromResource = function (sceneData, resource) {
        var tileData = SceneHandler.getTileDataFromResource(sceneData, resource);
        return tileData ? tileData.animation : undefined;
    };
    SceneHandler.getTileset = function (sceneData, tileId) {
        return sceneData.tilesets && sceneData.tilesets.find(function (tileset) { return tileset.id === tileId; });
    };
    SceneHandler.getResource = function (sceneData, resourceId) {
        return sceneData.resources[resourceId];
    };
    SceneHandler.getTileDataFromResource = function (sceneData, resource) {
        var tileset = SceneHandler.getTileset(sceneData, resource.tilesetId);
        return tileset && tileset.tileDatas && tileset.tileDatas[resource.tileIndex];
    };
    SceneHandler.getTilesetFromGId = function (sceneData, gid) {
        return sceneData && sceneData.tilesets && sceneData.tilesets.find(function (tileset) {
            return tileset.firstResourceId <= gid && tileset.firstResourceId + tileset.nbTiles > gid;
        });
    };
    ///////////////////////////////////////////////
    // Collision Masks
    ///////////////////////////////////////////////
    SceneHandler.getCollisionMaskFromObject = function (sceneData, objectData, generateDefault) {
        if (generateDefault === void 0) { generateDefault = true; }
        var resource = SceneHandler.getResource(sceneData, objectData.resourceId);
        if (resource.type === ResourceType.ANIMATION) {
            var frames_2 = SceneHandler.getAnimationFromResource(sceneData, resource);
            if (frames_2 && objectData.animation) {
                var tileIndex = AnimationHandler.getCurrentId({ state: objectData.animation, frames: frames_2 });
                var tileset = SceneHandler.getTileset(sceneData, resource.tilesetId);
                return tileset ? SceneHandler.getCollisionMaskFromTileset(tileset, tileIndex, generateDefault) : undefined;
            }
        }
        else {
            return SceneHandler.getCollisionMaskFromResource(sceneData, resource, generateDefault);
        }
        return undefined;
    };
    SceneHandler.getImageCollisionMaskFromTileset = function (tileset) {
        return {
            height: tileset.type === TilesetType.IMAGE ? tileset.imageHeight : tileset.tileHeight,
            rotation: 0,
            type: 'rectangle',
            visible: true,
            width: tileset.type === TilesetType.IMAGE ? tileset.imageWidth : tileset.tileWidth,
            x: 0,
            y: 0,
        };
    };
    SceneHandler.getCollisionMaskFromResourceId = function (sceneData, resourceId) {
        return SceneHandler.getCollisionMaskFromResource(sceneData, SceneHandler.getResource(sceneData, resourceId));
    };
    SceneHandler.getCollisionMaskFromTileset = function (tileset, tileIndex, generateDefault) {
        if (generateDefault === void 0) { generateDefault = true; }
        if (tileset.tileDatas && tileset.tileDatas[tileIndex] && tileset.tileDatas[tileIndex].collisionMasks) {
            return tileset.tileDatas[tileIndex].collisionMasks;
        }
        else if (generateDefault) {
            return [SceneHandler.getImageCollisionMaskFromTileset(tileset)];
        }
        return undefined;
    };
    SceneHandler.getCollisionMaskFromResource = function (sceneData, resource, generateDefault) {
        if (generateDefault === void 0) { generateDefault = true; }
        var tileset = SceneHandler.getTileset(sceneData, resource.tilesetId);
        if (tileset && tileset.tileDatas && tileset.tileDatas[resource.tileIndex] && tileset.tileDatas[resource.tileIndex].collisionMasks) {
            return tileset.tileDatas[resource.tileIndex].collisionMasks;
        }
        else if (tileset && generateDefault) {
            return [SceneHandler.getImageCollisionMaskFromTileset(tileset)];
        }
        return undefined;
    };
    return SceneHandler;
}());
export { SceneHandler };
//# sourceMappingURL=../../../src/src/renderer/scene/scene-handler.js.map