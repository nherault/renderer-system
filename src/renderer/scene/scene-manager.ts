import { Vector2DData } from '../commons/vector-2d/vector-2d.types';
import { SceneData, View } from './scene.types';
import { SceneDataParam, SceneFactory } from './scene-factory';

export class SceneManager {

    public static initSceneLayers(displayEl: HTMLElement, sceneDataParam?: SceneDataParam): SceneData {

        const sceneData = SceneFactory.generateSceneLayers(sceneDataParam);

        SceneManager.initDisplay(displayEl, sceneData.display, sceneData.views);

        return sceneData;
    }

    public static initDisplay(displayEl: HTMLElement, display: { size: Vector2DData }, views: View[]): void {
        // Empty the displayElement
        while (displayEl.lastChild) {
            displayEl.removeChild(displayEl.lastChild);
        }
        displayEl.textContent = '';

        displayEl.style.width = `${display.size.x}px`;
        displayEl.style.height = `${display.size.y}px`;
        displayEl.style.position = 'relative';
        displayEl.style.overflow = 'hidden';

        for (const view of views) {
            for (const layer of view.layers) {
                displayEl.appendChild(layer.context.canvas);
            }
        }
    }
}
