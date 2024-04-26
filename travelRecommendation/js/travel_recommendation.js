function fetchDestination(keyword='') {
	myFile = 'travel_recommendation_api.json';
	return fetch(myFile).then(res => {
		return res.json();
	}).then(results => {
		var countries = [];
		var temples = [];

		if (results.length != 0) {
			countries = results.countries.filter(country => {
				return country.name.toLowerCase().includes(keyword);
			});
	
			temples = results.temples.filter(temple => {
				return temple.name.toLowerCase().includes(keyword);
			});
		}
		
		if (results.length == 0) {
			countries = results.countries.filter(country => {
				return true;
			});
	
			temples = results.temples.filter(temple => {
				return true;
			});
		}

		let r =  countries.concat(temples);
		return r;
	})
}

function showDestination(element) {
	let keyword = document.getElementById('keyword');
	keyword = keyword.value.toLowerCase();
	
	let destinations = fetchDestination(keyword);

	destinations.then(finalResult => {
		return showResult(finalResult);
	})
}

function cancelSearchDest() {
	document.getElementById('keyword').value = '';
	let destinations = fetchDestination();
	
	destinations.then(finalResult => {
		return showResult(finalResult);
	})
}

function showResult(finalResult) {
	if (finalResult.length > 0) {
		let html = ``;
		finalResult.forEach(item => {
			html += `<div class="search-item mb-2">`;
			if (item.cities && item.cities.length > 0) {
				html += `
					<img src="${item.cities[0].imageUrl}" alt="${item.cities[0].name}">
					<h3>${item.cities[0].name}</h3>
						<p>${item.cities[0].description}</p>
				
				`;
			}else {
				html += `
						<img src="${item.imageUrl}" alt="${item.name}">
						<h3>${item.name}</h3>
						<p>${item.description}</p>
					
				`;
			}	

			html += `
				<button type="button" class="btn">Visit</button>
				</div>
			`
		});

		document.getElementById('show-result').innerHTML = html;
	}
}