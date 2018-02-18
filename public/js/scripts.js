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
			if( myObj.items[i].items.length > 0) {
				
				for (var f = 0; f < myObj.items[i].items.length; f++) {
					let innerUrl = myObj.items[i].items[f].url
					console.log('innerUrl', innerUrl)
					innerNav = innerNav + "<a href='" + innerUrl + "'><div style='height:50px;width:50px;background-color:orange;margin:5px;'></div></a>";
				}
			}
			url = myObj.items[i].url
			nav += '<li id="tar_' + i + '"><a href="'+ url +'">' + myObj.items[i].label + '</a>' + innerNav +'</li>';

			
			

			// console.log("--has child");
						//var a = document.getElementById("tar_" + i);
				// for (var x = i; x < myObj.items[i].items.length; x++) {
				// }
			
			// console.log("buidling:", myObj.items[i].label)


			//console.log('url', url = myObj.items[i].url);
			// document.querySelector('.nav-items a').setAttribute("href", url);

				
			// wrapper = '<ul>' +  innerNav + '</ul>';

				// if( myObj.items[i].items.length > 0) {
				// 	console.log(myObj.items[i].items.length);
				// 	for (var x = i; x < myObj.items[i].items.length; x++) {
				// 		innerNav = '<li>' + myObj.items[i].items[x].label + '</li>';
				// 		console.log('innerNav', myObj.items[i].items[x].label);
				// 		console.log('wrapper', wrapper);
				// 	}
				// }
				
		}




		document.querySelector('.nav-items').innerHTML = nav;
		// document.querySelector('.nav-items a').setAttribute("href", url);
		
		


    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();

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