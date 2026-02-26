// ======================
//  CHARTs SPLASH SCREEN
// ======================
const chartSplash = document.getElementById('chart-loadScreen');
const chartApp = document.getElementById('app');
const clSpan = document.getElementById('cl-span');

let splashLoaded = "no";
if (splashLoaded === "yes") {
  function loadSplashRotated() {
    setTimeout (() => {
      clSpan.textContent = '.';
    }, 1200);
    setTimeout (() => {
      clSpan.textContent = '. .';
    }, 1400);
    setTimeout (() => {
      clSpan.textContent = '. . .';
    }, 1700);
  
    chartSplash.style.cssText = `
      transform-origin: center;
      transform: rotate(90deg) scale(0.8);
      animation: 1.5s opacity 2s;
      animation-fill-mode: forwards;
      `;
    
    setTimeout (() => {
      chartSplash.style.display = 'none';
    }, 3800);
  };
  loadSplashRotated();
  
}

  function loadSplash() {
    setTimeout (() => {
      clSpan.textContent = '.';
    }, 1200);
    setTimeout (() => {
      clSpan.textContent = '. .';
    }, 1400);
    setTimeout (() => {
      clSpan.textContent = '. . .';
    }, 1700);
  
    chartSplash.style.cssText = `
      animation: 1.5s opacity 2s;
      animation-fill-mode: forwards;
      `;
    
    setTimeout (() => {
      chartSplash.style.display = 'none';
    }, 3800);
    splashLoaded = "yes";
  };
  loadSplash();