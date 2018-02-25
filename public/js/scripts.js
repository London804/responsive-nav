"use strict";


var xhr = new XMLHttpRequest();
xhr.open('GET', './api/navigation');
var myObj = '';
var nav = '';
var x = '';
var ul = "<ul>" + "<ul>";
var wrapper = '';
var url = '';
var navItems = document.querySelector('.nav-items');


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
					innerNav = innerNav + "<a href='" + innerUrl + "'><div>" + innerLabel + "</div></a>";

				}
			}
			url = myObj.items[i].url
			nav += `<li class="nav-item" id="tar_${i}">
				<a href="${url}"><span>${myObj.items[i].label}</span></a>
				<div class="nav-item-inner">${innerNav}</div></li>`;
		}

		navItems.innerHTML = nav;
			

    } else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();

//nav
	
	if(navItems) {
		navItems.addEventListener("click", function(e) {
			var background = document.querySelector('.background');
			// var body = document.querySelector('body');
			var callout = document.querySelectorAll('.background, .nav-close, .nav-item')
			console.log(e.target.closest('.nav-item'));

			if (background.style.display !== "block") {
		        background.style.display = "block";

		        for( let i = 0; i < e.target.closest('.nav-items').children.length; i++ ) {
		        	e.target.closest('.nav-items').children[i].classList.remove('active');
		        }

		        e.target.closest('.nav-item').classList.add('active');

		        if (background.style.display === "block") {
		        	callout.forEach(function(elem) {
						elem.addEventListener("click", function(event) {
							background.style.display = "none";
							console.log('target', e.target);
							e.target.closest('.nav-item').classList.remove('active');
						});	
					});
		        }

		    } else {
		        background.style.display = "none";
		        e.target.closest('.nav-item').classList.remove('active');

		    }
		})
	}

	function slide(e) {
		var navOpen = document.querySelector('.nav-open');

		if (navItems.classList.length === 1) {
			navItems.classList.add("animate");
			e.classList.add("animate");
			console.log(e.closest('.nav'));
			e.closest('.nav').classList.add('active');


		} else {
			navItems.classList.remove("animate");
			navOpen.classList.remove("animate");
			e.closest('.nav').classList.remove('active');
			console.log('this', e.classList.length);

			if(e.classList.length === 2) {

				e.classList.remove('animate');	
			} else {
				e.classList.add("animate");
				
			}


		}
	}

	// function slideback(e) {
	// 	var navOpen = document.querySelector('.nav-open');
	// 	navItems.classList.remove("animate");
	// 	navOpen.classList.remove("animate");
	// 	e.classList.add("animate");

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