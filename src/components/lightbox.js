import { queueAnimation } from '../utils/window';

class Lightbox {
  constructor(onClose) {
    this.isOpen = false;
    this.onCloseLightbox = onClose;

    const tree = this.build();
    this.storeTree(tree);

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        this.close();
      }
    });
  }

  build(imgUrl = null, title = null) {
    const element = document.getElementById('lightbox');
    const lightboxContainer = this.buildInnerTree(imgUrl, title);

    element.appendChild(lightboxContainer);

    return element;
  }

  buildInnerTree(imgUrl = null, title = null) {
    const lightboxContainer = document.createElement('div');
    lightboxContainer.className = 'lightbox-container';
    const back = document.createElement('div');
    back.className = 'back';
    back.innerHTML = '&lt;';
    const next = document.createElement('div');
    next.className = 'next';
    next.innerHTML = '&gt;';

    const center = document.createElement('div');
    center.className = 'center';
    const titleEl = document.createElement('div');
    titleEl.className = 'title';
    if (title) {
      titleEl.innerHTML = title;
    }
    const img = document.createElement('img');
    img.className = 'img';
    if (imgUrl) {
      img.src = imgUrl;
    }

    center.appendChild(titleEl);
    center.appendChild(img);

    lightboxContainer.appendChild(back);
    lightboxContainer.appendChild(center);
    lightboxContainer.appendChild(next);

    return lightboxContainer;
  }

  storeTree(element) {
    this.element = element;
    this.lightboxContainer = element.getElementsByClassName(
      'lightbox-container'
    )[0];
    this.back = element.getElementsByClassName('back')[0];
    this.next = element.getElementsByClassName('next')[0];
    this.title = element.getElementsByClassName('title')[0];
    this.img = element.getElementsByTagName('img')[0];
  }

  show(imgUrl, title, onClickNext = null, onClickBack = null) {
    this.sizeOverlay();
    this.positionLightbox();

    this.open = true;
    this.img.src = imgUrl;
    this.title.innerHTML = title;
    if (onClickNext) {
      this.attachNext(onClickNext);
    }

    if (onClickBack) {
      this.attachBack(onClickBack);
    }

    queueAnimation(this.element, 'fade-in', () => {
      this.element.style.display = 'block';
    });
  }

  attachNext(onClickNext) {
    this.next.style.visibility = 'visible';
    this.next.addEventListener('click', () => {
      onClickNext();
    });
  }

  attachBack(onClickBack) {
    this.back.style.visibility = 'visible';
    this.back.addEventListener('click', onClickBack);
  }

  close() {
    if (this.open) {
      queueAnimation(this.element, 'fade-out', () => {
        setTimeout(() => {
          this.element.style.display = 'none';
          this.element.className = '';
          this.onCloseLightbox();
        }, 299);
      });
    }
  }

  sizeOverlay() {
    this.element.style.height = `${document.body.clientHeight}px`;
  }

  positionLightbox() {
    this.lightboxContainer.style.marginTop = `${window.scrollY}px`;
  }

  goBack(imgUrl, title, onClickNext = null, onClickBack = null) {
    const self = this;
    const newTree = self.buildInnerTree(imgUrl, title);
    self.element.appendChild(newTree);
    queueAnimation(self.element, 'slide-out-to-right', () => {
      self.lightboxContainer.remove();
      queueAnimation(newTree, 'slide-in-from-left', () => {
        const element = document.getElementById('lightbox');
        element.appendChild(newTree);
        self.storeTree(element);

        if (onClickNext) {
          self.attachNext(onClickNext);
        }

        if (onClickBack) {
          self.attachBack(onClickBack);
        }
      });
    });
  }
}

export default Lightbox;
