//connect html elements to javascript
const search = document.getElementById('textInput')
const category = document.getElementById('selectOptions')
const form = document.getElementById('form')
const result1 = document.getElementById('result')
const result2 = document.getElementById('resultText')
const result3 = document.getElementById('resultMore')
const moreResults = document.getElementById('moreResults')
const loader = document.querySelector('#loading')

// asynchronous function to get information
async function fetchStarWars(type, query) {
  let StarWarsInfo = await fetch(`https://swapi.dev/api/${type}/${query}`).then(
    async (data) => {
      return await data.json()
    }
  )

  return StarWarsInfo
}

// line 20-28, we get information from apis, a looop to be able to set options dynamic from API
$(document).ready(async () => {
  let infoStarWars = await fetchStarWars('', '')
  let apis = Object.keys(infoStarWars)
  for (let i = 0; i < apis.length; i++) {
    $('#selectOptions').append($('<option>', { value: apis[i], text: apis[i] }))
  }
});
//listen event when the form is submitted
form.addEventListener('submit', (e) => {
  //prevent the page reloading when the form is submitted
  e.preventDefault()
  // get values of input field,and select field
  let search = document.getElementById('textInput').value
  let type = document.getElementById('selectOptions').value
  //call the function of remove the old results to avoid overlapping new and old results
  removeResults()
  //call the function of get search results and show to the page
  getSearchResults(search, type)
});

//remove the old results if someone wants to search a new thing;
function removeResults() {
  result1.replaceChildren()
  result2.replaceChildren()
  result3.replaceChildren()
  moreResults.replaceChildren()
}

async function getSearchResults(keyword, category) {
  displayLoading(); // call spinner loading before getting ajax results
  //call fetch to get the data from the api
  await fetch(`https://swapi.dev/api/${category}/?search=${keyword}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      hideLoading(); // Remove spinner loading when successfull response ajax
      //if no results notifies to the user
      if (data.count == 0) {
        alert('No results');
        //else call different functions based on category
      } else {
        switch (category) {
          case 'people':
            getPeopleResult(data);
            break
          case 'films':
            getFilmsResult(data);
            break
          case 'planets':
            getPlanetsResult(data);
            break
          case 'vehicles':
            getVehiclesResult(data);
            break
          case 'starships':
            getStarshipsResult(data);
            break
          case 'species':
            getSpeciesResult(data);
            break
        }
      }
    });
}
//get results from the people category, and show to the page
function getPeopleResult(data) {
  data.results.forEach((item) => {
    const li = document.createElement('li')
    li.innerHTML = ` ${item.name}`
    result1.appendChild(li)

    const li2 = document.createElement('li')
    li2.innerHTML = ` ${item.height}`
    result2.appendChild(li2)

    const li3 = document.createElement('li')
    li3.innerHTML = `${item.gender}`
    result3.appendChild(li3)

    let liMore = `<li><button class="trigger" value="${item.url}">show more!</button></li>`
    const myFragment = document.createRange().createContextualFragment(liMore)
    moreResults.appendChild(myFragment)
  })
}
//get results from the planet category  and show to the page
function getPlanetsResult(data) {
  data.results.forEach((item) => {
    const li = document.createElement('li')
    li.innerHTML = ` ${item.name} `
    result1.appendChild(li)

    const li2 = document.createElement('li')
    li2.innerHTML = ` ${item.climate}`
    result2.appendChild(li2)

    const li3 = document.createElement('li')
    li3.innerHTML = ` ${item.diameter}`
    result3.appendChild(li3)

    let liMore = `<li><button class="trigger" value="${item.url}">show more!</button></li>`
    const myFragment = document.createRange().createContextualFragment(liMore)
    moreResults.appendChild(myFragment)
  })
}
//get results from the films category  and show to the page
function getFilmsResult(data) {
  data.results.forEach((item) => {
    const li = document.createElement('li')
    li.innerHTML = ` ${item.tittle}`
    result1.appendChild(li)

    const li2 = document.createElement('li')
    li2.innerHTML = ` ${item.release_date}`
    result2.appendChild(li2)

    const li3 = document.createElement('li')
    li3.innerHTML = ` ${item.producer}`
    result3.appendChild(li3)

    let liMore = `<li><button class="trigger" value="${item.url}">show more!</button></li>`
    const myFragment = document.createRange().createContextualFragment(liMore)
    moreResults.appendChild(myFragment)
  })
}
//get results from the vehicles category  and show to the page
function getVehiclesResult(data) {
  data.results.forEach((item) => {
    const li = document.createElement('li')
    li.innerHTML = ` ${item.consumables}`
    result1.appendChild(li)

    const li2 = document.createElement('li')
    li2.innerHTML = ` ${item.edited}`
    result2.appendChild(li2)

    const li3 = document.createElement('li')
    li3.innerHTML = `${item.length}`
    result3.appendChild(li3)

    let liMore = `<li><button class="trigger" value="${item.url}">show more!</button></li>`
    const myFragment = document.createRange().createContextualFragment(liMore)
    moreResults.appendChild(myFragment)
  })
}
//get results from the starships category  and show to the page
function getStarshipsResult(data) {
  data.results.forEach((item) => {
    const li = document.createElement('li')
    li.innerHTML = ` ${item.consumables}`
    result1.appendChild(li)

    const li2 = document.createElement('li')
    li2.innerHTML = ` ${item.edited}`
    result2.appendChild(li2)

    const li3 = document.createElement('li')
    li3.innerHTML = ` ${item.length}`
    result3.appendChild(li3)

    let liMore = `<li><button class="trigger" value="${item.url}">show more!</button></li>`
    const myFragment = document.createRange().createContextualFragment(liMore)
    moreResults.appendChild(myFragment)
  })
}
//get results from the species category  and show to the page
function getSpeciesResult(data) {
  data.results.forEach((item) => {
    const li = document.createElement('li')
    li.innerHTML = ` ${item.name}`
    result1.appendChild(li)

    const li2 = document.createElement('li')
    li2.innerHTML = `${item.classification}`
    result2.appendChild(li2)

    const li3 = document.createElement('li')
    li3.innerHTML = ` ${item.average_height}`
    result3.appendChild(li3)

    let liMore = `<li><button class="trigger" value="${item.url}">show more!</button></li>`
    const myFragment = document.createRange().createContextualFragment(liMore)
    moreResults.appendChild(myFragment)
  })
}

// showing loading
function displayLoading() {
  loader.classList.add('display')
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove('display')
  }, 400000)
}

// hiding loading
function hideLoading() {
  loader.classList.remove('display')
}
