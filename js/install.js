let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.querySelector('.install-prompt').style.display = 'flex';
});

window.addEventListener('appinstalled', () => {
  document.querySelector('.install-prompt').style.display = 'none';
});

document.getElementById('appInst').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
    document.querySelector('.install-prompt').style.display = 'none';
  }
});