import { IBlockCollection } from "../blocks/IBlockCollection";

export interface ISimilarityCalculator {
  similarBlockId(
    searchedColor: number[],
    blockCollection: IBlockCollection
  ): string;
}
