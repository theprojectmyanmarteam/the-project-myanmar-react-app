// checks whether user is on mobile browser
function isMobile() {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/;
  return mobileRegex.test(window.navigator.userAgent);
}

export default isMobile;
