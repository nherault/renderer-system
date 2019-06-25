export declare enum TileDirection {
    LINE = 0,
    COLUMN = 1
}
export interface AnimationData {
    state: AnimationState;
    frames: AnimationFrameData[];
}
export interface AnimationState {
    currentIndex: number;
    currentDelay: number;
    isLoop: boolean;
    isPause: boolean;
}
export interface AnimationFrameData {
    tileIndex: number;
    delay: number;
}
