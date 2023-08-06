import { ICanvasPainter } from "./ICanvasPainter";

export class CanvasPainter implements ICanvasPainter {
  private scaleDownWithRatio(
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number
  ) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  private async resizeLargeCanvas(
    canvas: HTMLCanvasElement,
    maxWidth: number,
    maxHeight: number
  ): Promise<HTMLCanvasElement> {
    const newSize = this.scaleDownWithRatio(
      canvas.width,
      canvas.height,
      maxWidth,
      maxHeight
    );

    const canvasAsUrl = canvas.toDataURL();

    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = newSize.width;
    resizedCanvas.height = newSize.height;

    const oldCanvasContent = new Image();
    oldCanvasContent.src = canvasAsUrl;

    return new Promise((resolve) => {
      oldCanvasContent.onload = () => {
        const resizedCanvasContext = resizedCanvas.getContext("2d");

        if (!resizedCanvasContext) {
          throw new Error("New canvas does not have a context");
        }

        resizedCanvasContext.drawImage(
          oldCanvasContent,
          0,
          0,
          resizedCanvas.width,
          resizedCanvas.height
        );

        resolve(resizedCanvas);
      };
    });
  }

  async fromFile(
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<HTMLCanvasElement> {
    const fileAsUrl = window.webkitURL.createObjectURL(file);
    const fileOnCanvas = await this.fromSource(fileAsUrl);
    return await this.resizeLargeCanvas(fileOnCanvas, maxWidth, maxHeight);
  }

  async fromSource(srcUrl: string): Promise<HTMLCanvasElement> {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = srcUrl;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const canvasContext = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;

        if (!canvasContext) {
          throw new Error("Given canvas is missing context.");
        }

        canvasContext.drawImage(image, 0, 0, image.width, image.height);
        resolve(canvas);
      };
    });
  }
}
