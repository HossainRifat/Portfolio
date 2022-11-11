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
const scrollTopBtn = document.querySelector(".scrollToTop-btn");

window.addEventListener("scroll", function(){
    scrollTopBtn.classList.toggle("active", window.scrollY > 500);
});


scrollTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
//Navigation menu items active on page scroll
// window.addEventListener("scroll", () => {
//     const sectionss = document.querySelectorAll("section");
//     const scrollY = window.pageYOffset;
 
//     sectionss.forEach(current => {
//         let sectionHeight = current.offsetHeight;
//         let sectionTop = current.offsetTop - 50;
//         let id = current.getAttribute("id");

//         if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
//             document.querySelector(".nav-items a[href*=" + id + "]").classList.add("active");
//         }
//         else{
//             document.querySelector(".nav-items a[href*=" + id + "]").classList.remove("active");
//         }
//     });
// });

//Responsive navigation menu toggle
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".nav-items a");

menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});

closeBtn.addEventListener("click", () =>{
    navigation.classList.remove("active");
});

navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});

//Scroll reveal animations
//Common reveal options to create reveal animations

//Target elements, and specify options to create reveal animations