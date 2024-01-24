import ImageIp from './api/api';
import { createCardImage } from './createImage/imagesCard';
const formEl = document.querySelector('#search-form');
const boxEL = document.querySelector('.gallery');
const buttonEl = document.querySelector('.load-more');
let quantityImg = 0;

formEl.addEventListener('submit', getimages);
buttonEl.addEventListener('click', loadMore);
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
    const { hits, totalHits } = images;
    quantityImg += hits.length;
    if (images.total === 0) {
      alert(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    let imagesLIst = createCardImage(images.hits);
    boxEL.insertAdjacentHTML('beforeend', imagesLIst);
    if (quantityImg === totalHits) {
      alert('This is th end');
    }
    imageApiService.incramentPage();
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

async function loadMore(ev) {
  try {
    let images = await imageApiService.fetchImages();
    const { hits, totalHits } = images;
    quantityImg += hits.length;
    if (quantityImg === totalHits) {
      return alert('This is th end');
    }
    let imagesLIst = createCardImage(images.hits);
    boxEL.insertAdjacentHTML('beforeend', imagesLIst);
    imageApiService.incramentPage();
  } catch (error) {
    alert(error.message);
  }
}
