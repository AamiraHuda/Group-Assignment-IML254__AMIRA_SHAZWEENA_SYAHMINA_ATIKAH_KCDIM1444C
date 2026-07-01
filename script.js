// Pearl & Polish Manicure SPA - Custom Interactive JS Engine

// Initialize defaults on window load
window.addEventListener("DOMContentLoaded", () => {
    // Inject Year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Render Lucide icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // Default Router Start
    navigateTo('home');
    
    // Initialize our Custom Media database and apply stored modifications on load
    if (typeof initMediaDatabase !== "undefined") {
        initMediaDatabase().then(() => {
            renderGallery(1);
            initHeroSlider();
            updateMediaElements();
        });
    } else {
        renderGallery(1);
        initHeroSlider();
    }

    // Default Date for Booking picker (tomorrow's date)
    const dateInput = document.getElementById("form-date");
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }
});

// Elegant Toast Notification System
function showToastNotification(message) {
    let container = document.getElementById('custom-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'custom-toast-container';
        container.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'bg-[#4a3b32] text-[#e8d8ce] border border-[#8b7355]/30 text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 pointer-events-auto transition-all duration-300 transform translate-y-2 opacity-0 font-medium max-w-sm text-center';
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 50);
    
    setTimeout(() => {
        toast.classList.add('translate-y-[-8px]', 'opacity-0');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// 1. SPA NAVIGATION LOGIC
function navigateTo(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show target section
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update active state in nav links (desktop)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // match the onclick action string
        const onClickAttr = link.getAttribute('onclick') || '';
        if (onClickAttr.includes(`'${pageId}'`) || onClickAttr.includes(`"${pageId}"`)) {
            link.classList.add('text-[#8b7355]', 'border-[#8b7355]');
            link.classList.remove('text-[#4a3b32]', 'border-transparent');
        } else {
            link.classList.remove('text-[#8b7355]', 'border-[#8b7355]');
            link.classList.add('text-[#4a3b32]', 'border-transparent');
        }
    });

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. MOBILE MENU TOGGLE
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// FILTER SERVICES BY CATEGORY
function filterServices(category) {
    const cat1 = document.getElementById('service-category-1');
    const cat2 = document.getElementById('service-category-2');
    const cat3 = document.getElementById('service-category-3');

    if (!cat1 || !cat2 || !cat3) return;

    if (category === 'all') {
        cat1.classList.remove('hidden');
        cat2.classList.remove('hidden');
        cat3.classList.remove('hidden');
    } else if (category === '1') {
        cat1.classList.remove('hidden');
        cat2.classList.add('hidden');
        cat3.classList.add('hidden');
    } else if (category === '2') {
        cat1.classList.add('hidden');
        cat2.classList.remove('hidden');
        cat3.classList.add('hidden');
    } else if (category === '3') {
        cat1.classList.add('hidden');
        cat2.classList.add('hidden');
        cat3.classList.remove('hidden');
    }
}

// FILTER EDUCATIONAL HUB BY SUB-SECTION
function filterEducational(sub) {
    const steps = document.getElementById('educational-steps-container');
    const videos = document.getElementById('educational-videos-container');

    if (!steps || !videos) return;

    if (sub === 'all') {
        steps.classList.remove('hidden');
        videos.classList.remove('hidden');
    } else if (sub === 'videos') {
        steps.classList.add('hidden');
        videos.classList.remove('hidden');
    } else if (sub === 'steps') {
        steps.classList.remove('hidden');
        videos.classList.add('hidden');
    }
}

// TOGGLE MOBILE SUBMENU ACCORDION
function toggleMobileSubmenu(id) {
    const submenu = document.getElementById(id);
    if (submenu) {
        submenu.classList.toggle('hidden');
    }
}

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// 3. BOOKING DIRECTLY FROM SERVICES PAGE
function bookFromServices(serviceName) {
    // Find radio input for the selected service name and select it
    const radios = document.getElementsByName('form_service');
    let found = false;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].value === serviceName) {
            radios[i].checked = true;
            found = true;
            break;
        }
    }
    
    // If not found in standard radio items, check the first one as fallback
    if (!found && radios.length > 0) {
        radios[0].checked = true;
    }

    // Direct to reservation page and reset form step to 1
    nextFormStep(1);
    navigateTo('reservation');
}

