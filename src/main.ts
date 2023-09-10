import "./app.css";
import { setupUploader } from "./convert";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `

<main>
    <section>
        <h1><img width="25" height="25" alt="Logo" src="/logo.png"> img2minecraft</h1>
    </section>

    <div id="lightbox"></div>

    <section>
        <article>
            <h2>Image Settings</h2>
            <label for="imageUploadInput">
                Upload image file
                <input id="imageUploadInput" name="file" type="file" accept="image/*">
            </label>
            <label for="country">
                Block Palette
                <select id="country">
                    <option>Vanilla 1.20</option>
                </select>
            </label>
        </article>
        <article>
            <h2>Image Output</h2>
            <div id="outputContainer">
                <div id="canvasContainer">
                    <canvas id="emptyCanvas" height="300"></canvas>
                </div>
                <button id="downloadButton">Download</button>
            </div>
        </article>
    </section>
    <footer>
        <hr>
        This is not an official Minecraft product and not approved by or associated with Mojang. You can view the code at
        <a target="_blank" href="https://github.com/elderguardian/img2minecraft">GitHub</a>.
    </footer>
</main>
`;

setupUploader({
  imageInput: document.querySelector("#imageUploadInput") as HTMLInputElement,
  downloadButton: document.querySelector(
    "#downloadButton"
  ) as HTMLButtonElement,
  canvasContainer: document.querySelector("#canvasContainer") as HTMLDivElement,
  lightbox: document.querySelector("#lightbox") as HTMLDivElement,
});
