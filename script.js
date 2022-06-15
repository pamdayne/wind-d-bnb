const DB_URL = "//raw.githubusercontent.com/pamdayne/wind-d-bnb/main/db/stays.json";

async function fetchLocations() {
  return fetch(DB_URL)
    .then(function (resp) { return resp.json() })
    .then(function (json) {
      return json;
    }).catch(function (error) {
      console.error(error);
    })
}

async function renderList() {
  let places = await fetchLocations()
  let listWrapper = setContentElement('div', '', 'list-wrapper')

  places.forEach(location => {
    const { photo, title, superHost, type, beds, rating } = location;

    // Create inner sections
    const featImg = getFeaturedImage(photo, title, 'photo')
    const unitType = getUnitType(type)
    const totalBeds = getTotalBeds(beds)
    const rate = getRating(rating)
    const shortDesc = getDescription(title)

    // Assemble unit details
    const unitDiv = setContentElement('div', '', 'unit')
    unitDiv.append(superHost != false ? getSuperHost(superHost) : '', unitType, beds != null ? getTotalBeds(beds) : '', rate)

    // Assemble the whole one item
    const itemWrapper = setContentElement('div', '', 'item-wrapper')
    itemWrapper.append(featImg, unitDiv, shortDesc)

    // Wrap all items in a wrapper
    listWrapper.appendChild(itemWrapper)
  });
  document.querySelector('#locations').appendChild(listWrapper)
}

function setContentElement(el, content = null, className = null) {
  let contentElement = document.createElement(el)
  className != null ? contentElement.classList.add(className): null
  contentElement.textContent = content
  return contentElement
}

function getIconElement(icon) {
  let iconElement = document.createElement('span')
  iconElement.classList.add('material-icons')
  iconElement.textContent = icon
  return iconElement
}

function getFeaturedImage(src, alt, className = '') {
  let imageWrapper = setContentElement('div', '', className)

  // Creates the image element
  let imageElement = document.createElement('img')
  imageElement.src = src
  imageElement.alt = alt

  // sets it the Image Wrapper
  imageWrapper.appendChild(imageElement)
  return imageWrapper;
}

function getUnitType(type) {
  return setContentElement('div', type, 'type')
}

function getSuperHost(host){
  return setContentElement('div', 'SUPER HOST', 'host')
}

function getTotalBeds(beds) {
  return setContentElement('div', beds + ' beds', 'beds')
}

function getRating(rating){
  let html = setContentElement('div', rating, 'rating')
  html.insertBefore(getIconElement('star'), html.firstChild)
  return html
}

function getDescription(title){
  let html = setContentElement('div', '', 'short-desc')
  html.insertBefore(setContentElement('p', title), html.firstChild)
  return html
}

function getCountry(country) {
  document.querySelector("#country").innerHTML = "Stays in " + country;
}

// Renders on load
window.addEventListener('load', renderList)
