import { ISimilarityCalculator } from "./ISimilarityCalculator";
import { IBlockCollection } from "../blocks/IBlockCollection";

export class SimilarityCalculator implements ISimilarityCalculator {
  private rgbColorSimilarity(
    firstColor: number[],
    secondColor: [number, number, number]
  ) {
    if (firstColor.length !== 3 || secondColor.length !== 3) {
      throw new Error(
        "Invalid parameter format. Expected array with rgb values."
      );
    }

    // Formula for euclidean distance
    // d = sqrt( (R2-R1)^2 + (G2-G1)^2 + (B2-B1)^2 )

    let delta = Math.pow(secondColor[0] - firstColor[0], 2);
    delta += Math.pow(secondColor[1] - firstColor[1], 2);
    delta += Math.pow(secondColor[2] - firstColor[2], 2);
    delta = Math.sqrt(delta);

    return delta;
  }

  similarBlockId(
    searchedColor: number[],
    blockCollection: IBlockCollection
  ): string {
    let closestBlockId: null | string = null;
    let closestBlockSimilarity: null | number = null;

    for (const block of blockCollection.blocks) {
      const currentBlockId = block["id"];
      const averageBlockColor = block["rgb"];
      const similarity = this.rgbColorSimilarity(
        searchedColor,
        averageBlockColor
      );

      const isNewClosestBlock =
        closestBlockId === null ||
        closestBlockSimilarity === null ||
        closestBlockSimilarity > similarity;

      if (isNewClosestBlock) {
        closestBlockId = currentBlockId;
        closestBlockSimilarity = similarity;
      }
    }

    if (!closestBlockId) {
      throw new Error("Could not find a similar block.");
    }

    return closestBlockId;
  }
}
