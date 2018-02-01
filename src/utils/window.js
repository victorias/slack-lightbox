export const onLoad = func => {
  const oldOnLoad = window.onload;
  window.onload = () => {
    if (oldOnLoad) {
      oldOnLoad();
    }
    func();
  };
};
