const DB_LOCAL = "stays.json";
const DB_URL =
  "https://raw.githubusercontent.com/pamdayne/wind-d-bnb/main/db/stays.json";

async function fetchLocations() {
  return fetch(DB_URL)
    .then(function(resp){return resp.json()})
    .then(function(json){
       return json;
    }).catch(function(error){
      console.error(error);
    })
}

async function renderList() {
  let places = await fetchLocations()
  let featImg, typeDiv, hostDiv, rateDiv, bedDiv, descDiv, unitDiv, detailsDiv, mainDiv = {}

  places.forEach(location => {
    const { photo, title, superHost, type, beds, rating} = location;

    // The place's image
    featImg = setFeaturedImage(photo, title, 'photo')

    // Unit's details
    hostDiv = superHost ? setContentElement('div', 'SUPER HOST', 'host') : ''
    typeDiv = setContentElement('div', type, 'type')
    bedDiv = beds ? setContentElement('div', beds, 'bed') : ''
    rateDiv = setContentElement('div', rating, 'rating')
    rateDiv.insertBefore(setIconElement('star'), rateDiv.firstChild)

    // Wraps the details
    unitDiv = setContentElement('div', '', 'unit')
    unitDiv.append(hostDiv, typeDiv, bedDiv, rateDiv)

    descDiv = setContentElement('div', title, 'short-desc')

    detailsDiv = setContentElement('div', '', 'details')
    detailsDiv.append(unitDiv, descDiv)

    mainDiv = setContentElement('div', '', 'list-wrapper')
    mainDiv.append(featImg, detailsDiv)

    // IMPROVE: #locations.innerHTML will get replaced with the html in every iteration
    document.querySelector('#locations').appendChild(mainDiv)
  });

}

function setCountry(country) {
  document.querySelector("#country").innerHTML = "Stays in " + country;
}

function setContentElement(el, content, className){
  let contentElement = document.createElement(el)
  contentElement.classList.add(className)
  contentElement.textContent = content
  return contentElement
}

function setFeaturedImage(src, alt, className){
  let imageWrapper = setContentElement('div', '', className)

  // Creates the image element
  let imageElement = document.createElement('img')
  imageElement.src = src
  imageElement.alt = alt

  // sets it the Image Wrapper
  imageWrapper.appendChild(imageElement)
  return imageWrapper;
}

function setIconElement(icon){
  let iconElement = document.createElement('span')
  iconElement.classList.add('material-icons')
  iconElement.textContent = icon
  return iconElement
}

// IMPROVE: try to use https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
window.addEventListener('load', renderList)
