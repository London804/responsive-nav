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

		// nav function
		var el = document.querySelector('.nav-item');
		if(el) {
			el.addEventListener("click", function(event) {
				var background = document.querySelector('.background')
		    	console.log('hit');
				if (background.style.display === "none") {
			        background.style.display = "block";
			    } else {
			        background.style.display = "none";
			    }
			})
		}
			

    } else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();

// function navigation() {
// 	var el = document.querySelector('.nav-item');
// 	if(el) {
// 		el.addEventListener("click", function(event) {
// 			var background = document.querySelector('.background')
// 	    	var className = background.getAttribute("display");
// 	    	console.log('hit');
// 			if(className=="none") {
// 			background.className = "block";
// 			}
// 			else{
// 			background.className = "none";
// 			}
// 		})
// 	}
	
// }

// navigation();

// var el = document.getElementById('overlayBtn');
// if(el){
//   el.addEventListener('click', swapper, false);
// }

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