"use strict";

// api variables
var myObj = '';
var nav = '';
var url = '';
var xhr = new XMLHttpRequest();
xhr.open('GET', './api/navigation');

// dom variables
var background = document.querySelector('.background');
var callout = document.querySelectorAll('.background, .nav-close, .nav-item');
var navItems = document.querySelector('.nav-items');
var navOpen = document.querySelector('.nav-open');
var navHeader = document.querySelector('.nav-header');
var navClose = document.querySelector('.nav-close');

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

// nav
    if(navItems) {
        navItems.addEventListener("click", function(e) {
            console.log(e.target.closest('.nav-item'));

            if (background.style.display !== "block") {
                background.style.display = "block";
                select(e);

            } else if (background.style.display === "block") { 
                select(e);
            }  
        });
    }

    function select(e){
        // go through all of the items on the nav and remove the active class
        for( let i = 0; i < e.target.closest('.nav-items').children.length; i++ ) { 
            e.target.closest('.nav-items').children[i].classList.remove('active');
        }
        // add the active class to the nav you just clicked
        if (e.target.closest('.nav-item') !== null) {
            e.target.closest('.nav-item').classList.add('active'); 
        }
        // add an event listener to all places that can close the nav
        if (background.style.display === "block") {
            callout.forEach(function(elem) {
                elem.addEventListener("click", function(event) {
                    background.style.display = "none";
                    console.log('target', e.target);
                    if (e.target.closest('.nav-item') !== null) {
                        e.target.closest('.nav-item').classList.remove('active');
                    }
                }); 
            });
        }
    }

    function slide(e) {
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

            check()
    
        } else {
            close();
        }
    }

    function check() {
        background.addEventListener("click", function() {
            close()
        });
    }

    function close() {
        navItems.classList.remove("animate"); 
        navHeader.classList.remove("animate"); 
        document.querySelector('.nav').classList.remove('active');
        navClose.classList.remove('animate');
        background.style.display = "none";

        setTimeout(open, 500);
        function open() {
            navOpen.classList.remove("animate");
        }

        navClose.classList.add("animate");
        console.log('i have one');
    }
