'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// https://restcountries.com/
// https://gitlab.com/restcountries/restcountries/-/blob/master/FIELDS.md

{
  /* <button class="btn-country">Where am I?</button> */
}
///////////////////////////////////////

// const htmlRequest = new XMLHttpRequest();
// htmlRequest.open(
//   `GET`,
//   `https://countries-api-836d.onrender.com/countries/name/usa`
// );
// htmlRequest.send();
// htmlRequest.addEventListener(`load`, function () {
//   //   console.log(response);
//   const [apiData] = JSON.parse(htmlRequest.responseText);
//   console.log(apiData);

//   const countryInfo = `<article class="country">
//   <img class="country__img" src="${apiData.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${apiData.name}</h3>
//     <h4 class="country__region">${apiData.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       Number(apiData.population) / 1000000
//     ).toFixed(1)} million people</p>
//     <p class="country__row"><span>🗣️</span>${apiData.languages[0][`name`]}</p>
//     <p class="country__row"><span>💰</span>${apiData.currencies[0][`code`]}</p>
//   </div>
//   </article>`;

//   countriesContainer.insertAdjacentHTML(`beforeend`, countryInfo);
//   countriesContainer.style.opacity = 1;
// });

function renderCountry(country, countryClass = ``) {
  // For https://restcountries.com/v3.1/

  const countryInfo = `<article class="country ${countryClass}">
  <img class="country__img" src="${country.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${country.name.common}</h3>
    <h4 class="country__region">${country.region}</h4>
    <p class="country__row"><span>👫</span>${(
      Number(country.population) / 1000000
    ).toFixed(1)} million people</p>
    <p class="country__row"><span>🗣️</span>${Object.values(
      country.languages
    ).join(`, `)}</p>
    <p class="country__row"><span>💰</span>${Object.keys(
      country.currencies
    ).join(`, `)}</p>
  </div>
  </article>`;

  // For https://countries-api-836d.onrender.com/

  //   const countryInfo = `<article class="country ${countryClass}">
  //   <img class="country__img" src="${country.flag}" />
  //   <div class="country__data">
  //     <h3 class="country__name">${country.name}</h3>
  //     <h4 class="country__region">${country.region}</h4>
  //     <p class="country__row"><span>👫</span>${(
  //       Number(country.population) / 1000000
  //     ).toFixed(1)} million people</p>
  //     <p class="country__row"><span>🗣️</span>${country.languages[0][`name`]}</p>
  //     <p class="country__row"><span>💰</span>${country.currencies[0][`code`]}</p>
  //   </div>
  //   </article>`;

  countriesContainer.insertAdjacentHTML(`beforeend`, countryInfo);
  //   countriesContainer.style.opacity = 1;
}

function renderText(text) {
  // const html = `${text}`;
  countriesContainer.insertAdjacentText(`beforeend`, text);
}

function responseMessage(response) {
  // console.log(response);
  console.log(
    `${new Date().toISOString()}  ${response.ok ? `OK` : `ERROR`} ${
      response.status
    }`
  );
  if (!response.ok) {
    renderText(`Error: ${response.status}\nCountry not found`);
    throw new Error(`${response.status}\nCountry not found`);
  }
  return response.json();
}

function neighborCountry(neighbors) {
  neighbors.forEach(function (neighbor) {
    // console.log(neighbor);

    // For https://restcountries.com/v3.1/
    fetch(
      `https://restcountries.com/v3.1/alpha/${neighbor}?fields=name,flags,region,population,languages,currencies,borders`
    )
      .then(responseMessage)
      .then(function (data) {
        // For
        // console.log(data);
        renderCountry(data, `neighbor`);

        // neighborCountry(data.borders);
      });

    // For https://countries-api-836d.onrender.com/
    //   fetch(
    //     `https://countries-api-836d.onrender.com/alpha/${neighbor}`
    //   )
    //     .then(function (response) {
    //       return response.json();
    //     })
    //     .then(function (data) {
    //       // For
    //       console.log(data);
    //       renderCountry(data, `neighbor`);

    //       // neighborCountry(data.borders);
    //     });
  });
}

function fetchData(url) {
  return fetch(url).then(responseMessage);
}

