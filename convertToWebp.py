from PIL import Image, ImageOps
import os

images_dir = 'images'
converted = 0

for filename in os.listdir(images_dir):
    if filename.lower().endswith(('.jpg', '.jpeg', '.png')) and filename != 'logo.png':
        src = os.path.join(images_dir, filename)
        base = os.path.splitext(filename)[0]
        out = os.path.join(images_dir, base + '.webp')
        with Image.open(src) as img:
            # Fix rotation using EXIF data - most reliable method
            img = ImageOps.exif_transpose(img)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            img.save(out, 'WEBP', quality=82)
        old_size = os.path.getsize(src)
        new_size = os.path.getsize(out)
        print(f'{filename} -> {base}.webp ({old_size//1024}KB -> {new_size//1024}KB)')
        converted += 1

print(f'Done! Converted {converted} images')