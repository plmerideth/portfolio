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
		linkString += "<ol><strong>";
		linkString += links[i].label;
		linkString += "</strong><a href=";
		linkString += links[i].url;
		linkString += ">" + links[i].url + "</a>";
		linkString += "</ol>";
	}
	
	x.innerHTML = linkString;
	
//	let testString = links[0].label;
//	testString = links[1].label;
//	testString = links[0].url;
	
}




