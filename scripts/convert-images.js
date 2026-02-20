async function convertToWebP() {
    const { default: imagemin } = await import('imagemin');
    const { default: imageminWebp } = await import('imagemin-webp');
    const path = await import('path');
    const fs = await import('fs');

    const __dirname = path.resolve(); // Generic __dirname alternative
    const assetsDir = path.join(__dirname, 'assets/images');

    if (!fs.existsSync(assetsDir)) {
        console.error(`Assets directory not found: ${assetsDir}`);
        return;
    }

    console.log(`Scanning ${assetsDir} for images...`);

    // Convert PNG files
    const pngFiles = await imagemin([`${assetsDir}/**/*.png`], {
        destination: assetsDir,
        plugins: [
            imageminWebp({
                quality: 85,
                method: 6,
                lossless: false
            })
        ]
    });

    // Convert JPG/JPEG files
    const jpgFiles = await imagemin([`${assetsDir}/**/*.{jpg,jpeg}`], {
        destination: assetsDir,
        plugins: [
            imageminWebp({ quality: 80 })
        ]
    });

    console.log(`Converted ${pngFiles.length + jpgFiles.length} images to WebP`);
}

convertToWebP().catch(console.error);
