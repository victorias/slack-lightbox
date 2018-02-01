import { getTrending } from '../api/giphy';
import { onLoad } from '../utils/window';

class Matrix {
  constructor(el) {
    this.element = el;
    this.data = [];
    onLoad(this.build.bind(this));
  }

  async getGifs() {
    let json;
    try {
      const response = await fetch(getTrending());
      json = await response.json();
    } catch (e) {
      throw e;
    }

    this.data = json.data;
  }

  async build() {
    await this.getGifs();

    this.data.map(gifObj => {
      const gifElement = document.createElement('div');
      const img = document.createElement('img');
      img.src = gifObj.images.fixed_height.url;
      img.width = gifObj.images.fixed_height.width;
      img.height = gifObj.images.fixed_height.height;
      gifElement.appendChild(img);
      this.element.appendChild(gifElement);
    });
  }
}

export default Matrix;
