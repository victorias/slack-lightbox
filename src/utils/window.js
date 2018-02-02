export const onLoad = func => {
  const oldOnLoad = window.onload;
  window.onload = () => {
    if (oldOnLoad) {
      oldOnLoad();
    }
    func();
  };
};

export const queueAnimation = (el, className, cb) => {
  window.requestAnimationFrame(t => {
    window.requestAnimationFrame(t2 => {
      el.className += ` ${className}`;
      cb();
    });
  });
};
