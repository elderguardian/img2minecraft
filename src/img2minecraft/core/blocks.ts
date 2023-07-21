export interface IBlock {
  id: string;
  rgb: [number, number, number];
}

export interface IBlockCollection {
  webPath: string;
  blocks: IBlock[];
}