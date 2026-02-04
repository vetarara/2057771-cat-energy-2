/* global ymaps */
/* в этот файл добавляет скрипты*/
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', () => {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

ymaps.ready(init);

function init() {
  const mapContainer = document.getElementById('map');

  mapContainer.classList.remove('map--nojs');
  mapContainer.innerHTML = '';

  const map = new ymaps.Map('map', {
    center: [59.938631, 30.323037],
    zoom: 15
  });

  const placemark = new ymaps.Placemark(
    [59.938631, 30.323037],
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: '../images/map-pin.png',
      iconImageSize: [113, 106],
      iconImageOffset: [-55, -100]
    }
  );

  map.geoObjects.add(placemark);
}
