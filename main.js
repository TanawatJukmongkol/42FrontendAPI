/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tjukmong <tjukmong@student.42bangkok.co    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/01 00:37:09 by tjukmong          #+#    #+#             */
/*   Updated: 2023/03/01 00:45:59 by tjukmong         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

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

function initTable (table_id) {
	document.getElementById(table_id).innerHTML = `
		<tr class="table-head">
			<th>ID</th>
			<th>Intra ID</th>
			<th>Favourite language</th>
			<th>Favourite food</th>
			<th>Favourite color</th>
			<th>Created at</th>
			<th>Updated at</th>
		</tr>
	`;
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

async function loadTable () {

	const data = await fetchData("http://10.19.245.52:6969", "users");

	if (!data)
		return alert("Failed to fetch data!");

	initTable("api_user");
	for (let i in data.model)
		addTableRow("api_user", data.model[i]);

}

loadTable();
setInterval(loadTable, 2 * 60 * 1000);
