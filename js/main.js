// JavaScript Document

displayPortList();

function displayPortList()
{
	let x = document.getElementById("portfolioIndex");
	
	const links =
	[
		{label: "Week 1 Notes: ",	url: "week1/index1.html"},
		{label: "Week 2 Notes: ",	url: "week2/index2.html"}
		//Add new links and labels for each week her
	]
	
	let arrayLength = links.length;
	let linkString="";
	let i = 0;
	
	for(i=0; i<arrayLength; i++)
	{
		linkString += "<ol><strong>" + links[i].label + "</strong><a href=" + links[i].url + ">" + links[i].url + "</a>" + "</ol>";
	}
	
	x.innerHTML = linkString;	
}




