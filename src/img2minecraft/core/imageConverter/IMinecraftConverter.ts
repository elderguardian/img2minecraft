import {IBlockCollection} from "../blocks/IBlockCollection";

export interface IMinecraftConverter {
  fromFile(imageFile: File, blockCollection: IBlockCollection): Promise<HTMLCanvasElement>;
}
