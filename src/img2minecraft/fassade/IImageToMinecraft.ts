import { IBlockCollection } from "../core/blocks/IBlockCollection";

export interface IImageToMinecraft {
  canvasFromFile(
    imageFile: File,
    blockCollection: IBlockCollection
  ): Promise<HTMLCanvasElement>;
}
