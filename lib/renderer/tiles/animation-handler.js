"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimationHandler = /** @class */ (function () {
    function AnimationHandler() {
    }
    //////////////////////////////////
    // Pause the animation.
    //////////////////////////////////
    AnimationHandler.pauseAnimation = function (animationData) {
        animationData.state.isPause = true;
        return animationData;
    };
    //////////////////////////////////
    // Stop the animation.
    //////////////////////////////////
    AnimationHandler.stopAnimation = function (animationData) {
        // Reset all values.
        animationData.state.isPause = false;
        animationData.state.currentIndex = 0;
        animationData.state.currentDelay = animationData.frames[0].delay;
        return animationData;
    };
    AnimationHandler.isAnimationOver = function (animationData) {
        return !animationData.state.isLoop && animationData.state.currentIndex === animationData.frames.length - 1;
    };
    //////////////////////////////////
    // Update the animation.
    //////////////////////////////////
    AnimationHandler.updateAnimation = function (animationData, elapsedTime) {
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
    };
    AnimationHandler.setSprite = function (animationData, animationCount) {
        animationData.state.currentIndex = animationCount;
        return animationData;
    };
    AnimationHandler.getCurrentId = function (animationData) {
        return animationData.frames[animationData.state.currentIndex].tileIndex;
    };
    AnimationHandler.getCurrentSprite = function (animationData, tilesPicture) {
        return tilesPicture.getSprite(animationData.frames[animationData.state.currentIndex].tileIndex);
    };
    return AnimationHandler;
}());
exports.AnimationHandler = AnimationHandler;
//# sourceMappingURL=../../../src/src/renderer/tiles/animation-handler.js.map