// 4. RESERVATION MULTI-STEP FORM LOGIC
let activeStep = 1;

function nextFormStep(step) {
    // Simple verification validations
    if (step === 3 && activeStep === 2) {
        const dateVal = document.getElementById('form-date').value;
        if (!dateVal) {
            alert('Please select an appointment date first.');
            return;
        }
    }
    if (step === 4 && activeStep === 3) {
        const nameVal = document.getElementById('form-name').value;
        const emailVal = document.getElementById('form-email').value;
        const phoneVal = document.getElementById('form-phone').value;
        if (!nameVal.trim() || !emailVal.trim() || !phoneVal.trim()) {
            alert('Please fill out your Name, Email and Phone Number.');
            return;
        }
        
        // Prepare Step 4 Summary details
        populateSummaryDetails();
    }

    // Hide all steps
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    
    // Activate target step
    const targetStepEl = document.getElementById(`step-${step}`);
    if (targetStepEl) {
        targetStepEl.classList.add('active');
        activeStep = step;
        updateProgress(step);
    }
}

function prevFormStep(step) {
    nextFormStep(step); // reuse step transitions
}

function updateProgress(currentStep) {
    // update dots colors
    for (let i = 1; i <= 5; i++) {
        const dot = document.getElementById(`prog-${i}`);
        if (dot) {
            if (i <= currentStep) {
                dot.classList.remove('bg-white/20', 'text-white/60');
                dot.classList.add('bg-[#8b7355]', 'text-white');
            } else {
                dot.classList.add('bg-white/20', 'text-white/60');
                dot.classList.remove('bg-[#8b7355]', 'text-white');
            }
        }
        
        // Highlight connecting progress lines
        if (i < 5) {
            const line = document.getElementById(`line-${i}`);
            if (line) {
                if (i < currentStep) {
                    line.classList.remove('bg-white/10');
                    line.classList.add('bg-[#8b7355]');
                } else {
                    line.classList.add('bg-white/10');
                    line.classList.remove('bg-[#8b7355]');
                }
            }
        }
    }
}

function populateSummaryDetails() {
    // Grab selected service radio input
    const radios = document.getElementsByName('form_service');
    let serviceName = "Signature Gel Manicure";
    let billAmount = "RM50";
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            serviceName = radios[i].value;
            // set price mapping
            if (serviceName.includes("Gel")) billAmount = "RM50";
            if (serviceName.includes("Spa")) billAmount = "RM65";
            if (serviceName.includes("Acrylic")) billAmount = "RM75";
            break;
        }
    }

    const dateVal = document.getElementById('form-date').value;
    const timeVal = document.getElementById('form-time').value;
    const nameVal = document.getElementById('form-name').value;

    document.getElementById('summary-service').textContent = serviceName;
    document.getElementById('summary-date').textContent = dateVal;
    document.getElementById('summary-time').textContent = timeVal;
    document.getElementById('summary-name').textContent = nameVal;
    document.getElementById('summary-bill').textContent = billAmount;
}

