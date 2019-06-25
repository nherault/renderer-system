export enum TileDirection {
    LINE,
    COLUMN,
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
