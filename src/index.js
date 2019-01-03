import $ from 'jquery';

import './index.css';

function addFavicon(src) {
  const link = document.createElement('link');
  link.rel = 'shortcut icon';
  link.href = src;
  document.head.appendChild(link);
}

addFavicon('../assets/icon.ico');
