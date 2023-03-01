/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tjukmong <tjukmong@student.42bangkok.co    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/01 00:37:09 by tjukmong          #+#    #+#             */
/*   Updated: 2023/03/01 18:36:52 by tjukmong         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

async function fetchData(serverHost, route)
{
	const	res = await fetch(serverHost + route);
	if (!res.ok)
		return res;
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

function initTable (table_id, data) {
	if (!data.length)
	{
		document.getElementById(table_id).innerHTML = "Empty database: no data.";
		return ;
	}
	const	keys = Object.keys(data[0]);
	let		tr = document.createElement("tr");
	for (let i in keys) {
		let	th = document.createElement("th");
		th.innerText = keys[i];
		tr.append(th);
	}
	tr.firstChild.innerHTML += ` [${data.length}]`;
	document.getElementById(table_id).append(tr);
}

function addTableRow (table_id, data) {
	encodeDataHTML(data);
	const	keys = Object.keys(data);
	let		tr = document.createElement("tr");
	for (let i in keys) {
		let	td = document.createElement("td");
		td.innerText = data[keys[i]];
		tr.append(td);
	}
	document.getElementById(table_id).append(tr);
}

async function loadTable () {
	const route = document.getElementById("route").value;
	const data = await fetchData("http://127.0.0.1:6969", route);
	document.getElementById("data_table").innerHTML = "";
	if ("ok" in data && !data.ok)
		return alert(`Error ${data.status}: ${data.statusText}`);
	initTable("data_table", data.model);
	for (let i in data.model)
		addTableRow("data_table", data.model[i]);
}

document.getElementById("route").addEventListener("keypress", function(ev) {
	if (ev.key === "Enter")
		loadTable();
});

document.getElementById("send_request").addEventListener("click", function() {
	loadTable();
});

loadTable();
setInterval(loadTable, 2 * 60 * 1000);
