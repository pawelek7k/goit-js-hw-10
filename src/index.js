import { fetchBreeds, fetchCatByBreed } from './api-cat';

const breedSelectHtml = document.querySelector('.breed-select');
const errorHtml = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

errorHtml.classList.add('hidden');

try {
  fetchBreeds().then(data => renderBreeds(data));
} catch (error) {
  errorHtml.classList.remove('hidden');
  errorHtml.classList.add('show');
}

function renderBreeds(breeds) {
  const markup = breeds
    .map(({ name, id }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelectHtml.innerHTML = markup;
}

breedSelectHtml.addEventListener('change', event => {
  const breedId = event.target.value;
  fetchCatByBreed(breedId).then(catData => renderCat(catData));
});

function renderCat(catData) {
  const { url } = catData[0];
  const { description, temperament, name } = catData[0].breeds[0];
  catInfo.innerHTML = `
    <h2>${name}</h2>
    <img src="${url}" alt="${name}" width="600"/>
    <p>${description}</p>
    <p><strong>Temperament:</strong> ${temperament}</p>
  `;
}
