import axios from 'axios';

const breedSelectHtml = document.querySelector('.breed-select');

const errorHtml = document.querySelector('.error');

errorHtml.classList.add('hidden');

axios.defaults.headers.common['x-api-key'] =
  'live_3WqxKBPPm7Nhb7bH6v5KJekaENAwu83GPEJU9IDPWyNtMxR4uV3pJr6uxDYogigc';

fetch('https://api.thecatapi.com/v1/breeds')
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    const createOption = data
      .map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
      })
      .join('');

    breedSelectHtml.innerHTML = createOption;
  })
  .catch(error => {
    errorHtml.classList.remove('hidden');
    errorHtml.classList.add('show');
  });
