this.setPixel = (x, y, c = 0) => {
  if (x < 0 || x >= 128 || y < 0 || y >= 128) return
  const int = this.colors.int(c)
  if (int) {
    const newColor = int
    this.pixels[y * 128 + x] = newColor
  }
}
