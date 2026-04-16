import glob
import os
from PIL import Image

images = glob.glob('*.jpg')
for img_name in images:
    try:
        img = Image.open(img_name)
        base = os.path.splitext(img_name)[0]
        # remove alpha if exists to avoid errors when converting some weird jpgs
        img.save(base + '.png')
        img.close()
        os.remove(img_name)
        print(f"Converted and deleted {img_name}")
    except Exception as e:
        print(f"Error on {img_name}: {e}")