async function submitReservation() {
    const confirmBtn = document.querySelector('#step-4 button.bg-green-600');
    if (confirmBtn) {
        confirmBtn.innerHTML = 'Processing appointment...';
        confirmBtn.disabled = true;
    }

    // Get booking inputs
    const fullName = document.getElementById('form-name').value;
    const emailAddress = document.getElementById('form-email').value;
    const phoneNumber = document.getElementById('form-phone').value;
    const specialRequests = document.getElementById('form-comments').value;
    
    const dateInput = document.getElementById('form-date').value;
    const timeInput = document.getElementById('form-time').value;

    const radios = document.getElementsByName('form_service');
    let selectedService = "Signature Gel Manicure";
    let selectedPrice = "RM50";
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedService = radios[i].value;
            if (selectedService.includes("Gel")) selectedPrice = "RM50";
            if (selectedService.includes("Spa")) selectedPrice = "RM65";
            if (selectedService.includes("Acrylic")) selectedPrice = "RM75";
            break;
        }
    }

    try {
        // 1. Notify Owner via Web3Forms client-side
        try {
            console.log("Dispatching Web3Forms booking notification...");
            await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    access_key: "f3b956dd-8672-4520-aeb2-e1a581c92d19",
                    name: fullName,
                    email: emailAddress,
                    subject: `💅 [Pearl & Polish] New Booking: ${selectedService} - ${fullName}`,
                    message: `
New Booking Details:
-----------------------------
Customer Name: ${fullName}
Email Address: ${emailAddress}
Phone Number: ${phoneNumber}
Treatment: ${selectedService} (${selectedPrice})
Date: ${dateInput}
Time: ${timeInput}
Special Requests: ${specialRequests || "None"}
-----------------------------
`,
                    from_name: "Pearl & Polish"
                })
            });
        } catch (e) {
            console.error("Web3Forms client-side failed:", e);
        }

        // 2. Notify Customer (and Owner copy) via EmailJS client-side
        try {
            console.log("Dispatching EmailJS client-side notification...");
            await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    service_id: "service_x85bofk",
                    template_id: "template_bmgq3ju",
                    user_id: "eg8dN9G3ImEMiJevI",
                    template_params: {
                        from_name: "Pearl & Polish",
                        to_name: fullName,
                        customer_name: fullName,
                        name: fullName,
                        email: emailAddress,
                        emailAddress: emailAddress,
                        to_email: emailAddress,
                        phone: phoneNumber,
                        phoneNumber: phoneNumber,
                        service: selectedService,
                        selectedService: selectedService,
                        price: selectedPrice,
                        selectedPrice: selectedPrice,
                        date: dateInput,
                        bookingDate: dateInput,
                        time: timeInput,
                        bookingTime: timeInput,
                        message: specialRequests || "None",
                        specialRequests: specialRequests || "None",
                        comments: specialRequests || "None",
                        notes: specialRequests || "None",
                        reply_to: emailAddress
                    }
                })
            });
        } catch (e) {
            console.error("EmailJS client-side failed:", e);
        }

        // 3. Notify backend /api/book for any local system logging
        try {
            await fetch("/api/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    selectedService: selectedService,
                    selectedPrice: selectedPrice,
                    bookingDate: dateInput,
                    bookingTime: timeInput,
                    fullName: fullName,
                    emailAddress: emailAddress,
                    phoneNumber: phoneNumber,
                    specialRequests: specialRequests
                })
            });
        } catch (backendErr) {
            console.warn("Backend registration skipped/failed:", backendErr);
        }

        // Always navigate to success page
        nextFormStep(5);
    } catch (err) {
        console.error("Booking submission workflow error:", err);
        nextFormStep(5);
    } finally {
        if (confirmBtn) {
            confirmBtn.innerHTML = 'Confirm Booking';
            confirmBtn.disabled = false;
        }
    }
}

function resetForm() {
    // Reset fields
    document.getElementById('form-name').value = '';
    document.getElementById('form-email').value = '';
    document.getElementById('form-phone').value = '';
    document.getElementById('form-comments').value = '';
    
    nextFormStep(1);
    navigateTo('home');
}


