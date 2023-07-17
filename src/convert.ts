import {imageToMinecraft} from "./img2minecraft/img2minecraft.ts";

export interface IUploaderElements {
  imageInput: HTMLInputElement;
  downloadButton: HTMLButtonElement;
  canvasContainer: HTMLDivElement;
  lightbox: HTMLDivElement;
}

function downloadCanvas(canvas: HTMLCanvasElement) {
  const randomFileName = (Math.random() + 1).toString(36).substring(7);

  const downloadLink = document.createElement("a");
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.download = randomFileName;
  downloadLink.click();
}

export function setupUploader(elements: IUploaderElements) {
  elements.downloadButton.onclick = () => {
    const canvas = elements.canvasContainer.querySelector('canvas')

    if (!canvas) {
      throw new Error('Could not find canvas inside container')
    }

    downloadCanvas(canvas);
  }
  elements.lightbox.onclick = () => (elements.lightbox.style.display = "none");

  elements.imageInput.onchange = async () => {
    const imageFile = (elements.imageInput.files ?? [])[0];

    if (!imageFile) {
      return;
    }

    elements.canvasContainer.innerHTML = '<img alt="Loading circle" src="/loading.gif">';

    const resultCanvas = await imageToMinecraft(imageFile);

    resultCanvas.onclick = () => {
      elements.lightbox.innerHTML = "";
      elements.lightbox.style.display = "flex";

      const canvas = elements.canvasContainer.querySelector('canvas')

      if (!canvas) {
        return
      }

      const dataUrl = canvas.toDataURL();
      const image = document.createElement("img");
      image.src = dataUrl;

      elements.lightbox.appendChild(image);
    };

    elements.canvasContainer.innerHTML = "";
    elements.canvasContainer.appendChild(resultCanvas);
  };
}
