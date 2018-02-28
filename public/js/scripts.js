"use strict";


var xhr = new XMLHttpRequest();
xhr.open('GET', './api/navigation');
var myObj = '';
var nav = '';
var x = '';
var ul = "<ul>" + "<ul>";
var url = '';
var navItems = document.querySelector('.nav-items');
var background = document.querySelector('.background');
var count;
var callout = document.querySelectorAll('.background, .nav-close, .nav-item')


xhr.onload = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
        myObj = JSON.parse(this.responseText);
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
            console.log(e.target.closest('.nav-item'));

            if (background.style.display !== "block") {
                background.style.display = "block";

                select(e);

            } else if (background.style.display === "block") {
                    
                select(e);

            }  

            // else {

            //     if(count === false) {
            //         count = true;
            //         console.log('inner', count)
            //         select(e);


            //     } else {
            //         background.style.display = "none";
            //         e.target.closest('.nav-item').classList.remove('active');
            //     }
            // }
        })
    }

    function select(e){

        // go through all of the items on the nav and remove the active class
        for( let i = 0; i < e.target.closest('.nav-items').children.length; i++ ) { 
            e.target.closest('.nav-items').children[i].classList.remove('active');
        }
        // add the active class to the nav you just clicked
        e.target.closest('.nav-item').classList.add('active');

        // add an event listener to all places that can close the nav
        if (background.style.display === "block") {
            callout.forEach(function(elem) {
                elem.addEventListener("click", function(event) {
                    background.style.display = "none";
                    console.log('target', e.target);
                    e.target.closest('.nav-item').classList.remove('active');
                }); 
            });
        }
    }

    var navOpen = document.querySelector('.nav-open');
    var navHeader = document.querySelector('.nav-header');
    var navClose = document.querySelector('.nav-close');

    function slide(e) {

        count = false;

        console.log('count', count);

        if (navItems.classList.length === 1) {
            navItems.classList.add("animate"); // nav ul
            e.classList.add("animate");  // button click
            navHeader.classList.add("animate"); // elephant logo
            console.log(e.closest('.nav'));
            e.closest('.nav').classList.add('active'); // nav

            setTimeout(close, 500);
            function close() {
                navClose.classList.remove("animate");
            }

            background.style.display = "block";

            check(e)
    
        } else {
            navItems.classList.remove("animate"); // nav ul
            // navOpen.classList.remove("animate");  // nav open button
            navHeader.classList.remove("animate"); // elephant logo
            e.closest('.nav').classList.remove('active'); // nav
            // e.style.display = "block";                   // display of button clicked
            console.log('this', e.classList.length);
            e.classList.remove("animate");

            setTimeout(open, 500);
            function open() {
                navOpen.classList.remove("animate");
            }

            if(e.classList.length === 2) {
                e.classList.remove('animate'); 
                // e.style.display = 'block'
            } else {
                e.classList.add("animate");
                // e.style.display = "none"; 
            }
            background.style.display = "none";
        }
    }

    function check() {
        background.addEventListener("click", function(){
            console.log('check');
            close()
            
        })
    }

    function close() {
         navItems.classList.remove("animate"); // nav ul
         navHeader.classList.remove("animate"); //
         document.querySelector('.nav').classList.remove('active');
         navClose.classList.remove('animate');
         background.style.display = "none";

         setTimeout(open, 500);
        function open() {
            navOpen.classList.remove("animate");
        }

        // if(e.classList.length === 2) { // animate icons
        //     e.classList.remove('animate'); 
        //     // e.style.display = 'block'
        // } else {
        //     e.classList.add("animate");
        //     // e.style.display = "none"; 
        // }

    }

    // function slideback(e) {
    //  var navOpen = document.querySelector('.nav-open');
    //  navItems.classList.remove("animate");
    //  navOpen.classList.remove("animate");
    //  e.classList.add("animate");

    // }
