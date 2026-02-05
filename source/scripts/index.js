/* global ymaps */

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

  const placemarkCoordinates = [59.938631, 30.323037];

  // Функция для центра карты
  const getCenter = () => {
    if (window.innerWidth >= 1280) {
      return [59.938631, 30.3145];
    } else {
      return [59.938631, 30.323037];
    }
  };

  const map = new ymaps.Map('map', {
    center: getCenter(),
    zoom: 15
  });

  const placemark = new ymaps.Placemark(
    placemarkCoordinates,
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: '../images/map-pin.png',
      iconImageSize: [113, 106],
      iconImageOffset: [-55, -100]
    }
  );

  map.geoObjects.add(placemark);

  window.addEventListener('resize', () => {
    map.setCenter(getCenter());
    placemark.geometry.setCoordinates(placemarkCoordinates);
    map.container.fitToViewport();
  });
}

