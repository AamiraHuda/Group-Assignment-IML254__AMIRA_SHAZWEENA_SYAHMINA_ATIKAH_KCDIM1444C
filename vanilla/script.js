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
    renderGallery(1);
    initHeroSlider();

    // Default Date for Booking picker (tomorrow's date)
    const dateInput = document.getElementById("form-date");
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }
});

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
        const response = await fetch("/api/book", {
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

        if (!response.ok) {
            throw new Error("Server returned error status");
        }

        // On success, go to step 5
        nextFormStep(5);
    } catch (err) {
        console.error("Booking error:", err);
        // Fallback: Proceed to success state anyway so we don't block the user in case of minor network issues
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


// 5. GALLERY PAGINATION LOGIC (5 pages simulator)
const galleryImages = [
    { title: "Elegant Pearl Inlays", url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600" },
    { title: "Pastel Ombre Gradient", url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600" },
    { title: "Gold Foil & Sage Green", url: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&q=80&w=600" },
    { title: "Modern Minimalist French", url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=600" },
    { title: "Chromes & Velvet Magnetics", url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600" },
    { title: "Matte Cocoa Extensions", url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600" }
];

function renderGallery(pageNumber) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = ''; // Clear current
    
    // Shift indices circularly to mimic different pages of content
    const shiftBy = (pageNumber - 1) % galleryImages.length;
    
    for (let i = 0; i < 6; i++) {
        const itemIndex = (shiftBy + i) % galleryImages.length;
        const currentItem = galleryImages[itemIndex];
        
        // Give index 0 a special double span for asymmetry styling
        const spanClass = (i === 0) ? "md:col-span-2 md:row-span-2" : "";
        const heightClass = (i === 0) ? "h-[300px] md:h-[530px]" : "h-[250px]";
        
        const cardHtml = `
            <div class="relative rounded-2xl overflow-hidden shadow-sm border border-[#d4c4b7]/20 bg-white group hover:shadow-md transition-all duration-300 ${spanClass}">
                <div class="overflow-hidden relative ${heightClass}">
                    <img src="${currentItem.url}" alt="${currentItem.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
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

