class Lightbox {
  constructor(onClose) {
    this.isOpen = false;
    this.element = document.getElementById('lightbox');
    this.back = this.element.getElementsByClassName('back')[0];
    this.forward = this.element.getElementsByClassName('forward')[0];
    this.title = this.element.getElementsByClassName('title')[0];
    this.img = this.element.getElementsByTagName('img')[0];
    this.onCloseLightbox = onClose;

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        this.close();
      }
    });
  }

  show(imgUrl, title, onClickNext = null, onClickBack = null) {
    this.open = true;
    this.element.className = '';
    this.img.src = imgUrl;
    this.title.innerHTML = title;
    this.element.style.height = `${document.body.clientHeight}px`;

    window.requestAnimationFrame(t => {
      window.requestAnimationFrame(t2 => {
        this.element.style.display = 'block';
        this.element.className = 'fade-in';
      });
    });
  }

  close() {
    if (this.open) {
      this.element.className = '';

      window.requestAnimationFrame(t => {
        window.requestAnimationFrame(t2 => {
          this.element.className = 'fade-out';

          setTimeout(() => {
            this.element.style.display = 'none';
          }, 299);
        });
      });

      this.onCloseLightbox();
    }
  }
}

export default Lightbox;