function mainCountry(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then(responseMessage)
    .then(function ([data]) {
      //   console.log(data);

      //   console.log(Object.values(data.languages).join(`, `));
      //   console.log(Object.keys(data.currencies).join(`, `));

      renderCountry(data);

      return neighborCountry(data.borders);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
}

// mainCountry(`korea`);

function getLocation() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve([position.coords.latitude, position.coords.longitude]);
    }, reject);
  });
}

function coordinatesLookup(lat = ``, long = ``) {
  // let lat;
  // let long;

  // if (!lat && !long) {
  //   // console.log(false);
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       // console.log(position, `success`);
  //       const { latitude, longitude } = position.coords;
  //       lat = latitude;
  //       long = longitude;
  //       // console.log(lat, long);
  //     },
  //     function (error) {
  //       console.log(error.code, error.message);
  //     }
  //   );
  // }

  // if (!lat && !long) {
  //   return new Promise(function (resolve, reject) {
  //     navigator.geolocation.getCurrentPosition(resolve, reject);
  //   }).then(function (position) {
  //     console.log(position.coords.latitude);
  //     return fetch(
  //       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
  //     )
  //   });
  // }

  // fetch(
  //   `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
  // )

  new Promise(function (resolve, reject) {
    if (!lat && !long) {
      // console.log(!lat);
      navigator.geolocation.getCurrentPosition(function (position) {
        resolve([position.coords.latitude, position.coords.longitude]);
      }, reject);
    }
    if (lat && long) {
      resolve([lat, long]);
    }
  })
    .then(function (position) {
      // console.log(position);
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position[0]}&longitude=${position[1]}&localityLanguage=en`
      );
    })
    .then(function (response) {
      if (!response.ok) {
        new Error(`Error: Location error`);
      }

      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      console.log(
        `You are currently located in ${data.city}, ${data.countryName}`
      );
      return fetchData(
        `https://restcountries.com/v3.1/alpha/${data.countryCode}?fields=name,flags,region,population,languages,currencies,borders`
      );
    })
    .then(function (data) {
      // console.log(data);
      mainCountry(data.name.common);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// coordinatesLookup();

// coordinatesLookup(52.508, 13.381);
// coordinatesLookup(19.037, 72.873);
// coordinatesLookup(-33.933, 18.474);

function whereAmI() {
  getLocation()
    .then(function (myCoordinates) {
      // console.log(myCoordinates);
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${myCoordinates[0]}&longitude=${myCoordinates[1]}&localityLanguage=en`
      );
    })
    .then(function (response) {
      if (!response.ok) {
        new Error(`Error: Location error`);
      }

      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      console.log(
        `You are currently located in ${data.city}, ${data.countryName}`
      );
      return fetchData(
        `https://restcountries.com/v3.1/alpha/${data.countryCode}?fields=name,flags,region,population,languages,currencies,borders`
      );
    })
    .then(function (data) {
      // console.log(data);
      mainCountry(data.name.common);
    })
    .catch(function (error) {
      console.log(error);
    });
}

btn.addEventListener(`click`, whereAmI);

////////////////////////////////////////////////////////////////////////////////
console.log(`-`.repeat(35) + `Coding Challenge #2` + `-`.repeat(35));

const imageContainer = document.querySelector(`.images`);
let currentImage;

function createImage(imgPath) {
  return new Promise(function (resolve, reject) {
    const imageElement = document.createElement(`img`);
    imageElement.src = imgPath;

    imageElement.addEventListener(`error`, function (error) {
      // console.log(error);
      reject(new Error(`Image not found: ${error}`));
    });

    // window.onerror = function (message, url, linenumber) {
    //   console.log(`err${(message, url, linenumber)}`);
    // };
    imageElement.addEventListener(`load`, function (event) {
      // console.log(event);
      imageContainer.append(imageElement);
      imageElement.classList.add(`images`);
      resolve(imageElement);
    });
    // document.querySelector(`body`).insertAdjacentHTML(`afterbegin`, element);
    // reject(imageElement.src);
  });
}

function wait(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}

// createImage(`img/img-1.jpg`)
//   .then(function (element) {
//     // console.log(element);
//     currentImage = element;
//     return wait(2);
//     // setTimeout(function () {
//     //   currentImage.style.display = `none`;
//     // }, 2000);
//   })
//   .then(function () {
//     // console.log(testing);
//     currentImage.style.display = `none`;
//     return createImage(`img/img-2.jpg`);
//   })
//   .then(function (element) {
//     // console.log(element);
//     currentImage = element;
//     return wait(2);
//   })
//   .then(function () {
//     currentImage.style.display = `none`;
//     return createImage(`img/img-3.jpg`);
//   })
//   .then(function (element) {
//     // console.log(element);
//     currentImage = element;
//     return wait(2);
//   })
//   .then(function () {
//     currentImage.style.display = `none`;
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

console.log(`-`.repeat(35) + `Coding Challenge #2` + `-`.repeat(35));
////////////////////////////////////////////////////////////////////////////////

async function whereAmI2() {
  try {
    const myCoordinates = await getLocation();

    const countryCode = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${myCoordinates[0]}&longitude=${myCoordinates[1]}&localityLanguage=en`
    );
    const myCountryCode = await countryCode.json();
    const myCountry = await fetchData(
      `https://restcountries.com/v3.1/alpha/${myCountryCode.countryCode}?fields=name,flags,region,population,languages,currencies,borders`
    );
    // console.log(myCountry);

    mainCountry(myCountry.name.common);
    return `${myCountryCode.city}, ${myCountryCode.countryName}`;
  } catch (error) {
    console.log(error);
  }
}

