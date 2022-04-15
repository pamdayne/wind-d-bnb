const db_local = 'stays.json'
const db_url = 'https://raw.githubusercontent.com/pamdayne/wind-d-bnb/main/db.json'

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
		html = + `<div>
					</div>`
	})

}

renderList()
