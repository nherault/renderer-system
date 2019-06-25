import { AnimationData, AnimationFrameData, AnimationState } from './tiles.types';
export interface AnimationDataOptionParam {
    isLoop?: boolean;
    speedRatio?: number;
}
export declare class AnimationFactory {
    static createAnimationDataFromArray(sprites: AnimationFrameData[], options?: AnimationDataOptionParam): AnimationData;
    static createAnimationData(startSprite: number, endSprite: number, delay: number, options?: AnimationDataOptionParam): AnimationData;
    static createAnimationFrameDataFromArray(frames: AnimationFrameData[], options?: {
        speedRatio?: number;
    }): AnimationFrameData[];
    static createAnimationFrameData(startSprite: number, endSprite: number, delay: number, options?: {
        speedRatio?: number;
    }): AnimationFrameData[];
    static createAnimationState(frames: AnimationFrameData[], options?: {
        isLoop?: boolean;
    }): AnimationState;
}
