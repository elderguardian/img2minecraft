export interface ICanvasPainter {
  fromSource(srcUrl: string): Promise<HTMLCanvasElement>;
  fromFile(
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<HTMLCanvasElement>;
}
