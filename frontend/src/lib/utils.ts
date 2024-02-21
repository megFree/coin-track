const getScrollHandler = () => {
  const x = window.scrollX;
  const y = window.scrollY;
  return () => window.scrollTo(x, y);
}

export const disableScroll = () => {
  const scrollHandler = getScrollHandler();
  window.addEventListener('scroll', scrollHandler);
  return scrollHandler;
}

export const enableScroll = (scrollHandler) => {
  window.removeEventListener('scroll', disableScrollHandler);
}
