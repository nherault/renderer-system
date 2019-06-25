import { CanvasFactory } from '../canvas/canvas-factory';
import { Entity2DData } from '../commons/entity/entity.types';
import { RectangleData } from '../commons/shape/shape.types';
import { View } from '../scene/scene.types';
import { DrawHelper } from './draw-helper';

export class Entity2DDrawHelper {

  public static drawEntity2D(
    context: CanvasRenderingContext2D, view: View, entity: Entity2DData,
    source: HTMLCanvasElement, sprite?: RectangleData): void {

    if (entity.rotation !== undefined && entity.rotation !== null && entity.rotation !== 0) {
      if (entity.horizontalFlip || entity.verticalFlip) {
          Entity2DDrawHelper.flipAndRotateImage(context, entity, source, sprite);
      } else {
          Entity2DDrawHelper.rotateImage(context, entity, source, sprite);
      }
    } else if (entity.horizontalFlip || entity.verticalFlip) {
        Entity2DDrawHelper.flipImage(context, entity, source, sprite);
    } else {
        DrawHelper.drawEntity(context, source, entity, {view, sprite});
    }
  }

  // TODO: VIEW SCALE
  // TODO: not perfect rotation => position of the object is not correct at the end !
  public static rotateImage(context: CanvasRenderingContext2D, entity: Entity2DData, source: HTMLCanvasElement, sprite?: RectangleData) {

    // context.save();

    // Convert degrees to radian
    const rad = entity.rotation !== undefined ? entity.rotation * Math.PI / 180 : 0;

    // Set the origin to the center of the image
    // const diagonal = Math.sqrt(Math.pow(entity.size.x, 2) + Math.pow(entity.size.y, 2));
    const centerX = entity.size.x / 2;
    const centerY = entity.size.y / 2;
    context.translate(entity.position.x + centerX, entity.position.y + centerY);

    // Rotate the canvas around the origin
    context.rotate(rad);

    // draw the image
    const entityScale = {
      position: {x: -centerX, y: -centerY},
      size: entity.size,
    };
    DrawHelper.drawEntity(context, source, entityScale, { sprite });

    context.rotate(-rad);
    context.translate(-entity.position.x - centerX, -entity.position.y - centerY);

    // reset the canvas
    // context.restore();
  }

  // TODO: VIEW SCALE
  // OPTIMISATION: save the flip canvas of the entity to reuse later
  public static flipImage(
    context: CanvasRenderingContext2D, entity: Entity2DData, source: HTMLCanvasElement,
    sprite?: RectangleData, isTranslateObject = true): void {

    const scaleH = entity.horizontalFlip ? -1 : 1; // Set horizontal scale to -1 if flip horizontal
    const scaleV = entity.verticalFlip ? -1 : 1; // Set verical scale to -1 if flip vertical
    const posX = entity.horizontalFlip ? entity.size.x * -1 : 0; // Set x position to -100% if flip horizontal
    const posY = entity.verticalFlip ? entity.size.y * -1 : 0; // Set y position to -100% if flip vertical

    context.save(); // Save the current state

    if (isTranslateObject) {
        context.translate(entity.position.x, entity.position.y);
    }
    context.scale(scaleH, scaleV); // Set scale to flip the image

    DrawHelper.drawEntity(context, source, { position: {x: posX, y: posY}, size: entity.size}, {sprite});

    context.restore(); // Restore the last saved state
  }

  // TODO: VIEW SCALE
  // TODO: not perfect rotation => position of the object is not correct at the end !
  // OPTIMISATION: save the flip canvas of the entity to reuse later
  public static flipAndRotateImage(
    context: CanvasRenderingContext2D, entity: Entity2DData,
    source: HTMLCanvasElement, sprite?: RectangleData): void {

    const tempCanvasFlip = CanvasFactory.createCanvas(entity.size.x, entity.size.y);
    const tempContextFlip = tempCanvasFlip.getContext('2d');

    if (tempContextFlip) {
      Entity2DDrawHelper.flipImage(tempContextFlip, entity, source, sprite, false);
    }

    const diagonal = Math.sqrt(Math.pow(entity.size.x, 2) + Math.pow(entity.size.y, 2));
    const tempCanvasRotate = CanvasFactory.createCanvas(diagonal, diagonal);
    const tempContextRotate = tempCanvasRotate.getContext('2d');

    if (tempContextRotate) {
      // Convert degrees to radian
      const rad = entity.rotation !== undefined ? entity.rotation * Math.PI / 180 : 0;

      // Rotate the canvas around the origin
      tempContextRotate.translate(diagonal / 2, diagonal / 2);
      tempContextRotate.rotate(rad);

      const x = -entity.size.x / 2;
      const y = -entity.size.y / 2;
      tempContextRotate.drawImage(tempCanvasFlip, x, y);

      const x1 = entity.position.x;
      const y1 = entity.position.y;
      context.drawImage(tempCanvasRotate, x1, y1);
    }
  }
}
