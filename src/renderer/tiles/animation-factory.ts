import { AnimationData, AnimationFrameData, AnimationState } from './tiles.types';

export interface AnimationDataOptionParam {
    isLoop?: boolean;
    speedRatio?: number;
}

export class AnimationFactory {

    public static createAnimationDataFromArray(
        sprites: AnimationFrameData[],
        options?: AnimationDataOptionParam): AnimationData {
        return {
            frames: AnimationFactory.createAnimationFrameDataFromArray(sprites, options),
            state: AnimationFactory.createAnimationState(sprites, options),
        };
    }

    public static createAnimationData(
        startSprite: number, endSprite: number, delay: number,
        options?: AnimationDataOptionParam): AnimationData {
        const frames = AnimationFactory.createAnimationFrameData(startSprite, endSprite, delay, options);
        return {
            frames,
            state: AnimationFactory.createAnimationState(frames, options),
        };
    }

    public static createAnimationFrameDataFromArray(
        frames: AnimationFrameData[],
        options?: {speedRatio?: number}): AnimationFrameData[] {
        const speedRatio = options && options.speedRatio !== undefined ? options.speedRatio : 1.0;
        return frames.map((sprite) => ({
                delay: sprite.delay * speedRatio,
                tileIndex: sprite.tileIndex,
            }));
    }

    public static createAnimationFrameData(
        startSprite: number, endSprite: number, delay: number,
        options?: {speedRatio?: number}): AnimationFrameData[] {
        const speedRatio = options && options.speedRatio !== undefined ? options.speedRatio : 1.0;
        const sprites = new Array(endSprite - startSprite + 1);
        for (let i = 0, length = sprites.length; i < length; i++) {
            sprites[i] = { tileIndex: startSprite + i, delay: delay * speedRatio};
        }
        return sprites;
    }

    public static createAnimationState(frames: AnimationFrameData[], options?: {isLoop?: boolean}): AnimationState {
        return {
            currentDelay: frames[0].delay,
            currentIndex: 0,
            isLoop: options && options.isLoop ? options.isLoop : false,
            isPause: false,
        };
    }
}
