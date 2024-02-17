import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './api-cat';

const breedSelectHtml = document.querySelector('.breed-select');
const errorHtml = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-wrapper');

errorHtml.classList.add('hidden');
loader.classList.remove('hidden');

try {
  fetchBreeds().then(data => {
    renderBreeds(data);
    loader.classList.add('hidden');
  });
} catch (error) {
  Notiflix.Notify.failure('Error fetching breeds:', error);
  errorHtml.classList.remove('hidden');
  loader.classList.add('hidden');
}

function renderBreeds(breeds) {
  const markup = breeds
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
  breedSelectHtml.innerHTML = markup;
}

breedSelectHtml.addEventListener('change', event => {
  const breedId = event.target.value;
  loader.classList.remove('hidden');
  catInfo.innerHTML = '';
  fetchCatByBreed(breedId)
    .then(catData => {
      renderCat(catData);
      loader.classList.add('hidden');
    })
    .catch(error => {
      Notiflix.Notify.failure('Error fetching cat:', error);
      errorHtml.classList.remove('hidden');
      loader.classList.add('hidden');
    });
});

function renderCat(catData) {
  const { url } = catData[0];
  const { description, temperament, name } = catData[0].breeds[0];
  catInfo.innerHTML = `
    <h2>${name}</h2>
    <img src="${url}" alt="${name}" height="400"/>
    <p>${description}</p>
    <p><strong>Temperament:</strong> ${temperament}</p>
  `;
}
