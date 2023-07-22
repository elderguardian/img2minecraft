# img2minecraft
A simple tool that takes an image file as input and converts each pixel of the image into a corresponding Minecraft block of the same color. It allows you to create Minecraft art from any image, bringing your favorite images into the blocky world of Minecraft.

## Features
- Image to Minecraft Block Conversion: Convert any image file (e.g., PNG, JPEG) into a Minecraft pixel art representation using blocks.
- Color Accuracy: The converter ensures that each pixel is matched to the closest available Minecraft block color to maintain accuracy in the conversion.
- User-friendly Interface: The tool comes with a simple and intuitive user interface, making it easy for users of all skill levels to use the converter.

## Getting Started
1. **Setup**: Visit the public instance or create your own.
2. **File Uplod**: Under the upload section, click on the upload button and choose an image.
3. **Preview**: Click on the small image preview to make it larger. Click anywhere to exit the lightbox.
4. **Download**: Click the download button under the image result.

## Deployment using Docker

#### **`docker-compose.yml`**
```
services:
  img2minecraft:
    ports:
      - "9000:8090"
    image: ghcr.io/elderguardian/img2minecraft:latest
```

## Development

1. `git clone` this repository.
2. `cd img2minecraft`
3. `npm install`
4. `npm run dev`

<hr>

**All the textures provided are owned by Mojang Studios. I do not claim any rights on these, and all the textures
provided are used only for demonstration purposes!**

**This is not an official Minecraft product and not approved by or associated with Mojang.**