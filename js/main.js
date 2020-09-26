// JavaScript Document

displayPortList();

function displayPortList()
{
	//t x = document.getElementById("portfolioIndex");
	//Set week = to current week to be displayed.  This selects class to be applied to links
	let week = 2;
	
	const links =
	[
		{label: "URL: Week 1 Notes",	url: "week1/index1.html"},
		{label: "URL: Week 2 Notes",	url: "week2/index2.html"},
		{label: "URL: Week 3 TBD",	url: "week3/index3.html"},
		{label: "URL: Week 4 TBD",	url: "week4/index4.html"},
		{label: "URL: Week 5 TBD",	url: "week5/index5.html"},
		{label: "URL: Week 6 TBD",	url: "week6/index6.html"},
		{label: "URL: Week 7 TBD",	url: "week7/index7.html"},
		{label: "URL: Week 8 TBD",	url: "week8/index8.html"},
		{label: "URL: Week 9 TBD",	url: "week9/index9.html"},
		{label: "URL: Week 10 TBD",	url: "week10/index10.html"},
		{label: "URL: Week 11 TBD",	url: "week11/index11.html"},
		{label: "URL: Week 12 TBD",	url: "week12/index12.html"},
		{label: "URL: Week 13 TBD",	url: "week13/index13.html"},
		{label: "URL: Week 14 TBD",	url: "week14/index14.html"}
		//Add new links and labels for each week her
	]	
	
	const ol = document.getElementById('portfolioIndex');      // whatever your OL tag ID is
	links.forEach(link =>
	{
		let li = document.createElement('li');
		li.classList.add("liClass");
		let a = document.createElement('a');
		let weekNo = link.label.substring(10, 12);		
		a.setAttribute('href', link.url);
		a.innerText = link.label;
		li.appendChild(a);
		ol.appendChild(li);
		if(weekNo <= week)
		{
			a.classList.add("aClass");			
		}
		else
		{
			a.classList.add("aTBDClass");			
		}
		
	});
		
//	let arrayLength = links.length;
//	let linkString="";
//	let i = 0;
//	
//	for(i=0; i<arrayLength; i++)
//	{
//		linkString += "<ol><strong>" + links[i].label + "</strong><a href=" + links[i].url + ">" + links[i].url + "</a>" + "</ol>";
//	}
//	
//	x.innerHTML = linkString;	
}




