var AnimationFactory = /** @class */ (function () {
    function AnimationFactory() {
    }
    AnimationFactory.createAnimationDataFromArray = function (sprites, options) {
        return {
            frames: AnimationFactory.createAnimationFrameDataFromArray(sprites, options),
            state: AnimationFactory.createAnimationState(sprites, options),
        };
    };
    AnimationFactory.createAnimationData = function (startSprite, endSprite, delay, options) {
        var frames = AnimationFactory.createAnimationFrameData(startSprite, endSprite, delay, options);
        return {
            frames: frames,
            state: AnimationFactory.createAnimationState(frames, options),
        };
    };
    AnimationFactory.createAnimationFrameDataFromArray = function (frames, options) {
        var speedRatio = options && options.speedRatio !== undefined ? options.speedRatio : 1.0;
        return frames.map(function (sprite) { return ({
            delay: sprite.delay * speedRatio,
            tileIndex: sprite.tileIndex,
        }); });
    };
    AnimationFactory.createAnimationFrameData = function (startSprite, endSprite, delay, options) {
        var speedRatio = options && options.speedRatio !== undefined ? options.speedRatio : 1.0;
        var sprites = new Array(endSprite - startSprite + 1);
        for (var i = 0, length_1 = sprites.length; i < length_1; i++) {
            sprites[i] = { tileIndex: startSprite + i, delay: delay * speedRatio };
        }
        return sprites;
    };
    AnimationFactory.createAnimationState = function (frames, options) {
        return {
            currentDelay: frames[0].delay,
            currentIndex: 0,
            isLoop: options && options.isLoop ? options.isLoop : false,
            isPause: false,
        };
    };
    return AnimationFactory;
}());
export { AnimationFactory };
//# sourceMappingURL=../../../src/src/renderer/tiles/animation-factory.js.map