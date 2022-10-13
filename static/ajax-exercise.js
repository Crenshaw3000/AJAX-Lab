'use strict';

const button = document.querySelector('#get-fortune-button');
button.addEventListener('click', () => {

  fetch('/fortune')
    .then((response) => response.text())
    .then((responseData) => {
      document.querySelector('#fortune-text').innerText = responseData;

    });

});

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  const url = `/weather.json?zipcode=${zipcode}`;

  fetch(url)
    .then((response) => response.json())
    .then((responseJSON) => {
      document.querySelector('#weather-info').innerHTML = responseJSON.forecast
    })
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

// function orderMelons(evt) {
//   evt.preventDefault();

document.querySelector('#order-form').addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formInputs = {
      melon_type: document.querySelector('#melon-type-field').value,
      qty: document.querySelector('#qty-field').value,
    };

    fetch('/order-melons.json', {
      method: 'POST',
      body: JSON.stringify(formInputs),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
      if (responseJson.code === 'OK') {

        document.querySelector('#order-status').innerHTML = responseJson.msg
      }
      else {
        document.querySelector('#order-status').classList.add('order-error')
        document.querySelector('#order-status').innerHTML = responseJson.msg     
      }
      })


  })
