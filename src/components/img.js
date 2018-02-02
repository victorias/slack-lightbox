class Img {
  constructor(data, onClick) {
    this.data = data;
    this.onClick = onClick;
    this.build();
    return this.gifElement;
  }

  build() {
    this.gifElement = document.createElement('div');
    const img = document.createElement('img');
    img.src = this.data.images.fixed_height.url;
    img.width = this.data.images.fixed_height.width;
    img.height = this.data.images.fixed_height.height;
    this.gifElement.appendChild(img);
    this.gifElement.addEventListener('click', this.onClick);
  }
}

export default Img;
