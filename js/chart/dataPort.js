// =============================
//  Linking Dashboard to Charts
// =============================
const bhl = document.getElementById('bhl');
const amw = document.getElementById('amw');
const nbm = document.getElementById('nbm');
const ill = document.getElementById('illovo');
const tnm = document.getElementById('tnm');
const nitl = document.getElementById('nitl');
const nico = document.getElementById('nico');
const fdhb = document.getElementById('fdhb');
const fmb = document.getElementById('fmb');


let ticker = [];
// ==========================
//  Initializing Data Source
// ==========================
bhl.addEventListener('click', () => {
  ticker = 'bhl';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
  }, 200);
});

amw.addEventListener('click', () => {
  ticker = 'amw';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

nbm.addEventListener('click', () => {
  ticker = 'nbm';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

ill.addEventListener('click', () => {
  ticker = 'ill';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

tnm.addEventListener('click', () => {
  ticker = 'tnm';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

nitl.addEventListener('click', () => {
  ticker = 'nitl';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

nico.addEventListener('click', () => {
  ticker = 'nico';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

nbs.addEventListener('click', () => {
  ticker = 'nbs';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

fdhb.addEventListener('click', () => {
  ticker = 'fdhb';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

fmb.addEventListener('click', () => {
  ticker = 'fmb';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

icon.addEventListener('click', () => {
  ticker = 'icon';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

omu.addEventListener('click', () => {
  ticker = 'omu';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

mpico.addEventListener('click', () => {
  ticker = 'mpico';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

pcl.addEventListener('click', () => {
  ticker = 'pcl';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

stdb.addEventListener('click', () => {
  ticker = 'stdb';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});

sunbird.addEventListener('click', () => {
  ticker = 'sunbird';
  localStorage.setItem("symbol", ticker);
  setTimeout ( () => {
    window.location.href = 'charts.html';
 }, 200);
});