// 5. GALLERY PAGINATION LOGIC (5 pages simulator - 30 unique images total)
const galleryImages = [
    // Page 1
    { title: "Chromes & Velvet Magnetics", url: "images/Gal1.jpeg" },
    { title: "Froze Icy Blue", url: "images/Gal2.jpeg" },
    { title: "Pinkish Glass Glaze", url: "images/Gal3.jpeg" },
    { title: "Rocky Stars", url: "images/Gal4.jpeg" },
    { title: "Matcha Strawberry Glaze", url: "images/Gal5.jpeg" },
    { title: "Frosted Purple Extensions", url: "images/Gal6.jpeg" },
    
    // Page 2
    { title: "Rose Quartz Velvet", url: "images/Gal7.jpeg" },
    { title: "Brown Geometric Lines", url: "images/Gal8.jpeg" },
    { title: "Abstract Matte Stroke", url: "images/Gal9.jpeg" },
    { title: "Sunset Peach Swirls", url: "images/Gal10.jpeg" },
    { title: "Peachy Glosy Glaze", url: "images/Gal11.jpeg" },
    { title: "Timeless White Tips", url: "images/Gal12.jpeg" },
    
    // Page 3
    { title: "Classical Extensions", url: "images/Gal13.jpeg" },
    { title: "Barbie Core Pink", url: "images/Gal14.jpeg" },
    { title: "Pastel Ombre Gradient", url: "images/Gal15.jpeg" },
    { title: "Vintage Floral Overlay", url: "images/Gal16.jpeg" },
    { title: "Cherry Mocha Gloss", url: "images/Gal17.jpeg" },
    { title: "Normal Blue Polish", url: "images/Gal18.jpeg" },
    
    // Page 4
    { title: "Holographic Star Dust", url: "images/Gal19.jpeg" },
    { title: "Aura Blush Glaze", url: "images/Gal20.jpeg" },
    { title: "Glazed Donut Chrome", url: "images/Gal21.jpeg" },
    { title: "Pearlized Nude Glaze", url: "images/Gal22.jpeg" },
    { title: "Blue Cold Ribbon", url: "images/Gal23.jpeg" },
    { title: "Holographic Cherry Dust", url: "images/Gal24.jpeg" },
    
    // Page 5
    { title: "Starry Eclipse Glitter", url: "images/Gal25.jpeg" },
    { title: "Gothic Lace Stiletto", url: "images/Gal26.jpeg" },
    { title: "Vintage Floral Obsidian", url: "images/Gal27.jpeg" },
    { title: "Heart Slick Iridescent", url: "images/Gal28.jpeg" },
    { title: "Smoky Quartz Ombre", url: "images/Gal29.jpeg" },
    { title: "Minimalist Lines Obsidian", url: "images/Gal30.jpeg" }
];

function renderGallery(pageNumber) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = ''; // Clear current
    
    // Each of the 5 pages displays 6 unique, non-overlapping images
    const startIndex = (pageNumber - 1) * 6;
    
    for (let i = 0; i < 6; i++) {
        const itemIndex = startIndex + i;
        if (itemIndex >= galleryImages.length) break;
        const currentItem = galleryImages[itemIndex];
        
        // Give index 0 a special double span for asymmetry styling
        const spanClass = (i === 0) ? "md:col-span-2 md:row-span-2" : "";
        const heightClass = (i === 0) ? "h-[300px] md:h-[530px]" : "h-[250px]";
        
        const cardHtml = `
            <div class="relative rounded-2xl overflow-hidden shadow-sm border border-[#d4c4b7]/20 bg-white group hover:shadow-md transition-all duration-300 ${spanClass}">
                <div class="overflow-hidden relative ${heightClass}">
                    <img data-media-key="gallery-${itemIndex}" src="${currentItem.url}" alt="${currentItem.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-[#4a3b32]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <span class="text-[#e8d8ce] text-xs uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> PORTFOLIO
                        </span>
                        <h4 class="text-white font-serif font-bold text-lg flex items-center justify-between">
                            ${currentItem.title}
                            <i data-lucide="eye" class="w-5 h-5 text-white/80"></i>
                        </h4>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHtml;
    }
    
    // Re-render Lucide icons for injected HTML cards
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // Apply stored modifications or edit badges to new gallery items
    if (typeof updateMediaElements !== "undefined") {
        updateMediaElements();
    }
}

function changeGalleryPage(pageNum) {
    // Update button visual styles
    document.querySelectorAll('.gal-btn').forEach(btn => {
        btn.classList.remove('bg-[#4a3b32]', 'text-white');
        btn.classList.add('bg-[#d4c4b7]/50', 'text-[#4a3b32]');
    });
    
    const activeBtn = document.getElementById(`gal-btn-${pageNum}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-[#d4c4b7]/50', 'text-[#4a3b32]');
        activeBtn.classList.add('bg-[#4a3b32]', 'text-white');
    }

    // Update index count label
    const textIndicator = document.getElementById('current-gal-page');
    if (textIndicator) textIndicator.textContent = pageNum;

    // Fade animation and transition
    const grid = document.getElementById('gallery-grid');
    if (grid) {
        grid.style.opacity = '0';
        setTimeout(() => {
            renderGallery(pageNum);
            grid.style.opacity = '1';
            grid.style.transition = 'opacity 0.4s ease';
        }, 200);
    }
}

