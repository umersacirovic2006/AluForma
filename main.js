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

/* --- CALCULATOR LOGIC --- */
const calcModal = document.getElementById("calcModal");
const openCalcBtn = document.getElementById("openCalc");
const closeCalcBtn = document.querySelector(".close-modal");
const calcBtn = document.getElementById("calcBtn");

// Open Modal
openCalcBtn.addEventListener("click", (e) => {
    e.preventDefault();
    calcModal.style.display = "block";
});

// Close Modal
closeCalcBtn.addEventListener("click", () => {
    calcModal.style.display = "none";
});

// Close on outside click
window.addEventListener("click", (e) => {
    if (e.target == calcModal) {
        calcModal.style.display = "none";
    }
});

// Calculation Logic
calcBtn.addEventListener("click", () => {
    const type = document.getElementById("prodType").value;
    const width = parseFloat(document.getElementById("width").value) / 100; // convert to m
    const height = parseFloat(document.getElementById("height").value) / 100; // convert to m
    const profile = document.getElementById("profileType").value;

    const area = width * height;
    let basePrice = 0;

    // Simplified pricing logic (Approximate Euro values)
    if (type === "window") basePrice = 130;
    if (type === "door") basePrice = 230;
    if (type === "sliding") basePrice = 310;

    let total = area * basePrice;

    // Profile multiplier
    if (profile === "thermal") {
        total *= 1.4; // 40% more for thermal break
    }

    // Min price check
    if (total < 80) total = 80;

    document.getElementById("priceDisplay").innerText = total.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2});
});

/* --- NEW CATALOG CAROUSEL LOGIC --- */
const catalogData = {
    windows: [
        { title: "GALILEO", desc: "Galileo – pogled bez granica", img: "assets/images/AWS 75 PD/AWS_75_PD_SI_k.webp", badge: "PREPORUČUJEMO" },
        { title: "AMADEUS", desc: "Simfonija u formi PVC prozora", img: "assets/images/AWS 90 SI/AWS_90_SI_plus_e.webp", badge: "PREPORUČUJEMO" },
        { title: "FRIDA", desc: "PVC prozor za više svetlosti", img: "assets/images/AWS 70 HI/AWS_70_SC_s_Aussenverglasung.webp", badge: "NOVO" },
        { title: "ECHO", desc: "Savršen sklad cijene i kvaliteta", img: "assets/images/AWS 75 PD/AWS_75_PD_SI_s_Festfeld.webp" }
    ],
    doors: [
        { title: "ADS 75 SI", desc: "Vrhunska toplotna izolacija", img: "assets/images/ADS 75 SI/ADS_75_SI_e.webp", badge: "PREPORUČUJEMO" },
        { title: "AD UP 75", desc: "Univerzalni sistem za ulazna vrata", img: "assets/images/AD UP 75/AD_UP_75_EInsatzF_Glas_inneno_E.webp" },
        { title: "ADS 90 SI", desc: "Maksimalna energetska efikasnost", img: "assets/images/ADS 90 SI/ADS_90_SI_m_01.webp" }
    ],
    sliding: [
        { title: "ASE 67 PD", desc: "Panoramski dizajn za maksimalan pogled", img: "assets/images/ASE 67 PD/ASE_67_PD_s_Schwellenbereich_abgesenkte_Laufschiene.webp", badge: "PREPORUČUJEMO" },
        { title: "ASS 77 PD", desc: "Minimalistički klizni sistem", img: "assets/images/ASS 77 PD/ASS_77_PD_d_Explosion_02.webp" },
        { title: "ThermoSlide", desc: "Klizna vrata za pasivne kuće", img: "assets/images/ThermoSlide/2852a14_50P-02.webp" }
    ],
    other: [
        { title: "FWS 50", desc: "Standardni fasadni sistem", img: "assets/images/FWS 50/1546a2.webp" },
        { title: "UDC 80", desc: "Element fasada za brzu gradnju", img: "assets/images/UDC 80/UDC_80_s.webp" },
        { title: "VentoAir", desc: "Sistem za ventilaciju prozora", img: "assets/images/VentoAir/VentoAir_d_KS_Luftstrom.webp" }
    ]
};

const catalogCarousel = document.getElementById("catalogCarousel");
const catalogDots = document.getElementById("catalogDots");
const tabItems = document.querySelectorAll(".tab-item");

function renderCatalog(category) {
    const products = catalogData[category];
    catalogCarousel.innerHTML = "";
    catalogDots.innerHTML = "";

    products.forEach((product, i) => {
        // Create Card
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-img">
                ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
                <img src="${product.img}" alt="${product.title}">
            </div>
            <div class="product-info">
                <div class="product-title">
                    <h3>${product.title}</h3>
                    <span class="arrow">&rarr;</span>
                </div>
                <p>${product.desc}</p>
            </div>
        `;
        catalogCarousel.appendChild(card);

        // Create Dot
        const dot = document.createElement("span");
        dot.className = `dot ${i === 0 ? "active" : ""}`;
        dot.addEventListener("click", () => {
            catalogCarousel.scrollLeft = card.offsetLeft - catalogCarousel.offsetLeft;
            updateDots(i);
        });
        catalogDots.appendChild(dot);
    });
}

function updateDots(index) {
    const dots = catalogDots.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

// Tab Switching
tabItems.forEach(tab => {
    tab.addEventListener("click", () => {
        tabItems.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        renderCatalog(tab.dataset.category);
    });
});

// Carousel Nav
document.getElementById("catalogNext").addEventListener("click", () => {
    catalogCarousel.scrollLeft += 340;
});

document.getElementById("catalogPrev").addEventListener("click", () => {
    catalogCarousel.scrollLeft -= 340;
});

// Sync dots on scroll
catalogCarousel.addEventListener("scroll", () => {
    const index = Math.round(catalogCarousel.scrollLeft / 340);
    updateDots(index);
});

// Initial Render
renderCatalog("windows");
