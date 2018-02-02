import { getTrending } from '../api/giphy';
import { onLoad } from '../utils/window';
import Img from './img';
import Lightbox from './lightbox';

class Matrix {
  constructor(el) {
    this.element = el;
    this.data = [];
    this.lightbox = new Lightbox(this.onCloseLightbox);

    this.selectedIndex = null;
    onLoad(this.build);

    return this.element;
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

  build = async () => {
    await this.getGifs();

    const frag = document.createDocumentFragment();

    this.data.map((gifObj, idx) => {
      const img = new Img(gifObj, () => this.onClickImg(idx));
      frag.appendChild(img);
    });

    this.element.appendChild(frag);
  };

  onClickImg = idx => {
    this.selectedIndex = idx;
    console.log(this.data[idx]);
    this.lightbox.show(
      this.data[idx].images.original.url,
      this.data[idx].title
    );
  };

  onCloseLightbox = () => {
    this.selectedIndex = null;
  };
}

export default Matrix;
