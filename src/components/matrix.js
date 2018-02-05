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
    console.log(idx);
    this.selectedIndex = idx;
    this.lightbox.show(
      this.data[this.selectedIndex].images.original.url,
      this.data[this.selectedIndex].title,
      this.selectedIndex !== this.data.length - 1 && this.onClickNext,
      this.selectedIndex !== 0 && this.onClickBack
    );
  };

  onCloseLightbox = () => {
    this.selectedIndex = null;
  };

  onClickNext = () => {
    console.log(this.selectedIndex);
    this.selectedIndex++;
  };

  onClickBack = () => {
    console.log('back');
    if (this.selectedIndex <= 0) {
      debugger;
    }
    this.selectedIndex--;
    console.log(this.selectedIndex);
    console.log(this);

    this.lightbox.goBack(
      this.data[this.selectedIndex].images.original.url,
      this.data[this.selectedIndex].title,
      this.selectedIndex !== this.data.length - 1 && this.onClickNext,
      this.selectedIndex !== 0 && this.onClickBack
    );
  };

  onClickNext = () => {
    this.selectedIndex++;

    this.lightbox.goForward(
      this.data[this.selectedIndex].images.original.url,
      this.data[this.selectedIndex].title,
      this.selectedIndex !== this.data.length - 1 && this.onClickNext,
      this.selectedIndex !== 0 && this.onClickBack
    );
  };
}

export default Matrix;
