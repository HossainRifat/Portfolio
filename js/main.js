//Navigation bar effects on scroll
window.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    header.classList.toggle("sticky", this.window.scrollY > 0);
});

//Portfolio section - Modal
const serviceModals = document.querySelectorAll(".service-modal");
const learnmoreBtns = document.querySelectorAll(".learn-more-btn");
const modalCloseBtns = document.querySelectorAll(".modal-close-btn");

var modal = function(modalClick){
    serviceModals[modalClick].classList.add("active");
}

learnmoreBtns.forEach((learnmoreBtn, i) => {
    learnmoreBtn.addEventListener("click", () => {
        modal(i);
    });
});

modalCloseBtns.forEach((modalCloseBtn) => {
    modalCloseBtn.addEventListener("click", () => {
        serviceModals.forEach((modalView) => {
            modalView.classList.remove("active");
        });
    });
});

//Contact Section

var email = document.getElementById("emailField");
var SenderName = document.getElementById("name");
var message = document.getElementById("message");
var subject = document.getElementById("subject");
var btn = document.querySelector(".SendBtn");

btn.addEventListener("click", () => {
    //console.log(subject.value);
    window.open('mailto:' + email.value + '?subject='+ subject.value + '&body=' + message.value + ' - ' + SenderName.value);
    //console.log('mailto:' + email.value + '?subject'+ subject.value + '=&body=' + message.value);
})

//Our clients - Swiper

//Website dark/light theme

//Scroll to top button

//Navigation menu items active on page scroll

//Responsive navigation menu toggle

//Scroll reveal animations
//Common reveal options to create reveal animations

//Target elements, and specify options to create reveal animations