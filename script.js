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

    // Create image element
    let imgDiv = document.createElement('div')
    let img = document.createElement('img')
    img.src = place.photo
    img.alt = place.title
    imgDiv.classList.add('photo')
    imgDiv.appendChild(img)

    // Create DIV elements for the details portion
    let detailsDiv = document.createElement('div')
    let unitDiv = document.createElement('div')
    let typeDiv = document.createElement('div')
    let bedDiv = document.createElement('div')
    let hostDiv = document.createElement('div')

    // SuperHost: Checks if data exist, adds superHost label
    if (place.superHost) {
      hostDiv.classList.add = 'host'
      hostDiv.textContent = 'SUPER HOST'
      unitDiv.appendChild(hostDiv)
    }

    // Unit Type
    typeDiv.textContent = place.type

    // Checks if data exist - if yes, add total bed into unit details
    if (place.beds) {
      let bedSpan = document.createElement('span')
      bedSpan.classList.add = 'total'
      bedSpan.textContent = place.beds + ' beds'
      bedDiv.appendChild(bedSpan)
    }

    // Appends childs under Unit div and add class 'unit'
    unitDiv.appendChild(typeDiv)
    unitDiv.appendChild(bedDiv)
    unitDiv.classList.add('unit')

    // Appends the children of Details
    detailsDiv.append(unitDiv)
    detailsDiv.classList.add('details')

    // Main item div
    let mainDiv = document.createElement('div')
    mainDiv.classList.add('list-wrapper')
    mainDiv.appendChild(imgDiv)
    mainDiv.appendChild(detailsDiv)

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
    // 								<span class="material-icons">star</span>
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
