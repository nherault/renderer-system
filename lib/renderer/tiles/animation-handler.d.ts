import { RectangleData } from '../commons/shape/shape.types';
import { TilesPicture } from './tiles-picture';
import { AnimationData } from './tiles.types';
export declare class AnimationHandler {
    static pauseAnimation(animationData: AnimationData): AnimationData;
    static stopAnimation(animationData: AnimationData): AnimationData;
    static isAnimationOver(animationData: AnimationData): boolean;
    static updateAnimation(animationData: AnimationData, elapsedTime: number): AnimationData;
    static setSprite(animationData: AnimationData, animationCount: number): AnimationData;
    static getCurrentId(animationData: AnimationData): number;
    static getCurrentSprite(animationData: AnimationData, tilesPicture: TilesPicture): RectangleData | undefined;
}
