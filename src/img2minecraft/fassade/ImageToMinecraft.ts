import { IImageToMinecraft } from "./IImageToMinecraft";
import {IMinecraftConverter} from "../core/imageConverter/IMinecraftConverter";
import {IBlockCollection} from "../core/blocks/IBlockCollection";
export class ImageToMinecraft implements IImageToMinecraft {
  private minecraftConverter: IMinecraftConverter;

  constructor(minecraftConverter: IMinecraftConverter) {
    this.minecraftConverter = minecraftConverter;
  }

  async canvasFromFile(
    imageFile: File,
    blockCollection: IBlockCollection
  ): Promise<HTMLCanvasElement> {
    return await this.minecraftConverter.fromFile(imageFile, blockCollection);
  }
}
