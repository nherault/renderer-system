import { RenderSystemDefault } from '../renderer';
import { initialConfig } from '../renderer/initial-config/initial-config';
import { RenderData } from '../renderer/scene/scene.types';
import { loadJSON, SceneResourceLoader } from './loader';
import { SceneDataParam } from '../renderer/scene/scene-factory';
const display: any = document.getElementById('display');
const codeEl: any = document.getElementById('code');
const toolbar: any = document.getElementById('toolbar');

const sceneResourceLoader = new SceneResourceLoader();
const resourceFinder = sceneResourceLoader.getResource.bind(sceneResourceLoader);
const rendererSystem: RenderSystemDefault = new RenderSystemDefault();
rendererSystem.init({
    ...initialConfig,
    resourceFinder,
});

const examples = [
    { text: 'Text Example', sceneUrl: './scenes/text_scene.json'},
    { text: 'Shape Example', sceneUrl: './scenes/shape_scene.json'},
    { text: 'Path Example', sceneUrl: './scenes/path_scene.json'},
    { text: 'Tileset Example', sceneUrl: './scenes/tileset_scene.json'},
    { text: 'Object Filters Example', sceneUrl: './scenes/object-filters_scene.json'},
    { text: 'Layer Filters Example', sceneUrl: './scenes/layer-filters_scene.json'},
    { text: 'Layers Views Example', sceneUrl: './scenes/layers-views_scene.json'},
    { text: 'Entity Example', sceneUrl: './scenes/entity_scene.json'},
];

renderExamples(toolbar, examples);
loadExample('./scenes/text_scene.json');

function renderExamples(toolbarEl: HTMLElement, examplesToRender: Array<{ text: string, sceneUrl: string }>) {
    examplesToRender.forEach((currentExample) => {
        const liEl = document.createElement('li');
        const buttonEl = document.createElement('button');
        liEl.appendChild(buttonEl);
        toolbarEl.appendChild(liEl);

        buttonEl.innerHTML = currentExample.text;
        buttonEl.addEventListener('click', () => loadExample(currentExample.sceneUrl));
    });
}

let requestAnimationFrameId: number | undefined;
function loadExample(jsonUrl: string) {
    loadJSON(jsonUrl, (result) => {
        const sceneDataParam: SceneDataParam = result.result.sceneData;
        const renderData: RenderData = result.result.renderData;
        const sceneData = rendererSystem.initScene(display, sceneDataParam);
        sceneResourceLoader.load(sceneData, () => {
            codeEl.value = JSON.stringify(result.result, null, '  ');

            let last = 0;
            function step(timestamp: number) {
                const progress = timestamp - last;
                rendererSystem.render(renderData, progress);
                last = timestamp;
                requestAnimationFrameId = requestAnimationFrame(step);
            }

            if (requestAnimationFrameId !== undefined) {
                cancelAnimationFrame(requestAnimationFrameId);
            }
            requestAnimationFrameId = requestAnimationFrame(step);
        });
    });
}
