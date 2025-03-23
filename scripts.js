//Navbar Logic
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');
    
// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');
    
    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();
    
    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}
    
// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

// Floating Label Logic for Contact Form
const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value === "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});

// Update the current year in the footer
document.addEventListener("DOMContentLoaded", function () {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;
});

// Form submission logic with validation
document.getElementById("bookingForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("bookingName").value.trim();
    const email = document.getElementById("bookingEmail").value.trim();
    const destination = document.getElementById("bookingDestination").value.trim();
    const date = document.getElementById("bookingDate").value.trim();
    const guests = document.getElementById("bookingGuests").value.trim();

    let isValid = true;

    // Validate Name
    if (name === "") {
        isValid = false;
        document.getElementById("bookingName").classList.add("error");
    } else {
        document.getElementById("bookingName").classList.remove("error");
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        isValid = false;
        document.getElementById("bookingEmail").classList.add("error");
    } else {
        document.getElementById("bookingEmail").classList.remove("error");
    }

    // Validate Destination
    if (destination === "") {
        isValid = false;
        document.getElementById("bookingDestination").classList.add("error");
    } else {
        document.getElementById("bookingDestination").classList.remove("error");
    }

    // Validate Date
    if (date === "") {
        isValid = false;
        document.getElementById("bookingDate").classList.add("error");
    } else {
        document.getElementById("bookingDate").classList.remove("error");
    }

    // Validate Guests
    if (guests === "" || isNaN(guests) || guests <= 0) {
        isValid = false;
        document.getElementById("bookingGuests").classList.add("error");
    } else {
        document.getElementById("bookingGuests").classList.remove("error");
    }

    if (isValid) {
        // Show success alert
        alert(`Thank you, ${name}! Your trip to ${destination} on ${date} for ${guests} guests has been booked.`);
        document.getElementById("bookingForm").reset();
    }
});