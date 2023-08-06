import { IImageToMinecraft } from "./IImageToMinecraft";
import { ImageToMinecraft } from "./ImageToMinecraft";
import { MinecraftConverter } from "../core/imageConverter/MinecraftConverter";
import { CanvasPainter } from "../core/canvasPainter/CanvasPainter";
import { SimilarityCalculator } from "../core/similarityCalculator/SimilarityCalculator";

export class ImageToMinecraftFactory {
  create(): IImageToMinecraft {
    const canvasPainter = new CanvasPainter();
    const similarityCalculator = new SimilarityCalculator();

    const minecraftConverter = new MinecraftConverter(
      canvasPainter,
      similarityCalculator
    );
    return new ImageToMinecraft(minecraftConverter);
  }
}
