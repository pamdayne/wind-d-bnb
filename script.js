const db_local = 'stays.json'
const db_url = 'https://raw.githubusercontent.com/pamdayne/wind-d-bnb/main/db/stays.json'

async function fetchLocations() {
	try {
		let resp = await fetch(db_url)
		return await resp.json()
	} catch (err) {
		console.error(err)
	}
}

async function renderList() {
	let places = await fetchLocations()
	let html = ''

	places.forEach(place => {

		html += `<div class="lists-wrapper">
								<div class="photo">
									<img
										src="${place.photo}"
										alt="${place.title}" />
								</div>
								<div class="details">
									<div class="unit">
										<div class="host">${place.superHost != false ? 'Super Host' : ''}</div>
										<div class="type">${place.type}</div>
										<div class="bed">
											<span class="total">${place.beds != null ? place.beds : ''}</span>
											<span class="txt-bed">beds</span>
										</div>
										<div class="score">
											<span class="material-icons">star</span>
											<span class="rating">${place.rating}</span>
										</div>
									</div >
									<div class="short-desc">${place.title}</div>
								</div >
							</div > `
		document.querySelector('#locations').innerHTML = html
	})
}

renderList()
