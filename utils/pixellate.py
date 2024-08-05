from PIL import Image


def convert_to_pixel_art(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")

    output_size = (128, 128)

    new_img = Image.new("RGBA", output_size, (0, 0, 0, 0))

    aspect_ratio = min(output_size[0] / img.width, output_size[1] / img.height)
    new_size = (int(img.width * aspect_ratio), int(img.height * aspect_ratio))
    img = img.resize(new_size, Image.NEAREST)

    padding_x = (output_size[0] - new_size[0]) // 2
    padding_y = (output_size[1] - new_size[1]) // 2

    greyscale_img = img.convert("L")

    color_black = (16, 36, 35)  # RGB for #102423
    color_white = (255, 255, 255)  # RGB for white
    transparency_threshold = 250  # Threshold to consider a pixel as "white"

    def greyscale_to_color(value):
        scale = value / 255
        r = int(color_black[0] * (1 - scale) + color_white[0] * scale)
        g = int(color_black[1] * (1 - scale) + color_white[1] * scale)
        b = int(color_black[2] * (1 - scale) + color_white[2] * scale)
        return (r, g, b, 255)

    colored_img = Image.new("RGBA", greyscale_img.size)
    for x in range(greyscale_img.width):
        for y in range(greyscale_img.height):
            greyscale_value = greyscale_img.getpixel((x, y))
            if greyscale_value > transparency_threshold:
                color = (0, 0, 0, 0)
            else:
                color = greyscale_to_color(greyscale_value)
            colored_img.putpixel((x, y), color)

    new_img.paste(colored_img, (padding_x, padding_y))

    new_img.save(output_path)


input_path = "image.png"
output_path = "output_pixel_art.png"
convert_to_pixel_art(input_path, output_path)
