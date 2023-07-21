import {IBlock, IBlockCollection} from "./core/blocks.ts";
import {vanillaBlockCollection} from "./blockCollections/vanilla.ts";

function srcOnCanvas(imageSource: string): Promise<{
  image: HTMLImageElement;
  canvas: HTMLCanvasElement;
}> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = imageSource;
    const returnData = { image, canvas };
    image.onload = () => resolve(returnData);
  });
}

function rgbColorSimilarity(
  firstColor: number[],
  secondColor: number[]
): number {
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

function mostSimilarBlock(
  searchedColor: number[],
  blocks: IBlock[]
): string {
  let closestBlockId: null | string = null;
  let closestBlockSimilarity: null | number = null;

  for (const block of blocks) {
    const currentBlockId = block["id"];
    const averageBlockColor = block["rgb"];
    const similarity = rgbColorSimilarity(searchedColor, averageBlockColor);

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

export async function imageToMinecraft(imageFile: File) {
  const canvas = await imageOnSmallCanvas(imageFile, 100, 100);
  return await canvasToMinecraft(canvas, vanillaBlockCollection);
}

const scaleImageSize = (
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
) => {
  let newSize = { width, height };
  let ratio = 0;

  if (width > maxWidth) {
    ratio = maxWidth / width;

    newSize.width = maxWidth;
    newSize.height = height * ratio;
  }

  if (height > maxHeight) {
    ratio = maxHeight / height;

    newSize.height = maxHeight;
    newSize.width = width * ratio;
  }

  return newSize;
};

const imageOnSmallCanvas = async (
  imageFile: File,
  maxWidth: number,
  maxHeight: number
): Promise<HTMLCanvasElement> => {
  const fileAsUrl = window.webkitURL.createObjectURL(imageFile);
  const { canvas, image } = await srcOnCanvas(fileAsUrl);

  const newImageSize = scaleImageSize(
    image.width,
    image.height,
    maxWidth,
    maxHeight
  );

  canvas.width = newImageSize.width;
  canvas.height = newImageSize.height;

  const canvasContext = canvas.getContext("2d");

  if (!canvasContext) {
    throw new Error("Given canvas is missing context.");
  }

  canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas;
};

const canvasToMinecraft = async (
  canvas: HTMLCanvasElement,
  blockCollection: IBlockCollection
) => {
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
      const pixelDataRgba = canvasContext.getImageData(row, column, 1, 1).data;
      const pixelDataRgb = [
        pixelDataRgba[0],
        pixelDataRgba[1],
        pixelDataRgba[2],
      ];

      const closestBlock = mostSimilarBlock(pixelDataRgb, blockCollection.blocks);
      const blockImage = await srcOnCanvas(`${blockCollection.webPath}/${closestBlock}`);

      resultCanvasContext.drawImage(blockImage.image, row * 16, column * 16, 16, 16);
    }
  }

  return resultCanvas;
};
