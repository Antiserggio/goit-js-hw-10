import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  info: document.querySelector('.cat-info'),
};

const { select, loader, error, info } = refs;

loader.style.display = 'none';
error.style.display = 'none';
select.style.display = 'none';
info.style.display = 'none';

Loading.circle('Loading data, please wait...', {
  svgColor: '#FF7E00',
  svgSize: '100px',
  messageFontSize: '30px',
  backgroundColor: 'rgba(0,0,0,0.8)',
});

fetchBreeds()
  .then(data => {
    select.style.display = 'flex';
    loader.style.display = 'none';

    createMarkupOptions(data);

    new SlimSelect({
      select,
    });
  })
  .catch(error => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    hideLoader();
  })
  .finally(result => Loading.remove());

function createMarkupOptions(arr) {
  const option = arr
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');
  select.insertAdjacentHTML('beforeend', option);
}

select.addEventListener('change', onHandleChange);

function onHandleChange(e) {
  e.preventDefault();

  const breedId = e.target.value;

  Loading.circle('Loading data, please wait...', {
    svgColor: '#FF7E00',
    svgSize: '100px',
    messageFontSize: '30px',
    backgroundColor: 'rgba(0,0,0,0.8)',
  });

  fetchCatByBreed(breedId)
    .then(catInfo => {
      info.style.display = 'flex';
      createMarkupCards(catInfo);
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      hideLoader();
    })
    .finally(result => Loading.remove());
}

function createMarkupCards(data) {
  const card = `
      <img class="cat-img" src="${data.url}" alt="${data.breeds[0].name}"  >
       <div class="cat-right">
      <h1 class="name">${data.breeds[0].name}</h1>
      <p class="description">${data.breeds[0].description}</p>
      <p class="temperament"><span class="temperament-span">Temperament:</span> ${data.breeds[0].temperament}</p>
      </div>`;

  info.innerHTML = card;
}

function hideLoader() {
  loader.style.display = 'none';
  info.style.display = 'none';
}
