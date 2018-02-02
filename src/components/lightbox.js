class Lightbox {
  constructor(onClose) {
    this.element = document.getElementById('lightbox');
    this.back = this.element.getElementsByClassName('back')[0];
    this.forward = this.element.getElementsByClassName('forward')[0];
    this.title = this.element.getElementsByClassName('title')[0];
    this.img = this.element.getElementsByTagName('img')[0];
    this.onCloseLightbox = onClose;
  }

  show(imgUrl, title, onClickNext = null, onClickBack = null) {
    this.element.className = '';
    this.img.src = imgUrl;
    this.title.innerHTML = title;
    this.element.style.height = `${document.body.clientHeight}px`;

    window.requestAnimationFrame(t => {
      window.requestAnimationFrame(t2 => {
        this.element.style.visibility = 'visible';
        this.element.className = 'fade-in';
      });
    });
  }

  close() {
    this.element.className = '';

    window.requestAnimationFrame(t => {
      window.requestAnimationFrame(t2 => {
        this.element.style.visibility = 'hidden';
        this.element.className = 'fade-out';
      });
    });

    this.onCloseLightbox();
  }
}

export default Lightbox;
