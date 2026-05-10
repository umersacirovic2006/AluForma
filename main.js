const items = document.querySelectorAll(".carousel-item");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

let index = 0;

function showSlide(i) {
    items.forEach((item) => item.classList.remove("active"));
    items[i].classList.add("active");
}

nextBtn.addEventListener("click", () => {
    index = (index + 1) % items.length;
    showSlide(index);
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    showSlide(index);
});

// Auto-advance slides
setInterval(() => {
    index = (index + 1) % items.length;
    showSlide(index);
}, 5000);

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    // Simple animation for burger menu
    const spans = mobileMenuBtn.querySelectorAll("span");
    mobileMenuBtn.classList.toggle("open");
});

// Close menu when clicking a link
document.querySelectorAll(".center a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});
