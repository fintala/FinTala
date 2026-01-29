// ======================
//  CHARTs SPLASH SCREEN
// ======================
const chartSplash = document.getElementById('chart-loadScreen');
const chartApp = document.getElementById('app');
const clSpan = document.getElementById('cl-span');

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
};

loadSplash();