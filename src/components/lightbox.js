import { queueAnimation } from '../utils/window';
import { last } from '../utils/array';

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

  buildInnerTree(
    imgUrl = null,
    title = null,
    onClickNext = null,
    onClickBack = null
  ) {
    const lightboxContainer = document.createElement('div');
    lightboxContainer.className = 'lightbox-container';
    const back = document.createElement('div');
    back.className = 'back';
    back.innerHTML = '&lt;';
    const next = document.createElement('div');
    next.className = 'next';
    next.innerHTML = '&gt;';

    if (onClickNext) {
      next.style.visibility = 'visible';
      next.addEventListener('click', onClickNext);
    }

    if (onClickBack) {
      back.style.visibility = 'visible';
      back.addEventListener('click', onClickBack);
    }

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
    this.lightboxContainer = last(
      element.getElementsByClassName('lightbox-container')
    );
    this.back = last(element.getElementsByClassName('back'));
    this.next = last(element.getElementsByClassName('next'));
    this.title = last(element.getElementsByClassName('title'));
    this.img = last(element.getElementsByTagName('img'));
  }

  show(imgUrl, title, onClickNext = null, onClickBack = null) {
    this.sizeOverlay();
    this.positionLightbox();

    this.isOpen = true;
    this.img.src = imgUrl;
    this.title.innerHTML = title;

    if (onClickNext) {
      this.next.style.visibility = 'visible';
      this.next.addEventListener('click', onClickNext);
    }

    if (onClickBack) {
      this.back.style.visibility = 'visible';
      this.back.addEventListener('click', onClickBack);
    }

    queueAnimation(this.element, 'fade-in', () => {
      this.element.style.display = 'flex';
    });
  }

  close() {
    if (this.open) {
      queueAnimation(this.element, 'fade-out', () => {
        setTimeout(() => {
          this.element.style.display = 'none';
          this.element.className = '';
          this.lightboxContainer.className = 'lightbox-container';
          this.onCloseLightbox();
        }, 280);
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
    const newTree = this.buildInnerTree(
      imgUrl,
      title,
      onClickNext,
      onClickBack
    );
    this.element.appendChild(newTree);
    const oldLightboxContainer = this.lightboxContainer;
    queueAnimation(oldLightboxContainer, 'slide-out-to-right', () => {
      const element = document.getElementById('lightbox');
      element.appendChild(newTree);
      this.storeTree(element);
      setTimeout(() => {
        oldLightboxContainer.remove();
      }, 300);
    });
  }

  goForward(imgUrl, title, onClickNext = null, onClickBack = null) {
    const newTree = this.buildInnerTree(
      imgUrl,
      title,
      onClickNext,
      onClickBack
    );
    this.element.appendChild(newTree);
    const oldLightboxContainer = this.lightboxContainer;
    queueAnimation(oldLightboxContainer, 'slide-out-to-left', () => {
      const element = document.getElementById('lightbox');
      element.appendChild(newTree);
      this.storeTree(element);
      setTimeout(() => {
        oldLightboxContainer.remove();
      }, 300);
    });
  }
}

export default Lightbox;
