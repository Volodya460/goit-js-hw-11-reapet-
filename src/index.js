import ImageIp from './api/api';
import { createCardImage } from './createImage/imagesCard';
import * as basicLightbox from 'basiclightbox';

const formEl = document.querySelector('#search-form');
const boxEL = document.querySelector('.gallery');
const buttonEl = document.querySelector('.load-more');
const bodyel = document.querySelector('body');

let quantityImg = 0;

formEl.addEventListener('submit', getimages);
buttonEl.addEventListener('click', loadMore);
boxEL.addEventListener('click', onGallaryBoxClick);
const imageApiService = new ImageIp();

async function getimages(ev) {
  ev.preventDefault();
  boxEL.innerHTML = '';
  imageApiService.query = ev.currentTarget.elements.searchQuery.value.trim();

  if (imageApiService.query === '') {
    return alert('Please write something');
  }

  imageApiService.resetPage();

  try {
    let images = await imageApiService.fetchImages();
    const { hits, totalHits, total } = images;
    quantityImg += hits.length;

    alert(`"Hooray! We found ${total} images."`);

    if (images.total === 0) {
      alert(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    let imagesLIst = createCardImage(images.hits);
    boxEL.insertAdjacentHTML('beforeend', imagesLIst);
    imageApiService.incramentPage();
    buttonEl.classList.remove('is-hidden');

    if (quantityImg === totalHits) {
      alert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadMore(ev) {
  try {
    let images = await imageApiService.fetchImages();
    const { hits, totalHits } = images;
    quantityImg += hits.length;
    if (quantityImg === totalHits) {
      buttonEl.classList.add('is-hidden');
      alert("We're sorry, but you've reached the end of search results.");
    }
    let imagesLIst = createCardImage(images.hits);
    boxEL.insertAdjacentHTML('beforeend', imagesLIst);
    lightbox.refresh();
    imageApiService.incramentPage();
  } catch (error) {
    alert(error.message);
  }
}

function onGallaryBoxClick(event) {
  // event.preventDefault();
  const clickObject = event.target.classList.contains('gallery__image');

  if (!clickObject) {
    return;
  }
  let largeImageURL = event.target.getAttribute('data-action');
  const instance = basicLightbox.create(`
	 <img src="${largeImageURL}" width="800" height="600">
`);

  instance.show();

  bodyel.addEventListener('keydown', onEscapeClick);

  function onEscapeClick(event) {
    console.log('hello');
    if (event.code === 'Escape') instance.close();
  }
}
