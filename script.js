const db_local = "stays.json";
const db_url =
  "https://raw.githubusercontent.com/pamdayne/wind-d-bnb/main/db/stays.json";

async function fetchLocations() {
  try {
    let resp = await fetch(db_url);
    return await resp.json();
  } catch (err) {
    console.error(err);
  }
}

async function renderList() {
  let places = await fetchLocations();
  // IMPROVE: try to destructure the properties
  // const { photo, title, superHost, type } = await fetchLocations();

  places.forEach((place) => {
    // IMPROVE: this will get called every iteration
    // setCountry(place.country);

    let unitDiv = document.createElement('div')
    unitDiv.classList.add('unit')

    let imgDiv = document.createElement('div')
    imgDiv.classList.add('photo')

    let hostDiv = document.createElement('div')
    hostDiv.classList.add('host')

    let typeDiv = document.createElement('div')
    typeDiv.classList.add('type')

    let bedDiv = document.createElement('div')
    bedDiv.classList.add('total')

    let rateDiv = document.createElement('div')
    rateDiv.classList.add('rating')

    let descDiv = document.createElement('div')
    descDiv.classList.add('short-desc')

    let mainDiv = document.createElement('div')
    mainDiv.classList.add('list-wrapper')

    let detailsDiv = document.createElement('div')
    detailsDiv.classList.add('details')

    // Unit's Image: Creates image element
    let img = document.createElement('img')
    img.src = place.photo
    img.alt = place.title
    imgDiv.appendChild(img)

    // Unit's SuperHost: Checks if unit is a super host, adds the label
    if (place.superHost) {
      hostDiv.textContent = 'SUPER HOST'
      unitDiv.appendChild(hostDiv)
    }

    // Unit type: Creates and sets the Unit type
    place.type ? typeDiv.textContent = place.type : ''

    // Unit beds: Checks if data exist - add total bed into unit details
    place.beds ? bedDiv.textContent = place.beds : ''

    // Unit's rate: creates and adds rating
    if(place.rating){
      rateDiv.textContent = place.rating

      // Add star icon
      let ratingIcon = document.createElement('span')
      ratingIcon.classList.add('material-icons')
      ratingIcon.textContent = 'star'
      rateDiv.insertBefore(ratingIcon, rateDiv.firstChild)
    }

    // Unit: Creates and appends childs under Unit div and add class 'unit'
    unitDiv.append(typeDiv, bedDiv, rateDiv)

    // Unit Details: Creates and appends the children of Details
    detailsDiv.append(unitDiv)

    // Unit Title: Creates the description/title of the unit
    place.title ?  descDiv.textContent = place.title : ''

    // Item Unit: wrapper
    mainDiv.append(imgDiv, detailsDiv, descDiv)

    // IMPROVE: try to use:
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/append
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
    // html += `<div class="lists-wrapper">
    // 						<div class="photo">
    // 							<img
    // 								src="${place.photo}"
    // 								alt="${place.title}"
    // 								loading
    // 							/>
    // 						</div>
    // 						<div class="details">
    // 							<div class="unit">
    // 							${places.superHost != false ? '<div class="host"> Super Host</div>' : ""}
    // 								<div class="type">${place.type}</div >
    // 								<div class="bed">
    // 								${place.beds != null
    //     ? '<span class="total">' + place.beds + " beds</span > "
    //     : ""
    //   }
    // 								</div >
    // 								<div class="score">
    // 								<span class="rating">${place.rating}</span>
    // 								</div>
    // 							</div>
    // 							<div class="short-desc">${place.title}</div>
    // 						</div>
    // 					</div> `;

    // IMPROVE: #locations.innerHTML will get replaced with the html in every iteration
    document.querySelector("#locations").appendChild(mainDiv);
  });
}

function setCountry(country) {
  document.querySelector("#country").innerHTML = "Stays in " + country;
}

// IMPROVE: try to use https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
renderList();
