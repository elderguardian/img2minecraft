import { IMinecraftConverter } from "./IMinecraftConverter";
import { ICanvasPainter } from "../canvasPainter/ICanvasPainter";
import { IBlockCollection } from "../blocks/IBlockCollection";
import { ISimilarityCalculator } from "../similarityCalculator/ISimilarityCalculator";

export class MinecraftConverter implements IMinecraftConverter {
  private canvasPainter: ICanvasPainter;
  private similarityCalculator: ISimilarityCalculator;

  constructor(
    canvasPainter: ICanvasPainter,
    similarityCalculator: ISimilarityCalculator
  ) {
    this.canvasPainter = canvasPainter;
    this.similarityCalculator = similarityCalculator;
  }

  private async fromCanvas(
    canvas: HTMLCanvasElement,
    blockCollection: IBlockCollection
  ): Promise<HTMLCanvasElement> {
    const canvasContext = canvas.getContext("2d");

    const resultCanvas = document.createElement("canvas");
    const resultCanvasContext = resultCanvas.getContext("2d");

    if (!canvasContext || !resultCanvasContext) {
      throw new Error("Given canvas is missing context.");
    }

    resultCanvas.width = canvas.width * 16;
    resultCanvas.height = canvas.height * 16;

    for (let row = 0; row < canvas.width; row++) {
      for (let column = 0; column < canvas.height; column++) {
        const pixel = canvasContext.getImageData(row, column, 1, 1);
        const pixelDataRgba = pixel.data;

        const pixelDataRgb = [
          pixelDataRgba[0],
          pixelDataRgba[1],
          pixelDataRgba[2],
        ];

        const closestBlock = this.similarityCalculator.similarBlockId(
          pixelDataRgb,
          blockCollection
        );

        const blockAsCanvas = await this.canvasPainter.fromSource(
          `${blockCollection.webPath}/${closestBlock}`
        );

        const blockImage = new Image();
        blockImage.src = blockAsCanvas.toDataURL();

        blockImage.onload = () => {
          const blockWidth = row * 16;
          const blockHeight = column * 16;
          resultCanvasContext.drawImage(
            blockImage,
            blockWidth,
            blockHeight,
            16,
            16
          );
        };
      }
    }

    return resultCanvas;
  }

  async fromFile(
    imageFile: File,
    blockCollection: IBlockCollection
  ): Promise<HTMLCanvasElement> {
    const imageOnCanvas = await this.canvasPainter.fromFile(
      imageFile,
      100,
      100
    );
    return this.fromCanvas(imageOnCanvas, blockCollection);
  }
}