console.log(`1: loading...`);
(async function () {
  try {
    const myLocation = await whereAmI2();
    console.log(`2: ${myLocation}`);
  } catch (error) {
    console.log(error);
  }
  console.log(`3: done`);
})();

async function get3Countries(country1, country2, country3) {
  try {
    const [capital1] = await (
      await fetch(
        `https://restcountries.com/v3.1/name/${country1}?fullText=true`
      )
    ).json();
    const [capital2] = await (
      await fetch(
        `https://restcountries.com/v3.1/name/${country2}?fullText=true`
      )
    ).json();
    const [capital3] = await (
      await fetch(
        `https://restcountries.com/v3.1/name/${country3}?fullText=true`
      )
    ).json();

    // console.log(capital1.capital, capital2.capital, capital3.capital);

    const allCountries = await Promise.all([
      (
        await fetch(
          `https://restcountries.com/v3.1/name/${country1}?fullText=true`
        )
      ).json(),
      (
        await fetch(
          `https://restcountries.com/v3.1/name/${country2}?fullText=true`
        )
      ).json(),
      (
        await fetch(
          `https://restcountries.com/v3.1/name/${country3}?fullText=true`
        )
      ).json(),
    ]);
    console.log(
      allCountries.flatMap(function (country) {
        return country[0][`capital`];
      })
    );
  } catch (error) {
    console.error(error);
  }
}
get3Countries(`south korea`, `germany`, `china`);

////////////////////////////////////////////////////////////////////////////////
console.log(`-`.repeat(35) + `Coding Challenge #3` + `-`.repeat(35));

async function loadNPause() {
  try {
    let imageElement = await createImage(`img/img-1.jpg`);
    // imageContainer.append(imageElement);
    // currentImage = imageElement;
    await wait(2);
    imageElement.style.display = `none`;

    imageElement = await createImage(`img/img-2.jpg`);
    await wait(2);
    imageElement.style.display = `none`;

    imageElement = await createImage(`img/img-3.jpg`);
    await wait(2);
    imageElement.style.display = `none`;
  } catch (error) {
    console.log(`Error`);
  }
}

async function loadAll(imgArr) {
  try {
    // imgArr.map(function (value) {
    //   // console.log(value);
    //   return createImage(value);
    // });

    const imgs = await Promise.all(
      imgArr.map(async function (value) {
        return createImage(value);
      })
    );
    console.log(imgs);

    imgs.forEach(function (image) {
      image.classList.add(`parallel`);
    });

    // document.querySelectorAll(`.images`).classList.add(`parallel`);
  } catch (error) {
    console.error(error);
  }
}

// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

console.log(`-`.repeat(35) + `Coding Challenge #3` + `-`.repeat(35));
////////////////////////////////////////////////////////////////////////////////
