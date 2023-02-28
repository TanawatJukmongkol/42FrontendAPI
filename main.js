(async () => {

	"use strict";

	async function fetchData(serverHost, route)
	{
		const	res = await fetch(`${serverHost}/api/${route}`);
		const	data = await res.json();
		return data;
	}

	function encodeDataHTML(data) {
		const	keys = Object.keys(data);
		keys.map(k => {
			data[k].toString()
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/"/g, '&quot;')
		});
	}

	function addTableRow (table_id, data) {
		encodeDataHTML(data);
		const template_literal = `
			<tr class="_data">
				<td>${data.id}</td>
				<td>${data.intra_id}</td>
				<td>${data.favorite_language}</td>
				<td>${data.favorite_food}</td>
				<td>${data.favorite_color}</td>
				<td>${data.created_at}</td>
				<td>${data.updated_at}</td>
			</tr>
		`;
		document.getElementById(table_id).innerHTML += template_literal;
	}

	const data = await fetchData("http://10.19.245.52:6969", "users");

	for (let i in data.model)
		addTableRow("api_user", data.model[i]);

})();