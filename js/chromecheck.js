const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

if (!isChrome) {
  // Display caution message
  const cautionMessage = document.createElement('div');
  cautionMessage.innerHTML = 'FinTala is optimized for Chrome browsers. For best experience, please use Chrome.';
  cautionMessage.style = 'background-color: #fff3cd; color: #856404; padding: 10px; text-align: center;';
  console.log("non chrome browser detected!")
  document.body.appendChild(cautionMessage);
}