// 8. AUTOMATIC HERO SLIDER WITH MANUAL PLUS BUTTON CONTROLLER
let currentHeroSlideIndex = 0;
let heroSliderInterval;

function initHeroSlider() {
    showHeroSlide(0);
    startHeroSliderTimer();
}

function startHeroSliderTimer() {
    if (heroSliderInterval) clearInterval(heroSliderInterval);
    heroSliderInterval = setInterval(() => {
        nextHeroSlide();
    }, 5000); // Transitions every 5 seconds automatically
}

function nextHeroSlide() {
    currentHeroSlideIndex = (currentHeroSlideIndex + 1) % 3;
    showHeroSlide(currentHeroSlideIndex);
    startHeroSliderTimer(); // Restart the timer to give a full 5 seconds of display on click
}

function setHeroSlide(index) {
    currentHeroSlideIndex = index;
    showHeroSlide(currentHeroSlideIndex);
    startHeroSliderTimer(); // Restart the timer on manual navigation
}

function showHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    
    if (slides.length === 0) return;

    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('opacity-0', 'pointer-events-none');
            slide.classList.add('opacity-100');
        } else {
            slide.classList.remove('opacity-100');
            slide.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.remove('bg-white/50');
            dot.classList.add('bg-white');
        } else {
            dot.classList.remove('bg-white');
            dot.classList.add('bg-white/50');
        }
    });
}

// ==========================================
// 9. WEBSITE MEDIA CUSTOMIZER LOGIC (INDEXEDDB & URL)
// ==========================================

const DB_NAME = "PearlPolishMediaDB";
const STORE_NAME = "media";
const customMediaCache = {};
let customMediaObjectURLs = {}; // keep track of created object URLs to revoke them if needed

const defaultMediaMap = {
    'hero-1': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800',
    'hero-2': 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&q=80&w=800',
    'hero-3': 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800',
    'expert-1': 'images/about_mira.jpeg',
    'expert-2': 'images/about_wirda.jpeg',
    'expert-3': 'images/about_syahmina.jpeg',
    'expert-4': 'images/about_atikah.jpeg',
    'service-1': 'images/services1.jpeg',
    'service-2': 'images/services2.jpg',
    'service-3': 'images/services3.jpg',
    'blog-1': 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=400',
    'blog-2': 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=400',
    'blog-3': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
    'blog-4': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
    'video-1': 'https://assets.mixkit.co/videos/preview/mixkit-manicure-treatment-in-a-beauty-salon-40243-large.mp4',
    'video-2': "https://assets.mixkit.co/videos/preview/mixkit-beautician-filing-client's-nails-in-a-salon-40244-large.mp4",
    'video-3': 'https://assets.mixkit.co/videos/preview/mixkit-polishing-nails-in-a-salon-40247-large.mp4',
    'gallery-0': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
    'gallery-1': 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600',
    'gallery-2': 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&q=80&w=600',
    'gallery-3': 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=600',
    'gallery-4': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    'gallery-5': 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600',
    'gallery-6': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    'gallery-7': 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600',
    'gallery-8': 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=600',
    'gallery-9': 'https://images.unsplash.com/photo-1610992015762-46dca671fc82?auto=format&fit=crop&q=80&w=600',
    'gallery-10': 'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?auto=format&fit=crop&q=80&w=600',
    'gallery-11': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
    'gallery-12': 'https://images.unsplash.com/photo-1629111113524-7e53f191a92e?auto=format&fit=crop&q=80&w=600',
    'gallery-13': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600',
    'gallery-14': 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=600',
    'gallery-15': 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=600',
    'gallery-16': 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c9?auto=format&fit=crop&q=80&w=600',
    'gallery-17': 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600',
    'gallery-18': 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&q=80&w=600',
    'gallery-19': 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?auto=format&fit=crop&q=80&w=600',
    'gallery-20': 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=600',
    'gallery-21': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    'gallery-22': 'https://images.unsplash.com/photo-1605497746444-ac9db134f477?auto=format&fit=crop&q=80&w=600',
    'gallery-23': 'https://images.unsplash.com/photo-1571290274554-eac22e692408?auto=format&fit=crop&q=80&w=600',
    'gallery-24': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
    'gallery-25': 'https://images.unsplash.com/photo-1530631676643-3b3617ebb3a0?auto=format&fit=crop&q=80&w=600',
    'gallery-26': 'https://images.unsplash.com/photo-1508747703725-719ae2c22a42?auto=format&fit=crop&q=80&w=600',
    'gallery-27': 'https://images.unsplash.com/photo-1522337060762-ef97a9780a0b?auto=format&fit=crop&q=80&w=600',
    'gallery-28': 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600',
    'gallery-29': 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80&w=600'
};

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

