"use strict";


var xhr = new XMLHttpRequest();
xhr.open('GET', './api/navigation');
var myObj = '';
var nav = '';
var x = '';
var ul = "<ul>" + "<ul>";
var wrapper = '';
var url = '';


xhr.onload = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
        //console.log(xhr.responseText);
        myObj = JSON.parse(this.responseText);
        // for (x in myObj) {
        //     nav += '<li>' + myObj.items[x] +'</li>';
        //     console.log(myObj.items[x]);
        // } // ask why this didn't work
		for (var i = 0; i < myObj.items.length; i++) {
				
			var innerNav = '';
			if (myObj.items[i].items.length > 0) {
				
				for (var f = 0; f < myObj.items[i].items.length; f++) {
					let innerUrl = myObj.items[i].items[f].url
					let innerLabel = myObj.items[i].items[f].label
					innerNav = innerNav + "<a href='" + innerUrl + "'><div> " + innerLabel + "</div></a>";
				}
			}
			url = myObj.items[i].url
			nav += `<li class="nav-item" id="tar_ ${i}">
				<a href="${url}"><span>${myObj.items[i].label}</span></a>
				<div class="nav-item-inner">${innerNav}</div></li>`;
				
		}

		document.querySelector('.nav-items').innerHTML = nav;

		

			

    } else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();

//nav
	var el = document.querySelector('.nav-items');
	var body = document.querySelector('body');
	if(el) {
		el.addEventListener("click", function(e) {
			var background = document.querySelector('.background')
			var body = document.querySelector('body');

			console.log(e.target.closest('.nav-item'));

			if (background.style.display !== "block") {
		        background.style.display = "block";
		        e.target.closest('.nav-item').classList.add('active');

		        if (background.style.display === "block") {
					background.addEventListener("click", function(event){
						background.style.display = "none";
						e.target.closest('.nav-item').classList.remove('active');

					});
		        }

		    } else {
		        background.style.display = "none";
		        e.target.closest('.nav-item').classList.remove('active');

		    }
		})
	}



// var data = '';
// console.log(this);

// const url = '../data/navigation.json'
// fetch(url) // Call the fetch function passing the url of the API as a parameter
// .then(function() {
//     // Your code for handling the data you get from the API
// })
// .catch(function() {
//     // This is where you run code if the server returns any errors
// });

 // function loadJSON(callback) {   

 //    var xobj = new XMLHttpRequest();
 //        xobj.overrideMimeType("application/json");
 //    xobj.open('GET', './api/navigation', true); 
 //    xobj.onreadystatechange = function () {
 //          if (xobj.readyState == 4 && xobj.status == "200") {
 //            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
 //            callback(xobj.responseText);
 //          }
 //    };
 //    xobj.send(null);  
 // }

 // loadJSON();