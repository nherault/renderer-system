import {RectangleData} from '../commons/shape/shape.types';
import {TilesPicture} from './tiles-picture';
import {AnimationData } from './tiles.types';

export class AnimationHandler {

    //////////////////////////////////
    // Pause the animation.
    //////////////////////////////////
    public static pauseAnimation(animationData: AnimationData): AnimationData {
        animationData.state.isPause = true;
        return animationData;
    }

    //////////////////////////////////
    // Stop the animation.
    //////////////////////////////////
    public static stopAnimation(animationData: AnimationData): AnimationData {

        // Reset all values.
        animationData.state.isPause = false;
        animationData.state.currentIndex = 0;
        animationData.state.currentDelay = animationData.frames[0].delay;
        return animationData;
    }

    public static isAnimationOver(animationData: AnimationData): boolean {
        return !animationData.state.isLoop && animationData.state.currentIndex === animationData.frames.length - 1;
    }

    //////////////////////////////////
    // Update the animation.
    //////////////////////////////////
    public static updateAnimation(animationData: AnimationData, elapsedTime: number): AnimationData {

        if (!animationData.state.isPause) {

            animationData.state.currentDelay -= elapsedTime;
            if (animationData.state.currentDelay < 0) {
                animationData.state.currentIndex++;

                if (animationData.state.currentIndex > animationData.frames.length - 1) {
                    animationData.state.currentIndex = animationData.state.isLoop ? 0 : animationData.frames.length - 1;
                }
                animationData.state.currentDelay = animationData.frames[animationData.state.currentIndex].delay
                    + animationData.state.currentDelay;
            }
        }
        return animationData;
    }

    public static setSprite(animationData: AnimationData, animationCount: number): AnimationData {
        animationData.state.currentIndex = animationCount;
        return animationData;
    }

    public static getCurrentId(animationData: AnimationData): number {
        return animationData.frames[animationData.state.currentIndex].tileIndex;
    }

    public static getCurrentSprite(
        animationData: AnimationData, tilesPicture: TilesPicture): RectangleData | undefined {
        return tilesPicture.getSprite(animationData.frames[animationData.state.currentIndex].tileIndex);
    }
}