function initMediaDatabase() {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readonly");
            const store = tx.objectStore(STORE_NAME);
            const request = store.getAllKeys();
            
            request.onsuccess = () => {
                const keys = request.result;
                const promises = keys.map(key => {
                    return new Promise((res) => {
                        const getReq = store.get(key);
                        getReq.onsuccess = () => {
                            const val = getReq.result;
                            if (val instanceof Blob) {
                                // Revoke old if exists
                                if (customMediaObjectURLs[key]) {
                                    URL.revokeObjectURL(customMediaObjectURLs[key]);
                                }
                                const url = URL.createObjectURL(val);
                                customMediaObjectURLs[key] = url;
                                customMediaCache[key] = url;
                            } else {
                                customMediaCache[key] = val; // plain URL string
                            }
                            res();
                        };
                        getReq.onerror = () => res();
                    });
                });
                Promise.all(promises).then(() => {
                    // Update any static references inside memory arrays (e.g., gallery)
                    for (let i = 0; i < galleryImages.length; i++) {
                        const key = `gallery-${i}`;
                        if (customMediaCache[key]) {
                            galleryImages[i].url = customMediaCache[key];
                        }
                    }
                    resolve();
                });
            };
            request.onerror = () => reject(request.error);
        });
    }).catch(err => {
        console.error("IndexedDB error:", err);
    });
}

function saveMediaToDB(key, val) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readwrite");
            const store = tx.objectStore(STORE_NAME);
            const request = store.put(val, key);
            request.onsuccess = () => {
                // If it's a blob, create object url and cache it
                if (val instanceof Blob) {
                    if (customMediaObjectURLs[key]) {
                        URL.revokeObjectURL(customMediaObjectURLs[key]);
                    }
                    const url = URL.createObjectURL(val);
                    customMediaObjectURLs[key] = url;
                    customMediaCache[key] = url;
                } else {
                    customMediaCache[key] = val;
                }
                resolve();
            };
            request.onerror = () => reject(request.error);
        });
    });
}

function deleteMediaFromDB(key) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readwrite");
            const store = tx.objectStore(STORE_NAME);
            const request = store.delete(key);
            request.onsuccess = () => {
                if (customMediaObjectURLs[key]) {
                    URL.revokeObjectURL(customMediaObjectURLs[key]);
                    delete customMediaObjectURLs[key];
                }
                delete customMediaCache[key];
                resolve();
            };
            request.onerror = () => reject(request.error);
        });
    });
}

function updateMediaElements() {
    const elements = document.querySelectorAll('[data-media-key]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-media-key');
        const tagName = el.tagName.toLowerCase();
        
        // Apply saved media if exists
        if (customMediaCache[key]) {
            if (tagName === 'img') {
                el.src = customMediaCache[key];
            } else if (tagName === 'video') {
                if (el.src !== customMediaCache[key]) {
                    el.src = customMediaCache[key];
                    const sources = el.querySelectorAll('source');
                    sources.forEach(s => s.remove());
                    el.load();
                }
            }
        }
    });
}
function toggleReviews() {
    document.getElementById("footerReviews").classList.toggle("hidden");
}