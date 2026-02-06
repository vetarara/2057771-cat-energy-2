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

// Map

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
      iconImageHref: 'images/map-pin.png',
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

// Slider

const slider = document.querySelector('.slider');

if (slider) {
  const curtain = slider.querySelector('.slider__curtain');
  const imgBefore = slider.querySelector('.slider__image--before');
  const imgAfter = slider.querySelector('.slider__image--after');

  let isDragging = false;

  const updateSlider = (x) => {
    const rect = slider.getBoundingClientRect();
    let offsetX = x - rect.left;

    if (offsetX < 0) {
      offsetX = 0;
    }
    if (offsetX > rect.width) {
      offsetX = rect.width;
    }

    const percent = (offsetX / rect.width) * 100;

    curtain.style.left = `${percent}%`;
    imgBefore.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    imgAfter.style.clipPath = `inset(0 0 0 ${percent}%)`;
  };


  curtain.addEventListener('mousedown', () => {
    isDragging = true;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) {
      return;
    }
    updateSlider(e.clientX);
  });

  curtain.addEventListener('touchstart', () => {
    isDragging = true;
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) {
      return;
    }
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener('load', () => {
    imgBefore.style.clipPath = 'inset(0 50% 0 0)';
    imgAfter.style.clipPath = 'inset(0 0 0 50%)';
  });

  window.addEventListener('resize', () => {
    const beforeClip = imgBefore.style.clipPath.match(/(\d+(\.\d+)?)%/);
    const percent = beforeClip ? parseFloat(beforeClip[1]) : 50;

    imgBefore.style.clipPath = `inset(0 ${percent}% 0 0)`;
    imgAfter.style.clipPath = `inset(0 0 0 ${100 - percent}%)`;
  });
}

