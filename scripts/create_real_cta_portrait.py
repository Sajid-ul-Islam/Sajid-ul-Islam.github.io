import os
from PIL import Image, ImageFilter, ImageEnhance

def make_real_cta_scene():
    src_path = 'assets/img/Sajid-actual.jpg'
    if not os.path.exists(src_path):
        src_path = 'img/profile.jpg'
    
    src = Image.open(src_path).convert('RGB')
    
    canvas_w = 1920
    canvas_h = 1072
    
    # Create dark base canvas (#07090C)
    base = Image.new('RGB', (canvas_w, canvas_h), (7, 9, 12))
    
    # Scale Sajid's image to cover height with some headroom
    # The source is 1282x1282. We want it roughly 1072 tall
    target_h = canvas_h
    scale = target_h / src.height
    target_w = int(src.width * scale)
    
    sajid_resized = src.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Position on the right side
    pos_x = canvas_w - target_w
    pos_y = 0
    
    # Create a gradient mask for smooth blending on the left edge and edges
    mask = Image.new('L', (target_w, target_h), 255)
    
    # Left feather: from 0 to 450px of the portrait, ramp from 0 to 255
    feather_w = int(target_w * 0.45)
    for x in range(target_w):
        if x < feather_w:
            # Smooth Hermite curve
            t = x / feather_w
            alpha = int(255 * (t * t * (3 - 2 * t)))
        else:
            alpha = 255
        for y in range(target_h):
            # Also slight fade at extreme top and bottom corners
            y_edge = min(y, target_h - 1 - y)
            y_alpha = 1.0
            if y_edge < 80:
                y_t = y_edge / 80
                y_alpha = (y_t * y_t * (3 - 2 * y_t))
            final_alpha = int(alpha * y_alpha)
            mask.putpixel((x, y), final_alpha)
    
    # Paste Sajid onto base using the mask
    base.paste(sajid_resized, (pos_x, pos_y), mask)
    
    # Save both WebP and JPG
    out_jpg = 'assets/img/bg-scene3.jpg'
    out_webp = 'assets/img/bg-scene3.webp'
    
    base.save(out_jpg, 'JPEG', quality=93)
    base.save(out_webp, 'WEBP', quality=92)
    print(f"Successfully created real portrait CTA scene: {out_jpg} and {out_webp}")

if __name__ == '__main__':
    make_real_cta_scene()
